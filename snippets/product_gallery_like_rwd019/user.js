 //prod gallery
$(document).ready(function () {
    $('.main.row').before($('.fx-gallery'));

    $('#fx-product-slider').slick({
        slidesToShow: 3,
        infinite: true,
        speed: 300,
        dots: false,        
        arrows: true,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                swipe: true,
                slidesToShow: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                swipe: true,
                slidesToShow: 1
              }
            }
        ]
    });
});