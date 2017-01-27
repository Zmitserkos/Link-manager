
var User = require('models/user').User;
var httpError = require('error').httpError;

exports.post = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if (req.session.user) return next(new httpError(403, "Forbidden for authorized user!"));

  User.findOne({username: username}, function(err, user) {
    if (err) return next(err);
    if (!user) return next(new httpError(200, "Username is not registered!")); // 401

    if (user.checkPassword(password)) {
      req.session.user = user._id;
      req.session.queryText = null;
      req.session.queryType = null;

      res.send({});
    } else {
      return next(new httpError(200, "Password incorrect!")); // 401
    }
  });
}
