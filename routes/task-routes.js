
// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the suggested tasks - bring them back in ascending alphabetical order
  app.get("/api/tasks", function(req, res) {

    db.Task.findAll({
      order: '`message` ASC'
    }).then(function(dbTasks) {
      res.json(dbTasks);
    });
  });


  // Get rotue for retrieving a single task - don't think we're going to use this one.....
  app.get("/api/task/:id", function(req, res) {

    db.Task.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbTask) {
      res.json(dbTask);
    });
  });

};
