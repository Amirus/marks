var express = require('express');

var router = express.Router();

var authRoutes = require('./auth');
var apiRoutes  = require('./api');

router.use('/auth', authRoutes);

router.get('/', function(req, res) {
  if (req.user) {
    res.render('index', {
      config: {
        user_email: req.user.email
      }
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/login', function(req, res) {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

router.get('/unauthorized', function(req, res) {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('unauthorized');
  }
});

// All other routes require auth
router.use(function(req, res, next) {
  if (!req.user) {
    return res.redirect('/unauthorized');
  }
  next();
});

router.use('/api', apiRoutes);

module.exports = router;
