var ko = require('knockout');
var base = require('../../common/base');
var crud = require('../../common/crud');
var utils = require('../../common/utils');
var cryptoJS = require('crypto-js');

ViewModel = function () {
	var self = this;
	self.dataModel = {};

	self.cidadeList = ko.observableArray([]);
	self.estadoList = ko.observableArray([]);
	self.equipeList = ko.observableArray([]);

	base.findAll('estado', self.estadoList, {}, function () {
	});

	base.findAll('equipe', self.equipeList, {}, function () {
	});

	self.saveEquipe = function () {
		self.errorMessageList = ko.observableArray([]);
		self.errorFieldList = ko.observableArray([]);
		self.dataModel.siglaEstado = self.dataModel.estado.sigla;
		if (self.validateExistingData()) {
			self.dataModel.senha = cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA1(self.dataModel.senha, "futebolDeSabadoPassKey"));
			var crypt = self.dataModel.pagina + self.dataModel.email + self.dataModel.senha;
            var SESSION_ID = cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA1(crypt, "futebolDeSabadoSessionKey"));
            document.cookie = "SESSION_ID="+SESSION_ID+";path=/";
			crud.save('equipe', self.dataModel, function () {
				window.location = '/' + self.dataModel.pagina;
			});	
		}	
	};

	self.validateExistingData = function () {
		var nome, pagina, email;
		if (self.equipeList()) {
			for (var i=0; i<=self.equipeList().length - 1; i++) {
				nome = self.equipeList()[i].nome; 
				pagina = self.equipeList()[i].pagina; 
				email = self.equipeList()[i].email; 
				if (nome && nome.toLowerCase() === self.dataModel.nome.toLowerCase()) {
					self.errorMessageList.push("- Nome já cadastrado.");
					self.errorFieldList.push("nome");
				}
				if (pagina && pagina.toLowerCase() === self.dataModel.pagina.toLowerCase()) {
					self.errorMessageList.push("- Página já cadastrada.");
					self.errorFieldList.push("pagina");
				}
				if (email && email.toLowerCase() === self.dataModel.email.toLowerCase()) {
					self.errorMessageList.push("- Email já cadastrado.");
					self.errorFieldList.push("email");
				}
				if (email && email.toLowerCase() === self.dataModel.email.toLowerCase()) {
					self.errorMessageList.push("- Email já cadastrado.");
					self.errorFieldList.push("email");
				}
			}
		}
		if (self.dataModel.senha != self.dataModel.confirmarSenha) {
			self.errorMessageList.push("- Senha e Confirmar Senha devem ser iguais.");
			self.errorFieldList.push("senha");
			self.errorFieldList.push("confirmarSenha")
		}
		if (self.errorMessageList().length > 0) {
			utils.showErrorMessage(self.errorMessageList(), self.errorFieldList());
			return false;
		}
		return true;
	};

	self.loadCidades = function () {
		if (self.dataModel.estado) {
			self.cidadeList.removeAll();
			ko.utils.arrayPushAll(self.cidadeList, self.dataModel.estado.cidades);
		}
	};

	ko.utils.extend(self, new crud.ViewModel('equipe', self.dataModel));

};

ko.applyBindings(new ViewModel(), document.getElementById('main'));