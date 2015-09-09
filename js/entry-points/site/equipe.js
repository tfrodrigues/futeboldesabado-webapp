var $ = require('jquery');
var ko = require('knockout');
var base = require('../../common/base');
var crud = require('../../common/crud');
var utils = require('../../common/utils');
require('jquery-modal');

ViewModel = function () {
    var self = this;

    self.dataModel = {};
    self.comentario = {};

    var equipe = JSON.parse($("#equipe").val());
    self.dataModel = equipe


    self.publicar = function() {
        self.comentario.usuario = self.dataModel.email;
        self.comentario.data = new Date();
        self.comentario.dataFormatada = utils.formatDate(new Date(), "dd/mm/yyyy HH:MM");
        self.dataModel.comentarios.push(self.comentario);
        crud.save('equipe', self.dataModel, function () {
            window.location.reload();
        });
    };

    self.escolherAvatarTime = function(image) {
        if (image) {
            var img = $('.fsa-avatar-time-upload');
            img.attr('src', null);
            img.cropper('destroy');
            var reader = new FileReader();
            reader.onload = function (e) {
                img.attr('src', e.target.result);
                img.cropper({
                  aspectRatio: 1 / 1,
                  background: false,
                  minCropBoxWidth: 200,
                  minCropBoxHeight: 200
              });
            }
            reader.readAsDataURL(image);
            $('.upload-avatar-time-modal').modal();
        }
    },

    self.alterarAvatarTime = function() {
        var imageCanvas = $('.fsa-avatar-time-upload').cropper('getCroppedCanvas');
        $('.fsa-avatar-time > img').attr('src',imageCanvas.toDataURL('image/png'));
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            url: '/' + self.dataModel.pagina + '/uploadavatartime',
            data: JSON.stringify({image: imageCanvas.toDataURL('image/png')})
        });
        $('.jquery-modal').css('display', 'none');
        $('.upload-avatar-time-modal').css('display', 'none');
    }

    self.dataModel.comentarios.reverse();

    ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('main'));