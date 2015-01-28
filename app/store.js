'use strict';
var R       = require('ramda');
var _       = require('lodash');
var request = require('superagent');
var extend  = require('./extend');

function Store(initialItems) {
  this._events = {};
  this.items = initialItems || [];
}

_.assign(Store.prototype, {

  each: function(iterator) {
    _.each(this.items, iterator);
  },

  get: function(id) {
    return _.find(this.items, {id: id});
  },

  where: function(wheres) {
    return new this.constructor(_.where(this.items, wheres));
  },

  all: function() {
    return _.clone(this.items);
  },

  reset: function(newItems) {
    this.items = newItems;
  },

  // Ajax
  request: function(method, url, body, callback) {
    // If body is function then it's a callback and there is no 4th param
    var has_body = true;
    if (typeof body !== 'object') {
      has_body = false;
      callback = body;
    }

    // If callback is a stirng the callback is a simple trigger
    if (typeof callback === 'string') {
      var trigger_name = callback;
      callback = _.bind(function(err, result) {
        if (err) this.trigger(trigger_name, err);
        this.trigger(trigger_name, null, result);
      }, this);
    }

    // Append/Add a timestamp so we dont get 304's
    var final_url = [
      url,
      (url.indexOf('?') !== -1) ? '&' : '?',
      'ts=' + _.now()
    ].join('');

    var api_call = request[method](final_url);

    if (has_body) {
      api_call.send(body);
    }

    api_call.end(_.bind(function(err, res) {
      if (_.isUndefined(res) && !(err instanceof Error)) {
        // Then this was a get and super agent doesn't give err
        res = err;
      }

      // Error handling time
      if (err instanceof Error) {
        callback(err);
      } else if (!res || res.status >= 400 || res.body.error) {
        var error = (res && res.body.error) ? res.body.error : {};
        error.status = (res && res.status) ? res.status : 0;
        callback(error);
      } else {
        callback(null, res.body);
      }
    }, this));
  },

  // Events
  on: function(event_name, handler) {
    if (!this._events[event_name]) this._events[event_name] = {};

    var listener_id = _.uniqueId('l_');
    this._events[event_name][listener_id] = handler;

    // Return listener id so callee can later use it calling off
    return listener_id;
  },

  once: function(event_name, handler) {
    handler.once = true;
    return this.on(event_name, handler);
  },

  trigger: function(event_name) {
    if (!this._events[event_name]) return false;

    // take all args minus event name and use in apply
    var args = [].splice.call(arguments, 1);

    _.each(this._events[event_name], function(e) { e.apply(null, args); });
    this._events[event_name] = R.pick(R.not(R.prop('once')), this._events[event_name]);
    return true;
  },

  off: function(event_name, listener_id) {
    delete this._events[event_name][listener_id];
  }
});

Store.extend = extend;

module.exports = Store;
