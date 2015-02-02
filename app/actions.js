'use strict';
var Reflux = require('./lib/reflux');

// Create all actions for app, centralized here so we have on place to look for
module.exports = {
  loadNotebooks:  Reflux.createAction(),
  loadNotebook:   Reflux.createAction(),
  createNotebook: Reflux.createAction(),
  deleteNotebook: Reflux.createAction(),

  loadNotes:      Reflux.createAction(),
  loadNote:       Reflux.createAction(),
  createNote:     Reflux.createAction(),
  deleteNote:     Reflux.createAction()
};
