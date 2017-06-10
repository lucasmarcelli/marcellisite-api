'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  google_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
