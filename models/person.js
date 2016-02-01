'use strict';

var mongoose = require('mongoose');
var Mixed    = mongoose.Schema.Types.Mixed;
var ObjectId = mongoose.Schema.Types.ObjectId;

var password = new (require('../lib/password'))(10);

var persona = {
  name     : {
    first : String,
    family: String
  },
  household: String,
  notes    : [String],
  other    : Mixed
};

var Person = mongoose.Schema({
  type       : {
    type     : String,
    lowercase: true,
    trim     : true,
    default  : 'contact',
    required : true,
    validate : {
      validator: function (v) {
        return /admin|user|veteran|freshman|contact/i.test(v);
      },
      message  : '{VALUE} is not a valid user type.'
    }
  },
  name       : {
    first : String,
    middle: String,
    last  : String
  },
  email      : {
    type    : String,
    validate: {
      validator: function (v) {
        return /^[\w\d\-\.]+@[\w\d\-\.]+\.[\w]{2,5}$/.test(v);
      },
      message  : '{VALUE} is not a valid email address.'
    }
  },
  password   : String,
  phone      : {
    type    : String,
    validate: {
      validator: function (v) {
        return /^\+?1?[\s\-.]?\(?\d{3}\)?[\s.\-]?\d{3}[\-.\s]?\d{4}$/.test(v);
      },
      message  : '{VALUE} is not in a valid phone number format.'
    }
  },
  dob        : Date,
  /* ^^^ consider changing to approxYearOfBirth. example, I say I am 27, it estimates I was born
   * 1988, I was born in 1987, dec, but not too far off
   */
  facebook   : String,
  locale     : String,
  interests  : [String],
  persona    : persona,
  undesirable: {type: Boolean, default: false},
  notes      : [String],
  other      : Mixed,
  recruiter  : {type: ObjectId, ref: 'Person'},
  counselor  : {type: ObjectId, ref: 'Person'},
  createdOn  : {type: Date, default: Date.now},
  updatedOn  : {type: Date, default: Date.now}
});

/*
 * Both Person.other and Person.persona.other are catchalls.
 * Just for info that doesn't fit in other places and isn't a note
 *
 */

Person.pre('save', function (next) {
  if (this.password) {
    var self = this;
    password.hash(this.password)
      .then(function (hash) {
        self.password = hash;
      })
      .nodeify(next)
    ;
  }
});

var newToken                = function (user) { // eslint-disable-line no-unused-vars

};
Person.statics.loginByToken = function (token, callback) { // eslint-disable-line no-unused-vars
  // do something -- not yet implemented
};
Person.statics.login        = function (email, pass, callback) {
  if (!pass || (typeof pass === 'function' && !callback)) {
    return this.loginByToken(email, pass); // not yet implemented
  }

  var self = this;
  self.findOne({email: email, type: {$in: ['user', 'admin']}}, function (err, p) {
    if (err) {
      callback(err);
    } else {
      password.compare(pass, p.password, function (err, res) {
        if (err) {
          callback(err);
        } else if (res) {
          callback(null, p);
        } else {
          res = newToken(res);
          callback(null, res);
        }
      });
    }
  });
};


Person.methods.setPassword = function (pass, callback) {
  var self = this;
  password.hash(pass)
    .then(function (hash) {
      self.password = hash;
      self.save(callback);
    })
  ;
};

Person.methods.removePassword = function (callback) {
  this.password = '';
  this.save(callback);
};


module.exports = mongoose.model('Person', Person);
