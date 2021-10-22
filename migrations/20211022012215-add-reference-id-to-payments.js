'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Payments', 'referenceId', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });
    await queryInterface.renameColumn('Payments', 'paidDate', 'paymentDate');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Payments', 'referenceId');
    await queryInterface.renameColumn('Payments', 'paymentDate', 'paidDate');
  }
};
