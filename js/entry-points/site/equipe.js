var $ = require('jquery');
require('jquery.lazyload');
var ko = require('knockout');
var base = require('../../common/base');
var crud = require('../../common/crud');


ViewModel = function () {
    var self = this;

    $("img.lazy").lazyload({
        effect : "fadeIn"
    });
    
    self.dataModel = {};
    self.comentario = {};

    var equipe = JSON.parse($("#equipe").val());
    self.dataModel = equipe;

    self.publicar = function() {
        self.comentario.usuario = self.dataModel.email;
        self.comentario.data = new Date();
        self.dataModel.comentarios.push(self.comentario);
        crud.save('equipe', self.dataModel, function () {
            window.location.reload();
        });
    };

    self.dataModel.comentarios.reverse();

    ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('main'));