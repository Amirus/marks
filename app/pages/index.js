'use strict';
var R      = require('ramda');
var React  = require('react');

var Actions          = require('../actions');
var NotebooksStore   = require('../stores/notebooks');
var Layout           = require('../components/layout');
var NotebooksSidebar = require('../components/notebooks-sidebar');

var IndexPage = React.createClass({
  getInitialState: R.always({notebooks: null}),
  componentDidMount: function() {
    this.unsubscribe = NotebooksStore.listen(function(notebooks) {
      this.setState({notebooks: notebooks});
    }, this);

    // Trigger notebooks load
    Actions.loadNotebooks();
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },

  handleNotebookSelect: function() {
    
  },

  render: function() {
    if (this.state.notebooks == null) {
      return <div className="loading-placeholder">Loading ...</div>;
    }
    return (
      <Layout>
        <NotebooksSidebar notebooks={this.state.notebooks} onNotebookSelect={this.handleNotebookSelect} />
        <section className="page-contents">
          <h1 className="page-header">Notes</h1>
        </section>
      </Layout>
    );
  }
});

module.exports = IndexPage;
