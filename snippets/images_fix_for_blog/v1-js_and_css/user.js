
/*
*    replace standard blog JS sesction with this  
*
*/


//blog images on main page
if ($('#fx-blog').length) {
    $('#fx-blog').append($('#box_articlelist'));

    $('#box_articlelist article').each(function () {

        var fxImgWrap = '<div class="fx-img"></div>';
        var fxImg = $(this).find('.article-image');

        $(this).prepend(fxImgWrap);

        if (fxImg.attr('src') != null) {
            $(this).find('.fx-img').css('background-image', 'url(' + fxImg.attr('src') + ')');
        }
        $(this).find('.readmore').wrapInner('<span></span>');
    });
}else{
    $(this).find('.readmore').wrapInner('<span></span>');
}