'use strict';
var React  = require('react');

var LayoutWithSidebar = require('../components/layout-with-sidebar');

var IndexPage = React.createClass({
  render: function() {
    return (
      <LayoutWithSidebar>
        <h1 className="page-header">Notes</h1>
      </LayoutWithSidebar>
    );
  }
});

module.exports = IndexPage;
