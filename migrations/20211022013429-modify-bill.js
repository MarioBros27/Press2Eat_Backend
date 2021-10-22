'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Bills', 'customerId', {
      allowNull: false,
      type: Sequelize.UUID,
        references: {
          model: 'Customers',
          key: 'id'
        }
    });
    queryInterface.addColumn('Bills', 'tableNumber', {
      allowNull: false,
      type: Sequelize.INTEGER,
      default: 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Bills', 'customerId');
    await queryInterface.renameColumn('Bills', 'tableNumber');
  }
};
