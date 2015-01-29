'use strict';
var React  = require('react');

var Router = function(routeHandler) {
  this.routeHandler = routeHandler;
};

Router.prototype.start = function() {
  var initialUrl = window.location.hash;
  this.navigate(initialUrl);
};

Router.prototype.navigate = function(newUrl) {
  var url = this.cleanHash(newUrl);
  if (window.location.hash !== ('#' + url)) window.location.hash = '#' + url;
  this.currentUrl = url;

  if (this.routeHandler) {
    this.routeHandler.call(this, url);
  } else {
    console.error('No route handler setup!');
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

Router.start = function(routeHandler) {
  window.router = new Router(routeHandler);
  window.router.start();

  var handle = function(event) {
    window.router.navigate(window.location.hash);
  };

  if (window.addEventListener) {
    window.addEventListener('hashchange', handle, false);
  } else {
    window.attachEvent('onhashchange', handle);
  }
};

module.exports = Router;
