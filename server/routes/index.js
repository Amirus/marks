var express = require('express');

var auth      = require('../lib/auth');
var apiRoutes = require('./api');

var router = express.Router();

router.use('/', auth.router());

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

// All other routes require auth
router.use(auth.authMiddleware);

router.use('/api/v1', apiRoutes);

module.exports = router;
