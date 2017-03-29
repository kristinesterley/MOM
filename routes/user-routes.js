// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var client = require("twilio")('AC0a6299bb7d45d1278e6ea833ca48f138', '2ffdc74281f5b03a3210666bbae1ea50');

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed

    res.json("/dashboard");

  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    // console.log(req.body);
    db.User.create({
      name: req.body.name,
      password: req.body.password,
      phone: req.body.phone

    }).then(function() {
      num = "+1" +req.body.phone; //this creates a phone number in the format twilio wants
      client.messages.create({
        to: num,
        from: "+12409492233", //this is the number assigned to this app by twilio
        message: "Welcome to MOM, the Memory Organization Mudule! Reply with 'start' to start recieving reminders"
      }).then(function(err, message){
        if(err){console.log(err);}
      });
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      res.json(err);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user-data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's name and id
      res.json({
        name: req.user.name,
        id: req.user.id,
        phone: req.user.phone
      });
    }
  });



//If Twillio recieves a text, it sends a post request to a predefined URL. Right now the URL accesses a port on my (Ilona's) computer. When we get this on Heroku, I can change the Twilio settings to post to that site.
app.post('/inbound', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  if(req.body.Body.toLowerCase().trim() === "start"){
    twiml.message('Congratulations! You may now recieve reminders at this number.');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
});
};


//route for deleting a user account
  app.delete("/api/user/:id", function(req, res) {

    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });


    // PUT route for updating a user
  app.put("/api/user", function(req, res) {
    //Need to add changing of task; will do later

    db.User.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbUser) {

        res.json(dbUser);
      });
  });

};

