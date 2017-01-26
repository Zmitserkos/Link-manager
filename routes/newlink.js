
var Link = require('models/link').Link;

function getShortLinkByCode(linkCode) {
  return linkCode.toString(36);
}

exports.post = function(req, res, next) {
  var url = req.body.url;

  // existence in database (if exists - return Link: linkId + shortUrl + description + tags + (clicks ???)) + newLink: false

  var link = new Link({url: url, username: "Zayats", counter: 0});

  link.save(function(err) {
    if (err) next(err);

    // res: Link (linkId + shortUrlCode)
    res.send({_id: link._id, shortUrlCode: link.shortUrlCode, counter: link.counter});
  });



}
