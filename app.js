var express = require('express');
var http = require('http');
var path = require('path');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'angular')));
app.use(app.router);

app.use(function (req, res, next) {
  console.log('URL: ' + req.url);

  /*if (req.url[1]=='2') {
    res.end('hello!');
  }*/
  res.send('<div>123!</div>');

  next();
})

app.get('/', routes.index);
app.get('/222', routes.index);
app.get('/users', users.list);

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
        res.render('error', {
            message: err.message,
            error: err
        });
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
