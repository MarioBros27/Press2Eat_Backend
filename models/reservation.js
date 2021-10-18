'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reservation.belongsTo(models.Customer, { foreignKey: 'customerId' });
      Reservation.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' });
    }
  };
  Reservation.init({
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    },
    restaurantId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    customerId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    appointment: {
      allowNull: false,
      type: DataTypes.DATE
    },
    seats: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    status: {
      allowNull: false,
      defaultValue: "waiting",
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};