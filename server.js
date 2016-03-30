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
app.use(bodyParser.json({
  limit: '20mb'
}));
app.use(cookieParser());


app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);


var oneMonth = 2592000000;
app.use('/dist/img', express.static(__dirname + '/dist/img', {
  maxAge: oneMonth
}));
app.use('/dist/css', express.static(__dirname + '/dist/css', {
  maxAge: oneMonth
}));

app.use('/dist/js', browserify(__dirname + '/dist/js/entry-points', {
  cache: 'public, max-age=' + oneMonth
}));

app.get('/', function(req, res) {
  var logged = req.cookies.SESSION_ID != undefined;
  renderPage(res, 'home', 'site', undefined, logged);
});

app.get('/views/:name', function(req, res) {
  var logged = req.cookies.SESSION_ID != undefined;
  renderPage(res, req.params.name, 'site', req.query, logged);
});

function objToString(obj) {
  var str = '';
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str += p + '::' + obj[p] + '\n';
    }
  }
  return str;
}

app.post('/:pagina/uploadpicture/:name', function(req, res) {
  var image = req.body;
  image = objToString(image);
  var noHeader = image.substring(image.indexOf(',') + 1);
  var decoded = new Buffer(noHeader, 'base64');
  fs.writeFile('uploads/img/' + req.params.name + '/' +
    req.params.pagina + '.png', decoded,
    function(err) {
      if (err) {
        res.send("without header " + noHeader + "decoded " + decoded);
      }
      res.send('success');
    });
});


app.get('/:pagina', function(req, res) {
  db['Equipe'].Model.findOne({
    pagina: req.params.pagina
  }, function(err, value) {
    if (value) {
      var logged = false, loggedOnPage = false;
      var cookie = req.cookies.SESSION_ID;
      var SESSION_ID = cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA1(value.pagina + value.email + value.senha, "futebolDeSabadoSessionKey"));
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

app.get('/:name/find', function(req, res) {
  var name = utils.capitalize(req.params.name);
  var query = req.query;

  var fields = query['fields'];
  delete query['fields'];

  db.findAll(db[name].Model, query, fields, function(err, values) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(values);
    }
  });
});

app.post('/:name/save', function(req, res) {
  var name = utils.capitalize(req.params.name);
  if (name === 'Equipe' && !req.body._id) {
    req.body.senha =  getCryptPass(req.body.senha);
  }
  db.saveOrUpdate(db[name].Model, req.body, function(err, value) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(value);
    }
  });
});

function getCryptPass(senha) {
  var cryptPass = cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA1(senha, "futebolDeSabadoPassKey"));
  return cryptPass;
}

app.post('/login', function(req, res) {
  var cryptPass = getCryptPass(req.body.senha);
  var cryptSession = cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA1(req.body.pagina + req.body.email + cryptPass, "futebolDeSabadoSessionKey"));
  res.send("SESSION_ID=" + cryptSession + ";path=/");
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));
