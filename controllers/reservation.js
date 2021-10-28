const Reservation = require('../models').Reservation;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  index(req, res) {
    const customerId = req.query.customerId;
    const restaurantId = req.query.restaurantId;
    const filters = {};

    filters.customerId = customerId ? { customerId: customerId } : { }
    filters.restaurantId = restaurantId ? { restaurantId: restaurantId } : { }
    filters.all = !(customerId || restaurantId) ? { customerId: { [Op.not]: null } } : { }

    Reservation.findAll({
      where: {
        [Op.or]: [
          filters.customerId,
          filters.restaurantId,
          filters.all
        ]
      }
    })
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error))
  },

  show(req, res) {
    const id = req.params.id;

    Reservation.findByPk(id)
      .then(data => {
        if (data) res.status(200).send(data)
        else res.status(404).send({ message: "Cannot find the reservation with the given id" });
      })
      .catch(_ => res.status(500).send({ message: `Error retrieving the reservation with the id: ${id}` }))
  },
  
  create(req, res) {
    const reservation_attributes = req.body;

    Reservation.create(reservation_attributes)
      .then(data => res.status(201).send(data))
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error occurred while creating the reservation"
        })
      })
  },

  update(req, res) {
    const id = req.params.id;

    Reservation.update(req.body, {
      where: { id: id },
      returning: true,
      plain: true
    })
      .then(data => res.status(200).send(data[1]))
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error occurred while updating the reservation"
        })
      })
  }
}