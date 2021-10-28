'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Restaurants', 'occupiedCapacity');
    await queryInterface.addColumn('Restaurants', 'accountId', {
      type: Sequelize.STRING,
      defaultValue: ""
    });
    await queryInterface.addColumn('Restaurants', 'description', {
      type: Sequelize.STRING,
      defaultValue: ""
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Restaurants', 'occupiedCapacity', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
    await queryInterface.removeColumn('Restaurants', 'accountId');
    await queryInterface.removeColumn('Restaurants', 'description');
  }
};
