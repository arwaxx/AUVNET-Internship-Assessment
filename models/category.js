module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Category, { as: 'subcategories', foreignKey: 'parentId' });
  };

  return Category;
};
