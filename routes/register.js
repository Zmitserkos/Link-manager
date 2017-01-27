
var User = require('models/user').User;
var async = require('async');
var httpError = require('error').httpError;

exports.post = function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;

  if (req.session.user) return next(new httpError(403, "Forbidden for authorized user!"));

  async.waterfall([
    function(callback) {
      User.findOne({username: username}, callback);
    },
    function(user, callback) {
      if (user) return next(new httpError(200, "Username exists!")); // 403

      var user = new User({username: username, password: password});

      user.save(function (err) {
        if (err) return next(err);

        callback(null, user);
      });
    }
  ], function(err, user) {
    if (err) return next(err);

    req.session.user = user._id;
    req.session.queryText = null;
    req.session.queryType = null;

    res.send({});
  });
}
