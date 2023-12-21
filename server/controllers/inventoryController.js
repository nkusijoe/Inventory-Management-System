const Inventory = require('../models/inventoryModel');

const inventoryController = {
  getAll: async (req, res) => {
    try {
      const inventories = await Inventory.find().populate('product');
      res.json(inventories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const inventory = await Inventory.findById(id).populate('product');
      if (!inventory) {
        return res.status(404).json({ message: 'Inventory item not found' });
      }
      res.json(inventory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { product, quantity } = req.body;
      const inventory = new Inventory({ product, quantity });
      await inventory.save();
      res.json({ message: 'Inventory item created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { product, quantity } = req.body;
      const updatedInventory = await Inventory.findByIdAndUpdate(
        id,
        { product, quantity },
        { new: true }
      ).populate('product');
      res.json(updatedInventory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;
      await Inventory.findByIdAndRemove(id);
      res.json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

module.exports = inventoryController;
