'use strict'

/* eslint node/no-deprecated-api:0, brace-style:0 */
/* global Utilities */

var encode

// browser
if (typeof btoa !== 'undefined') {
  encode = function (value) { return btoa(value) }
}

// node
else if (typeof process !== 'undefined' && process.version) {
  let nodeVersion = Number(process.version.match(/^v(\d+\.\d+)/)[1])
  encode = nodeVersion < 4.5
    ? function (value) { return new Buffer(value).toString('base64') }
    : function (value) { return Buffer.from(value).toString('base64') }
}

// GAS
else if (typeof Utilities !== 'undefined' && Utilities.base64Encode) {
  encode = function (value) { return Utilities.base64Encode(value) }
}

// unknown context
else {
  throw new Error('base64encode: Can\'t determine environment')
}

module.exports = function base64encode (value) {
  return encode(String(value))
}
