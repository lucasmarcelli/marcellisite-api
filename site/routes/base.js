'use strict';
module.exports = function(app) {
  var base = require('../controllers/base');

  app.route('/')
    .get(base.base);

};
