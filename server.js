var db = require('./js/db/database');
var express = require('express');
var bodyParser = require('body-parser');
var browserify = require('browserify-middleware');
var utils = require('./js/common/utils');

var renderPage = function(res, name, path, query, equipe) {
    res.render(path + '/pages/' + name + '.html', {
        name: name,
        path: path,
        query: query,
        equipe: JSON.stringify(equipe)
    });
};

var app = express();

app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());

app.use('/images', express.static(__dirname + '/images'));

app.use('/styles', express.static(__dirname + '/styles'));

app.use('/js', browserify(__dirname + '/js/entry-points'));

app.get('/', function (req, res) {
    res.redirect('/views/home');
});

app.get('/views/:name', function (req, res) {
    renderPage(res, req.params.name, 'site', req.query);
});

app.get('/:pagina', function(req,res) {
    db['Equipe'].Model.findOne({ pagina: req.params.pagina}, function (err, value){
        if (err) {
            res.status(404).send(err);
        } else {
            renderPage(res, 'equipe', 'site', req.query, value);
        }
    });
});

app.get('/:name/find', function (req, res) {
    var name = utils.capitalize(req.params.name);
    var query = req.query;

    var fields = query['fields'];
    delete query['fields'];

    db.findAll(db[name].Model, query, fields, function (err, values) {
        if (err) {
            res.status(404).send(err);
        } else {
            res.send(values);
        }
    });
});

app.post('/:name/save', function (req, res) {
    var name = utils.capitalize(req.params.name);
    db.saveOrUpdate(db[name].Model, req.body, function (err, value) {
        if (err) {
            res.status(404).send(err);
        } else {
            res.send(value);
        }
    });
});


app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'));    