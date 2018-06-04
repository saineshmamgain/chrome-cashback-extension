$(document).ready(function(){
    $(".mydeal").click(function(){
        $("#mydeals").show();
        $("#tafPanel").hide();
        $("#myorders").hide();
        $(this).addClass("active");
        $(this).parent().siblings().children().removeClass("active");


    });


    $(".getmoney").click(function(){
        $("#mydeals").hide();
        $("#myorders").hide();
        $("#tafPanel").show();

        $(this).addClass("active");
        $(this).parent().siblings().children().removeClass("active");


    });


    $(".myorder").click(function(){
        $("#mydeals").hide();
        $("#tafPanel").hide();
        $("#myorders").show();

        $(this).addClass("active");
        $(this).parent().siblings().children().removeClass("active");


    });


});