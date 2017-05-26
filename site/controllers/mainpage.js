'use strict';


var mongoose = require('mongoose'),
Mainpage = mongoose.model('Projects');


exports.list_all_projects = function(req, res) {
  var token = req.headers.token;
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
  var token = req.headers.token;
  if(token === process.env.TOKEN){
    var new_project = Mainpage(req.body);
    new_project.save(function(err, project){
      if(err){
        res.send(err);
      }
      res.json(project);
    })
  }else{
    res.status(403).send("Invalid token.");
  }
};

exports.test = function(req, res){
  res.send(req.params.projectID, 200);
}

exports.delete_project = function(req, res) {
  var token = req.headers.token;
  if(token === process.env.TOKEN) {
     Mainpage.remove({_id: req.params.projectID}, function(err, project){
       if(err){
         res.send(err);
       }
        res.status(200).send("Successfully deleted " + req.params.projectID)
     })
  }else{
    res.status(403).send("Invalid token.");
  }
};

exports.get_single_project = function(req, res){
  Mainpage.findById(req.params.projectID, function(err, project){
    if(err){
      res.send(err);
    }
    if(!project){
      res.status(404).send("Something went wrong here.");
    }else{
      res.json(project);
    }
  })
}

exports.update_project = function(req, res) {
  var token = req.headers.token;
  if(token === process.env.TOKEN) {
     Mainpage.findOneAndUpdate({_id: req.params.projectID}, req.body, {new: true}, function(err, project){
       if(err){
         res.send(err);
       }
       if(!project){
         res.status(404).send("Something went wrong here.");
       }else{
         res.json(project);
       }
     })
  }else{
    res.status(403).send("Invalid token.");
  }
}
