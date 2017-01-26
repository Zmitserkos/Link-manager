var express = require('express');
var http = require('http');
var path = require('path');

var config = require('config');
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
//app.use(express.logger({immediate: true, format: 'default'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

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
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {

      res.send(err);
        /*res.render('error', {
            message: err.message,
            error: err
        });*/
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
