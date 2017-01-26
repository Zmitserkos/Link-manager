
var Link = require('models/link').Link;
var User = require('models/user').User;

function getShortLinkByCode(linkCode) {
  return linkCode.toString(36);
}

exports.post = function(req, res, next) {
  var url = req.body.url;

/*  if (!req.session.user) {
    error
  }*/

  Link.findOne({userId: req.session.user, url: url}, function (err, link) {
    if (err) next(err);

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

      send(objectToSend);
    } else {
      User.findById(req.session.user, function (err, user) {
        if (err) next(err);

        var newLink = new Link({
          url: url,
          userId: user._id,
          username: user.username,
          counter: 0
        });

        newLink.save(function(err) {
          if (err) next(err);

          res.send({id: newLink._id,
                    shortUrlCode: newLink.shortUrlCode,
                    counter: newLink.counter});

        });
      });
    }
  });

}
