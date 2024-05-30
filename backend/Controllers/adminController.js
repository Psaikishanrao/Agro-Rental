// controllers/adminController.js
const Admin = require('../Models/Admin');

const adminController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the admin exists
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      // Check if the password matches
      if (admin.password !== password) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // If everything is correct, send a success message
      res.status(200).json({ message: 'Login successful', admin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = adminController;
