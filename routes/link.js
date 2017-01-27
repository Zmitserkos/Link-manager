
var Link = require('models/link').Link;
var httpError = require('error').httpError;

exports.post = function(req, res, next) {
  if (!req.session.user) return next(new httpError(403, "Forbidden for unauthorized user!"));

  var linkId = req.body.id;
  var description = req.body.description;
  var tags = req.body.tags;

  var objToUpdate = {};

  if (description) {objToUpdate.description = description;}
  if (tags) {objToUpdate.tags = tags;}

  Link.findByIdAndUpdate(linkId, objToUpdate, function(err, link) {
    if (err) return next(err);
    if (!link) return next(new httpError(404, "Link does not exist!"));

    res.send({});
  });
} // post
