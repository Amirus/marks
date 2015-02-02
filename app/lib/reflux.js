'use strict';
var R            = require('ramda');
var EventEmitter = require('./event-emitter');

var internals = {};

/**
 * Creates an action functor object
 *
 * Based of https://gist.github.com/spoike/ba561727a3f133b942dc
 */
internals.createAction = function() {
  var action = new EventEmitter();
  var eventLabel = 'action';
  var functor;

  functor = function() {
    action.emit(eventLabel, Array.prototype.slice.call(arguments, 0));
  };

  /**
   * Subscribes the given callback for action triggered
   *
   * @param {Function} callback The callback to register as event handler
   * @param {Mixed} [optional] bindContext The context to bind the callback with
   * @returns {Function} Callback that unsubscribes the registered event handler
   */
  functor.listen = function(callback, bindContext) {
    var eventHandler = function(args) {
      callback.apply(bindContext, args);
    };
    action.on(eventLabel, eventHandler);

    return function() {
      action.off(eventLabel, eventHandler);
    };
  };

  return functor;
};

/**
 * Creates an event emitting Data Store
 *
 * @param {Object} definition The data store object definition
 */
internals.createStore = function(definition) {
  var store = new EventEmitter();
  var eventLabel = 'change';

  function Store() {
    if (this.init && (typeof this.init === 'function')) {
      this.init();
    }
  }

  Store.prototype = R.mixin(Store.prototype, definition);

  Store.prototype.listenTo = function(listenable, callback) {
    if (!listenable.listen || typeof listenable.listen !== 'function') {
      throw new TypeError(listenable + ' is missing a listen method');
    }
    return listenable.listen(callback, this);
  };

  Store.prototype.listen = function(callback, bindContext) {
    var eventHandler = function(args) {
      callback.apply(bindContext, args);
    };
    store.on(eventLabel, eventHandler);

    return function() {
      store.off(eventLabel, eventHandler);
    };
  };

  Store.prototype.trigger = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    store.emit(eventLabel, args);
  };

  return new Store();
};

module.exports = internals;
