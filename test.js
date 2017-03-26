// var client = require("twilio")('AC0a6299bb7d45d1278e6ea833ca48f138', '2ffdc74281f5b03a3210666bbae1ea50');
// var express = require("express");
// var http = require("http");
// var schedule = require("node-schedule");

// var app = express();
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));


// app.post('/inbound', function(req, res) {
//   var twilio = require('twilio');
//   var twiml = new twilio.TwimlResponse();
//   console.log(req.body);
//   twiml.message('The Robots are coming! Head for the hills!');
//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });

// app.get("/", function(req, res){
// 	res.end("Hi there");
// })


// http.createServer(app).listen(1337, function () {
//   console.log("Express server listening on port 1337");
// });