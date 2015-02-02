'use strict';
var React  = require('react'); // for that compiled jsx

var Router       = require('./lib/router');
var IndexPage    = require('./pages/index');
var NotebookPage = require('./pages/notebook');
var NotFoundPage = require('./pages/not-found');

var uuidReg = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

Router.start(function(url) {
  var notebookMatches = new RegExp('^\/notebooks\/(' + uuidReg + ')$').exec(url);

  if (url === '/') {
    this.switchTo(<IndexPage />);
  } else if (notebookMatches) {
    this.switchTo(<NotebookPage id={notebookMatches[1]}/>);
  } else {
    this.switchTo(<NotFoundPage />);
  }
});

