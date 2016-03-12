var mongoose = require('mongoose');

Comentario = mongoose.Schema({
    titulo: String,
    conteudo: String,
    usuario: String,
    data: Date,
    dataFormatada: String
});

Equipe = mongoose.model('Equipe', mongoose.Schema({
    nome: String,
    pagina: String,
    campo: String,
    historia: String,
    cores: String,
    enderecoCampo: String,
    modalidade: String,
    cidade: String,
    siglaEstado: String,
    telefone: String,
    representante: String,
    email: String,
    senha: String,
    comentarios: [Comentario]
}));


exports.Model = Equipe;
