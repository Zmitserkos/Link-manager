var Link = require('models/link').Link;

exports.use = function (req, res, next) {
  if (req.url[1]==="2") {

    var shortUrlCode = parseInt(req.url.substr(2), 36);

    Link.findOne({shortUrlCode: shortUrlCode}, function (err, link) {
      if (err) next(err);

      if (link) {

        Link.findByIdAndUpdate(link._id, {counter: link.counter + 1}, function(err, result) {
          if (err) return next(err);

          return res.redirect(link.url);
          //next(err, result);
        });
      } else {
        next();
      }
    });

  } else {
    next();
  }
};
