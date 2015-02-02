'use strict';
var R      = require('ramda');
var React  = require('react');

var Actions           = require('../actions');
var NotebooksStore    = require('../stores/notebooks');
var LayoutWithSidebar = require('../components/layout-with-sidebar');

var NotebookPage = React.createClass({
  getInitialState: R.always({notebook: null}),
  componentDidMount: function() {
    this.unsubscribe = NotebooksStore.listen(function(action, error, data) {
      if (error) return alert(error.message);

      switch (action) {
        case 'one':
          this.setState({notebook: data});
          break;
      }
    }, this);

    // Trigger notebook load
    Actions.loadNotebook(this.props.id);
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },

  render: function() {
    var notebook = this.state.notebook;

    return (
      <LayoutWithSidebar>
        {notebook ? (
          <h1 className="page-title">{notebook.name}</h1>
        ) : <div>Loading...</div>}
      </LayoutWithSidebar>
    );
  }
});

module.exports = NotebookPage;
