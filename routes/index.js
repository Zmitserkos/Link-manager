
module.exports = function(app) {

  // redirect
  app.use(require('./redirect').use);

  // Home page
  app.get('/', require('./homepage').get);

  app.post('/register', require('./register').post);

  app.post('/login', require('./login').post);

  app.get('/logout', require('./logout').get);

  app.get('/user', require('./user').get);

  // Main page
  app.get('/main', require('./main').get);

  app.get('/link', require('./link').get);

  app.post('/link', require('./link').post); 

  //
  app.post('/newlink', require('./newlink').post);
}


/*
// model
var Link = require('models/link.js').Link;

app.get('/links', function (req, res, next) {


  if (req.query['tag']) {
    console.log("tag = "+req.query['tag']);
    console.log("tag2 = "+req.params.tag);

    Link.find({tags: req.query['tag']}, {shortUrl: 1}, function (err, links) {
      if (err) return next(err);
      res.json(links);
    });
  } else

  res.render('user-buttons', { pathMy : 'authorization/login.ejs' });
});

app.get('/popup', function (req, res, next) {
  // Pop up window
  switch (~~req.query['id']) {
    case 1:
      res.render('authorization/register', {});
      break;
    case 2:
      res.render('authorization/login', {});
      break;
    case 3:
      //res.render('user-buttons', { pathMy : 'authorization/login.ejs' });
      break;
  }
});
*/
