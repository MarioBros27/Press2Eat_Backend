const PhoneNumber = require('../models').PhoneNumber;

module.exports = {
  index(req, res) {
    const restaurantId = req.params.restaurantId;

    PhoneNumber.findAll({
      where: {
        restaurantId: restaurantId
      }
    })
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error))
  },

  show(req, res) {
    const id = req.params.id;

    PhoneNumber.findByPk(id)
      .then(data => {
        if (data) res.status(200).send(data)
        else res.status(404).send({ message: "Cannot find the phone number with the given id" });
      })
      .catch(_ => res.status(500).send({ message: `Error retrieving the phone number with the id: ${id}` }))
  },

  create(req, res) {
    const restaurantId = req.params.restaurantId;
    const phone_number_attributes = req.body;
    phone_number_attributes.restaurantId = restaurantId;

    PhoneNumber.create(phone_number_attributes)
      .then(data => res.status(201).send(data))
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error occurred while creating the phone number"
        })
      })
  },

  update(req, res) {
    const id = req.params.id;

    PhoneNumber.update(req.body, {
      where: { id: id },
      returning: true,
      plain: true
    })
      .then(data => res.status(200).send(data[1]))
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error occurred while updating the phone number"
        })
      })
  }
}