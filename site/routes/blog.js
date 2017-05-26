'use strict';
module.exports = function(app) {
  var blog = require('../controllers/blog');

  app.route('/blog')
    .get(blog.welcome);

  app.route('/blog/posts')
    .get(blog.list_all_posts)
    .post(blog.add_post);

  app.route('/blog/posts/:postID')
    .delete(blog.delete_post)
    .post(blog.update_post);

  app.route('/blog/posts/:slug')
    .get(blog.get_single_post);

};
