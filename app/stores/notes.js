'use strict';
var R       = require('ramda');
var Reflux  = require('../lib/reflux');
var request = require('../lib/request');

var Actions = require('../actions');

var idUnion = R.unionWith(function(a, b) {
  return a.id === b.id;
});

var NotesStore = Reflux.createStore({
  init: function() {
    this.notes = [];
    this.listenTo(Actions.loadNotes, this.fetchNotes);
    this.listenTo(Actions.loadNote, this.fetchNote);
    this.listenTo(Actions.createNote, this.createNote);
  },

  append: function(items) {
    this.notes = idUnion(this.notes, items);
  },

  where: function(prop, val) {
    return R.filter(R.propEq(prop, val), this.notes);
  },

  fetchNotes: function(id, o, l) {
    var offset = o || 0;
    var limit = l || 20;
    var matchingNotes = this.where('notebook_id', id);
    if (offset === 0 && matchingNotes.length > 0) {
      // Don't make any api call, we must be comming back to
      // a page and we already have the results
      this.trigger('all', null, matchingNotes);
    } else {
      request.apiGet('/api/v1/notes')
        .query({notebook_id: id})
        .query({offset: offset, limit: limit})
        .end(function(error, res) {
          if (error) return this.trigger('all', error);

          this.append(res.body.items);
          this.trigger('all', null, this.where('id', id));
        }.bind(this));
    }
  },

  fetchNote: function(id) {
    var note = R.find(R.propEq('id', id), this.notes);
    if (note) {
      this.trigger('one', null, note);
    } else {
      request.apiGet('/api/v1/notes/' + id)
        .end(function(error, res) {
          if (error) return this.trigger('one', error);

          this.append([res.body]);
          this.trigger('one', null, res.body);
        }.bind(this));
    }
  },

  createNote: function(name, content, notebookId) {
    request.apiPost('/api/v1/notes')
      .send({
        name: name,
        content: content,
        notebook_id: notebookId
      })
      .end(function(error, res) {
        if (error) return this.trigger('created', error);

        this.append([res.body]);
        this.trigger('created', null, res.body);
      }.bind(this));
  }
});

module.exports = NotesStore;
