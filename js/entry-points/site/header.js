var ko = require('knockout');
var base = require('../../common/base');
var cryptoJS = require('crypto-js');

ViewModel = function() {
  var self = this;
  self.dataModel = {};
  self.equipeList = ko.observableArray([]);

  self.alfabetoList = ko.observableArray(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);

  base.findAll('equipe', self.equipeList, {}, function() {});

  self.openEquipe = function(pagina) {
    window.location = '/' + pagina;
  };

  self.findEquipeByInitialLetter = function(letter, minIndex, maxIndex) {
    var count = 0;
    return ko.utils.arrayFilter(self.equipeList(), function(item) {
      var letterOK = ko.utils.stringStartsWith(item.nome.toUpperCase(), letter);
      if (letterOK) {
        count++;
      }
      return letterOK && (count >= minIndex && count <= maxIndex);
    });
  };

  ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('fb-header'));
