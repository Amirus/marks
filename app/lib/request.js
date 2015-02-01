'use strict';
var request = require('superagent');

request.apiGet = function(url) {
  return request.get(url)
    .set('Accept', 'application/json');
};

request.apiPost = function(url) {
  return request.post(url)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
};

request.apiPut = function(url) {
  return request.put(url)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
};

request.apiDel = function(url) {
  return request.del(url)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
};

module.exports = request;
