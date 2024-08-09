const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {
  Sequelize,
  sequelize,
  User: require('./user')(sequelize, DataTypes),
  Category: require('./category')(sequelize, DataTypes),
  Product: require('./product')(sequelize, DataTypes),
  Wishlist: require('./wishlist')(sequelize, DataTypes),
};

// Define associations here
db.User.hasMany(db.Wishlist, { foreignKey: 'userId', as: 'wishlists' });
db.Wishlist.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.Category.hasMany(db.Category, { as: 'subcategories', foreignKey: 'parentId' });
db.Category.hasMany(db.Product, { foreignKey: 'categoryId', as: 'products' });
db.Product.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

db.User.hasMany(db.Product, { foreignKey: 'userId', as: 'products' });
db.Product.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

module.exports = db;
