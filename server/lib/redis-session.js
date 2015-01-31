'use strict';
var session    = require('express-session');
var RedisStore = require('connect-redis')(session);

var redis = require('./redis');

var internals = {};

internals.init = function(app) {
  app.use(session({
    store: new RedisStore({client: redis}),
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));
};

module.exports = internals;
