
var mongoose = require('lib/mongoose'),
    Schema = mongoose.Schema;

var counterSchema = new Schema({
  _id: {type: String, required: true},
  count: {
    type: Number,
    //required: true,
    default: 10000
  }
}/*, {safe: null}*/);


var counter = mongoose.model('Counter', counterSchema);

counter.on('index', function(err) {
    if (err) {
        console.log('User index error: %s', err);
    } else {
        console.log('User indexing complete ');
    }
});

exports.Counter = counter;
