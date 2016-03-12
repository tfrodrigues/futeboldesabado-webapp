var accounting = require('accounting');
var dateFormat = require('dateformat');

accounting.settings = {
    number: {
        precision: 0,
        thousand: '.',
        decimal: ','
    }
};

exports.formatDate = function(date, format) {
    return dateFormat(date, format);
}

exports.capitalize = function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

exports.formatNumber = function (value, precision) {
    return accounting.formatNumber(value, precision);
};

exports.removeInvalidAttributes = function (data) {
    for (var fieldName in data) {
        if (!data[fieldName]) {
            delete data[fieldName];
        }
    }
};

exports.removeAccents = function (text) {
    var map = {
        'a': '[àáâãäå]',
        'ae': 'æ',
        'c': 'ç',
        'e': '[èéêë]',
        'i': '[ìíîï]',
        'n': 'ñ',
        'o': '[òóôõö]',
        'oe': 'œ',
        'u': '[ùúûűü]',
        'y': '[ýÿ]'
    };

    for (var character in map) {
        text = text.replace(new RegExp(map[character], 'g'), character);
        text = text.replace(new RegExp(map[character].toUpperCase(), 'g'), character.toUpperCase());
    }
    return text;
};

exports.urlKey = function (text) {
    return this.removeAccents(text).replace(/\s+/g, '-').toLowerCase();
};

exports.showErrorMessage = function (arrayMessage) {
    var errorMessage = '';
    for (var i=0; i<=arrayMessage.length - 1; i++) {
        errorMessage += arrayMessage[i] + "<br>";
    }
    $.notify({
	    icon: 'glyphicon glyphicon-warning-sign',
	    title: '<strong>Ocorreram erros:</strong><br/>',
	    message: errorMessage
    },{
      type: 'danger',
      z_index: 99999
    });
};

exports.compareTwoFieldsContent = function(field1, field2) {
  if (field1 && field1.toLowerCase() === field2.toLowerCase()) {
     return true;
  }
  return false;
};

exports.objToString = function(obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}
