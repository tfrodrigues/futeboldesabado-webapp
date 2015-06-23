require('unslider');

exports.init = function (selector) {
    setTimeout(function () {
        var $element = $(selector);
        var unslider = $element.unslider({
            delay: 10000,
            dots: true
        });

        var data = unslider.data('unslider');

        $element.find('.arrow.previous').click(function (event) {
            data.prev();
            event.stopPropagation();
        });

        $element.find('.arrow.next').click(function (event) {
            data.next();
            event.stopPropagation();
        });

        $element.click(function () {
            var index = Number($(this).find('.dot.active').text()) - 1;
            var $li = $(this).find('ul li:eq(' + index + ')');
            window.location = $li.data('url');
        });
    }, 0);
};