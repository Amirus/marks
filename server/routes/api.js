var R       = require('ramda');
var uuid    = require('uuid');
var express = require('express');

var router = express.Router();

function dummyNotebook() {
  return {
    id: uuid.v4(),
    name: 'Notebook ' + Math.round(Math.random()*100)
  };
}

router.get('/notebooks', function(req, res) {
  res.json({
    items: R.times(dummyNotebook, 4),
    limt: 20,
    offset: 0,
    total: 4
  });
});

module.exports = router;
