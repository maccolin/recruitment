'use strict';
//var debug = require('debuglog')('kraken/middleware/500');

module.exports = function () {

  return function serverError (err, req, res, next) {
    //debug('Server Error:', err.stack);

    // Error Type
    var model;
    var template;

    //if (/invalid/i.test(err.message)) {
    //  model = {url: req.url, err: err, statusCode: 400};
    //  //template = 'errors/400';
    //}

    if (res.statusCode !== 200) {
      model    = {url: req.url, err: err, statusCode: res.statusCode};
      template = 'errors/general';
    }


    if (model && (req.xhr || !template)) {
      //consoel.log(model);
      res.status(model.statusCode).send(model);
    } else if (model && template) {
      res.status(model.statusCode);
      res.render(template, model);
    } else {
      next(err);
    }
  };

};
