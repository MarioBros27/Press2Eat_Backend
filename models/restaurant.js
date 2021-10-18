'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Restaurant.hasMany(models.Reservation, { foreignKey: 'restaurantId'});
    }
  };
  Restaurant.init({
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    totalCapacity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    occupiedCapacity: {
      type: DataTypes.INTEGER
    },
    street: {
      allowNull: false,
      type: DataTypes.STRING
    },
    externalNumber: {
      allowNull: false,
      type: DataTypes.STRING
    },
    internalNumber: {
      type: DataTypes.STRING
    },
    suburb: {
      allowNull: false,
      type: DataTypes.STRING
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};