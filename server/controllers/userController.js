const User = require('../models/User');

const userController = {
  getAll: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  register: async (req, res) => {
    try {
      const { name, username, email, password, role, inventory } = req.body;
      const user = new User({ name, username, email, password, role, inventory });
      await user.save();
      res.json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, username, email, role, inventory } = req.body;
      const updatedUser = await User.findByIdAndUpdate(id, { name, username, email, role, inventory }, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndRemove(id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // You may generate and return a token for authentication here
      res.json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserDetails: async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Role-based authorization example
  isAdmin: (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }
    next();
  },
};

module.exports = userController;
