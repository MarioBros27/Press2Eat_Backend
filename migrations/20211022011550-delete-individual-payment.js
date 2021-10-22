'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('IndividualPayments');
  },

  down: async (queryInterface, Sequelize) => {
  }
};
