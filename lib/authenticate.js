/**
 * Created by rhett on 11/11/15.
 */
'use strict';

var Person = require('../models/person');

module.exports = function () {

  return function (req, res, next) {
    if (req.cookie && req.cookie.authToken) {
      Person.loginByToken(req.cookie.authToken, function (err, res) {
        if (err) {
          next(err);
        } else {
          req.loggedInUser = res;
          next();
        }
      });
    } else {
      next();
    }
  };

};
