var express = require('express');
var router = express.Router();
const phoneNumberController = require('../controllers/phoneNumber');
const billController = require('../controllers/bill');
const customerController = require('../controllers/customer');
const internalUserController = require('../controllers/internalUser');
const itemController = require('../controllers/item');
const paymentController = require('../controllers/payments');
const paymentProcessingController = require('../controllers/paymentProcessing');
const reservationController = require('../controllers/reservation');
const restaurantController = require('../controllers/restaurant');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET a list of all the bills filtered by customer or restaurant */
router.get('/bills', billController.index);

/* GET a bill given its id */
router.get('/bills/:id', billController.show);

/* POST a bill */
router.post('/bills', billController.create);

/* PUT a bill */
router.put('/bills/:id', billController.update);

/* POST a collection of items associated to a bill */
router.post('/bills/:id/addItems', billController.addItems);

/* PUT a given item associated to a bill */
router.put('/bills/:id/updateItem/:itemId', billController.updateItem);

/* GET a list of all the customers */
router.get('/customers', customerController.index);

/* GET a customer given their id */
router.get('/customers/:id', customerController.show);

/* POST a customer */
router.post('/customers', customerController.create);

/* PUT a customer */
router.put('/customers/:id', customerController.update);

/* GET a list of all the internal users */
router.get('/internalUsers', internalUserController.index);

/* GET an internal user given their id */
router.get('/internalUsers/:id', internalUserController.show);

/* POST an internal user */
router.post('/internalUsers', internalUserController.create);

/* PUT an internal user */
router.put('/internalUsers/:id', internalUserController.update);

/* Process a payment */ 
router.post('/processPayments', paymentProcessingController.processPayment);

/* GET a list of all the payments filtered by bill or customer */
router.get('/payments', paymentController.index);

/* GET a payment */
router.get('/payments/:id', paymentController.show);

/* POST a payment */
router.post('/payments', paymentController.create);

/* PUT a payment */
router.put('/payments/:id', paymentController.update);

/* GET the phone numbers linked to a restaurant */
router.get('/restaurants/:restaurantId/phoneNumbers', phoneNumberController.index);

/* GET a phone number linked to a restaurant */
router.get('/restaurants/:restaurantId/phoneNumbers/:id', phoneNumberController.show);

/* POST a phone number linked to a restaurant */
router.post('/restaurants/:restaurantId/phoneNumbers', phoneNumberController.create);

/* PUT a phone number linked to a restaurant */
router.put('/restaurants/:restaurantId/phoneNumbers/:id', phoneNumberController.update);

/* GET a list of all restaurant items */
router.get('/restaurants/:restaurantId/items', itemController.index);

/* GET a restaurant item given its id */
router.get('/restaurants/:restaurantId/items/:id', itemController.show);

/* POST a new restaurant item */
router.post('/restaurants/:restaurantId/items', itemController.create);

/* PUT an existing restaurant item */
router.put('/restaurants/:restaurantId/items/:id', itemController.update);

/* GET a list of all the reservations filtered by customer or restaurant */
router.get('/reservations', reservationController.index);

/* GET a reservation given its id */
router.get('/reservations/:id', reservationController.show);

/* POST a reservation */
router.post('/reservations', reservationController.create);

/* PUT a reservation */
router.put('/reservations/:id', reservationController.update);

/* GET a list of all the restaurants */
router.get('/restaurants', restaurantController.index);

/* GET a restaurant given its id */
router.get('/restaurants/:id', restaurantController.show);

/* POST a restaurant */
router.post('/restaurants', restaurantController.create);

/* PUT a restaurant */
router.put('/restaurants/:id', restaurantController.update);

module.exports = router;
