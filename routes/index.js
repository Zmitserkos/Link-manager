
module.exports = function(app) {

  // Redirect for short links
  app.use(require('./redirect').use);

  // Home page
  app.get('/', require('./homepage').get);

  // Main page
  app.get('/main', require('./main').get);

  // Loading data (user, links, current query)
  app.get('/load', require('./load').get);

  // Save query
  app.post('/load', require('./load').post);

  // Register
  app.post('/register', require('./register').post);

  // Log in
  app.post('/login', require('./login').post);

  // Log out
  app.post('/logout', require('./logout').post);

  // Safe link attributes
  app.post('/link', require('./link').post);

  // Create new link
  app.post('/newlink', require('./newlink').post);
}
