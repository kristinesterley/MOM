
// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/reminder-data/:user_id", function(req, res) {

    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Reminder.findAll({
      where: {
        UserId: req.params.user_id
      },
      include: [db.User]
    }).then(function(dbReminders) {
      res.json(dbReminders);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/reminder/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Reminder.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbReminders) {
      res.json(dbReminders);
    });
  });

  // POST route for saving a new post
  app.post("/api/reminder", function(req, res) {

    db.Reminder.create(req.body).then(function(dbReminder) {
      res.json(dbReminder);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/reminder/:id", function(req, res) {
    db.Reminder.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbReminders) {
      res.json(dbReminders);
    });
  });

  // PUT route for updating posts
  app.put("/api/reminder", function(req, res) {
    db.Reminder.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbReminders) {
        res.json(dbReminders);
      });
  });
};
