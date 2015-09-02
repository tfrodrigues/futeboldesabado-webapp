var $ = require('jquery');
require('jquery-lazyload');
var ko = require('knockout');
var base = require('../../common/base');

ViewModel = function () {
    var self = this;
    var row;
    self.comentarioListHome = ko.observableArray([]);

    $("img.lazy").lazyload({
        effect : "fadeIn"
    });

    self.comentarioList = ko.observableArray([]);

    base.findAll('equipe', [], {comentarios: {$not: {$size: 0}}}, function (equipe) {
        var comentario = equipe.comentarios[equipe.comentarios.length - 1];
        comentario["imgAvatar"] = equipe.imgAvatar;
        comentario["nome"] = equipe.nome;
        comentario["pagina"] = equipe.pagina;
        self.comentarioList.push(comentario);
    }, function() {
        self.ajustarComentarioList();
    });

    self.ajustarComentarioList = function() {
        for (var i = 0, j = self.comentarioList().length; i < j; i++) {
            if (i % 4 === 0) {
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
        console.log(self.comentarioListHome)
    };

    ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('main'));