'use strict';

var mongoose = require('mongoose');
var request = require('request');

var Tokens = mongoose.model('Tokens');

exports.welcome = function(req, res){
  res.send("Heartrate APIs for marcelli sites.");
}

exports.callback_response = function(req, res){
  var code = req.query.code;
  request.post({
    url: 'https://api.fitbit.com/oauth2/token',
    headers: {
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization': 'Basic MjI4RjU3OmFlYTNkODc4OWE1OWZkNGVlYzBiOWU0ZDkwZDUxZWRi'
    },
    form: {
      'code':code,
      'grant_type':'authorization_code',
      'clientId':'228F57',
      'redirect_uri':'http://localhost:8000/heartrate/token',
    }},
    function(error, response, body){
      var parsed = JSON.parse(body);
      if(!parsed.errors){
        Tokens.findOneAndUpdate({ezfind:1}, {access_token: parsed.access_token, refresh_token: parsed.refresh_token}, {upsert: true}, function(err, tokens){
          if(err){
            res.status(403).send("error inserting");
          }
          console.log(tokens)
          res.status(200).send("tokens updated");

        })
      }else{
        res.status(403).send(parsed.error);
      }
    }
  );
}
