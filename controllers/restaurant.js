const Restaurant = require('../models').Restaurant;

module.exports = {
  index(_, res) {
    Restaurant.findAll({})
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error))
  },

  show(req, res) {
    const id = req.params.id;

    Restaurant.findByPk(id)
      .then(data => {
        if (data) res.send(data)
        else res.status(404).send({ message: "Cannot find the restaurant with the given id"});
      })
      .catch(error => res.status(500).send(`Error retrieving the restaurant with the id: ${id}`))
  },

  create(req, res) {
    const restaurant_attributes = req.body;
    Restaurant.create(restaurant_attributes)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((error) => {
        res.status(422).send({
          message: error.message || "Some error ocurred while creating the restaurant"
        })
        return res;
      })
  },

  update(req, res) {
    const id = req.params.id;

    Restaurant.update(req.body, {
      where: { id: id },
      returning: true,
      plain: true
    })
      .then((data) => {
        res.status(200).send(data[1]);
      })
      .catch((error) => {
        res.status(422).send({
          message: error.message || "Some error ocurred while updating the restaurant"
        })
      })
  }
}