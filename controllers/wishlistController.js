const { Wishlist, Product } = require('../models');

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({ where: { userId: req.userId } });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    // Check if the product exists
    const product = await Product.findByPk(req.body.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const wishlistItem = await Wishlist.create({ ...req.body, userId: req.userId });
    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!wishlistItem) return res.status(404).json({ message: 'Wishlist item not found' });
    await wishlistItem.destroy();
    res.json({ message: 'Wishlist item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error: error.message });
  }
};
