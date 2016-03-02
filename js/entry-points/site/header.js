var ko = require('knockout');
var base = require('../../common/base');
var $ = require('jquery');

ViewModel = function () {
	var self = this;

  self.equipeList = ko.observableArray([]);

	self.alfabetoList = ko.observableArray(['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y', 'Z']);

	base.findAll('equipe', self.equipeList, {}, function () {
	});

  self.openEquipe = function (pagina) {
      window.location = '/' + pagina;
  };

  self.findEquipeByInitialLetter = function(letter) {
    return ko.utils.arrayFilter(self.equipeList(), function(item) {
      return ko.utils.stringStartsWith(item.nome.toUpperCase(), letter);
    });
  };

	ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('fb-header'));
