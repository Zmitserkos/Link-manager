
var User = require('models/user').User;

var async = require('async');

exports.post = function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;

  if (!req.session.user) {
    async.waterfall([
      function(callback) {
        User.findOne({username: username}, callback);
      },
      function(user, callback) {
        if (user) return next(404);

        var user = new User({username: username, password: password});

        user.save(function (err) {
          if (err) return next(err);
          //200 OK
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
  } else {
    // error 403
  }
}
