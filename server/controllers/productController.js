const Product = require('../models/Product');

const productController = {
  getAll: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { name, description, price, quantity, category, supplier } = req.body;
      const product = new Product({ name, description, price, quantity, category, supplier });
      await product.save();
      res.json({ message: 'Product created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, quantity, category, supplier } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, description, price, quantity, category, supplier },
        { new: true }
      );
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;
      await Product.findByIdAndRemove(id);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

module.exports = productController;
