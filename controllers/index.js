'use strict';

var Password = require('../lib/password');

module.exports = function (router) {


  router.get('/', function (req, res) {

    var pass = 'Rhett';
    (new Password(10)).hash(pass, function (err, hash) {
      res.send(pass + ': ' + hash);
    });

  });

  router.get(/\/(\w+)\/(.*)/i, function(req, res){
    (new Password(10)).compare(req.params[0], req.params[1], function(err, check){
      res.send(req.params[0] + ': ' + req.params[1] + ' => ' + (check ? 'pass' : 'fail'))
    })
  });

};
