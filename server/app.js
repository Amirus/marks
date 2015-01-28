var _          = require('lodash');
var fs         = require('fs');
var path       = require('path');
var express    = require('express');
var bodyParser = require('body-parser');
var session    = require('express-session');
var RedisStore = require('connect-redis')(session);

// Load config.json file
var config_path = path.join(__dirname, '..', 'config.json');
if (fs.existsSync(config_path)) {
  _.defaults(process.env, JSON.parse(fs.readFileSync(config_path)));
}

// Lib helpers required here to have config in process.env
var redis    = require('./redis');
var passport = require('./passport');

var host = '0.0.0.0';
var port = process.env.PORT || 8080;

var app = express();

// Set up app session and express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
  store: new RedisStore({client: redis}),
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require('./routes'));

console.log('listening on port ' + port);
app.listen(port, host);
