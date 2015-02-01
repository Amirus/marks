'use strict';
var request = require('superagent');

request.apiGet = function(url) {
  return request.get(url)
    .set('Accept', 'application/json');
};

module.exports = request;
