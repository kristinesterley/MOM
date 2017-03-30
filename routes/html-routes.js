
// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the dashboard page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname + "/../public/index.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to dashboard
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname + "/../public/index.html"));
  });


  app.get("/dashboard", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/dashboard.html"));

  });

  app.get("/user-maintenance", isAuthenticated, function(req,res){
    res.sendFile(path.join(__dirname + "/../public/user-maintenance.html"));
  });

 
 };