
var mongoose = require('lib/mongoose'),
    Schema = mongoose.Schema;

var Counter = require('models/counter').Counter;

// _id, shortUrlCode, url, user, description, tags, counter

var linkSchema = new Schema({
  shortUrlCode: {
    type: Number,
    unique: true/*,
    required: true*/
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
    default: 0,
    required: true
  }
}, {safe: null});


linkSchema.pre('save', function(next) {
  var currLink = this;

  Counter.findByIdAndUpdate("linkCount", {$inc: {count: 1}}, function(err, counter)   {
    if (err) return next(err);

    currLink.shortUrlCode = counter.count;
    next(err, counter);
  });
});


var link = mongoose.model('Link', linkSchema);

link.on('index', function(err) {
    if (err) {
        console.log('User index error: %s', err);
    } else {
        console.log('User indexing complete ');
    }
});

exports.Link = link;
