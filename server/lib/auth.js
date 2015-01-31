var express  = require('express');
var passport = require('./passport');

var internals = {};

internals.init = function(app) {
  
};

internals.authMiddleware = function(req, res, next) {
  if (!req.user) {
    return res.redirect('/unauthorized');
  }
  next();
};

internals.guestMiddleware = function(req, res, next) {
  if (req.user) {
    res.redirect('/');
  } else {
    next();
  }
};

internals.router = function() {
  var router = express.Router();

  router.get('/auth/google', passport.authenticate('google', {scope: ['email']}));

  router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/unauthorized'
  }));

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/login', internals.guestMiddleware, function(req, res) {
    res.render('login');
  });

  router.get('/unauthorized', internals.guestMiddleware, function(req, res) {
    res.render('unauthorized');
  });

  return router;
};

module.exports = internals;
