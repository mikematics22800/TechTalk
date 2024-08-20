const router = require('express').Router();
const { User } = require('../../../models');

// Route for user login
router.post('/', async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({ where: { name: req.body.username } });

    // If user not found, send error response
    if (!user) {
      res.status(400).json({ message: 'Invalid username' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = user.checkPassword(req.body.password);
    
    // If password is invalid, send error response
    if (!validPassword) {
      res.status(400).json({ message: 'Invalid password' });
    }

    // Save user session and set session variables
    req.session.save(() => {
      req.session.user = user;
      req.session.logged_in = true;
      // Send success response
      return res.status(200).json({ message: 'Login successful' });
    });
  } catch {
    // Handle unexpected errors
    res.status(500).json({ message: 'Failed to login due to unexpected error'});
  }
});

module.exports = router;