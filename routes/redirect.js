var Link = require('models/link').Link;

exports.use = function (req, res, next) {
  if (req.url[1]==="2") { // let's make an agreement that all short links begins from "2" character

    var shortUrlCode = parseInt(req.url.substr(2), 36); // convert from a base-36 number string to the decimal number

    Link.findOne({shortUrlCode: shortUrlCode}, function (err, link) {
      if (err) next(err);

      if (link) {
        Link.findByIdAndUpdate(link._id, {counter: link.counter + 1}, function(err, result) {
          if (err) return next(err);

          return res.redirect(link.url);
        });
      } else {
next(); // 404
      }
    });

  } else {
    next();
  }
};
