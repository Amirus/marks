'use strict';
var R      = require('ramda');
var React  = require('react');

var NotebooksSidebar = React.createClass({
  render: function() {
    return <aside className="sidebar">
      <h1 className="page-header">Notebooks</h1>
      {R.map(function(n) { return <p key={n.id}>{n.name}</p>; }, this.props.notebooks)}
    </aside>;
  }
});

module.exports = NotebooksSidebar;
