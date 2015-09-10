var db = require('./js/db/database');
var express = require('express');
var bodyParser = require('body-parser');
var browserify = require('browserify-middleware');
var utils = require('./js/common/utils');
var cookieParser = require('cookie-parser');
var cryptoJS = require('crypto-js');
var compression = require('compression');
var cacheResponseDirective = require('express-cache-response-directive');
var fs = require('fs');

var renderPage = function(res, name, path, query, logged, loggedOnPage, equipe) {
 res.render(path + '/pages/' + name + '.html', {
    name: name,
    path: path,
    query: query,
    logged: logged,
    loggedOnPage: loggedOnPage,
    equipe: JSON.stringify(equipe)
});
};

var app = express();
app.use(compression());
app.use(cacheResponseDirective());
app.use(bodyParser.json({limit: '20mb'}));
app.use(cookieParser());


app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);


var oneMonth = 2592000000;
app.use('/dist/img', express.static(__dirname + '/dist/img', { maxAge: oneMonth }));
app.use('/dist/css', express.static(__dirname + '/dist/css', { maxAge: oneMonth }));

app.use('/dist/js', browserify(__dirname + '/dist/js/entry-points',  {cache: 'public, max-age=' + oneMonth}));

app.get('/', function (req, res) {
    renderPage(res, 'home', 'site');
});

app.get('/views/:name', function (req, res) {
    renderPage(res, req.params.name, 'site', req.query);
});

function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}

app.post('/:pagina/uploadavatartime', function(req, res) {
    var image = req.body;
    image = objToString(image);
    var noHeader = image.substring(image.indexOf(',') + 1);
    var decoded = new Buffer(noHeader, 'base64');
    fs.writeFile('uploads/img/logo/' + imgAvatar, decoded, function(err){
        res.send("without header " + noHeader + "decoded " + decoded);
    });
});

app.get('/:pagina', function(req,res) {
    db['Equipe'].Model.findOne({ pagina: req.params.pagina}, function (err, value){
        if (value) {
            var logged, loggedOnPage = false;
            var cookie = req.cookies.SESSION_ID;
            var crypt = value.pagina + value.email + value.senha;
            var SESSION_ID = cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA1(crypt, "futebolDeSabadoSessionKey"));
            if (cookie !== undefined) {
                logged = true;
                if (cookie === SESSION_ID) {
                    loggedOnPage = true;
                }
            }
            renderPage(res, 'equipe', 'site', req.query, logged, loggedOnPage, value);
        } else {
            //redirecionar para página não existente
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


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));    