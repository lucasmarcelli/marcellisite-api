'use strict';
module.exports = function(app) {
  var blog = require('../controllers/postController');

  app.route('/blog')
    .get(blog.list_all_posts)
    .post(blog.add_post);

  app.route('/blog/:postID')
    .delete(blog.delete_post)
    .post(blog.update_post)
    .get(blog.get_single_post);

};
