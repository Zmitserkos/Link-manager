
exports.post = function(req, res, next) {

  if (req.session.user) {
    req.session.user = null;
    req.session.queryText = null;
    req.session.queryType = null;

    res.send({});
  } else {
    //error 403
  }
}
