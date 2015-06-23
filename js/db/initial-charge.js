var db = require('./database');

var charge = function(entity) {
    db.removeAll(entity.Model, function() {
        db.saveAll(entity.defaultValues);
    });
};

exports.start = function () {
};