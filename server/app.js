'use strict';
var path       = require('path');
var express    = require('express');
var bodyParser = require('body-parser');

var host = '0.0.0.0';
var port = process.env.PORT || 8080;

var app = express();

require('./lib/config').init(app);

// Lib helpers required here to have config in process.env
require('./lib/redis-session').init(app);
require('./lib/passport').init(app);
var rethinkdb = require('./lib/rethinkdb');

// Set up app session and express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.use(require('./lib/logger').requestLogger);
app.use(rethinkdb.connectMiddleware);
app.use(require('./routes'));
app.use(rethinkdb.disconnectMiddleware);

// Error handling
require('./lib/errors-handler').init(app);

// Open DB connection and make sure tables and indexes exist
rethinkdb.init([{
  name: 'notebooks',
  indexes: ['name']
}, {
  name: 'notes',
  indexes: ['name']
}], function(err) {
  if (err) {
    console.error(err);
    return process.exit(1);
  }
  console.log('listening on port ' + port);
  app.listen(port, host);
});
