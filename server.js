//file: server.js
//creator: Tegan Straley
'use strict';
//node_modules required.
//Packages should be a dependency in the package.json 
var express = require('express');
var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config(); //Needed for process.env.UNIQUE_KEY
var port = 8080;
//Hardcoded Basic Authentication
var username = "tegan";
var password = "123";

//Creating the server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Since all routes give back same response we can function it
function responseFunction(method, req, res){
  var myHeaders = req.headers;
  var myParams = req.params;
  var myUniqueKey = process.env.UNIQUE_KEY;

  //If no headers or body say so in response
  if (Object.keys(req.headers).length === 0 && Object.keys(req.params).length === 0) {
    myHeaders = "No headers sent in";
    myParams = "No parameters sent in";
  }else if (Object.keys(req.headers).length === 0 && Object.keys(req.params).length > 0){
    myHeaders = "No headers sent in";
  } else if (Object.keys(req.params).length === 0 && Object.keys(req.headers).length > 0){
    myParams = "No parameters sent in";
  } 
  res.status(200);
  res.json({ message: 'using ' + method, headers: myHeaders, parameters: myParams, uniqueKey: myUniqueKey});
}


app.put('/puts', function (req, res) {
  responseFunction('puts', req, res);
});

app.delete('/deletes', function (req, res) {
  var encoded = req.header("Authorization");
  var decoded = Buffer.from(encoded.split(' ')[1],'base64').toString();
  var reqUsername = decoded.split(':')[0];
  var reqPassword = decoded.split(':')[1];

  if(reqUsername == username && reqPassword == password){
    responseFunction('deletes', req, res);  
  } else{
    res.status(401).send("Invalid username and/or password.")
  }
});

app.post('/posts', function (req, res) {
  responseFunction('posts', req, res);
});

app.get('/gets', function (req, res) {
  responseFunction('gets', req, res);
});

app.use('*', function(req, res, next) {
  res.status(405).send("Unsupported method or invalid path.")
});


var port = process.env.PORT || 8080;
app.listen(port);
console.log("Server listening on port " + port);

