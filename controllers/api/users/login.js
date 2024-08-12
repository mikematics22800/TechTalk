const router = require('express').Router();
const { User } = require('../../../models');
const bcrypt = require('bcrypt');

// Route for user login
router.post('/', async (req, res) => {
  try {
    // Find user by username
    const userData = await User.findOne({ where: { username: req.body.username } });

    // If user not found, send error response
    if (!userData) {
      res.status(400).json({ message: 'Incorrect username' });
      return;
    }

    // Check if the provided password is valid
    const validPassword = await bcrypt.compare(req.body.password, userData.password);

    // If password is invalid, send error response
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password' });
    }

    // Save user session and set session variables
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData });
    });
  } catch (err) {
    // Handle unexpected errors
    res.status(500).json({ message: 'An unexpected error has occurred.', error: err.message });
  }
});

module.exports = router;