'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // Name of the target model
        key: 'id'       // Key in the target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'userId');
  }
};
