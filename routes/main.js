
exports.get = function(req, res) {
  var buttonsPath = (req.session.user ? "user-buttons" : "guest-buttons");
  var modalsPath = (req.session.user ? "modals/user-modals" : "modals/guest-modals")

  res.render('main', {topButtons: buttonsPath, modals: modalsPath});
}
