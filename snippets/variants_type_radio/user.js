function newOptionRadio() {
    if ($('.shop_product .option_radio').length) {
        $('.option_radio .radio-wrap').each(function () {
            let v = $(this).next().text();
            $(this).find('label').append(v);
        });
    };
};

$(document).ready(function () {
    newOptionRadio();
});