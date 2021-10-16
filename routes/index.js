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

/* GET a list of all the restaurants */
router.get('/restaurants', restaurantController.index);

/* GET a restaurant given its id */
router.get('/restaurants/:id', restaurantController.show);

/* POST a restaurant */
router.post('/restaurants', restaurantController.create);

/* PUT a restaurant */
router.put('/restaurants/:id', restaurantController.update);

module.exports = router;
