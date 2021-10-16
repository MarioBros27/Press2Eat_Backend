'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      restaurantId: {
        type: Sequelize.UUID,
        references: {
          model: 'Restaurants',
          key: 'id'
        }
      },
      customerId: {
        type: Sequelize.UUID,
        references: {
          model: 'Customers',
          key: 'id'
        }
      },
      appointment: {
        type: Sequelize.DATE
      },
      seats: {
        type: Sequelize.INTEGER
      },
      status: {
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
    await queryInterface.dropTable('Reservations');
  }
};