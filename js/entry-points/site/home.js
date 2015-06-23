var ko = require('knockout');
var base = require('../../common/base');
var $ = require('jquery');
var listnav = require('listnav');


ViewModel = function () {
    var self = this;

    self.comentarioList = ko.observableArray([]);

    base.findAll('equipe', self.comentarioList, {}, function (equipe) {

    });

    ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('main'));