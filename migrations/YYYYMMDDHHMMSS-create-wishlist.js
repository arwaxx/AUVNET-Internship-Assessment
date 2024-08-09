module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Wishlists', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        productId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Products',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('Wishlists');
    }
  };
  