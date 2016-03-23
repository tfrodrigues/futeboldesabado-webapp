var crud = require('../../common/crud');
var utils = require('../../common/utils');
var cropper = require('cropper');
var remodal = require('remodal');
var ko = require('knockout');
var base = require('../../common/base');

ViewModel = function() {
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
    crud.save('equipe', ko.toJSON(self.dataModel), function() {
      window.location.reload();
    });
  };

  self.showModalTeamPicture = function(image) {
    if (image) {
      var img = $('[data-js="cropper-image"] > img');
      img.attr('src', null);
      img.cropper('destroy');
      var reader = new FileReader();
      reader.onload = function(e) {
        img.attr('src', e.target.result);
        img.cropper({
          aspectRatio: 1 / 1,
          background: false,
          minCropBoxWidth: 150,
          minCropBoxHeight: 150,
        });
      }
      reader.readAsDataURL(image);
      $('[data-remodal-id=fb-upload-team-picture-modal]').remodal().open();
    }
  };

  self.showModalCoverPicture = function(image) {
    if (image) {
      var img = $('[data-js="cropper-image"] > img');
      img.attr('src', null);
      img.cropper('destroy');
      var reader = new FileReader();
      reader.onload = function(e) {
        img.attr('src', e.target.result);
        img.cropper({
          aspectRatio: 16 / 9,
          background: false,
          minCropBoxWidth: 485,
          minCropBoxHeight: 200,
        });
      }
      reader.readAsDataURL(image);
      $('[data-remodal-id=fb-upload-cover-picture-modal]').remodal().open();
    }
  };

  self.updateTeamPicture = function() {
    var imageCanvas = $('[data-js="cropper-image"] > img').cropper('getCroppedCanvas', {
      width: 170,
      height: 170
    });
    $('[data-js="team-picture"] > img').attr('src', imageCanvas.toDataURL('image/png'));
    crud.uploadPicture('logo', self.dataModel.pagina, imageCanvas, function() {
      $('[data-remodal-id=fb-upload-team-picture-modal]').remodal().close();
    });
  };

  self.updateCoverPicture = function() {
    var imageCanvas = $('[data-js="cropper-image"] > img').cropper('getCroppedCanvas', {
      width: 970,
      height: 400
    });
    $('[data-js="team-cover"]').css('background-image', 'url(' + imageCanvas.toDataURL('image/png') + ')');
    crud.uploadPicture('capa', self.dataModel.pagina, imageCanvas, function() {
      $('[data-remodal-id=fb-upload-cover-picture-modal]').remodal().close();
    });
  };

  self.enderecoCompletoCampo = function() {
    if (self.dataModel.enderecoCampo) {
      return self.dataModel.enderecoCampo + ', ' + self.dataModel.cidade + ' - ' + self.dataModel.siglaEstado;
    }
    return self.dataModel.cidade + ' - ' + self.dataModel.siglaEstado;
  }

  self.dataModel.comentarios.reverse();

  ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('fb-equipe-page'));
