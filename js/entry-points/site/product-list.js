var $ = require('jquery');
var ko = require('knockout');
var base = require('../../common/base');

ViewModel = function () {
    var self = this;

    self.products = ko.observableArray([]);

    self.openProduct = function (path, data, event) {
        window.location = '/views/product/' + (path || '');
    };

    base.findAll('product', self.products, base.currentQuery(), function (product) {
        product.titleHtml = product.titleHtml.replace(/<br>/g, ' ');
        product.items.forEach(function (item) {
            base.addBackgroundImage(item, 'imageUrl');
        });
    });

    ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel());