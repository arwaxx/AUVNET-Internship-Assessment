module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Products', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Categories', // Ensure this matches the actual table name
            key: 'id'
          }
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    },
  
    down: async (queryInterface) => {
      await queryInterface.dropTable('Products');
    }
  };
  