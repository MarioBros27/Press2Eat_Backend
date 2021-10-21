'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bills', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      checkIn: {
        allowNull: false,
        type: Sequelize.DATE
      },
      total: {
        allowNull: false,
        default: 0.0,
        type: Sequelize.DOUBLE
      },
      tip: {
        allowNull: false,
        default: 0.0,
        type: Sequelize.DOUBLE
      },
      done: {
        allowNull: false,
        default: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Bills');
  }
};