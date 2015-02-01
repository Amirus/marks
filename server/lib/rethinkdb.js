'use strict';
var url   = require('url');
var async = require('async');
var r     = require('rethinkdb');

var internals = {};

internals.config = function() {
  var rethinkdb_url = url.parse(
    process.env.RETHINKDB_URL ||
    'rethinkdb://localhost:28015/marks'
  );
  return {
    host: rethinkdb_url.hostname,
    port: rethinkdb_url.port,
    authKey: rethinkdb_url.auth || '',
    db: rethinkdb_url.pathname.slice(1)
  };
};

// Middleware to `.use` before any http handler
internals.connectMiddleware = function(req, res, next) {
  r.connect(internals.config(), function(err, conn) {
    if (err) return next(err);
    req.rdbConnection = conn;
    next();
  });
};

// Middleware to `.use` after all http handlers that closes rdb conns
internals.disconnectMiddleware = function(req, res, next) {
  req.rdbConnection.close(function(err) {
    next(err);
  });
};

// Takes an Array of objects that have a name and indexes:
// [{
//   name: 'todos',
//   indexes: ['createdAt']
// }]
//
// Will ensure configured database exist, all tables exist,
// all indexes are created and wait for them to complete then
// callback, or, callback early if an error occurs in the process
internals.init = function(tableStructure, callback) {
  var config = internals.config();

  async.auto({
    // Connect to RethinkDB
    connection: function(step) {
      r.connect(config, step);
    },

    // Retrive database list
    databaseList: ['connection', function(step, results) {
      r.dbList().run(results.connection, step);
    }],

    // Create database as configured only if it's not
    // already existing
    createDbIfNotExist: ['databaseList', function(step, results) {
      if (results.databaseList.indexOf(config.db) === -1) {
        console.log('[RethinkDB] Creating database ' + config.db);
        r.dbCreate(config.db).run(results.connection, step);
      } else {
        console.log('[RethinkDB] Database ' + config.db + ' exists');
        step();
      }
    }],

    // Get a list of table so we can skip creation of
    // exiting ones
    tableList: ['createDbIfNotExist', function(step, results) {
      r.tableList().run(results.connection, step);
    }],

    // For each table definition passed
    // - create table if needed
    // - create indexes and wait for completion
    createTables: ['tableList', function(step, results) {
      console.log('[RethinkDB] Existing tables: [' + results.tableList.join(', ') + ']');
      async.each(tableStructure, function(tableDefinition, nextItem) {
        async.waterfall([
          // If table doesn't exist yet, create it
          function(cb) {
            if (results.tableList.indexOf(tableDefinition.name) === -1) {
              console.log('[RethinkDB] Creating table ' + tableDefinition.name);
              r.tableCreate(tableDefinition.name).run(results.connection, cb);
            } else { cb(null, null); }
          },

          // Gather the existing indexes for current table
          function(lastResult, cb) {
            r.table(tableDefinition.name).indexList().run(results.connection, cb);
          },

          // Now the main course, create indexes and wait for them if they do
          // not already exist for table
          function(existingIndexes, cb) {
            // Go one level deeper, indexes is an array
            async.each(tableDefinition.indexes, function(index, nextIndex) {
              if (existingIndexes.indexOf(index) === -1) {
                // Ok, now whatever, wont use an other asyns.waterfall or series
                // let's use plain callbacks
                console.log('[RethinkDB] Table ' + tableDefinition.name + ': Creating index ' + index);
                r.table(tableDefinition.name).indexCreate(index)
                  .run(results.connection, function(err) {
                    if (err) return nextIndex(err);
                    r.table(tableDefinition.name).indexWait(index)
                      .run(results.connection, nextIndex);
                  });
              } else { nextIndex(); }
            }, cb);
          }
        ], nextItem);
      }, step);
    }]
  }, function(err, results) {
    results.connection.close(function(closeErr) {
      callback(closeErr || err);
    });
  });
};

module.exports = internals;
