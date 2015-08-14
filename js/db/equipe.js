var mongoose = require('mongoose');

Equipe = mongoose.model('Equipe', mongoose.Schema({
    nome: String,
    pagina: String,
    campo: String,
    modalidade: String,
    cidade: String,
    siglaEstado: String,
    telefone: String,
    representante: String,
    email: String,
    senha: String
}));


exports.Model = Equipe;