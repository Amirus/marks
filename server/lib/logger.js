'use strict';

var internals = {};

internals.requestLogger = function(req, res, next) {
  console.log((new Date()).toISOString() + ' ' + req.method + ' ' + (req.originalUrl || req.url));
  next();
};

module.exports = internals;
