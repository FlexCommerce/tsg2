$(document).ready(function () {
    let mobileViewport = window.matchMedia("screen and (min-width: 768px)");

    if ($('.logo-bar > .basket, .logo-bar > .basket-contain').length){
        $('.logo-bar > .basket, .logo-bar > .basket-contain').wrapAll('<div class="bbs-wrap right"></div>');
    }else{
        $('header .logo-bar').append('<div class="bbs-wrap right"></div>');
    }
    $('header .logo-bar').prepend('<div class="fx-social-wrapper"></div>');
    // empty mask fix
    $(document.body).append('<div class="mask none"></div>');
    
    //search
    if ($('header .logo-bar .search-form.right').length) {
        $('.logo-bar .bbs-wrap').prepend($('header .logo-bar .search-form.right'));
    }else if($('header .logo-bar .search__container.none').length){
        console.log('search off...')
    }else{
        $('.logo-bar .bbs-wrap').prepend('<div class="fx-search"></div>');
    }

    //login panel
    if ($('header .login-bar').length) {
        $('.logo-bar .bbs-wrap').prepend('<div class="fx-panel"></div>');
    }

	
  	
    $('.fx-panel').on('click', function () {
        $(this).toggleClass('fx-active');
        $('header .login-bar .links').toggleClass('fx-active');
    });

    // modal cart to do
    $('.logo-bar .bbs-wrap > .basket-contain').wrapAll('<div class="modal modal-cart"></div>');
    $('.modal-cart').prepend('<div class="modal-header"><h3>' + $('header .logo-bar .basket > a .countlabel > span').html() + '</h3><div class="modal-close modal-cart-close"><span class="modal-close-txt">zamknij</span></div></div>');

    $('header .logo-bar .basket').on('click', function (e) {
        e.preventDefault();        
        $('.modal-cart').toggleClass('modal-visible');
        $('.mask').toggleClass('none');
    });

    $('.modal-cart-close').on('click', function (e) {
        e.preventDefault();        
        $('.modal-cart').toggleClass('modal-visible');        
        $('.mask').toggleClass('none');
    });



    $('.fx-search').on('click', function () {
        $(this).toggleClass('fx-active');
        $('.search__container').toggleClass('fx-active');
    });

    //welcome top
    if($('#fx-welcome').length){
        $('#fx-welcome').append('<i class="fx-welcome-close fa fa-times"></i>');
        $('header').prepend($('#fx-welcome'));

        $('.fx-welcome-close').on('click', function () {
            $('#fx-welcome').toggleClass('none');
        });
    }
    
    //social top
    if($('#fx-social').length){
        $('.logo-bar .fx-social-wrapper').prepend($('#fx-social'));
    }

    //social foot
    if($('#fx-social_footer').length){
        $('.footer .innerfooter').append($('#fx-social_footer'));
    }

    if($('#fx-front-b').length){
        $('#fx-front-b').find('img').wrap('<span></span>');
    }
    
    //blog images on main page
    if ($('#fx-blog').length) {
        $('#fx-blog').append($('#box_articlelist'));

        $('#box_articlelist article').each(function () {

            var fxImgWrap = '<div class="fx-img row"></div>';
            var fxImg = $(this).find('.article-image');

            $(this).prepend($(this).find('.article-image'));
            $(this).find('.readmore').wrapInner('<span></span>');

        })
    }else{
        $(this).find('.readmore').wrapInner('<span></span>');
    }

    //sticky


    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if(mobileViewport.matches && $('#fx-sticky').length){
            if (scroll >= 105) {
                $(".wrap").addClass("scrolled").removeClass("scrolled-back");
            } else {
                $(".wrap").removeClass("scrolled").addClass('scrolled-back');
            }
        }
    });

    //product page
    $('#box_productfull .maininfo > .f-row > .f-grid-6:not(.productimg)').prepend(
        $('#box_productfull .basket .addtofav'),
        $('#box_productfull .boxhead > h1.name')
    );

    const ShortDescApi = () => {
        if (typeof frontAPI != "undefined" && `${$('body').attr('id')}` != "undefined") {  
            frontAPI.getProduct(function(product) {
                if (product.shortDescription.length) {
                    $('#box_productfull .productdetails-more-details').before('<div class="row fx-short_desc">' + product.shortDescription + '<div>');
                }
            }, {
                id: `${$('body').attr('id').replace(/\D/g,'')}`
            });
        }else{
            console.log('ups...');
        }
    }

    setTimeout(ShortDescApi, 2000);


    // slick ms13
    if ($('#ms13').length) {
        $('.ms13').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
            variableWidth: true
        });
    }

    // slick ms20
    if ($('.ms-slick').length) {
        $('.ms-slick').slick({
            dots: false,
            infinite: true,
            speed: 300
        });
    }

    if ($('.ms-slick-dots').length) {
        $('.ms-slick-dots').slick({
            dots: true,
            infinite: true,
            speed: 300
        });
    }

    // lang switch in header

if($('#fx-lang').length){
    $('#box_languages_select option').each(function(){
        var x = $(this).val();

        if(x === "/" || x==="/pl/index"){
        x = "pl";
        $(this).html(x);
        }else{
        x = x.substring(1, 3);
        $(this).html(x);
        }
    });

    $('header .logo-bar .bbs-wrap').prepend($('#box_languages_select'));
    $('#box_languages').addClass('none');
};

//curr...


if($('#fx-curr').length){
    $('#box_currencies_select option').each(function(){
        var c = $(this).val();
        c = c.split("=").pop();
        $(this).html(c);
    });

    $('header .logo-bar .bbs-wrap').prepend($('#box_currencies_select'));
    $('#box_currencies').addClass('none');
};

