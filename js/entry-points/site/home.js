var ko = require('knockout');
var base = require('../../common/base');

ViewModel = function() {
  var self = this;
  self.comentarioListHome = ko.observableArray([]);

  self.allComentarioList = ko.observableArray([]);

  self.modalidadeList = ko.observableArray([]);

  self.comentarioList = ko.observableArray([]);

  self.atualizaModalidade = function(sigla, nome) {
    self.comentarioList.removeAll();
    $("[data-js*='menu-modalidade-']").removeClass('is-active');
    $("[data-js='menu-modalidade-" + sigla + "']").addClass('is-active');
    if (sigla == 'TO') {
      ko.utils.arrayPushAll(self.comentarioList, self.allComentarioList());
    } else {
      ko.utils.arrayFilter(self.allComentarioList(), function(item) {
        if (item.modalidade.toUpperCase() === nome.toUpperCase()) {
          self.comentarioList.push(item);
        }
      });
    }
  };

  base.findAll('modalidade', self.modalidadeList, {}, function() {});

  base.findAll('equipe', [], {
    comentarios: {
      $not: {
        $size: 2
      }
    }
  }, function(equipe) {
    var comentario = equipe.comentarios[equipe.comentarios.length - 1];
    comentario["nome"] = equipe.nome;
    comentario["pagina"] = equipe.pagina;
    comentario["modalidade"] = equipe.modalidade;
    self.allComentarioList.push(comentario);
  });
  ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('fb-home-page'));
