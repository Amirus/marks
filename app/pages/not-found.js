'use strict';
var React = require('react');

var NotFoundPage = React.createClass({
  render: function() {
    return <div className="error-page">
      <h1>404</h1>
      <p>This page could not be found!</p>
    </div>;
  }
});

module.exports = NotFoundPage;
