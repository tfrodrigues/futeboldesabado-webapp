var ko = require('knockout');
var base = require('../../common/base');

ViewModel = function() {
  var self = this;
  var row;
  self.comentarioListHome = ko.observableArray([]);

  self.comentarioList = ko.observableArray([]);

  base.findAll('equipe', [], {
    comentarios: {
      $not: {
        $size: 0
      }
    }
  }, function(equipe) {
    var comentario = equipe.comentarios[equipe.comentarios.length - 1];
    comentario["nome"] = equipe.nome;
    comentario["pagina"] = equipe.pagina;
    self.comentarioList.push(comentario);
  });

  ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('fb-pesquisar-equipes-page'));
