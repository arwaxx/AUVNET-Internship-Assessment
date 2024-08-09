require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
const wishlistRoutes = require('./routes/wishlist');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const { sequelize } = require('./models');

const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });
