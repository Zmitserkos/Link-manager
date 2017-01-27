
exports.get = function(req, res) {

  if (req.session.user) {
    res.render('main', {topButtons: 'user-buttons', modals: 'modals/user-modals'});
  } else {
    res.render('homepage', {topButtons: 'guest-buttons', modals: 'modals/guest-modals'});
  }
}
