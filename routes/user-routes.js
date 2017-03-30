// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var client = require("twilio")('AC0a6299bb7d45d1278e6ea833ca48f138', '2ffdc74281f5b03a3210666bbae1ea50');

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the dashboard page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the dashboard page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed

    //here we need to make sure that the user has verified the phone number before allowing them in

      db.User.findOne({
        where: {
          name: req.body.name
        }
      }).then (function(dbUser){
        if (dbUser.verified){
          res.json("/dashboard");
        }

        res.json("/dashboard");  //here for demo purposes only
          // res.json({});
 
        });





    // res.json("/dashboard");

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
// <<<<<<< HEAD
      // res.json({});
      // res.redirect(307, "/api/login");
// =======
      num = "+1" +req.body.phone; //this creates a phone number in the format twilio wants
      client.messages.create({
        to: num,
        from: "+12409492233", //this is the number assigned to this app by twilio
        body: "Welcome to MOM, the Memory Organization Module! Reply with 'start' to start recieving reminders"
      }).then(function(err, message){
        if(err){console.log(err);}
        else{
          console.log(num);
        }
      });
      res.json({});
      // res.redirect(307, "/api/login");
// >>>>>>> ilona
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
      //use the req.user.id to get fresh user data
      //this req.user.id persists thanks to passport using session so -  when using this route (in fact all of the user
      // data persits) we have to go get the user's phone number because we offer the user the opportunity to update phone number.

      db.User.findOne({
        where: {
          id: req.user.id
        }
      }).then (function(dbUser){
        res.json({
          name: dbUser.name,
          id: req.user.id,
          phone: dbUser.phone
        });
        })
      }

    });

  //route for getting freshly updated user data by specifying userId
  // actually don't need this route, leaving it here just in case
  app.get("/api/user/:id", function(req, res){
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {  
      res.json(dbUser);
    });
  });



//If Twillio recieves a text, it sends a post request to a predefined URL. Right now the URL accesses a port on my (Ilona's) computer. When we get this on Heroku, I can change the Twilio settings to post to that site.
app.post('/inbound', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  if(req.body.Body.toLowerCase().trim() === "start"){
    db.User.update(
      {
      verified: true
      },

      {
        where: {
          phone: (res.body.From).substring(2)
        }
      }).then(function(dbUser) {

        res.json({});
      });

    twiml.message('Congratulations! You may now recieve reminders at this number.');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }

});


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

}

