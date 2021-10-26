const BankAccount = require('../models').BankAccount;

module.exports = {
  index(req, res) {
    const restaurantId = req.params.restaurantId;

    BankAccount.findAll({
      where: {
        restaurantId: restaurantId
      }
    })
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error))
  },

  show(req, res) {
    const id = req.params.id;

    BankAccount.findByPk(id)
      .then(data => {
        if (data) res.status(200).send(data)
        else res.status(404).send({ message: "Cannot find the bank account with the given id" });
      })
      .catch(_ => res.status(500).send({ message: `Error retrieving the reservation with the id: ${id}` }))
  },

  create(req, res) {
    const restaurantId = req.params.restaurantId;
    const bank_account_attributes = req.body;
    bank_account_attributes.restaurantId = restaurantId;

    BankAccount.create(bank_account_attributes)
      .then(data => res.status(201).send(data))
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error occurred while creating the bank account"
        })
      })
  },

  update(req, res) {
    const id = req.params.id;

    BankAccount.update(req.body, {
      where: { id: id },
      returning: true,
      plain: true
    })
      .then(data => res.status(200).send(data[1]))
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error occurred while updating the bank account"
        })
      })
  }
}