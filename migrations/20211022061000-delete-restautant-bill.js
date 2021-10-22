'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RestaurantBills');
  },

  down: async (queryInterface, Sequelize) => {
  }
};
