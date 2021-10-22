'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RestaurantBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RestaurantBill.init({
    restaurantId: DataTypes.UUID,
    billId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'RestaurantBill',
  });
  return RestaurantBill;
};