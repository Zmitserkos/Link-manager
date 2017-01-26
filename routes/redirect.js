var Link = require('models/link').Link;

exports.use = function (req, res, next) {
  if (req.url[1]==="2") {

    var shortUrlCode = parseInt(req.url.substr(2), 36);

    Link.findOne({shortUrlCode: shortUrlCode}, function (err, link) {
      if (err) next(err);

      if (link) {
        return res.redirect(link.url);
      } else {
        next();
      }
    });

  } else {
    next();
  }
};
