module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Categories', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        parentId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Categories',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('Categories');
    }
  };
  