'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CustomerBills');
  },

  down: async (queryInterface, Sequelize) => {
  }
};
