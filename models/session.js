
var mongoose = require('lib/mongoose'),
    Schema = mongoose.Schema;

var sessionSchema = new Schema({
  _id: String,
  session: {
    user: Schema.Types.ObjectId,
    queryText: String,
    queryText: String
  }
}, {
  collection : 'sessions'
});


var session = mongoose.model('Session', sessionSchema, 'sessions');

exports.Session = session;
