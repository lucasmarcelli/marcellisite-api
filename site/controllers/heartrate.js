'use strict';

var mongoose = require('mongoose');
var request = require('request');

var Tokens = mongoose.model('Tokens');

exports.welcome = function(req, res){
  res.send("Heartrate APIs for marcelli sites.");
  console.log(access_token);
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

// This should probably be in a util that will refresh the token if the token is expired.

// exports.refresh_token = function(req, res){
//   Tokens.findOne({ezfind:1}, function(err, tokens){
//     if(err){
//       res.send(err);
//     }
//
//     request.post({
//       url: 'https://api.fitbit.com/oauth2/token',
//       headers: {
//         'Content-Type':'application/x-www-form-urlencoded',
//         'Authorization': 'Basic MjI4RjU3OmFlYTNkODc4OWE1OWZkNGVlYzBiOWU0ZDkwZDUxZWRi'
//       },
//       form: {
//         'grant_type':'refresh_token',
//         'refresh_token':tokens.refresh_token
//       }
//     },
//   function(error, response, body){
//       var parsed = JSON.parse(body);
//       if(!parsed.errors){
//         Tokens.findOneAndUpdate({ezfind:1}, {access_token: parsed.access_token, refresh_token: parsed.refresh_token}, {upsert: true}, function(err, tokens){
//           if(err){
//             res.status(403).send("error inserting");
//           }
//           res.status(200).send("tokens updated");
//         })
//       }else{
//         res.status(403).send(parsed.error);
//       }
//     })
//   })
// }

// This should be in a util running once a day.
// I should send this shit to s3 and get it directly from there, it's static content updated daily after all.

// exports.request_heart_data = function(req, res){
//   Tokens.findOne({}, function(err, tokens){
//     if(err){
//       res.send(err);
//     }
//     request.get({
//       url: 'https://api.fitbit.com/1/user/-/activities/heart/date/2017-06-23/1d/1sec.json',
//       headers: {
//         'Content-Type':'application/x-www-form-urlencoded',
//         'Authorization': 'Bearer ' +  tokens.access_token
//       }
//     },
//   function(error, response, body){
//       var parsed = JSON.parse(body);
//       if(!parsed.error){
//         res.status(200).send("Successfully requested");
//       }else{
//         res.status(403).send(parsed.error);
//       }
//     })
//   })

//}
