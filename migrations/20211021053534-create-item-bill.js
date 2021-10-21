'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ItemBills', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      itemId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Items',
          key: 'id'
        }
      },
      billId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Bills',
          key: 'id'
        }
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
    await queryInterface.dropTable('ItemBills');
  }
};