'use strict';


var mongoose = require('mongoose'),
Mainpage = mongoose.model('Projects');
var config = require('../../config');


exports.list_all_projects = function(req, res) {
  Mainpage.find({}, '-_id', function(err, project) {
    if(err) {
      res.send(err);
    }
    res.json(project);
  });
};

exports.add_project = function(req, res) {
  var token = req.body.token;
  if(token === config.token){
    var new_project = Mainpage(req.body);
    new_project.save(function(err, project){
      if(err){
        res.send(err);
      }
      res.json(project);
    })
  }else{
    res.status(401);
    res.json({"message":"Invalid add token"});
  }
};

exports.delete_project = function(req, res) {
  var token = req.body.token;
  if(token === config.token) {
     Mainpage.remove({_id: req.body.id}, function(err, project){
       if(err){
         res.send(err);
       }
       res.json({"message":"Successfully deleted project"});
     })
  }else{
    res.status(401);
    res.json({"message":"Invalid add token"});
  }
};

exports.get_single_project = function(req, res){
  Mainpage.findById(req.query.id, function(err, project){
    if(err){
      res.send(err);
    }
    res.json(project);
  })
}

exports.update_project = function(req, res) {
  var token = req.body.token;
  if(token === config.token) {
     Mainpage.findOneAndUpdate({_id: req.query.id}, req.body, {new: true}, function(err, project){
       if(err){
         res.send(err);
       }
       res.json(project);
     })
  }else{
    res.status(401);
    res.json({"message":"Invalid add token"});
  }
}
