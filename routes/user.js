
var User = require('models/user').User;

exports.get = function(req, res) {

  User.findOne({_id: req.session.user}, function(err, user) {
    if (err) return next(err);

    if (user) {
      res.send({id: user._id, username: user.username});
    }
  });
}
