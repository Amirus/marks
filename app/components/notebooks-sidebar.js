'use strict';
var R      = require('ramda');
var React  = require('react');

var NotebooksSidebar = React.createClass({
  render: function() {
    return <div>
      {R.map(function(n) { return <p key={n.id}>{n.name}</p>; }, this.props.notebooks)}
    </div>;
  }
});

module.exports = NotebooksSidebar;
