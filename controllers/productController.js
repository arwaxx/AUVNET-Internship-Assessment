const { Product } = require('../models');

exports.getProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.findAll();
    // Send the fetched products as the response
    res.json(products);
  } catch (error) {
    // Handle errors and send a 500 status with a message
    res.status(500).json({ message: 'Error fetching products' });
  }
};



exports.addProduct = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the request body

    const { name, price, categoryId, userId } = req.body; // Correct the variable name to match request body

    if (!name || !price || !categoryId || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const product = await Product.create({ name, price, categoryId, userId });
    console.log('Product added:', product); // Log the added product
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error); // Log error details
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    // Fetch the product by primary key (ID)
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    // Update the product with the new details
    await product.update(req.body);
    // Send the updated product as the response
    res.json(product);
  } catch (error) {
    // Handle errors and send a 500 status with a message
    res.status(500).json({ message: 'Error updating product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    // Log the incoming request parameters
    console.log('Request params:', req.params);
    
    // Extract the product ID from the request parameters
    const productId = req.params.id;
    
    // Validate input
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    
    // Fetch the product by primary key (ID)
    const product = await Product.findByPk(productId);
    
    if (!product) {
      // Log and return a 404 status if the product is not found
      console.log('Product not found:', productId);
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Log the product details before deletion
    console.log('Product to be deleted:', product);
    
    // Delete the product from the database
    await product.destroy();
    
    // Log the result of deletion
    console.log('Product deleted:', productId);
    
    // Send a success message as the response
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    // Handle errors and send a 500 status with a message
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
