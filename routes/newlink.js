
var Link = require('models/link').Link;
var User = require('models/user').User;
var httpError = require('error').httpError;

exports.post = function(req, res, next) {

  if (!req.session.user) return next(new httpError(403, "Forbidden for unauthorized user!"));

  var url = req.body.url;
  //if (!url) error
  //check url 400.. or 404

  Link.findOne({userId: req.session.user, url: url}, function (err, link) {
    if (err) return next(err);

    if (link) {
      var objectToSend = {
        id: link._id,
        shortUrlCode: link.shortUrlCode,
        counter: link.counter
      };

      if (link.description) {
        objectToSend.description = link.description;
      }

      if (link.tags) {
        objectToSend.tags = link.tags;
      }

      res.send(objectToSend);

      req.session.queryText = null;
      req.session.queryType = null;
    } else {
      User.findById(req.session.user, function (err, user) {
        if (err) return next(err);
        if (!user) return next(new httpError(401, "User is not authorized!"));

        var newLink = new Link({
          url: url,
          userId: user._id,
          username: user.username,
          counter: 0
        });

        newLink.save(function(err) {
          if (err) return next(err);

          res.send({id: newLink._id,
            shortUrlCode: newLink.shortUrlCode,
            counter: newLink.counter
          });

          req.session.queryText = null;
          req.session.queryType = null;
        });
      });
    }
  });
}
