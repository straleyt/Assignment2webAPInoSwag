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



