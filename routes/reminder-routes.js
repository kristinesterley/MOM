
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
      order: '`message` ASC',
      where: {
        UserId: req.params.user_id
      }
      // include: [db.User] //don't think I need this include
    }).then(function(dbReminders) {
      res.json(dbReminders);
    });
  });

  // Get rotue for retrieving a single reminder
  app.get("/api/reminder/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Reminder.findOne({
      where: {
        id: req.params.id
      }
      // include: [db.User]
    }).then(function(dbReminders) {
      
      res.json(dbReminders);
    });
  });


  // POST route for saving a new reminder
  app.post("/api/reminder", function(req, res) {
    db.Reminder.create(req.body).then(function(dbReminder) {

      db.Reminder.findOne({
        where:{
          id: dbReminder.id
        },
        include: [db.User]
      }).then(function(data){
          //ilona's code
          console.log("&&&&&&&&&&&&&&&&&&&&&&");
          console.log(data);
          console.log(data.User.phone);
          console.log(data.User.id);
          console.log(data.id); //reminder id
      });


      console.log(dbReminder.id);
      res.json(dbReminder);
    });
  });

  // DELETE route for a reminder to delete
  app.delete("/api/reminder/:id", function(req, res) {
    db.Reminder.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbReminders) {

      // Ilona - don't know how you will specify which text needs to be deleted from the schedule


      res.json(dbReminders);
    });
  });

  // PUT route for updating a reminder
  app.put("/api/reminder", function(req, res) {
    db.Reminder.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbReminders) {

        // Ilona code to update previously scheduled texts could go here, but same problem with create - phone number not available here
        // might need to delete the previously scheduled one and add a new one?
        // if that's the case, then you may need to do this processing in the appropriate function in dashboard.js

        res.json(dbReminders);
      });
  });
};
