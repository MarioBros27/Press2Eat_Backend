const { Stripe } = require('stripe');
const Bill = require('../models').Bill;
const Restaurant = require('../models').Restaurant;

const stripe = new Stripe('sk_test_51JoDVgBMpX7MLTCTYDehjyeT3yOj6W57YL6BWuowhC5ai7kJ2iOiYJmEGMhFqPZQVhVsysowXZMaJoMOrO9ZzL1T00pQ69sr5R',  {
  apiVersion: '2020-08-27',
})

module.exports = {
  async processPayment(req, res) {
    const billId = req.query.billId;
    const restaurantId = req.query.restaurantId;

    const bill = await Bill.findByPk(billId);
    const restaurant = await Restaurant.findByPk(restaurantId);

    try{
      const _ = await stripe.paymentIntents.create({
        payment_method_types: ['card'],
        amount: bill.total * 100,
        currency: 'mxn',
        application_fee_amount: 1,
      }, {
        stripeAccount: restaurant.accountId
      })
        .then(response => res.status(200).send(response))
        .catch(error => res.status(422).send({ message: `It was not possible to create the payment intent due to ${error}` }))
    }
    catch (err) {
      console.log("======================= ERROR ==========================")
      console.log(err)
      res.json(err)
    }
  }
}