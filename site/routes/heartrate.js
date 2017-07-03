'use strict';

module.exports = function(app){
  var heartrate = require('../controllers/heartrate');

  // app.route('/heartrate/request')
  //    .get(heartrate.request_heart_data);

  app.route('/heartrate/token')
      .get(heartrate.callback_response);

  app.route('/heartrate/refreshtoken')
      .get(heartrate.refresh_token);

}
