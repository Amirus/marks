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
    this.unsubscribe = NotebooksStore.listen(function(action, error, data) {
      if (error) return alert(error.message);
      switch (action) {
        case 'all':
          this.setState({notebooks: data});
          break;
        case 'created':
          window.router.navigate('/notebooks/' + id);
          break;
      }
    }, this);

    // Trigger notebooks load
    Actions.loadNotebooks();
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },

  handleNotebookSelect: R.curry(function(id, event) {
    window.router.navigate('/notebooks/' + id);
  }),

  handleNotebookAdd: function() {
    var nbName = window.prompt('Type the new notebook\'s name:', 'Travel notes');

    if (nbName !== null && nbName !== '') {
      Actions.createNotebook(nbName);
    } else if (nbName === '') {
      alert('You can\'t create a notebook without a name!');
    } // else do nothing user cancelled
  },

  render: function() {
    if (this.state.notebooks == null) {
      return <div className="loading-placeholder">Loading ...</div>;
    }
    return (
      <Layout>
        <NotebooksSidebar
          notebooks={this.state.notebooks}
          onNotebookSelect={this.handleNotebookSelect}
          onNotebookAdd={this.handleNotebookAdd}
        />
        <section className="page-contents">
          <h1 className="page-header">Notes</h1>
        </section>
      </Layout>
    );
  }
});

module.exports = IndexPage;
