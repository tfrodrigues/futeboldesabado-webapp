var mongoose = require('mongoose');

Comentario = mongoose.Schema({
    titulo: String,
    conteudo: String,
    usuario: String,
    data: Date 
});

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
    senha: String,
    comentarios: [Comentario]
}));


exports.Model = Equipe;