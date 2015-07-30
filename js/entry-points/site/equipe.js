var $ = require('jquery');
var ko = require('knockout');
var utils = require('../../common/utils');
var zoom = require('../../common/zoom');
var tabBar = require('../../common/tab-bar');
var base = require('../../common/base');

ViewModel = function () {
    var self = this;

    self.openEquipe = function (data, event) {
        window.location = '/' + (data.path || '');
    };

    ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel());