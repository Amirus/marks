var r       = require('rethinkdb');
var express = require('express');

var router = express.Router();

router.get('/notebooks', function(req, res, next) {
  var c = req.rdbConnection;
  var total = 0;
  var limit = parseInt(req.query.limit);
  var offset = parseInt(req.query.offset);

  r.table('notebooks').count().run(c).then(function(result) {
    total = result;
  }).then(function() {
    return r.table('notebooks')
      .oderBy('name').limit(limit)
      .skip(offset).run(c);
  }).then(function(cursor) {
    return cursor.toArray();
  }).then(function(results) {
    res.json({
      items: results,
      limit: limit,
      offset: offset,
      total: total
    });
  }).error(next);
});

module.exports = router;
