var ko = require('knockout');
var base = require('../../common/base');

ViewModel = function() {
  var self = this;
  self.dataModel = {};

  self.cidadeList = ko.observableArray([]);
  self.modalidadeList = ko.observableArray([]);
  self.estadoList = ko.observableArray([]);
  self.equipeList = ko.observableArray([]);
  self.dataModel.estado = ko.observable();
  self.dataModel.modalidade = ko.observable();

  base.findAll('estado', self.estadoList, {}, function() {});

  base.findAll('equipe', self.equipeList, {}, function() {});

  base.findAll('modalidade', self.modalidadeList, {}, function() {});

  self.equipePesquisaList = ko.observableArray([]);

  self.pesquisarTimes = function() {
    self.equipePesquisaList.removeAll();
    ko.utils.arrayFilter(self.equipeList(), function(item) {
      var filtroNome = true, filtroCidade = true, filtroEstado = true, filtroModalidade = true;
      if (self.dataModel.nome) {
        filtroNome = ko.utils.stringStartsWith(item.nome.toUpperCase(), self.dataModel.nome.toUpperCase());
      }
      if (self.dataModel.cidade) {
        filtroCidade = ko.utils.stringStartsWith(item.cidade.toUpperCase(), self.dataModel.cidade.toUpperCase());
      }
      if (self.dataModel.estado()) {
        filtroEstado = ko.utils.stringStartsWith(item.siglaEstado.toUpperCase(), self.dataModel.estado().sigla.toUpperCase());
      }
      if (self.dataModel.modalidade()) {
        filtroModalidade = ko.utils.stringStartsWith(item.modalidade.toUpperCase(), self.dataModel.modalidade().nome.toUpperCase());
      }
      if (filtroNome && filtroCidade && filtroEstado && filtroModalidade) {
        self.equipePesquisaList.push(item);
      }
    });
  };

  self.loadCidades = function() {
    if (self.dataModel.estado()) {
      self.cidadeList.removeAll();
      if (self.dataModel.estado().cidades) {
        ko.utils.arrayPushAll(self.cidadeList, self.dataModel.estado().cidades);
      }
    }
  };

  ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('fb-pesquisar-equipes-page'));
