var mongoose = require('mongoose');
mongoose.connect('localhost:27017/futebolDeSabado');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', function () {
    console.log('Conexão realizada com sucesso');
});

exports.saveOrUpdate = function (model, data, callback) {
    if (data._id) {
        model.findByIdAndUpdate(data._id, data, callback);
    } else {
        new model(data).save(callback);
    }
};

exports.remove = function (model, id, callback) {
    model.findByIdAndRemove(id, callback);
};

exports.findAll = function (model, query, fields, callback) {
    model.find(query, fields).sort('order').lean().exec(callback);
};

exports.saveAll = function (values, callback) {
    values.forEach(function (value) {
        value.save(callback);
    });
};

exports.removeAll = function (model, callback) {
    model.remove(callback);
};

exports.Equipe = require('./equipe');
exports.Modalidade = require('./modalidade');
exports.Estado = require('./estado');
