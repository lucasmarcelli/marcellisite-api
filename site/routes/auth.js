'use strict';

module.exports = function(app){
  var auth = require('../controllers/auth');

  app.route('/auth/user')
    .post(auth.get_user);

  app.route('/auth/verifycookie')
      .post(auth.verify_cookie);

  app.route('/auth/user/admin')
    .get(auth.authorize_admin);

  app.route('/auth/user/create')
    .post(auth.create_user);
}
