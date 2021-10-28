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
    description: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    totalCapacity: {
      allowNull: false,
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
    phone1: {
      type: DataTypes.STRING
    },
    phone2: {
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
    },
    accountId: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    externalId: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};