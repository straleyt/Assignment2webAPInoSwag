//file: server.js

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
var port = 8080;

//Creating the server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

'use strict';

var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};


app.put('/puts', function(req,res){
  var myHeaders = req.headers;
  //If no headers or body say so
  if(Object.keys(req.headers).length === 0){
      myHeaders = "No headers sent in";
  } else {
    console.log(myHeaders);
    res.json({message:'using puts', headers: myHeaders});
  };
});



var port = process.env.PORT || 8080;
app.listen(port);
console.log("Server listening on port " + port);

