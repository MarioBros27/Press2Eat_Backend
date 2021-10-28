'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bills', 'paid', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn('Bills', 'paymentTime', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('Bills', 'paymentReference', {
      type: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Bills', 'paid');
    await queryInterface.removeColumn('Bills', 'paymentTime');
    await queryInterface.removeColumn('Bills', 'paymentReference');
  }
};
