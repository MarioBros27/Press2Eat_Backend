'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      totalCapacity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      occupiedCapacity: {
        type: Sequelize.INTEGER
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING
      },
      externalNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      internalNumber: {
        type: Sequelize.STRING
      },
      suburb: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Restaurants');
  }
};