var crypto = require('crypto');
var async = require('async');

var mongoose = require('lib/mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    //index: {unique: true, name: 'kolbas'},
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

/*schema.statics.register = function(username, password, callback) {
  var User = this;

  async.waterfall([
    function(callback) {
      User.findOne({username: username}, callback);
    },
    function(user, callback) {
      if (user) {

      } else
      {

      }
    }
  ], function(err, user) {
    if (err) return next(err);
    req.session.user = user._id;
    res.send({});
  });
}

schema.statics.login = function(username, password, callback) {

}*/

//schema.index({username: 1}, {unique: true});

var user = mongoose.model('User', userSchema);

user.on('index', function(err) {
    if (err) {
        console.log('User index error: %s', err);
    } else {
        console.log('User indexing complete ');
    }
});

exports.User = user;
