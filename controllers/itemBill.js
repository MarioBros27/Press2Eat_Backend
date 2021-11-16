const Bill = require('../models').Bill;
const ItemBill = require('../models').ItemBill;
const Sequelize = require('sequelize');
const Customer = require('../models').Customer;
const Item = require('../models').Item;

const Op = Sequelize.Op;

module.exports = {
    index(req, res) {
        const restaurantId = req.query.restaurantId;

        filters.restaurantId = restaurantId ? { restaurantId: restaurantId } : {}

        ItemBill.findAll({
            include: [{
                model: Bill,
                attributes: ["restaurantId"],
                where: {
                    restaurantId: restaurantId
                },
                include: [
                    {
                        model: Customer,
                        attributes: ["firstName", "lastName"]

                    }
                ]
            }
            ]
        })
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error))
    },

    byRestaurant(req, res) {
        const restaurantId = req.query.restaurantId;

        filters.restaurantId = restaurantId ? { restaurantId: restaurantId } : {}

        ItemBill.findAll({
            include: [{
                model: Bill,
                attributes: ["restaurantId","tableNumber","checkIn","done"],
                where: {
                    restaurantId: restaurantId
                },
                include: [
                    {
                        model: Customer,
                        attributes: ["firstName", "lastName"]

                    },
                    {
                        model: Item,
                        attributes: ["name"]

                    }
                ]
            }
            ]
        })
            .then(data => res.status(200).send(data))
            .catch(error => res.status(400).send(error))
    },
    byCustomer(req, res) {

    },


    update(req, res) {
        const billId = req.params.id;

        ItemBill.findByPk(billId)
            .then(data => {
                if (!data) res.status(404).send({ message: "Cannot find the itembill with the given id" })
            })
            .catch(_ => res.status(500).send({ message: `Error retrieving the itembill with the id ${billId}` }))


        ItemBill.update(req.body, {
            where: { id: billId },
            returning: true,
            plain: true
        })
            .then(data => res.status(200).send(data[1]))
            .catch(error => {
                res.status(422).send({
                    message: error.message || "Some error occurred while updating the itembill"
                })
            })
    }

    //   addItems(req, res) {
    //     const id = req.params.id;
    //     const items = req.body.items;
    //     var itemBills = [];

    //     Bill.findByPk(id)
    //       .then(data => {
    //         if (!data) res.status(404).send({ message: "Cannot find the bill with the given id"})
    //       })
    //       .catch(_ => res.status(500).send({ message: `Error retrieving the bill with the id ${id}`}))

    //     items.forEach(item => {
    //       itemBills.push({ itemId: item.id, billId: id, quantity: item.quantity,status: item.status })
    //     });
    //     ItemBill.bulkCreate(itemBills)
    //       .then(_ => {
    //         Bill.findByPk(id, { 
    //           include: { 
    //             model: Item,
    //             through: { attributes: [ "quantity", "status"] }
    //           } 
    //         })
    //           .then(data => res.status(200).send(data))
    //       })
    //       .catch(error => {
    //         res.status(422).send({
    //           message: error.message || "Some error ocurred while adding the items to the bill"
    //         })
    //       })
    //   },


}