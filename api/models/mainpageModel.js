'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'occasional', 'inactive'],
    required: true
  },
  statusLabel: {
    type: String,
    required: true
  },
  statusEmoji: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  longDescription: String,
  longDescID: Number,
  links: {
    links: [
      {
        url : {
          type: String,
          required: true
        },
        external: Boolean,
        label: {
          type: String,
          required: true
        }
      }
    ]
  }

});

module.exports = mongoose.model('Projects', ProjectSchema);
