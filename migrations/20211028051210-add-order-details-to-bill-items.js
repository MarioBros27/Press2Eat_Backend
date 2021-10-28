'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ItemBills', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
    await queryInterface.addColumn('ItemBills', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pending',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ItemBills', 'quantity');
    await queryInterface.removeColumn('ItemBills', 'status');
  }
};
