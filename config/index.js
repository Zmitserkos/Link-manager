var nconf = require('nconf');
var path = require('path');

var config = (process.env.NODE_ENV === 'test' ? 'config_test.json' : 'config.json');

nconf.argv()
     .env()
     .file({ file: path.join(__dirname, config) });

module.exports = nconf;
