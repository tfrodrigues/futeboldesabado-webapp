var mongoose = require('mongoose');

Modalidade = mongoose.model('Modalidade', mongoose.Schema({
    nome: String,
    sigla: String
}));


exports.Model = Modalidade;
