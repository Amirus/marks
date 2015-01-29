'use strict';
var React  = require('react'); // for that compiled jsx

var Router       = require('./router');
var IndexPage    = require('./pages/index');
var NotFoundPage = require('./pages/not-found');

Router.start(function(url) {
  if (url === '/') {
    this.switchTo(<IndexPage />);
  } else {
    this.switchTo(<NotFoundPage />);
  }
});

