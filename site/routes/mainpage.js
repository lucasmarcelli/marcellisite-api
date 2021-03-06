'use strict';
module.exports = function(app) {
  var mainpage = require('../controllers/mainpage');

  // mainpage Routes
  app.route('/main/projects')
    .get(mainpage.list_all_projects)
    .post(mainpage.add_project);



  app.route('/main/projects/:projectID')
      .post(mainpage.update_project)
      .get(mainpage.get_single_project)
      .delete(mainpage.delete_project);;
};
