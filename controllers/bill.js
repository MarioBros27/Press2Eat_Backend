const Bill = require('../models').Bill;
const ItemBill = require('../models').ItemBill;
const Item = require('../models').Item;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  index(req, res) {
    const restaurantId = req.query.restaurantId;
    const customerId = req.query.customerId;
    const filters = {};

    filters.restaurantId = restaurantId ? { restaurantId: restaurantId } : {} 
    filters.customerId = customerId ? { customerId: customerId } : {}
    filters.all = !(restaurantId || customerId) ? { id: { [Op.not]: null } } : { }

    Bill.findAll({
      where: {
        [Op.or]: [
          filters.restaurantId,
          filters.customerId,
          filters.all
        ]
      },
      include: {
        model: Item,
        through: { attributes: [] }
      }
    })
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error))
  },

  show(req, res) {
    const id = req.params.id;

    Bill.findByPk(id, { 
      include: { 
        model: Item,
        through: { attributes: [] }
      } 
    })
      .then(data => {
        if(data) res.status(200).send(data)
        else res.status(404).send({ message: 'Cannot find the bill with the given id'})
      })
      .catch(_ => res.status(500).send({ message: `Error retrieving the bill with the id: ${id}`}))
  },

  create(req, res) {
    const bill_attributes = req.body;

    Bill.create(bill_attributes)
      .then(data => res.status(201).send(data))
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error occurred while creating the bill"
        })
      })
  },

  update(req, res) {
    const id = req.params.id;

    Bill.update(req.body, {
      where: { id: id },
      returning: true,
      plain: true,
      include: {
        model: Item
      }
    })
      .then(data => res.status(200).send(data[1]))
      .catch(errror => {
        res.status(422).send({
          message: error.message || "Some error occurred while updating the bill"
        })
      })
  },

  addItems(req, res) {
    const id = req.params.id;
    const itemIds = req.body.itemIds;
    var itemBills = [];

    Bill.findByPk(id)
      .then(data => {
        if (!data) res.status(404).send({ message: "Cannot find the bill with the given id"})
      })
      .catch(_ => res.status(500).send({ message: `Error retrieving the bill with the id ${id}`}))

    itemIds.forEach(itemId => {
      itemBills.push({ itemId: itemId, billId: id })
    });

    ItemBill.bulkCreate(itemBills)
      .then(_ => {
        Bill.findByPk(id, { 
          include: { 
            model: Item,
            through: { attributes: [] }
          } 
        })
          .then(data => res.status(200).send(data))
      })
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error ocurred while adding the items to the bill"
        })
      })
  }
}