var ko = require('knockout');
var base = require('../../common/base');
var cryptoJS = require('crypto-js');

ViewModel = function() {
  var self = this;
  self.dataModel = {};
  self.equipeList = ko.observableArray([]);

  self.login = function(req, res) {
    var cryptPass = cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA1(self.dataModel.senha, "futebolDeSabadoPassKey"));
    var query = {};
    query['email'] = self.dataModel.email;
    query['senha'] = cryptPass;
    base.findAll('equipe', self.equipeList, query, function(equipe) {
      if (equipe) {
        self.dataModel.pagina = equipe.pagina;
        $.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: '/login',
          data: ko.toJSON(self.dataModel)
        }).done(function(value) {
          document.cookie = value;
          window.location = '/' + equipe.pagina;
        });
      }
    });
  }

  ko.utils.extend(self, new base.ViewModel());
};

ko.applyBindings(new ViewModel(), document.getElementById('fb-login-page'));
