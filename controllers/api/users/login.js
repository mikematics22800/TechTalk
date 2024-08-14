const router = require('express').Router();
const { User } = require('../../../models');

// Route for user login
router.post('/', async (req, res) => {
  try {
    // Find user by username
    const userData = await User.findOne({ where: { name: req.body.username } });

    // If user not found, send error response
    if (!userData) {
      res.status(400).json({ message: 'Incorrect username' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = userData.checkPassword(req.body.password);

    // If password is invalid, send error response
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password' });
    }

    // Save user session and set session variables
    req.session.save(() => {
      req.session.user = userData;
      req.session.logged_in = true;
    });
  } catch (err) {
    // Handle unexpected errors
    res.status(500).json({ message: 'An unexpected error has occurred.', error: err.message });
  }
});

module.exports = router;