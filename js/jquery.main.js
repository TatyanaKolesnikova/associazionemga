$(document).ready(function () {
    $(document).on('click', '.toogle-menu', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $("body").toggleClass("open-nav");
        return false;
    });
    $(document).on('click', '.scrolltop', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, 600);
    });
    $(document).on('click', '.menu li .nav-link, .logo-link, .btn-contact', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        var headerHeight = $('#header').innerHeight();
        $('html, body').animate({
            scrollTop: $(target).offset().top - headerHeight
        }, 500);
    });
    $(document).on('submit', '#contact_form', function (event) {
        event.preventDefault();
        grecaptcha.ready(function () {
            grecaptcha.execute('6LdfD6QZAAAAAChbts82BvCi3lF6hs8J4nlli_5w', { action: 'submit' }).then(function (token) {
                $('.validation_error').remove();
                $('.default-input').removeClass('error');
                $('.default-text').removeClass('error');
                $('<input>').attr({
                    type: 'hidden',
                    name: 'lang',
                    value: 'it'
                }).appendTo('#contact_form');
                $.ajax({
                    type: 'POST',
                    url: 'send_email.php',
                    data: $('#contact_form').serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.error == 0) {
                            var success_message = '<div class="hold-success">';
                            success_message += '<strong class="title">Message sent successfully!</strong>';
                            success_message += '<div class="hold-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100.64 100.64"><defs><style>.cls-1{fill:url(#linear-gradient);}.cls-2{fill:#fff;}</style><linearGradient id="linear-gradient" x1="50.32" y1="100.64" x2="50.32" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fe3ad2"></stop><stop offset="1" stop-color="#ff48d5"></stop></linearGradient></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-1" cx="50.32" cy="50.32" r="50.32"></circle><path class="cls-2" d="M43.55,74.32a8.92,8.92,0,0,1-6.15-2.44l-14.86-14A8.5,8.5,0,1,1,34.19,45.51l9.33,8.79,22.9-21.78A8.5,8.5,0,1,1,78.14,44.84l-28.41,27A9,9,0,0,1,43.55,74.32ZM49,59.49l0,0Z"></path></g></g></svg></div>';
                            success_message += ' </div>';
                            setTimeout(function () {
                                $('#contact_form').addClass('hidden');
                                $('#contact_form').parent().append(success_message);
                            }, 1000);
                        } else {
                            if (data.validation) {
                                data['validation'].forEach(element => {
                                    $('#contact_' + element['field']).parent().addClass('error');
                                    $('#contact_' + element['field']).parent().append('<span class="validation_error" style="color:red;">' + element['message'] + '</span>');
                                });
                            } else {
                                console.log(data.message);
                            }
                        }
                    },
                });
            });
        });
    });

});

$(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
        $('#header').addClass("sticky");
    }
    else {
        $('#header').removeClass("sticky");
    }
    var height = $('.section-intro').height();
    if ($(this).scrollTop() > height) {
        $('.scrolltop').addClass('visible');
    } else {
        $('.scrolltop').removeClass('visible');
    }
});
