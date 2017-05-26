'use strict';

var mongoose = require('mongoose'),
Post = mongoose.model('Post');

exports.welcome = function(req, res){
  res.send("This is the blog api");
};

exports.list_all_posts = function(req, res){
  var token = req.headers.token;
  if(token && token === process.env.TOKEN){
    Post.find({}, function(err, project) {
      if(err) {
        res.send(err);
      }
      res.json(project);
    });
  }else{
    Post.find({visible: true}, ['-_id', '-content', '-visible', '-created'], function(err, project) {
      if(err) {
        res.send(err);
      }
      res.json(project);
    });
  }
};

exports.add_post = function(req, res){
  var token = req.headers.token;
  if(token && token === process.env.TOKEN){
    var new_post = Post(req.body);
    new_post.save(function(err, post){
      if(err){
        res.send(err);
      }
      res.json(post);
    })
  }else{
    res.status(403).send("Invalid token.");
  }
};

exports.delete_post = function(req, res){
  var token = req.headers.token;
  if(token === process.env.TOKEN) {
     Post.remove({_id: req.params.postID}, function(err, project){
       if(err){
         res.send(err);
       }
      res.status(200).send("Successfully deleted " + req.params.postID);
     })
  }else{
    res.status(403).send("Invalid token.");
  }
}

exports.get_single_post = function(req, res){
  var slug = req.params.slug;
  Post.findOne({slug: slug}, ['-_id', '-created'], function(err, post){
    if(err){
      res.send(err);
    }
    if(!post){
      res.status(404).send("Something went wrong here.");
    }else{
      res.json(post);
    }
  })
}

exports.update_post = function(req, res){
  var token = req.headers.token;
  if(token === process.env.TOKEN) {
    Post.findOneAndUpdate({_id: req.params.postID}, req.body, {new: true}, function(err, post){
      if(err){
        res.send(err);
      }
      if(!post){
        res.status(404).send("Something went wrong here.");
      }else{
        res.json(post);
      }
    })
 }else{
   res.status(403).send("Invalid token.");
 }
}
