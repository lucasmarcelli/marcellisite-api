var mongoose = require('mongoose'),
    Tokens = mongoose.model('Tokens'),
    request = require('request'),
    heartdataGenerator = require('./heartdataGenerator');

var heartScraper = {

    request_data: function(tokens, todayheart_min){
      var today_date = todayheart_min['activities-heart'][0].dateTime;
      var data = {date: today_date};

      data.minute = todayheart_min;
      var today_second = new Promise(function(resolve, reject){
        request.get({
          url: 'https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1sec.json',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' +  tokens.access_token
          }
        }, function(error, response, body){
            var parsed = JSON.parse(body);
            if(!parsed.errors){
              resolve(parsed);
            }else{
              reject(parsed);
            }
        });
      });

    today_second.then(function(results){
      data.second = results[2];
      heartdataGenerator.generate(data);
    },
    function(error){
      console.log(error);
    });

    },

    check_token: function(tokens, todayheart_min){
        if(todayheart_min.errors){
          request.post({
            url: 'https://api.fitbit.com/oauth2/token',
            headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              'Authorization': 'Basic MjI4RjU3OmFlYTNkODc4OWE1OWZkNGVlYzBiOWU0ZDkwZDUxZWRi'
            },
            form: {
              'grant_type':'refresh_token',
              'refresh_token':tokens.refresh_token
            }
          },
          function(error, response, body){
              var parsed = JSON.parse(body);
              if(!parsed.errors){
                Tokens.findOneAndUpdate({ezfind:1}, {access_token: parsed.access_token, refresh_token: parsed.refresh_token}, {upsert: true}, function(err, tokens){
                  if(err){
                    console.log(err);
                  }else{
                    heartScraper.request_data(tokens, todayheart_min);
                  }
                })
              }
            });
          }else{
            heartScraper.request_data(tokens, todayheart_min);
          }
        }
    ,
    request_heart_data: function(){
      Tokens.findOne({}, function(err, tokens){
        if(err){
          console.log(err);
        }
        request.get({
          url: 'https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1min.json',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' +  tokens.access_token
          }
        },
      function(error, response, body){
          var parsed = JSON.parse(body);
          heartScraper.check_token(tokens, parsed);
      });
    });
  }
}

module.exports = heartScraper;
