jQuery(document).ready(function () {
    var $ = jQuery;
    $("head").append('<link rel="stylesheet" href="/css/normalize.min.css" >');
    $("head").append('<link rel="stylesheet" href="/css/font-awesome.min.css">');
    $("head").append('<link rel="stylesheet" href="css/style.css">');
    $('.caption').click(function(){
        $(this).hide();
    });
});
