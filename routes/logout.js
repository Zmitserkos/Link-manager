var httpError = require('error').httpError;

exports.post = function(req, res, next) {

  if (!req.session.user) return next(new httpError(403, "Forbidden for unauthorized user!"));

  req.session.user = null;
  req.session.queryText = null;
  req.session.queryType = null;

  res.send({});
}
