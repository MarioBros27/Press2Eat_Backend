'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Restaurants', 'phone1', {

      type: Sequelize.STRING,
      allowNull: true

    });
    await queryInterface.addColumn('Restaurants', 'phone2', {

      type: Sequelize.STRING,
      allowNull: true

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Restaurants', 'phone1');
    await queryInterface.removeColumn('Restaurants', 'phone1');
  }
};
