'use strict';
var R      = require('ramda');
var React  = require('react');

var Actions    = require('../actions');
var NotesStore = require('../stores/notes');

var NoteList = React.createClass({
  getInitialState: R.always({notes: null}),
  componentDidMount: function() {
    this.unsubscribe = NotesStore.listen(function(action, error, data) {
      if (error) return alert(error.message);
      if (action === 'all') this.setState({notes: data});
    }, this);

    // Trigger notes load
    Actions.loadNotes(this.props.notebook_id);
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },

  render: function() {
    var content;
    if (!this.state.notes) {
      content = <div className="boxed-message">Loading notes...</div>;
    } else if (this.state.notes.length === 0) {
      content = <div className="boxed-message">This notebook contains nothing at the moment!</div>;
    } else {
      content = <div>Notes</div>
    }

    return content;
  }
});

module.exports = NoteList;