//eof curr...
    
});


window.onload = function() {

    if ($('.showShippingCost').length && !$('.tab-container').length) {
        $('#box_productdeliveries').wrapAll('<div class="modal modal-shipping"></div>');
        $('#box_productdeliveries .boxhead').addClass('modal-header').append('<div class="modal-close modal-shipping-close"><span class="modal-shipping-txt">zamknij</span></div>');


        $('#box_productfull .availability>.row .shipping-costs .showShippingCost').on('click', function (e) {
            e.preventDefault();

            $('.modal-shipping').toggleClass('modal-visible');
            $('.mask').toggleClass('none');
        });

        $('.modal-shipping-close').on('click', function (e) {
            e.preventDefault();        
            $('.modal-shipping').toggleClass('modal-visible');
            $('.mask').toggleClass('none');        
        });
    };
};

Shop.include({
    selectorFunctions : {
        boxslider: {
            selector: '.box.slider',

            load: function (slider, shopInstance) {
                var isAnimated;
                var _initialSlideWidth = 240;
                var _slideWidth;
                var _sliderWidth;
                var _visibleSlides;
                var _maxHeight = 0;
                var _autoMove = false;
                var slides;
                var sliderWrap;
                var prev;
                var next;
                var _autoMoveDuration = Shop.useroptions.slider.automove;
                var nav;
                /**
                 * in xhrBox we need to know if this functiona was already called or no
                 */
                slider.selectorFnTriggered = true;

                isAnimated = false;
                slider.removeClass('loading');
                shopInstance.lazypicture.lazyLoading();

                if (slider.hasClass('slider_automove')) {
                    _autoMove = true;
                }

                slides = slider.find('.product');

                if (slides.length > 1) {
                    sliderWrap = $('<div class="slider-wrap" />').css('text-align', 'left');

                    nav = $('<div />').appendTo(slider);
                    prev = $('<span class="slider-nav-left" />').css({
                        'display': 'none'
                    }).appendTo(nav);
                    next = $('<span class="slider-nav-right" />').css({
                        'display': 'block'
                    }).appendTo(nav);

                    slides.wrapAll(sliderWrap);
                    sliderWrap = slider.find('.slider-wrap');

                    shopInstance.addEvent('img:change:slider:'+ slider.attr('id'), function () {
                        sliderWrap.css('height', 'auto');

                        slides.each(function () {
                            if ($(this).outerHeight() >= _maxHeight) {
                                _maxHeight = $(this).outerHeight();
                                sliderWrap.height(_maxHeight + 6);
                            }
                        });
                    });

                    $(window).on('resize', function () {
                        _sliderWidth = slider.outerWidth();
                        _visibleSlides = Math.floor(_sliderWidth / _initialSlideWidth) || 1;
                        _slideWidth = (_sliderWidth - (20 * (_visibleSlides - 1))) / _visibleSlides;

                        slides.each(function () {
                            if ($(this).outerHeight() >= _maxHeight) {
                                _maxHeight = $(this).outerHeight();
                            }
                        });

                        slides.outerWidth(_slideWidth);
                        sliderWrap.outerWidth(((_slideWidth + 20) * slides.length) + 3).height(_maxHeight + 6);

                        slides.css('left', '0');

                        if (slides.length > _visibleSlides) {
                            next.show();
                            prev.hide();
                        } else {
                            next.hide();
                            prev.hide();
                        }
                    }).trigger('resize');

                    next.on('click', function (ev) {
                        ev.stopPropagation();
                        if (!isAnimated) {
                            slides.animate({
                                left: '-=' + (_slideWidth + 20)
                            }, {
                                duration: 400,
                                start: function () {
                                    isAnimated = true;
                                },
                                complete: function () {
                                    var pos = parseInt($(this).css('left'), 10);

                                    if ((slides.length - _visibleSlides) * Math.floor(_slideWidth) <= -pos) {
                                        next.hide();
                                    }

                                    if (-pos > 0) {
                                        prev.show();
                                    }

                                    isAnimated = false;
                                }
                            });
                        }
                    });

                    prev.on('click', function (ev) {
                        ev.stopPropagation();
                        if (!isAnimated) {
                            slides.animate({
                                left: '+=' + (_slideWidth + 20)
                            }, {
                                duration: 400,
                                start: function () {
                                    isAnimated = true;
                                },
                                complete: function () {
                                    var pos = parseInt($(this).css('left'), 10);

                                    if (-pos <= 0) {
                                        prev.hide();
                                    }

                                    if ((slides.length - _visibleSlides) * Math.floor(_slideWidth) >= -pos) {
                                        next.show();
                                    }
                                    isAnimated = false;
                                }
                            });
                        }
                    });

                    slider.on('swipeleft', function () {
                        if (next.is(':visible')) {
                            next.trigger('click');
                        }
                    });

                    slider.on('swiperight', function () {
                        if (prev.is(':visible')) {
                            prev.trigger('click');
                        }
                    });

                    if (_autoMove) {
                        setInterval(function () {
                            if (next.is(':visible')) {
                                next.trigger('click');
                            } else {
                                slides.animate({
                                    left: 0
                                }, 600, function () {
                                    next.show();
                                    prev.hide();
                                });
                            }
                        }, _autoMoveDuration);
                    }
                }
            }
        }
    }
});
$(document).ready(function () {
    $('#box_bestsellers .product').addClass('s-grid-3' );
  
});