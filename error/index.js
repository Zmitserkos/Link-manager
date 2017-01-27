var path = require('path');
var util = require('util');
var http = require('http');

function httpError(status, message, sendHtml) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, httpError);

  this.status = status;
  this.message = message || http.STATUS_CODES[status] || "Error";
  this.sendHtml = sendHtml;
}

util.inherits(httpError, Error);
httpError.prototype.name = 'httpError';

exports.httpError = httpError;
