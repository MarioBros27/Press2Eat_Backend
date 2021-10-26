const { Stripe } = require('stripe');
const { v4 } = require('uuid');

const stripe = new Stripe('sk_test_51JoHBmKi9ZxKjuTBBSIFcmkJ9w6VcSoVpNVQBD082ToZTSJ1IyFCweAm7ORSKSJDlsouQimCqLGLxUrC5MRvU9Pu00dR3OspNE',  {
  apiVersion: '2020-08-27',
})

module.exports = {
  async processPayment(req, res) {
    const { email, product, authToken } = req.body;
    const { token } = authToken;
    const { card } = token;

    console.log(card);

    console.log("============================================== payment initiate =======================")

    const userProduct = product;

    const idempotencyKey = v4();

    try {
      const customer = await stripe.customers.create({
        email: email,
        source: token.id
      })

      console.log('Customer created')
      console.log(customer)
      console.log(userProduct)

      const response = await stripe.charges.create({
        amount: userProduct.amount,
        currency: "mxn",
        customer: customer.id,
        receipt_email: email,
        description: userProduct.description
      }, { idempotencyKey: idempotencyKey })

      console.log("Charge response");
      console.log(response);

      res.json(response)
    }

    catch (err) {
      console.log("=========================================== error ==========================")
      console.log(err)
      res.json(err)
    }
  }
}