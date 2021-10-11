
/* komentarzy nie kopiować! ;)

    kod podmienia zdjęcie w kafelkach produktowych na następne z galerii na liście produktów w kategoriach i sekcji produkty powiązane

*/


Shop.include({
    selectorFunctions: {
        imgReplace: {
            selector: '[data-src][data-src-alt]',
            domready: function ($img) {
                $img.on('mouseenter', function () {
                    $(this).attr('src', $(this).data('srcAlt'));
                }).on('mouseleave', function () {
                    $(this).attr('src', $(this).data('src'));
                });
            }
        }
    }
});


// opcja przestawienia zdjęcia po hoverze na całym kaflu produktowym


Shop.include({
    selectorFunctions: {
        imgReplace: {
            selector: '.products.viewphot .product',
            domready: function ($img) {
                $img.on('mouseenter', function () {
                    $(this).find('.replace-img-list img').attr('src', $(this).find('.replace-img-list img').data('srcAlt'));
                }).on('mouseleave', function () {
                    $(this).find('.replace-img-list img').attr('src', $(this).find('.replace-img-list img').data('src'));
                });
            }
        }
    }
});