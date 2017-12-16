$(document).ready(function(){
    hideContainer();
    var image_path = "";
    var products = [];
    String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}
    if (localStorage.getItem("products") != null) {
        GetProducts();
        RenderCards();
    }

    var current;
    
    function PopulateCards() {
        
        products = [];
        $("#content").empty();      
        
        var product1 = {};
        product1.id = 100;
        product1.title = "Spoon";
        product1.brand = "Nobila Casa";
        product1.price = "4";
        product1.image = "https://images-eu.ssl-images-amazon.com/images/I/61exFCfBWDL._SL150_.jpg";
        product1.stock = true;
    product1.reviews = '5.00 (173)';

        products.push(product1);

        var product2 = {};
        product2.id = 101;
        product2.title = "Book";
        product2.brand = "Editura Trei";
        product2.price = "10";
        product2.image = "http://l.thumbs.canstockphoto.com/canstock7054986.jpg";
        product2.stock = true;
    product2.reviews = '5.00 (421)';
        products.push(product2);

        var product3 = {};  
        product3.id = 102;
        product3.title = "Cup";
        product3.brand = "Nobila Casa";
        product3.price = "5";
        product3.image = "https://cdn.shopify.com/s/files/1/1171/1516/products/Luna-Flat-White-Cup-Blue_150x150.jpg?v=1458667144";
        product3.stock = true;
    product3.reviews = '5.00 (21)';
        products.push(product3);

        var product4 = {};  
        product4.id = 103;
        product4.title = "Mouse";
        product4.brand = "Logitech";
        product4.price = "8";
        product4.image = "http://s.productreview.com.au/products/images/t/150/60046_logitech_value_optical_mouse.jpg";
        product4.stock = true;
    product4.reviews = '5.00 (51)';
        products.push(product4);

        var product5 = {};  
        product5.id = 104;
        product5.title = "Chair";
        product5.brand = "IKEA";
        product5.price = "12";
        product5.image = "https://www.mathisbrothers.com/dw/image/v2/AAYQ_PRD/on/demandware.static/-/Sites-mathisbrothers-master/default/dw9ad01d87/images/products/hires/WIN/WIN-DJ1450S%5E0472SC.jpg?sw=150&sh=150&sm=fit";
        product5.stock = true;
    product5.reviews = '5.00 (7)';
        products.push(product5);
    }

        function RenderCards() {
        $("#content").empty();

        for (var item of products){
            RenderCard(item);
        }   
    }
    
    function RenderCard(item) {
        var star = '<i class="fa fa-star" aria-hidden="true"></i>';
        var card = "";
        card += '<div class="card" title="' + item.id + '">';
        card += '<img src="' + image_path + item.image + '">';
        card += '<br/>'+ 'In stock: ' + '<b>'   + item.stock + '</b>';
        card += '<p>' + item.title + '</p>';
        card += '<p>' + item.brand + '</p>';
        card += '<p id="price">' + item.price + " lei" +'</p>';
        card += '<br/>' + star.repeat(5) + ' '+ item.reviews + '<br/>';
        card += '<button class="btn danger" id="delete' + item.id + '">Delete</button>';
        card += '<button class="btn alert" id="edit' + item.id + '">Edit</button>';
        card += '</div>';   
        $(card).appendTo("#content");       
    }


// logout and login
    $("#log-out").on("click", function(){
            hideContainer();
            $("#login-page").show('easing');
    });

    $("#login-as-guest").on("click", function(){
        $("#error").remove();
        $("#container").fadeIn('easing');
        $("#login-page").hide();
    });

    $("#login-button").on("click" , function() { 
        if($('#error').length < 1){
        $("#login-form").append('<center>' + '<p id="error">' + 'Login denied.' + '<br/>' + 
        ' This account is not linked to a purchased CD-key.' + '</p>' + '</center>')
        $('#error:last-child').css('margin-top', '10px');
        }  
    });


    //hide menu
        // if ($("#menu").css('display', 'none')) {
        //  $("#menu").css('display' , 'block');
        // }else{
        //  $("#menu").css('display', 'none');
        // };


        $(".fa-bars, .fa-times").on('click', function(){
            $("#menu").show(); //for mobile
            $("#menu").toggleClass('hide');
            $("#content, #grafic, #header").toggleClass('expand');
    });


        $(".mailbox").click(function(){
            $("#mailbox").show('easing');
        });

    // Open Edit Product
    $("body").on("click", "button[id^=edit]", function(){
        if (!isNaN(parseInt(this.id.slice(4)))) {
            for (var i = 0; i < products.length; i++){
                if (products[i].id == this.id.slice(4)) {
                    current = i;
                    break;
                }
            }
            
            $("#editboxid").text(products[current].id);
            $("#editboximage").val(products[current].image);
            $("#editboxstock").val(products[current].stock);
            $("#editboxtitle").val(products[current].title);
            $("#editboxbrand").val(products[current].brand);
            $("#editboxprice").val(products[current].price);
            
            $("#editbox").show("easing");
        }
    });

    // Delete Product
    $("body").on("click", "button[id^=delete]", function(){           //aici 
        for (var i = 0; i < products.length; i++) {
            if (products[i].id == this.id.slice(6)) {
                current = i;
                break;
            }
        }
        
        var confirmed = confirm("Are you sure you want to delete product " + this.id.slice(6) + ' ?');
        
        if (confirmed) {
            products.splice(current, 1); // removes current item from products
            
            SaveProducts();
            RenderCards();
        }
    });
    
    $("body").on("click", "#reset", function(){ 
        ResetProducts();
    });
    
    $("#add").click(function(){
        $("#addbox").show("easing");
    });
    
    $("#addboxclose").click(function(){
        $("#addbox").hide("swing");
        $(".errorAdd").hide();
    });

    $("#editboxclose").click(function(){
        $("#editbox").hide("swing");
        $(".errorEdit").hide();
    });

    $("#mailboxclose").click(function(){
        $("#mailbox").hide("swing");
        
    });

//edit
    $("input[type=checkbox").click(function() { 
            if ($("#editboxonstock").prop('checked') && ($("#editboxnotonstock").prop('checked'))) {
            $(".errorEdit").show(); 
            $(".errorEdit").text("Cannot check both.");
            $("#editboxsave").hide();
        }else{
            $("#editboxsave").show();
            $(".errorEdit").text("");
        }
    });

//add
    $("input[type=checkbox").click(function() { 
            if ($("#addboxonstock").prop('checked') && ($("#addboxnotonstock").prop('checked'))) {
            $(".errorAdd").show(); 
            $(".errorAdd").text("Cannot check both.");
            $("#addboxadd").hide();
        }else{
            $("#addboxadd").show();
            $(".errorAdd").text("");
        }
    });

    // Edit Product
    $("#editboxsave").click(function(){
        products[current].image = $("#editboximage").val();
        products[current].stock = $("#editboxstock").val();
        products[current].title = $("#editboxtitle").val();
        products[current].brand = $("#editboxbrand").val();
        products[current].price = $("#editboxprice").val();     
        
        if (products[current].image.trim() == "") {
            products[current].image = "cart.jpg";
        }

        if ($("#editboxonstock").prop('checked') == false) { 
        products[current].stock = false;

        }else{
            products[current].stock = true;
        }
    
        SaveProducts();
        RenderCards();  
    
        $("#editbox").hide("swing");
    });

        //edit box image validations
    $("#editboximage").on("keyup", function(){ //I added the keyup event because I think it is better suited for what I need
        var lastCharAdd = $(this).val().slice(-4);
        var writtenValue = $(this).val();
        if ((lastCharAdd !== '.jpg') && (lastCharAdd !== '.png') && (lastCharAdd !== '.gif') &&  ($("#editboximage").val() !=="")) {
            $(".errorEdit").show(); 
            $(".errorEdit").text("Image must end with .jpg .png or .gif.")
            $('#editboximage').css('color', 'red');
            $('#editboxsave').hide();
        }else if ((/^[a-zA-Z0-9\.\/\_\-\:]+$/.test(writtenValue) == false) && writtenValue!=='')  {
            $(".errorEdit").show(); 
            $(".errorEdit").text("Illegal characters detected.");
            $('#editboximage').css('color', 'red');
            $('#editboxsave').hide();
        }else{
            $('#editboximage').css('color', 'black');
            $(".errorEdit").hide();
            $('#editboxsave').show();
        }
    });


    // Add Product
    $("#addboxadd").click(function(){
        var new_product = {};
        new_product.image = $("#addboximage").val();
        new_product.stock = $("#addboxstock").val();
        new_product.title = $("#addboxtitle").val();
        new_product.brand = $("#addboxbrand").val();
        new_product.price = $("#addboxprice").val();
        new_product.reviews = 'No reviews yet'; 

        if (products.length == 0) {
            new_product.id = 100;
        } else {
            new_product.id = parseInt(products[products.length - 1].id) + 1;
        }
        
        if (new_product.image.trim() == "") {
            new_product.image = "cart.jpg";
        }

        if ($("#addboxonstock").prop('checked') == false) {
            new_product.stock = false;
        }else {
            new_product.stock = true;
        }

        products.push(new_product);     
        SaveProducts();
        RenderCards();  
        $("#addbox").hide("swing");
    });

    //add box image validations
    $("#addboximage").on("keyup", function(){ //I added the keyup event because I think it is better suited for what I need
        var lastCharAdd = $(this).val().slice(-4);
        var writtenValue = $(this).val();
        if ((lastCharAdd !== '.jpg') && (lastCharAdd !== '.png') && (lastCharAdd !== '.gif') &&  ($("#addboximage").val() !=="")) {
            $(".errorAdd").show();
            $('#addboximage').css('color', 'red'); 
            $(".errorAdd").text("Image must end with .jpg .png or .gif.")
            $('#addboxadd').hide();
        }else if ((/^[a-zA-Z0-9\.\/\_\-\:]+$/.test(writtenValue) == false) && writtenValue!=='')  {
            $(".errorAdd").show();
            $(".errorAdd").text("Illegal characters detected.");
            $('#addboximage').css('color', 'red');
            $('#addboxadd').hide();
        }else{
            $('#addboximage').css('color', 'black');
            $(".errorAdd").hide();
            $('#addboxadd').show();
        }
    });

    function SaveProducts() {
        localStorage.setItem("products", JSON.stringify(products));
    }

    function GetProducts() {
        products = JSON.parse(localStorage.getItem("products"));
    }

    function DeleteProducts() {
        localStorage.removeItem("products");
    }

    function ResetProducts() {
        PopulateCards();
        SaveProducts();
        RenderCards();
    }

    function hideContainer() {
        $("#container").hide();
    }
    
});

