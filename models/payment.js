'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Bill, { foreignKey: 'billId' });
      Payment.belongsTo(models.Customer, { foreignKey: 'customerId' });
    }
  };
  Payment.init({
    billId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    customerId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    paid: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    paymentDate: {
      type: DataTypes.DATE
    },
    referenceId: {
      allowNull: false,
      defaultValue: '',
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};