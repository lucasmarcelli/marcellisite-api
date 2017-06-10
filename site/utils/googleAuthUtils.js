'use strict';

var googleAuthUtils = {
  verify_token: function(id_token, success, error){
    var client_token = '702656611928-etumg78clanb2f80ahuv5am7lumm0f3m.apps.googleusercontent.com';
    var GoogleAuth = require('google-auth-library');
    var auth = new GoogleAuth;
    var client = new auth.OAuth2(client_token, '', '');
    client.verifyIdToken(
          id_token,
          client_token,
          function(e, login) {
            if(e){
              error(e);
            }else{
              var payload = login.getPayload();
              var userid = payload['sub'];
              success(payload, userid);
            }

      });
  }
};

module.exports = googleAuthUtils;
