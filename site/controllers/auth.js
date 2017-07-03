'use strict';

var mongoose = require('mongoose');
var googleAuthUtils = require('../utils/googleAuthUtils');
var admins = ['lucas@marcelli.ca'];

var User = mongoose.model('User');

exports.welcome = function(req, res){
  res.send("Auth APIs for marcelli sites.");
}

exports.verify_cookie = function(req, res){
  var id_token = req.headers.token;
  var google_id = req.headers.googleid;
  googleAuthUtils.verify_token(id_token, function(payload, userid){
    if(payload.sub === google_id){
      res.status(200).send("Verfied token.");
    }else{
      res.status(403).send("Failed to verify token.");
    }
  },
    function(e){
      res.status(400).send("Invalid token!");
  })

}

exports.authorize_admin = function(req, res){
  var id_token = req.headers.token;
  googleAuthUtils.verify_token(id_token, function(payload, userid){
    if(admins.indexOf(payload.email) !== -1){
      res.status(200).send("Yo adminerino!");
    }else{
      res.status(403).send("You are not admin.")
    }
  },
  function(e){
    res.status(400).send("Invalid token!");
  });
}

exports.get_user = function(req, res){
  var id_token = req.headers.token;
  googleAuthUtils.verify_token(id_token, function(payload, userid){
    User.findOne({google_id: userid}, function(err, user){
      if(err){
        res.send(err);
      }
      if(!user){
        res.status(404).send("Something went wrong here.");
      }else{
        user = user.toObject();
        if(admins.indexOf(user.email) !== -1){
          user.admin = true;
        }
        res.json(user);
      }
    })
  },
  function(e){
    res.status(400).send("Invalid token!");
  });
}

exports.create_user = function(req, res){
  var id_token = req.headers.token;
  googleAuthUtils.verify_token(id_token, function(payload, userid){
    var user_object = {};
    user_object.first_name = payload.given_name;
    user_object.last_name =  payload.family_name;
    user_object.google_id = userid;
    user_object.email = payload.email;
    var new_user = User(user_object);
    new_user.save(function(err, user){
      if(err){
        res.send(err);
      }
      res.json(user);
    });
  },
  function(e){
    res.status(400).send("Invalid token!");
  });
}
