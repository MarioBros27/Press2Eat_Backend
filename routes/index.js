var express = require('express');
var router = express.Router();
const customerController = require('../controllers/customer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET a list of all the customers */
router.get('/customers', customerController.index);

module.exports = router;
