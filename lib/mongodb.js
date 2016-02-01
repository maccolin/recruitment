/**
 * Created by rhett on 10/21/15.
 */
'use strict';
var mongoose = require('mongoose');

module.exports = {
  /**
   * Open a connection to the database
   * @param conf
   */
  config: function (conf) {
    mongoose.connect('mongodb://' + conf.host + '/' + conf.database);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Database Connection Error:'));
    db.once('open', function callback () {
      console.log('Connected to Database'); // eslint-disable-line no-console
    });
  }
};
