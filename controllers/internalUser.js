const InternalUser = require('../models').InternalUser;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  index(req, res) {
    InternalUser.findAll({})
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error))
  },

  show(req, res) {
    const id = req.params.id;

    InternalUser.findByPk(id)
      .then(data => {
        if (data) res.status(200).send(data)
        else res.status(404).send({ message: "Cannot find the internal user with the given id" });
      })
      .catch(_ => res.status(500).send({ message: `Error retrieving the internal user with the id: ${id}` }))
  },

  create(req, res) {
    const internal_user_attributes = req.body;

    InternalUser.create(internal_user_attributes)
      .then(data => res.status(201).send(data))
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error occurred while creating the internal user"
        })
      })
  },

  update(req, res) {
    const id = req.params.id;

    InternalUser.update(req.body, {
      where: { id: id },
      returning: true,
      plain: true
    })
      .then(data => res.status(200).send(data[1]))
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error occurred while updating the internal user"
        })
      })
  }
}