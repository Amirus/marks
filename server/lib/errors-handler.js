'use strict';

var internals = {};

internals.init = function(app) {
  // 404
  app.use(function(req, res, next) {
    res.status(404);
    if (req.accepts('json')) {
      res.send({code: 404, error: 'Not found'});
    } else {
      res.type('txt').send('404 - Page not found');
    }
  });

  // 500
  app.use(function(err, req, res, next) {
    res.status(500);
    console.error(err);
    if (req.accepts('json')) {
      res.send({code: 500, error: '[' + err.name + '] ' + err.message});
    } else {
      res.type('txt').send('500 - Something bad hapenned, try refreshing'
        + '(' + err.name + ': ' + err.message + ')');
    }
  });
};

module.exports = internals;
