var ko = require('knockout');
var base = require('../../common/base');
var $ = require('jquery');
var listnav = require('listnav');

ViewModel = function () {
	var self = this;

	self.equipeList = ko.observableArray([]);

	base.findAll('equipe', self.equipeList, {}, function (equipe) {
	}, function () {
        $('#div-alfabeto').listnav({ 
			includeAll: false,
			noMatchText: 'Nenhum time cadastrado.',
			showCounts: false
		});
    });

    self.openEquipe = function (pagina) {
        window.location = '/' + pagina;
    };

	ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('header'));