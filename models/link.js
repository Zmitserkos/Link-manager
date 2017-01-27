
var mongoose = require('lib/mongoose'),
    Schema = mongoose.Schema;

var Counter = require('models/counter').Counter;

var linkSchema = new Schema({
  shortUrlCode: { // decimal number that will be converted to base-36 number
    type: Number,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  username: { // for several queries
    type: String,
    required: true
  },
  userId: { // for search by id
    type: Schema.Types.ObjectId,
    required: true
  },
  description: {
    type: String
  },
  tags: {
    type: [String]
  },
  counter: { // counter of clicks
    type: Number,
    default: 0,
    required: true
  }
}, {safe: null});


linkSchema.pre('save', function(next) {
  var currLink = this;

  Counter.findByIdAndUpdate("linkCount", {$inc: {count: 1}}, function(err, counter) {
    if (err) return next(err);

    currLink.shortUrlCode = counter.count;
    next(err, counter);
  });
});

var link = mongoose.model('Link', linkSchema);

if (process.env.NODE_ENV === 'development') {
  link.on('index', function(err) {
    if (err) {
      console.log('Link index error: ', err);
    } else {
      console.log('Link indexing complete');
    }
  });
}

exports.Link = link;
