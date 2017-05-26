'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  slug: {
    type: String,
    required: true,
    unique: true
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
    type: Date,
    required: true
  },
  visible: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('Post', PostSchema);
