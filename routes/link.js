
var Link = require('models/link').Link;
var User = require('models/user').User;

exports.get = function(req, res, next) {
  if (req.session.user) {
    User.findById(req.session.user, function (err, user) {
      if (err) next(err);

      Link.find({userId: req.session.user}).sort({shortUrlCode: -1 })
          .select({ _id: 1, shortUrlCode: 1, url: 1, description: 1, tags: 1, counter: 1})
          .exec(function (err, links) {
        res.send({user: {id: user._id, username: user.username},
                  linksList: links});
      });
    });
  }
}

exports.post = function(req, res, next) {
  var linkId = req.body.id;
  var description = req.body.description;
  var tags = req.body.tags;

  var objToUpdate = {};

  if (description) {
    objToUpdate.description = description;
  }

  if (tags) {
    objToUpdate.tags = tags;
  }

  Link.findByIdAndUpdate(linkId, objToUpdate, function(err, result) {
    if (err) return next(err);

    next(err, result);
  });
}
