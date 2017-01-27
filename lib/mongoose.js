var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.get('mongoose').uri, config.get('mongoose').options, function (err) {
  if (err) return next(err);

  var admin = new mongoose.mongo.Admin(mongoose.connection.db);
});

module.exports = mongoose;
