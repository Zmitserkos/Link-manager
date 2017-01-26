
exports.get = function(req, res) {
  var buttonsPath = (req.session.user ? "user-buttons" : "guest-buttons");

  res.render('homepage', {topButtons: buttonsPath});
}
