'use strict';
var _      = require('lodash');
var extend = require('./extend');

var Model = function(attributes) {
  _.assign(this, attributes);
};

// Class methods
_.assign(Model, {
  extend: extend
});

module.exports = Model;
