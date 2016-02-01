'use strict';

var bcrypt = require('bcrypt');
var q      = require('q');

var Password = function (rounds) {
  this.rounds = rounds || 10;
  this.salt   = q.nfcall(bcrypt.genSalt, this.rounds);
};

var proto     = {};
proto.hash    = function (password, callback) {
  return this.salt
    .then(function (salt) {
      return q.nfcall(bcrypt.hash, password, salt);
    })
    .nodeify(callback);
};
proto.compare = function (pass, hash, callback) {
  return q.nfcall(bcrypt.compare, pass, hash)
    .nodeify(callback);
};

proto.check = proto.compare;


Password.prototype             = proto;
Password.prototype.constructor = Password;


module.exports = Password;
