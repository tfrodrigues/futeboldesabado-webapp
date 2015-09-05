var $ = require('jquery');
var ko = require('knockout');
var base = require('../../common/base');
var crud = require('../../common/crud');
var utils = require('../../common/utils');

ViewModel = function () {
    var self = this;

    self.dataModel = {};
    self.comentario = {};

    var equipe = JSON.parse($("#equipe").val());
    self.dataModel = equipe;

    self.publicar = function() {
        self.comentario.usuario = self.dataModel.email;
        self.comentario.data = new Date();
        self.comentario.dataFormatada = utils.formatDate(new Date(), "dd/mm/yyyy HH:MM");
        self.dataModel.comentarios.push(self.comentario);
        crud.save('equipe', self.dataModel, function () {
            window.location.reload();
        });
    };

    self.dataModel.comentarios.reverse();

    ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('main'));