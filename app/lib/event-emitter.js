'use strict';

function EventEmitter() {
  if (!(this instanceof EventEmitter)) return new EventEmitter();
  EventEmitter.init.call(this);
}

EventEmitter.init = function() {
  this._listeners = {};
};

EventEmitter.prototype._addListener = function(type, listener, once) {
  if (typeof listener !== 'function') {
    throw TypeError('listener must be a function');
  }

  if (!this._listeners[type]) {
    this._listeners[type] = [];
  }

  this._listeners[type].push({
    once: once,
    fn: listener
  });

  return this;
};

EventEmitter.prototype.listeners = function() {
  return Object.keys(this._listeners);
};

EventEmitter.prototype.on = function(type, listener) {
  return this._addListener(type, listener, false);
};

EventEmitter.prototype.once = function(type, listener) {
  return this._addListener(type, listener, true);
};

EventEmitter.prototype.off = function(type, listener) {
  // delete one
  if (listener) {
    var index = this._listeners[type].indexOf(listener);
    if (index !== -1) this._listeners[type].splice(index, 1);
    return this;
  }

  // delete all
  delete this._listeners[type];
  return this;
};

EventEmitter.prototype.emit = function(type) {
  if (!this._listeners[type]) {
    throw new Error('Event "' + type + '" don\'t exists');
  }

  var args = Array.prototype.slice.call(arguments, 1);

  // exec
  this._listeners[type].forEach(function(listener) {
    listener.fn.apply(this, args);

    // remove events that run only once
    if (listener.once) this.remove(type, listener);
  });

  return this;
};

module.exports = EventEmitter;
