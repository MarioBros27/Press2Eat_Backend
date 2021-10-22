'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Bills', 'restaurantId', {
      allowNull: false,
      type: Sequelize.UUID,
        references: {
          model: 'Restaurants',
          key: 'id'
        }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Bills', 'restaurantId');
  }
};
