'use strict';
var fs   = require('fs');
var path = require('path');
var R    = require('ramda');

var internals = {};

internals.init = function(app) {
  // Load config.json file
  var config_path = path.join(__dirname, '..', '..', 'config.json');
  if (fs.existsSync(config_path)) {
    process.env = R.mixin(process.env, JSON.parse(fs.readFileSync(config_path)));
  }
};

module.exports = internals;
