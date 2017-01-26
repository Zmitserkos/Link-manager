
exports.get = function(req, res) {
  req.session.user = null;

  //res.render('guest-buttons');
  res.send({});
}
