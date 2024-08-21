const router = require('express').Router();
const { User } = require('../../../models');

// Route to handle user registration
router.post('/', async (req, res) => {
  try {


    // Check if the user already exists
    const existing = await User.findOne({
      where: {
        name: req.body.username,
      },
    });

    // If the user already exists, send an error message
    if (existing) {
      res.status(400).json({ message: 'Username is taken.' });
      return;
    }

    // Create a new user with the hashed password
    const user = await User.create({
      name: req.body.username,
      password: req.body.password,
    });

    // Save the user session and set the session variables
    req.session.save(() => {
      req.session.user = user;
      req.session.logged_in = true;
      // Send success response
      return res.status(200).json({ message: 'Register successful' });
    });
  } catch {
    // Handle unexpected errors
    res.status(500).json({ message: 'Failed to register due to unexpected error'});
  }
});

module.exports = router;