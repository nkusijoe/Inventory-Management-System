const Supplier = require('../models/Supplier');

const supplierController = {
  getAll: async (req, res) => {
    try {
      const suppliers = await Supplier.find();
      res.json(suppliers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const supplier = await Supplier.findById(id);
      if (!supplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }
      res.json(supplier);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { name, contactPerson, address } = req.body;
      const supplier = new Supplier({ name, contactPerson, address });
      await supplier.save();
      res.json({ message: 'Supplier created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, contactPerson, address } = req.body;
      const updatedSupplier = await Supplier.findByIdAndUpdate(
        id,
        { name, contactPerson, address },
        { new: true }
      );
      res.json(updatedSupplier);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;
      await Supplier.findByIdAndRemove(id);
      res.json({ message: 'Supplier deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Add more controller methods as needed
};

module.exports = supplierController;
