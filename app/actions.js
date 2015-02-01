'use strict';
var Reflux = require('./lib/reflux');

// Create all actions for app, centralized here so we have on place to look for
module.exports = {
  loadNotebooks: Reflux.createAction()
};
