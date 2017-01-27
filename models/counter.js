
var mongoose = require('lib/mongoose'),
    Schema = mongoose.Schema;

var counterSchema = new Schema({
  _id: {type: String, required: true},
  count: {
    type: Number,
    default: 10000
  }
});


var counter = mongoose.model('Counter', counterSchema);

counter.findOne({_id: "linkCount"}, function (err, counterObj) {
  if (err) return next(err);

  if (!counterObj) {
    var newCounter = new counter({_id: "linkCount"});

    newCounter.save(function(err) {
      if (err) return next(err);
    });
  }
});

exports.Counter = counter;
