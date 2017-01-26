
var User = require('models/user').User;

exports.get = function(req, res) {
  res.render('authorization/login');
}

exports.post = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}, function(err, user) {
    if (!user) return next(404);

    if (user.checkPassword(password)) {
      req.session.user = user._id;
      res.send({});
    } else {
      return next(404);
    }
  });
}
