'use strict';
var R      = require('ramda');
var React  = require('react');

var NotebooksSidebar = React.createClass({
  render: function() {
    return <aside className="sidebar">
      <h1 className="page-header">Notebooks</h1>
      <div className="notebook-links">
        {R.map(function(n) { return (

            <a key={n.id} onClick={this.props.onNotebookSelect(n.id)}>{n.name}</a>

        ); }.bind(this), this.props.notebooks)}
      </div>
      <a className="add-notebook" onClick={this.props.onNotebookAdd}>&#x271a; New notebook</a>
    </aside>;
  }
});

module.exports = NotebooksSidebar;
