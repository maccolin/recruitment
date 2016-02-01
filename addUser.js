/**
 * Created by rhett on 11/11/15.
 */
var mongodb = require('./lib/mongodb');
var Person  = require('./models/person');

mongodb.config({
  host    : 'localhost',
  database: 'rafta'
});


//var Rhett = new Person();
//Rhett.name.first = 'Rhett';
//Rhett.name.last = 'Lowe';
//Rhett.age = 27;
//Rhett.email = 'rng2ml@gmail.com';
//Rhett.password = 'merlin';
//Rhett.type = 'admin';

//Rhett.save(function(err, res){
//  if (err) {
//    console.error(err.stack);
//    throw err;
//  } else {
//    console.log(res);
//  }
//});

Person.login('rng2ml@gmail.com', 'merlin', function (err, res) {
  if (err) {
    console.error(err.stack);
    throw err;
  } else {
    console.log(res);
  }
});
