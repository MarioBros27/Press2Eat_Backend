'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bill.belongsTo(models.Customer, { foreignKey: 'customerId' });
      Bill.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' });
      Bill.belongsToMany(models.Item, { through: models.ItemBill, foreignKey: 'billId' });
    }
  };
  Bill.init({
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    },
    checkIn: {
      allowNull: false,
      defaultValue: new Date(),
      type: DataTypes.DATE
    },
    total: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0
    },
    tip: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    customerId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    restaurantId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    tableNumber: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};