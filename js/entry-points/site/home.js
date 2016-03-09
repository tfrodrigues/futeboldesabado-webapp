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
  }, function() {
    //self.ajustarComentarioList();
  });

  /*self.ajustarComentarioList = function() {
    console.log('length', self.comentarioList().length);
    for (var i = 0, j = self.comentarioList().length; i < j; i++) {
      if (i % 6 === 0) {
        if (row) {
          self.comentarioListHome.push(row);
        }
        row = [];
      }
      row.push(self.comentarioList()[i]);
    }
    if (row) {
      self.comentarioListHome.push(row);
    }
  };*/

  ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('fb-home-page'));
