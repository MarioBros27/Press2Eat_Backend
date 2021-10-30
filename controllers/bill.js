const { Stripe } = require('stripe');
const Bill = require('../models').Bill;
const ItemBill = require('../models').ItemBill;
const Item = require('../models').Item;
const Restaurant = require('../models').Restaurant;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  index(req, res) {
    const restaurantId = req.query.restaurantId;
    const customerId = req.query.customerId;
    const filters = {};
    const isDone = req.query.isDone;

    filters.restaurantId = restaurantId ? { restaurantId: restaurantId } : {} 
    filters.customerId = customerId ? { customerId: customerId } : {}
    filters.all = !(restaurantId || customerId) ? { id: { [Op.not]: null } } : { }

    Bill.findAll({
      where: {
        [Op.or]: [
          filters.restaurantId,
          filters.customerId,
          filters.all
        ],
        done: isDone
      },
      include: [
        {
          model: Item,
          attributes: [ "id", "restaurantId", "name", "description", "brand", "type", "price" ], 
          through: { attributes: [ "quantity", "status"] }
        },
        {
          model: Restaurant,
          attributes: [ "name", "accountId" ]
        }
      ]
    })
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error))
  },

  show(req, res) {
    const id = req.params.id;

    Bill.findByPk(id, { 
      include: [
        {
          model: Item,
          attributes: [ "id", "restaurantId", "name", "description", "brand", "type", "price" ], 
          through: { attributes: [ "quantity", "status"] }
        },
        {
          model: Restaurant,
          attributes: [ "name" ]
        }
      ]
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
      include: [
        {
          model: Item,
          attributes: [ "id", "restaurantId", "name", "description", "brand", "type", "price" ], 
          through: { attributes: [ "quantity", "status"] }
        },
        {
          model: Restaurant,
          attributes: [ "name" ]
        }
      ]
    })
      .then(data => res.status(200).send(data[1]))
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error occurred while updating the bill"
        })
      })
  },

  addItems(req, res) {
    const id = req.params.id;
    const items = req.body.items;
    var itemBills = [];

    Bill.findByPk(id)
      .then(data => {
        if (!data) res.status(404).send({ message: "Cannot find the bill with the given id"})
      })
      .catch(_ => res.status(500).send({ message: `Error retrieving the bill with the id ${id}`}))

    items.forEach(item => {
      itemBills.push({ itemId: item.id, billId: id, quantity: item.quantity })
    });

    ItemBill.bulkCreate(itemBills)
      .then(_ => {
        Bill.findByPk(id, { 
          include: [
            {
              model: Item,
              attributes: [ "id", "restaurantId", "name", "description", "brand", "type", "price" ], 
              through: { attributes: [ "quantity", "status"] }
            },
            {
              model: Restaurant,
              attributes: [ "name" ]
            }
          ] 
        })
          .then(data => res.status(200).send(data))
      })
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error ocurred while adding the items to the bill"
        })
      })
  },

  updateItem(req, res) {
    const billId = req.params.id;
    const itemId = req.params.itemId;

    Bill.findByPk(billId)
      .then(data => {
        if (!data) res.status(404).send({ message: "Cannot find the bill with the given id"})
      })
      .catch(_ => res.status(500).send({ message: `Error retrieving the bill with the id ${billId}`}))


    ItemBill.update(req.body, {
      where: { billId: billId, itemId: itemId }
    })
      .then(_ => {
        Bill.findByPk(billId, { 
          include: [
            {
              model: Item,
              attributes: [ "id", "restaurantId", "name", "description", "brand", "type", "price" ], 
              through: { attributes: [ "quantity", "status"] }
            },
            {
              model: Restaurant,
              attributes: [ "name" ]
            }
          ] 
        })
        .then(data => res.status(200).send(data))
      })
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error ocurred while updating  the items to the bill"
        })
      });
  },

  async calculateTotal(req, res) {
    const id = req.params.id;

    Bill.findByPk(id, { 
      include: [
        {
          model: Item,
          attributes: [ "price" ], 
          through: { attributes: [ "quantity" ] }
        }
      ]
    })
      .then(bill => {
        total = 0;
        bill.Items.forEach(item => {
          total = total + (item.price * item.ItemBill.quantity)  
        })
        Bill.update(
          {
            total: total + bill.tip
          }, 
          {
            where: { id: id },
            returning: true,
            plain: true,
          }
        )
          .then(updatedBill => res.status(200).send(updatedBill[1]))
          .catch(error => res.status(422).send({ message: `There was an error computing the total of the bill. Error details: ${error}`}))
      })
      .catch(_ => res.status(500).send({ message: `Error retrieving the bill with the id: ${id}`}))
  }
}