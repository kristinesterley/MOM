// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the dashboard page
    if (req.user) {
// <<<<<<< HEAD
//       res.redirect("/reminder");
// =======
      res.redirect("/dashboard");

    }
    res.sendFile(path.join(__dirname + "/../public/index.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to dashboard
    if (req.user) {
// <<<<<<< HEAD
//       res.redirect("/reminder");
// =======
      res.redirect("/dashboard");

    }
    res.sendFile(path.join(__dirname + "/../public/index.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page

  app.get("/reminder", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/reminder.html"));

  //"/dashboard", isAuthenticated, (removed for now to navigate dashboard)
  //this will only work on node server when testing
  app.get("/dashboard", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/dashboard.html"));

  });

  //create a new reminder
  app.get("/dashboard/create", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/create.html"));
  });

  //manage reminders
  app.get("/dashboard/manage", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/manage.html"));
  });

  //resources page
  app.get("/dashboard/resources", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/resources.html"));
  });  
};