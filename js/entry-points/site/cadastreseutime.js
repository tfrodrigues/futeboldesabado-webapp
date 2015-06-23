var ko = require('knockout');
var base = require('../../common/base');
var crud = require('../../common/crud');
var $ = require('jquery');
var listnav = require('listnav');

ViewModel = function () {
	var self = this;

	self.dataModel = {};
	self.cidadeList = ko.observableArray([]);
	self.estadoList = ko.observableArray([]);

	base.findAll('estado', self.estadoList, {}, function (estado) {
	});

	self.saveEquipe = function () {
		self.dataModel.estado = self.dataModel.estadoObj.sigla;
		crud.save('equipe', self.dataModel, function (equipe) {
			console.log('Equipe salva com sucesso.');
		});
	};

	self.loadCidades = function () {
		if (self.dataModel.estadoObj) {
			self.cidadeList.removeAll();
			ko.utils.arrayPushAll(self.cidadeList, self.dataModel.estadoObj.cidades);
		}
	};

	ko.utils.extend(self, new crud.ViewModel('equipe', self.dataModel));

};

ko.applyBindings(new ViewModel(), document.getElementById('main'));