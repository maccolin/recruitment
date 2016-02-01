/**
 * Created by rhett on 1/31/16.
 */
'use strict';

var Person = require('../models/person');


module.exports = function (router) {

  router.get('/', function (req, res, next) {
    Person.find({}, function (err, data) {
      if (err) {
        return next(err);
      }
      return res.json(data);
    });
  });
  router.get('/:id', function (req, res, next) {
    var id = req.params.id.trim() || req.params.id;
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      res.status(400);
      return next(new Error('"' + id + '" not valid id format.'));
    }

    Person.findById(id, function (err, data) {
      if (err) {
        return next(err);
      } else if (data && data._id) {
        return res.json(data);
      } else {
        return next(new Error('Person ID ' + id + ' not found.'));
      }
    });
  });

};
