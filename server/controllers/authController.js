const jwt = require('jsonwebtoken');

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      // Validate the username and password (this is a simplified example)
      const isValidUser = username === 'admin' && password === 'admin';
      if (!isValidUser) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Generate a token (you may use a library like 'jsonwebtoken')
      const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

// Middleware for checking user roles
const authMiddleware = {
  isAdmin: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      // Verify the token (you may use a library like 'jsonwebtoken')
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (decodedToken.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied' });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  },
};

module.exports = { authController, authMiddleware };
