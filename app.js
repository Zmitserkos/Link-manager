var express = require('express');
var http = require('http');
var path = require('path');
var httpError = require('error').httpError;

var config = require('config');
var log = require('lib/log')(module);
var mongoose = require('lib/mongoose');
mongoose.set('debug', true);

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());

if (app.get('env') === 'development') {
  app.use(express.logger({immediate: true, format: 'default'}));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(require('middleware/sendHttpError'));

var MongoStore = require('connect-mongo')(express);

app.use(express.session({
  secret: config.get('session').secret,
  key: config.get('session').key,
  cookie: config.get('session').cookie,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'angular')));

app.use(app.router);

require('routes')(app);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  if (typeof err == "number") {
    err = new httpError(err);
  }
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  if (err instanceof httpError) {
    res.sendHttpError(err);
  } else
  if (app.get('env') === 'development') { // development error handler (will print stacktrace)
    var errorHandler = express.errorHandler();
    errorHandler(err, req, res, next);
  } else { // production error handler (no stacktraces leaked to user)
    log.error(err);
    err = new httpError(500);
    res.sendHttpError(err);
  }

});


module.exports = app;
