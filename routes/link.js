
var Link = require('models/link').Link;
var User = require('models/user').User;

exports.get = function(req, res, next) {
  var tag = req.query.tag;
  var shortUrlCode = req.query.shortUrlCode;

  if (tag) {
    Link.find({tags: tag}).sort({shortUrlCode: -1 })
        .select({ _id: 1, shortUrlCode: 1, url: 1, description: 1, tags: 1, counter: 1, username: 1})
        .exec(function (err, linksList) {
      if (err) next(err);

      res.send(linksList);
    });
  } else if (shortUrlCode) {
    Link.find({shortUrlCode: shortUrlCode}).sort({shortUrlCode: -1 })
        .select({ _id: 1, shortUrlCode: 1, url: 1, description: 1, tags: 1, counter: 1, username: 1})
        .exec(function (err, linksList) {
      if (err) next(err);

      res.send(linksList);
    });
  } else {
    if (req.session.user) {
      User.findById(req.session.user, function (err, user) {
        if (err) next(err);

        Link.find({userId: req.session.user}).sort({shortUrlCode: -1 })
            .select({ _id: 1, shortUrlCode: 1, url: 1, description: 1, tags: 1, counter: 1})
            .exec(function (err, links) {
          if (err) next(err);

          res.send({user: {id: user._id, username: user.username},
                    linksList: links});
        });
      });
    }
  }
}

exports.post = function(req, res, next) {

// session

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
