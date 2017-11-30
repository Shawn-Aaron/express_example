var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  var moment = require('moment'); var now = moment().begin('month').format('YYYY-MM-DD');
  res.send('respond with a resource' + now);
});

module.exports = router;
