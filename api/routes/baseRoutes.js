'use strict';
module.exports = function(app) {
  var base = require('../controllers/baseController');

  app.route('/')
    .get(base.base);
  };
