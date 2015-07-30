var db = require('./js/db/database');
var express = require('express');
var bodyParser = require('body-parser');
var browserify = require('browserify-middleware');
var utils = require('./js/common/utils');

var isDevelopment = process.env.NODE_ENV == 'development';

var renderPage = function(res, name, path, query) {
    res.render(path + '/pages/' + name + '.html', {
        name: name,
        path: path,
        query: query
    });
};

var app = express();

var fs = require('fs'); 
/*app.engine('html', function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) {
        return callback(new Error(err));
    }
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
    .replace('#message#', '<h1>'+ options.message +'</h1>');
    return callback(null, rendered);
  })
});*/

app.set('view engine', 'html'); // register the template engine*/


app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());

app.use('/images', express.static(__dirname + '/images'));

app.use('/styles/css/bootstrap', express.static(__dirname + '/libs/bootstrap/dist/css'));

app.use('/styles', express.static(__dirname + '/styles'));

app.use('/js', browserify(__dirname + '/js/entry-points'));

app.get('/', function (req, res) {
    res.redirect('/views/home');
});

app.get('/views/product/:className?/:productName?', function (req, res) {
    var className = req.params.className;
    var productName = req.params.productName;
    var name = (className && productName) ? 'product' : 'product-list';

    var query = {};
    if (className) {
        query['key'] = className;
    }
    if (productName) {
        query['items.key'] = productName;
    }

    renderPage(res, name, 'site', query);
});

app.get('/views/:name', function (req, res) {
    renderPage(res, req.params.name, 'site', req.query);
});

app.get('/:pagina', function(req,res) {
    db['Equipe'].Model.findOne({ pagina: req.params.pagina}, function (err, value){
    if (err) {
        res.status(404).send(err);
    } else {
        res.render('site/pages/equipe.html', {
        path: 'site',
        name: 'equipe',
        query: req.query,
        equipe: value
    });
      /*  res.render('site/pages/equipe', { title: value['nome'], message: value['pagina']});*/
    }
    });
});

app.get('/cms/views/:name', function (req, res) {
    renderPage(res, req.params.name, 'admin', req.query);
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

app.delete('/:name/remove/:id', function (req, res) {
    var name = utils.capitalize(req.params.name);
    var id = req.params.id;

    db.remove(db[name].Model, id, function (err, value) {
        if (err) {
            res.status(404).send(err);
        } else {
            res.send(value);
        }
    });
});

app.listen(4000);