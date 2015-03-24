/**
* Contact.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    key: {
      type: "integer",
      primaryKey: true,
      autoIncrement: true
    },
    name: "string",
    email: "email",
    phone: "string",
    dob: "date",
    facebook: "string",
    gathered: "json",
    locale: "string",
    craft: "text",
    interests: "text",
    persona: "json",
    undesirable: {
      type: "bool",
      defaultsTo: false
    }
  }
};

