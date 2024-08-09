// migrations/remove-userid-from-products.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'UserId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
