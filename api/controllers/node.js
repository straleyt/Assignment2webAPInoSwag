'use strict';

//node_modules required.
//Packages should be a dependency in the package.json 
var express = require('express');
var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var port = 8080;
var util = require('util');


module.exports = {

    put: put,

};



function put(req,res){
  var myHeaders = req.headers;
  //If no headers or body say so
  if(Object.keys(req.headers).length === 0){
      myHeaders = "No headers sent in";
  } else {
    console.log(myHeaders);
    res.json({message:'using puts', headers: myHeaders});
  };
}
