var $ = require('jquery');
var ko = require('knockout');
var base = require('../../common/base');

ViewModel = function () {
    var self = this;
    self.dataModel = {};

    var equipe = JSON.parse($("#equipe").val());
    self.dataModel = equipe;

    ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('main'));