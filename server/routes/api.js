var r       = require('rethinkdb');
var express = require('express');

var router = express.Router();

router.get('/notebooks', function(req, res, next) {
  var c = req.rdbConnection;
  var total = 0;
  var limit = parseInt(req.query.limit);
  var offset = parseInt(req.query.offset);
  var filter = {owner: req.user.email};

  r.table('notebooks').filter(filter).count().run(c).then(function(result) {
    total = result;
  }).then(function() {
    return r.table('notebooks')
      .getAll(req.user.email, {index: 'owner'})
      .orderBy('name').limit(limit)
      .skip(offset).run(c);
  }).then(function(cursor) {
    return cursor.toArray();
  }).then(function(results) {
    res.status(200).json({
      items: results,
      limit: limit,
      offset: offset,
      total: total
    });
  }).error(next);
});

router.post('/notebooks', function(req, res, next) {
  if (!req.body.name || req.body.name == '') {
    res.status(400).send({
      error: 'Missing name parameter'
    });
  } else {
    var notebook = {
      name: String(req.body.name),
      owner: req.user.email
    };

    var i = r.table('notebooks')
      .insert(notebook, {returnChanges: true})
      .run(req.rdbConnection);
    i.then(function(result) {
      res.status(201).json(result.changes[0].new_val);
    }).error(next);
  }
});

router.get('/notebooks/:id', function(req, res, next) {
  if (!req.params.id) {
    res.status(400).json({
      message: 'Missing id parameter'
    });
  } else {
    var q = r.table('notebooks').get(req.params.id).run(req.rdbConnection);
    q.then(function(result) {
      if (!result || result.owner !== req.user.email) {
        res.status(404).json({
          message: 'Couln\'t find a notebook with id ' + req.params.id
        });
      } else {
        res.status(200).json(result);
      }
    }).error(next);
  }
});

module.exports = router;
