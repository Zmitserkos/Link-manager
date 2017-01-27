var crypto = require('crypto');
var async = require('async');

var mongoose = require('lib/mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
}, {
  safe: null
});

userSchema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

userSchema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
}

var user = mongoose.model('User', userSchema);

if (process.env.NODE_ENV === 'development') {
  user.on('index', function(err) {
    if (err) {
      console.log('User index error: ', err);
    } else {
      console.log('User indexing complete');
    }
  });
}

exports.User = user;
