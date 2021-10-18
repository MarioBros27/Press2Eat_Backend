const Item = require('../models').Item;

module.exports = {
  index(req, res) {
    const restaurantId = req.params.restaurantId;

    Item.findAll({
      where: {
        restaurantId: restaurantId
      }
    })
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error))
  },

  show(req, res) {
    const restaurantId = req.params.restaurantId;
    const id = req.params.id;

    Item.findOne({
      where: {
        id: id,
        restaurantId: restaurantId
      }
    })
      .then(data => {
        if (data) res.status(200).send(data)
        else res.status(404).send({ message: "Cannot find the item with the given id" });
      })
      .catch(_ => res.status(500).send({ message: `Error retrieving the item with the id: ${id}` }))
  },

  create(req, res) {
    const restaurantId = req.params.restaurantId;
    const item_attributes = req.body;
    item_attributes.restaurantId = restaurantId;

    Item.create(item_attributes)
      .then(data => res.status(201).send(data))
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error occurred while creating the item"
        })
      })
  },

  update(req, res) {
    const restaurantId = req.params.restaurantId;
    const id = req.params.id;

    Item.update(req.body, {
      where: { 
        id: id,
        restaurantId: restaurantId 
      },
      returning: true,
      plain: true
    })
      .then(data => res.status(200).send(data[1]))
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error occurred while updating the item"
        })
      })
  }
}