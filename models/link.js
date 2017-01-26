
var mongoose = require('lib/mongoose'),
    Schema = mongoose.Schema;

//require('models/user');

var schema = new Schema({
  shortUrl: {
    type: String,
    unique: true,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  /*userId: {
    type: Object,
    required: true
  },*/
  description: {
    type: String
  },
  tags: {
    type: [String]
  },
  counter: {
    type: Number,
    default: 0
  }
}, {safe: null});

/*
schema.methods.getUserId = function(username) {
  mongoose.models.User.findOne({'username': username}, '_id', function (err, result) {
    if (err) console.log(err);
    return result._id;
  });
}

schema.virtual('username')
  .set(function(username) {
    console.log("ddddd"+this.getUserId(username));
    this.userId = this.getUserId(username);
  })
  .get(function () {
    return this.userId;
  });
*/

var link = mongoose.model('Link', schema);

link.on('index', function(err) {
    if (err) {
        console.log('User index error: %s', err);
    } else {
        console.log('User indexing complete ');
    }
});

exports.Link = link;
