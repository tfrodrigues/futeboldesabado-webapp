require('jquery-zoom');

exports.set = function (selector, imageUrl) {
    setTimeout(function () {
        var $element = $(selector);
        $element.trigger('zoom.destroy');
        $element.zoom({
            url: imageUrl
        });
    }, 0);
};