'use strict';
var React = require('react');

var Layout = React.createClass({
  render: function() {
    return (
      <div className="container">
        <header className="header">
          <section className="header-top">
            <div className="header-top-logo">
              <img src="/img/logo.png" />
            </div>
            <nav className="header-top-navigation">
              <a>
                {CONFIG.user_email}
              </a>
              <a href="/auth/logout">Logout</a>
            </nav>
          </section>
          <nav className="header-navigation">
            <div className="header-navigation-title">
              Marks &rarr;
            </div>
            <div className="header-navigation-links">
              <a href="#/">Home</a>
            </div>
          </nav>
        </header>
        <section className="content">
          {this.props.children}
        </section>
        <footer className="footer">
          Marks [By Frederic Gingras], MIT Licensed,
          [<a href="https://github.com/kiasaki/marks">GitHub</a>]
        </footer>
      </div>
    );
  }
});

module.exports = Layout;
