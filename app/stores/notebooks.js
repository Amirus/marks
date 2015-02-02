'use strict';
var R       = require('ramda');
var Reflux  = require('../lib/reflux');
var request = require('../lib/request');

var Actions = require('../actions');

var idUnion = R.unionWith(function(a, b) {
  return a.id === b.id;
});

var NotebooksStore = Reflux.createStore({
  init: function() {
    this.notebooks = [];
    this.listenTo(Actions.loadNotebooks, this.fetchNotebooks);
    this.listenTo(Actions.loadNotebook, this.fetchNotebook);
    this.listenTo(Actions.createNotebook, this.createNotebook);
  },

  append: function(items) {
    this.notebooks = idUnion(this.notebooks, items);
  },

  fetchNotebooks: function(o, l) {
    var offset = o || 0;
    var limit = l || 20;
    if (offset === 0 && this.notebooks.length > 0) {
      // Don't make any api call, we must be comming back to
      // a page and we already have the results
      this.trigger('all', null, this.notebooks);
    } else {
      request.apiGet('/api/v1/notebooks')
        .query({offset: offset, limit: limit})
        .end(function(error, res) {
          if (error) return this.trigger('all', error);

          this.append(res.body.items);
          this.trigger('all', null, this.notebooks);
        }.bind(this));
    }
  },

  fetchNotebook: function(id) {
    var notebook = R.find(R.propEq('id', id), this.notebooks);
    if (notebook) {
      this.trigger('one', null, notebook);
    } else {
      request.apiGet('/api/v1/notebooks/' + id)
        .end(function(error, res) {
          if (error) return this.trigger('one', error);

          this.append([res.body]);
          this.trigger('one', null, res.body);
        }.bind(this));
    }
  },

  createNotebook: function(name) {
    request.apiPost('/api/v1/notebooks')
      .send({name: name})
      .end(function(error, res) {
        if (error) return this.trigger('created', error);

        this.append([res.body]);
        this.trigger('created', null, res.body);
      }.bind(this));
  }
});

module.exports = NotebooksStore;
