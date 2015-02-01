'use strict';
var Reflux  = require('../lib/reflux');
var request = require('../lib/request');

var Actions = require('../actions');

var NotebooksStore = Reflux.createStore({
  init: function() {
    this.listenTo(Actions.loadNotebooks, this.fetchNotebooks);
  },

  fetchNotebooks: function(offset, l) {
    var limit = l || 20;
    request.apiGet('/api/v1/notebooks')
      .end(function(error, res) {
        this.trigger(res.body.items);
      }.bind(this));
  }
});

module.exports = NotebooksStore;
