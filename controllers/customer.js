const Sequelize = require('sequelize');
const Customer = require('../models').Customer;

module.exports = {
  index(_, res) {
    return Customer.findAll({})
      .then(Customer => res.status(200).send(Customer))
      .catch(error => res.status(400).send(error))
  }
}