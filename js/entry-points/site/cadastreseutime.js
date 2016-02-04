var ko = require('knockout');
var base = require('../../common/base');
var crud = require('../../common/crud');
var utils = require('../../common/utils');
var cryptoJS = require('crypto-js');

ViewModel = function () {
	var self = this;
	self.dataModel = {};

	self.cidadeList = ko.observableArray([]);
	self.modalidadeList = ko.observableArray([]);
	self.estadoList = ko.observableArray([]);
	self.equipeList = ko.observableArray([]);

	base.findAll('estado', self.estadoList, {}, function () {
	});

	base.findAll('equipe', self.equipeList, {}, function () {
	});

	base.findAll('modalidade', self.modalidadeList, {}, function () {
	});

	self.saveEquipe = function () {
		self.errorMessageList = ko.observableArray([]);
		self.errorFieldList = ko.observableArray([]);
		if (self.validateEmptyValues()) {
			if (self.validateExistingData()) {
				self.dataModel.siglaEstado = self.dataModel.estado.sigla;
				self.dataModel.modalidade = self.dataModel.modalidade.nome;
				self.dataModel.senha = cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA1(self.dataModel.senha, "futebolDeSabadoPassKey"));
				var crypt = self.dataModel.pagina + self.dataModel.email + self.dataModel.senha;
	      var SESSION_ID = cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA1(crypt, "futebolDeSabadoSessionKey"));
	      document.cookie = "SESSION_ID="+SESSION_ID+";path=/";
				crud.save('equipe', self.dataModel, function () {
					window.location = '/' + self.dataModel.pagina;
				});
			}
		}
	};

	self.validateField = function(field, fieldName) {
		if (!field) {
			self.errorFieldList.push(fieldName);
		} else {
			$('#' + fieldName).removeClass('error-field');
		}
	},

	self.validateTwoFields = function(field1, field2, fieldName, message) {
		if (field1 && field1.toLowerCase() === field2.toLowerCase()) {
			self.errorMessageList.push(message);
			self.errorFieldList.push(fieldName);
		}
	},

	self.validateEmptyValues = function() {
		self.validateField(self.dataModel.nome, "nome");
		self.validateField(self.dataModel.pagina, "pagina");
		self.validateField(self.dataModel.modalidade, "modalidade");
		self.validateField(self.dataModel.estado, "estado");
		self.validateField(self.dataModel.cidade, "cidade");
		self.validateField(self.dataModel.representante, "nomeRepresentante");
		self.validateField(self.dataModel.telefone, "telefone");
		self.validateField(self.dataModel.email, "email");
		self.validateField(self.dataModel.senha, "senha");
		self.validateField(self.dataModel.confirmarSenha, "confirmarSenha");
		if (self.errorFieldList().length > 0) {
			self.errorMessageList.push('Campos destacados devem ser preenchidos.');
			utils.showErrorMessage(self.errorMessageList(), self.errorFieldList());
			return false;
		}
		return true;
	},

	self.validateExistingData = function () {
		var nome, pagina, email;
		if (self.equipeList()) {
			for (var i=0; i<=self.equipeList().length - 1; i++) {
				nome = self.equipeList()[i].nome;
				pagina = self.equipeList()[i].pagina;
				email = self.equipeList()[i].email;
				self.validateTwoFields(nome, self.dataModel.nome, "nome", "- Nome já cadastrado.");
				self.validateTwoFields(pagina, self.dataModel.pagina, "pagina", "- Página já cadastrada.");
				self.validateTwoFields(email, self.dataModel.email, "email", "- Email já cadastrado.");
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
