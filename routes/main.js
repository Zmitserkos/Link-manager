
exports.get = function(req, res) {
  var tag = req.body.tag;
  var buttonsPath = (req.session.user ? "user-buttons" : "guest-buttons");

  res.render('main', {topButtons: buttonsPath}); // links
}
