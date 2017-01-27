
var Link = require('models/link').Link;
var User = require('models/user').User;
var httpError = require('error').httpError;

exports.get = function(req, res, next) {

  var tag = req.query.tag;
  var shortUrlCode = req.query.shortUrlCode;
  var loadUser = req.query.loadUser;
  var loadProfile = req.query.loadProfile;
  var loadQuery = req.query.loadQuery;

  var queryObject, selectObject, objToSend;
  var sortObject = {shortUrlCode: -1};

  if (loadProfile) {
    if (!req.session.user) return next(new httpError(403, "Forbidden for unauthorized user!"));

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
      return next(new httpError(400, "Bad request!"));
    }

    selectObject = {_id: 1, shortUrlCode: 1, url: 1, description: 1, tags: 1, counter: 1, username: 1};
  } else {
    if (req.session.user) {
      queryObject = {userId: req.session.user};
      selectObject = {_id: 1, shortUrlCode: 1, url: 1, description: 1, tags: 1, counter: 1};
    } else {
      return res.send({});
    }
  }

  if (loadUser && req.session.user) {
    User.findById(req.session.user, function (err, user) {
      if (err) return next(err);
      if (!user) return next(new httpError(401, "User is not authorized!"));

      Link.find(queryObject).sort(sortObject).select(selectObject)
          .exec(function (err, links) {
        if (err) return next(err);

        objToSend = {
          user: {id: user._id, username: user.username}
        };

        if (links.length > 0) objToSend.linksList = links;
        if (links.length === 0 && req.session.queryText) objToSend.message = "No results found!";

        if (loadQuery) {
          objToSend.queryText = req.session.queryText;
          objToSend.queryType = req.session.queryType;
        }

        res.send(objToSend);
      });
    });
  } else {
    Link.find(queryObject).sort(sortObject).select(selectObject)
        .exec(function (err, links) {
      if (err) return next(err);

      if (links.length === 0 && req.session.queryText) { // next(new httpError(202, "No results found!!"));
        return res.send({
          message: "No results found!",
          queryText: req.session.queryText,
          queryType: req.session.queryType
        });
      }

      objToSend = {linksList: links};

      if (loadQuery) {
        objToSend.queryText = req.session.queryText;
        objToSend.queryType = req.session.queryType;
      }

      res.send(objToSend);
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
