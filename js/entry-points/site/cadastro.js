var crud = require('../../common/crud');
var utils = require('../../common/utils');

var ko = require('knockout');
var base = require('../../common/base');
require('knockout.validation');

ViewModel = function() {
  var self = this;
  ko.validation.init({
    decorateElement: true,
    insertMessages: false
  });

  self.dataModel = {};

  self.showErrors = ko.observable();

  self.cidadeList = ko.observableArray([]);
  self.modalidadeList = ko.observableArray([]);
  self.estadoList = ko.observableArray([]);
  self.equipeList = ko.observableArray([]);

  base.findAll('estado', self.estadoList, {}, function() {});

  base.findAll('equipe', self.equipeList, {}, function() {});

  base.findAll('modalidade', self.modalidadeList, {}, function() {});

  setRequiredFields();

  function setRequiredFields() {
    self.validation = ko.validatedObservable([
      self.dataModel.nome = ko.observable().extend({
        required: true
      }),
      self.dataModel.pagina = ko.observable().extend({
        required: true,
        maxLenght: 30
      }),
      self.dataModel.representante = ko.observable().extend({
        required: true,
        maxLenght: 60
      }),
      self.dataModel.modalidade = ko.observable().extend({
        required: true
      }),
      self.dataModel.cidade = ko.observable().extend({
        required: true
      }),
      self.dataModel.estado = ko.observable().extend({
        required: true
      }),
      self.dataModel.email = ko.observable().extend({
        required: true,
        email: true,
        maxLenght: 60
      }),
      self.dataModel.telefone = ko.observable().extend({
        required: true
      }),
      self.dataModel.senha = ko.observable().extend({
        required: true
      }),
      self.dataModel.confirmarSenha = ko.observable().extend({
        required: true
      })
    ]);
  };

  self.saveEquipe = function() {
    self.errorMessageList = ko.observableArray([]);
    self.showErrors(false);
    if (!self.validation.isValid()) {
      self.errorMessageList.push('Campos destacados devem ser preenchidos.');
      utils.showErrorMessage(self.errorMessageList());
      self.showErrors(true);
    } else if (self.validateExistingData()) {
      self.dataModel.siglaEstado = self.dataModel.estado().sigla;
      self.dataModel.modalidade = self.dataModel.modalidade().nome;
      console.log(self.dataModel);
      crud.save('equipe', ko.toJSON(self.dataModel), function() {
        $.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: '/login',
          data: ko.toJSON(self.dataModel)
        }).done(function(value) {
          document.cookie = value;
          window.location = '/' + self.dataModel.pagina();
        });
      });
    }
  };

  self.validateExistingData = function() {
    self.errorMessageList = ko.observableArray([]);
    ko.utils.arrayFilter(self.equipeList(), function(item) {
      if (utils.compareTwoFieldsContent(item.nome, self.dataModel.nome())) {
        self.errorMessageList.push("- Nome já cadastrado.");
      }
      if (utils.compareTwoFieldsContent(item.pagina, self.dataModel.pagina())) {
        self.errorMessageList.push("- Página já cadastrado.");
      }
      if (utils.compareTwoFieldsContent(item.email, self.dataModel.email())) {
        self.errorMessageList.push("- Email já cadastrado.");
      }
      if (!utils.compareTwoFieldsContent(self.dataModel.senha(), self.dataModel.confirmarSenha())) {
        self.errorMessageList.push("- Senha e Confirmar Senha devem ser iguais.");
      }
    });
    if (self.errorMessageList().length > 0) {
      utils.showErrorMessage(self.errorMessageList());
      return false;
    }
    return true;
  };

  self.loadCidades = function() {
    if (self.dataModel.estado()) {
      self.cidadeList.removeAll();
      if (self.dataModel.estado().cidades) {
        ko.utils.arrayPushAll(self.cidadeList, self.dataModel.estado().cidades);
      }
    }
  };
  ko.utils.extend(self, new crud.ViewModel('equipe', self.dataModel));

};

ko.applyBindings(new ViewModel(), document.getElementById('fb-cadastreseutime-page'));
