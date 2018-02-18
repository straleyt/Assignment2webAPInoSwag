//file: server.js
'use strict';
//node_modules required.
//Packages should be a dependency in the package.json 
var express = require('express');
var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
var authController = require('./auth');
var authJwtController = require('./auth_jwt');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var dotenv = require('dotenv').config();
var port = 8080;

//Creating the server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

//Since all routes give back same response we can function it
function responseFunction(method, req, res){
  var myHeaders = req.headers;
  var myParams = req.params;
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.UNIQUE_KEY;
  var myUniqueKey = opts.secretOrKey;

  //If no headers or body say so in response
  if (Object.keys(req.headers).length === 0 && Object.keys(req.params).length === 0) {
    myHeaders = "No headers sent in";
    myParams = "No parameters sent in";
  }else if (Object.keys(req.headers).length === 0 && Object.keys(req.params).length > 0){
    myHeaders = "No headers sent in";
  } else if (Object.keys(req.params).length === 0 && Object.keys(req.headers).length > 0){
    myParams = "No parameters sent in";
  } 

  res.statusCode = 200;
  res.json({ message: 'using ' + method, headers: myHeaders, parameters: myParams, uniqueKey: myUniqueKey});
}


app.put('/puts', function (req, res) {
  responseFunction('puts', req, res);
});

app.delete('/deletes', function (req, res) {
  responseFunction('deletes', req, res);
});

app.post('/posts', function (req, res) {
  responseFunction('posts', req, res);
});

app.get('/gets', function (req, res) {
  responseFunction('gets', req, res);
});



// app.use('*', function(req, res, next) {
//   console.log("Invalid route supplied")
//   res.statusCode = 405;
// });


var port = process.env.PORT || 8080;
app.listen(port);
console.log("Server listening on port " + port);

