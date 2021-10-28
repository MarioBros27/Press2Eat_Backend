'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BankAccounts');
  },

  down: async (queryInterface, Sequelize) => {
  }
};
