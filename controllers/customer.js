const Sequelize = require('sequelize');
const Customer = require('../models').Customer;

module.exports = {
  index(_, res) {
    return Customer.findAll({})
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error))
  },

  show(req, res) {
    const id = req.params.id;

    Customer.findByPk(id)
      .then((data) => {
        if (data) res.status(200).send(data)
        else res.status(404).send({ message: "Cannot find the customer with the given id" });
      })
      .catch(_ => res.status(500).send({ message: `Error retrieving the restaurant with the id: ${id}` }))
  },

  create(req, res) {
    const customer_attributes = req.body;
    Customer.create(customer_attributes)
      .then((data) => res.status(201).send(data))
      .catch((error) => {
        res.status(422).send({
          message: error.message || "Some error occurred while creating the customer"
        })
      })
  },

  update(req, res) {
    const id = req.params.id;

    Customer.update(req.body, {
      where: { id: id },
      returning: true,
      plain: true
    })
      .then((data) => {
        res.status(200).send(data[1]);
      })
      .catch((error) => {
        res.status(422).send({
          message: error.message || "Some error occurred while updating the customer"
        })
      })
  }


}