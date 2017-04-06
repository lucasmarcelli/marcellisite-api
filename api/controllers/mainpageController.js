'use strict';


var mongoose = require('mongoose'),
Mainpage = mongoose.model('Projects');


exports.list_all_projects = function(req, res) {
  var token = req.body.token;
  if(token && token === process.env.TOKEN){
    Mainpage.find({}, function(err, project) {
      if(err) {
        res.send(err);
      }
      res.json(project);
    });
  }else{
    Mainpage.find({}, '-_id', function(err, project) {
      if(err) {
        res.send(err);
      }
      res.json(project);
    });
  }
};

exports.add_project = function(req, res) {
  var token = req.body.token;
  if(token === process.env.TOKEN){
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
  if(token === process.env.TOKEN) {
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
  if(token === process.env.TOKEN) {
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
