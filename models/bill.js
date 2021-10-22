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
      Bill.belongsToMany(models.Item, { through: models.ItemBill });
      Bill.belongsToMany(models.Restaurant, { through: models.RestaurantBill });
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
      type: DataTypes.DATE
    },
    total: {
      type: DataTypes.DOUBLE
    },
    tip: {
      type: DataTypes.DOUBLE
    },
    done: {
      type: DataTypes.BOOLEAN
    },
    customerId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    tableNumber: {
      allowNull: false,
      default: 0,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};