'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  },
  pubDate: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Post', PostSchema);
