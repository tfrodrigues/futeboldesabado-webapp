var ko = require('knockout');
var $ = require('jquery');
var listnav = require('listnav');
var base = require('../../common/base');

ViewModel = function () {
    var self = this;

    self.equipeList = ko.observableArray([]);

    base.findAll('equipe', self.equipeList, {}, function (equipe) {
    });

    ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel());