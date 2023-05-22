'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bid_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      start_price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      current_price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      time_window: {
        allowNull: false,
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bid_items')
  }
}