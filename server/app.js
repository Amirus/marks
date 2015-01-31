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

// Set up app session and express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.use(require('./routes'));

// Error handling
require('./lib/errors-handler').init(app);

console.log('listening on port ' + port);
app.listen(port, host);
