'use strict';
var React  = require('react');

var IndexPage    = require('./pages/index');
var NotFoundPage = require('./pages/not-found');

var Router = function() {};

Router.prototype.start = function() {
  var initialUrl = window.location.hash;
  this.navigate(initialUrl);
};

Router.prototype.navigate = function(newUrl) {
  var url = this.cleanHash(newUrl);
  if (window.location.hash !== ('#' + url)) window.location.hash = '#' + url;
  this.currentUrl = url;

  // Route to the right place (i know those are static, this is not a framework)
  if (url === '/') {
    this.switchTo(<IndexPage />);
  } else {
    this.switchTo(<NotFoundPage />);
  }
};

Router.prototype.switchTo = function(page) {
  this.currentPage = page;
  React.render(page, document.getElementById('app-root'));
};

Router.prototype.cleanHash = function(hash) {
  if (hash === '') return '/';
  return hash.replace(/^#/g, '');
};

Router.prototype.getCurrentUrl = function() {
  return this.currentUrl;
};

Router.prototype.getCurrentPage = function() {
  return this.currentPage;
};

Router.start = function() {
  window.router = new Router();
  window.router.start();
  window.addEventListener('hashchange', function(event) {
    window.router.navigate(window.location.hash);
  }, false);
};

module.exports = Router;
