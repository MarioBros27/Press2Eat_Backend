'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ItemBill.init({
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    }, 
    itemId: DataTypes.UUID,
    billId: DataTypes.UUID,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending"
    }
  }, {
    sequelize,
    modelName: 'ItemBill',
  });
  return ItemBill;
};