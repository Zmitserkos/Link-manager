
var mongoose = require('lib/mongoose');
mongoose.set('debug', true);

var User = require('models/user').User;
var Link = require('models/link').Link;

var users = [
  {username: "user01", password: "pass2016"},
  {username: "user02", password: "pass2017"}
];

var links= [
  {url: "http://mongoosejs.com/docs/api.html#schema-js",
   description: "Mongoose API documentation", tags: ["mongoose", "mongodb", "api"], username: "user01", counter: 0},
  {url: "https://github.com/visionmedia/supertest",
   counter: 5, description: "Supertest repository", tags: ["testing", "supertest", "javascript", "nodejs"], username: "user01", counter: 5},
  {url: "http://chaijs.com/api/assert/",
   counter: 4, description: "Chai API", tags: ["testing", "chai", "api"], username: "user01", counter: 100},
  {url: "http://expressjs.com/en/3x/api.html#response",
   description: "Express API", tags: ["express", "nodejs", "api", "javascript"], username: "user01", counter: 0},
  {url: "https://docs.npmjs.com/files/package.json",
   description: "Description of 'package.json '", tags: ["npm", "package", "nodejs"], username: "user02", counter: 0},
  {url: "http://www.w3schools.com/angular/angular_animations.asp",
   description: "", tags: ["angular", "animation", "javascript"], username: "user02", counter: 20}
];

var newLinkData;

var async = require('async');

async.series([
  open,
  dropDatabase,
  requireModels,
  createUsers,
  createLinks
], function (err, results) {
  console.log(arguments);
  mongoose.disconnect();
});

function open(callback) {
  mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
  var db = mongoose.connection.db;
  db.dropDatabase(callback);
}

function requireModels(callback) {
  require('models/user');
  require('models/link');
  // require('models/counter');

  async.each(Object.keys(mongoose.models), function (modelName, callback) {
    mongoose.models[modelName].ensureIndexes(callback);
  }, callback);
}

function createUsers(callback) {
  async.each(users, function (userData, callback) {
    var user = new User(userData);

    user.save(function (err, user) {
      if (err) return callback(err);

      for(var i = 0; i < links.length; i++) {
        if (links[i].username === user.username) {
          links[i].userId = user._id;
        }
      }

      callback();
    });

  }, callback);
}

function createLinks(callback) {
  async.each(links, function (linkData, callback) {

    var link = new Link(linkData);
    link.save(callback);
  }, callback);
}
