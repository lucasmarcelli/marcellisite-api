'use strict';

module.exports = function(app){
  var heartrate = require('../controllers/heartrate');

  app.route('/heartrate/token')
      .get(heartrate.callback_response);
      
}
