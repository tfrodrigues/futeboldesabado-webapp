var $ = require('jquery');
var ko = require('knockout');
var crud = require('../../common/crud');

ViewModel = function () {
    var self = this;

    self.dataModel = {
        detailHtml: {
            label: 'Descrição',
            type: 'text-area'
        },
        imageUrl: {
            label: 'URL da imagem',
            type: 'text'
        },
        url: {
            label: 'URL',
            type: 'text'
        },
        order: {
            label: 'Ordem',
            type: 'number'
        }
    };

    ko.utils.extend(self, new crud.ViewModel('banner', self.dataModel));
};

ko.applyBindings(new ViewModel());