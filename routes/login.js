
var User = require('models/user').User;

exports.post = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if (!req.session.user) {
    User.findOne({username: username}, function(err, user) {
      if (err) next(err);
if (!user) return next(401);

      if (user.checkPassword(password)) {
        req.session.user = user._id;
        req.session.queryText = null;
        req.session.queryType = null;

        res.send({});
      } else {
next(401);
      }
    });
  } else {
next(403); // need to log out
  }
}
