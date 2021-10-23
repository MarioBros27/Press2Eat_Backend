'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Payments', 'customerId', {
      allowNull: false,
      type: Sequelize.UUID,
        references: {
          model: 'Customers',
          key: 'id'
        }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Payments', 'customerId');
  }
};
