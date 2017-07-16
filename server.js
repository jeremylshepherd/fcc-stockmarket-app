'use strict';

require('babel-register')({
    presets: ["es2015", "react", "stage-2"]
});

// import express from 'express';
// import path from 'path';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
// import session from "express-session";
// import flash from "express-flash";

var express = require('express'),
    path = require('path'),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    flash = require("express-flash");


const app = express();
require('dotenv').load();

const routes = require('./routes/index');

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.enable('trust proxy');
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// // will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) =>{
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) =>{
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Node.js listening on port ${port}...`);
});

module.exports = app;