
var Link = require('models/link').Link;
var User = require('models/user').User;

exports.get = function(req, res, next) {

  var tag = req.query.tag;
  var shortUrlCode = req.query.shortUrlCode;
  var loadUser = req.query.loadUser;
  var loadProfile = req.query.loadProfile;


  var queryObject, selectObject;
  var sortObject = {shortUrlCode: -1};

  if (loadProfile) {
    if (!req.session.user) return next(403);

    tag = null;
    shortUrlCode = null;
    req.session.queryText = null;
    req.session.queryType = null;
  }

  if (tag) {
    req.session.queryText = tag;
    req.session.queryType = 'tag';
  } else if (shortUrlCode) {
    req.session.queryText = shortUrlCode;
    req.session.queryType = 'url';
  }

  if (req.session.queryText) {
    if (req.session.queryType === 'tag') {
      queryObject = {tags: req.session.queryText};
    } else if (req.session.queryType === 'url') {
      queryObject = {shortUrlCode: req.session.queryText};
    } else {
      return next(500);
    }

    selectObject = {_id: 1, shortUrlCode: 1, url: 1, description: 1, tags: 1, counter: 1, username: 1};
  } else {
    if (!req.session.user) res.send({});
///return;
    queryObject = {userId: req.session.user};
    selectObject = {_id: 1, shortUrlCode: 1, url: 1, description: 1, tags: 1, counter: 1};
  }

  if (loadUser && req.session.user) {
    User.findById(req.session.user, function (err, user) {
      if (err) return next(err);
      if (!user) return next(401);

      Link.find(queryObject).sort(sortObject).select(selectObject)
          .exec(function (err, links) {
        if (err) return next(err);
//if (!links) return next(); no results found

        res.send({
          user: {id: user._id, username: user.username},
          linksList: links
        });
      });
    });
  } else {
    Link.find(queryObject).sort(sortObject).select(selectObject)
        .exec(function (err, links) {
      if (err) return next(err);
//if (!links) return next(); no results found

res.send({linksList: links});
    });
  }

} // get

exports.post = function(req, res, next) {
  if (req.body.searchByUrl) {
    if (req.body.shortUrlCode) {
      req.session.queryText = req.body.shortUrlCode;
      req.session.queryType = 'url';
    }
  }

  res.send({});
} // post
