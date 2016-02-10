jQuery(document).ready(function () {
    var $ = jQuery;
    $('[data-toggle=offcanvas]').click(function () {
    $('.row-offcanvas').toggleClass('active')
    });
    $(".footer-top img").addClass("img-responsive");
    $(".fancybox-blog").fancybox();
    $(".fancybox-portfolio").fancybox({
      helpers : {
          title : {
              type : 'inside'
          }
      },
      loop: false
    });
    $('.blog-item-content img').addClass("img-responsive center-block box-shadow--3dp");
    $('.blog-list p img').addClass("img-responsive center-block").wrap('<div class="center-block text-center thumbnail"></div>');
    /*Drupal.ajax.prototype.commands.send = function(ajax, response, status) {
        console.log(response);
    };*//*
    $("#feedback").click(function(){
        var $btn = $(this).button('loading');
        // business logic...

        $.ajax({
            url: '/feedback/send',
            data: $("#feedback_form").serialize(),
            //data: {'from-login':'1', 'user':'asdasd', 'pwd':'1234'},
            type: 'post',
            timeout: 2000,
            dataType: 'json',
            success: function(data){
                console.log(data);
                $btn.button('reset');
                //alert(data);
            }
        });
    });*/
/*
    var ajax = new Drupal.ajax(false, '#feedback', {url : 'feedback/send', data: $("#feedback_form").serialize(), type: 'post'});
    ajax.eventResponse(ajax, {});*/

    $("#owl").owlCarousel({
        items: 3,
        loop:true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items:1
                //nav:false
            },
            600:{
                items:2,
                nav:false
            },
            1000:{
                items:3,
                //nav:true,
                loop:true
            }
        }
    });
});
(function($){

    Drupal.behaviors.feedback =  {
        attach: function (context, settings) {
            $('#feedback_form', context).submit(function () {
                var $btn = $("#feedback").button('loading');
                $('#ok-sending').addClass('hidden');
                var callback = function(data) {
                    $btn.button('reset');
                    console.log(data);
                    if (data.status=='send_ok') {
                        $('#ok-sending').removeClass('hidden');
                        $('#error-mail').addClass('hidden');
                        $('#feedback_form').trigger('reset');
                    }
                    if (data.status == 'error' && data.error_type == 'validate' && data.error_row=='email'){
                        $('#error-mail').removeClass('hidden');
                        $('#request-msg').text(data.message);
                    }

                };
                $.ajax({
                    type: 'POST',
                    url: 'feedback/send',
                    success: callback,
                    dataType: 'json',
                    data:  $("#feedback_form").serialize(),
                    error:  function(xhr, str){
                        alert('Возникла ошибка: ' + xhr.responseCode);
                    }
                });
                return false;
            });
        }
    }
})(jQuery);