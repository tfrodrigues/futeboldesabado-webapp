var mongoose = require('mongoose');

Estado = mongoose.model('Estado', mongoose.Schema({
    nome: String,
    sigla: String
}));


exports.Model = Estado;