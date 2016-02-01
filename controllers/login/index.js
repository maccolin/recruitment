'use strict';

module.exports = function (router) {

  router.get('/', function (req, res) {
    res.render('login', {});
  });

  router.post('/', function (req, res) {
    res.render('login', {});
  });

};
