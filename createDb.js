var mongoose = require('lib/mongoose');
mongoose.set('debug', true);

var async = require('async');
    //mongoose = require('models/user').mongoose;

async.series([
  open,
  dropDatabase,
  requireModels,
  createUsers,
  createCounter,
  //updateCounter,
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
  require('models/counter');

  async.each(Object.keys(mongoose.models), function (modelName, callback) {
    mongoose.models[modelName].ensureIndexes(callback);

  }, callback);
}

function createUsers(callback) {

  var users = [
    {username: "user01", password: "pass2014"},
    {username: "user02", password: "pass2015"},
    {username: "user04", password: "pass2016"}
  ];

  async.each(users, function (userData, callback) {
    var user = new mongoose.models.User(userData);

    user.save(callback);

  }, callback);
}

function createCounter(callback) {

  var counter = new mongoose.models.Counter({_id: "linkCount"});

  counter.save(callback);

  counter.find
}

function updateCounter(callback) {
  //{$inc: {count: 1}}
  mongoose.models.Counter.findByIdAndUpdate("linkCount", {count: 9999}, function(err, res) {
    if (err) return next(err);
    console.log("find mw: "+res._id+" "+res.count);

    callback(err, res);
  })
}

function createLinks(callback) {

  var links= [
    {/*shortUrl: "te.st/2aaa234",*/ url: "https: //jamtrackcentral.com/artists/alex-hutchings/",
     description: "Alex Hutchings", tags: ["jtc", "hutchings", "guitar", "fusion"], username: "user04", counter: 0},
    {/*shortUrl: "te.st/2bbb345",*/ url: "https: //jamtrackcentral.com/artists/guthrie-govan/",
     counter: 5, description: "", tags: ["licks", "govan", "guitar", "fusion"], username: "user02", counter: 0},
    {/*shortUrl: "te.st/233aaaa",*/ url: "https: //jamtrackcentral.com/artists/martin-miller/",
     counter: 4, description: "new year games", tags: ["guitar", "fusion"], username: "user01", counter: 0},
    {/*shortUrl: "te.st/2ggggaa",*/ url: "https: //jamtrackcentral.com/artists/marco-sfogli/",
     description: "", tags: ["jtc", "metal", "guitar"], username: "user01", counter: 0},
    {/*shortUrl: "te.st/27777aa",*/ url: "https: //docs.npmjs.com/files/package.json",
     description: "", tags: ["npm", "package"], username: "user01", counter: 0},
    {/*shortUrl: "te.st/23377bb",*/ url: "http: //www.w3schools.com/angular/angular_animations.asp",
     description: "", tags: ["angular", "animation"], username: "user02", counter: 0}
  ];

  async.each(links, function (linkData, callback) {
    var link = new mongoose.models.Link(linkData);

    link.save(callback);
  }, callback);
}
