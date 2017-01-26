var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.get('mongoose').uri, config.get('mongoose').options, function (err) {

  var admin = new mongoose.mongo.Admin(mongoose.connection.db);

  admin.buildInfo(function (err, info) {
     console.log(info.version);
  });

});

module.exports = mongoose;
