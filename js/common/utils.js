var accounting = require('accounting');
accounting.settings = {
    number: {
        precision: 0,
        thousand: '.',
        decimal: ','
        
    }
};

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