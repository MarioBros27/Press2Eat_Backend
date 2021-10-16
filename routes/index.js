var express = require('express');
var router = express.Router();
const customerController = require('../controllers/customer');
const restaurantController = require('../controllers/restaurant');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET a list of all the customers */
router.get('/customers', customerController.index);

/* GET a given customer given their id */
router.get('/customers/:id', customerController.show);

/* POST a customer */
router.post('/customers', customerController.create);

/* PUT a customer */
router.put('/customers/:id', customerController.update);

/* GET a list of all the restaurants */
router.get('/restaurants', restaurantController.index);

/* GET a restaurant given its id */
router.get('/restaurants/:id', restaurantController.show);

/* POST a restaurant */
router.post('/restaurants', restaurantController.create);

/* PUT a restaurant */
router.put('/restaurants/:id', restaurantController.update);

module.exports = router;
