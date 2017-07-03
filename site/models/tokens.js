'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TokenSchema = new Schema({
  access_token: {
    type: String,
    required: true
  },
  refresh_token: {
    type: String,
    required: true
  },
  ezfind: Number
});

module.exports = mongoose.model('Tokens', TokenSchema);
