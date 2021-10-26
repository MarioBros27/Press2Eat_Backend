const { Stripe } = require('stripe');
const { v4 } = require('uuid');

const stripe = new Stripe('sk_test_51JoDVgBMpX7MLTCTYDehjyeT3yOj6W57YL6BWuowhC5ai7kJ2iOiYJmEGMhFqPZQVhVsysowXZMaJoMOrO9ZzL1T00pQ69sr5R',  {
  apiVersion: '2020-08-27',
})

module.exports = {
  async processPayment(req, res) {

    console.log(req.body.amount);
    console.log(req.body.stripeAccount);

    try{
      const _ = await stripe.paymentIntents.create({
        payment_method_types: ['card'],
        amount: req.body.amount,
        currency: 'mxn',
        application_fee_amount: 1,
      }, {
        stripeAccount: req.body.stripeAccount
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