'use strict';
module.exports = function(app) {
  var mainpage = require('../controllers/baseController');

  app.route('/')
    .get(mainpage.base);
  };
