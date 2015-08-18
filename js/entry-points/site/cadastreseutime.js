var ko = require('knockout');
var base = require('../../common/base');
var crud = require('../../common/crud');
var utils = require('../../common/utils');

ViewModel = function () {
	var self = this;
	self.dataModel = {};

	self.cidadeList = ko.observableArray([]);
	self.estadoList = ko.observableArray([]);
	self.equipeList = ko.observableArray([]);

	base.findAll('estado', self.estadoList, {}, function () {
	});

	base.findAll('equipe', self.equipeList, {}, function () {
	});

	self.saveEquipe = function () {
		self.errorMessageList = ko.observableArray([]);
		self.errorFieldList = ko.observableArray([]);
		self.comentarioList = ko.observableArray([
    		{titulo: "Procurando jogo", usuario: "admin", data: new Date(), conteudo: "Lorem ipsum dolor sit amet, pro malorum persius no, prima mediocrem ex mel. Eu mea unum omnis latine. Ad mea labore appetere, vocibus scaevola probatus ne eum. Pri cu vidit posse erant, at vix enim consequuntur. Ne consulatu dissentiet vim, his iriure mediocrem in. Percipitur instructior duo at. Esse assueverit mediocritatem id nam, ius cu adhuc gubergren concludaturque, ne eum quas quodsi cotidieque. Vix at tritani facilisis omittantur. Porro constituam no vix, sea homero percipit in. 						Adversarium contentiones at sea, falli paulo consequat nam in. Eum ut aeque ludus dissentiunt, choro ponderum adipisci mel ea. Quem pertinax his ex. Usu et enim tempor putant, id diam alienum est, qui ea detraxit posidonium appellantur. Ea usu diceret periculis."},
    		{titulo: "Procurando jogo", usuario: "matheus", data: new Date(), conteudo: "Lorem ipsum dolor sit amet, pro malorum persius no, prima mediocrem ex mel. Eu mea unum omnis latine. Ad mea labore appetere, vocibus scaevola probatus ne eum. Pri cu vidit posse erant, at vix enim consequuntur. Ne consulatu dissentiet vim, his iriure mediocrem in. Percipitur instructior duo at. Esse assueverit mediocritatem id nam, ius cu adhuc gubergren concludaturque, ne eum quas quodsi cotidieque. Vix at tritani facilisis omittantur. Porro constituam no vix, sea homero percipit in. 						Adversarium contentiones at sea, falli paulo consequat nam in. Eum ut aeque ludus dissentiunt, choro ponderum adipisci mel ea. Quem pertinax his ex. Usu et enim tempor putant, id diam alienum est, qui ea detraxit posidonium appellantur. Ea usu diceret periculis."},
    		{titulo: "Procurando jogo", usuario: "thomas", data: new Date(), conteudo: "Lorem ipsum dolor sit amet, pro malorum persius no, prima mediocrem ex mel. Eu mea unum omnis latine. Ad mea labore appetere, vocibus scaevola probatus ne eum. Pri cu vidit posse erant, at vix enim consequuntur. Ne consulatu dissentiet vim, his iriure mediocrem in. Percipitur instructior duo at. Esse assueverit mediocritatem id nam, ius cu adhuc gubergren concludaturque, ne eum quas quodsi cotidieque. Vix at tritani facilisis omittantur. Porro constituam no vix, sea homero percipit in. 						Adversarium contentiones at sea, falli paulo consequat nam in. Eum ut aeque ludus dissentiunt, choro ponderum adipisci mel ea. Quem pertinax his ex. Usu et enim tempor putant, id diam alienum est, qui ea detraxit posidonium appellantur. Ea usu diceret periculis."},
		]);
		self.dataModel.comentarios = self.comentarioList();
		self.dataModel.siglaEstado = self.dataModel.estado.sigla;
		if (self.validateExistingData()) {
			crud.save('equipe', self.dataModel, function () {
				window.location = '/' + self.dataModel.pagina;
			});	
		}	
	};

	self.validateExistingData = function () {
		var nome, pagina, email;
		if (self.equipeList()) {
			for (var i=0; i<=self.equipeList().length - 1; i++) {
				nome = self.equipeList()[i].nome; 
				pagina = self.equipeList()[i].pagina; 
				email = self.equipeList()[i].email; 
				if (nome && nome.toLowerCase() === self.dataModel.nome.toLowerCase()) {
					self.errorMessageList.push("- Nome já cadastrado.");
					self.errorFieldList.push("nome");
				}
				if (pagina && pagina.toLowerCase() === self.dataModel.pagina.toLowerCase()) {
					self.errorMessageList.push("- Página já cadastrada.");
					self.errorFieldList.push("pagina");
				}
				if (email && email.toLowerCase() === self.dataModel.email.toLowerCase()) {
					self.errorMessageList.push("- Email já cadastrado.");
					self.errorFieldList.push("email");
				}
				if (email && email.toLowerCase() === self.dataModel.email.toLowerCase()) {
					self.errorMessageList.push("- Email já cadastrado.");
					self.errorFieldList.push("email");
				}
			}
		}
		if (self.dataModel.senha != self.dataModel.confirmarSenha) {
			self.errorMessageList.push("- Senha e Confirmar Senha devem ser iguais.");
			self.errorFieldList.push("senha");
			self.errorFieldList.push("confirmarSenha")
		}
		if (self.errorMessageList().length > 0) {
			utils.showErrorMessage(self.errorMessageList(), self.errorFieldList());
			return false;
		}
		return true;
	};

	self.loadCidades = function () {
		if (self.dataModel.estado) {
			self.cidadeList.removeAll();
			ko.utils.arrayPushAll(self.cidadeList, self.dataModel.estado.cidades);
		}
	};

	ko.utils.extend(self, new crud.ViewModel('equipe', self.dataModel));

};

ko.applyBindings(new ViewModel(), document.getElementById('main'));