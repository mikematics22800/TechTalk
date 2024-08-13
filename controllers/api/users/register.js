const router = require('express').Router();
const { User } = require('../../../models');
const bcrypt = require('bcrypt');

// Route to handle user registration
router.post('/', async (req, res) => {
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

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
    const userData = await User.create({
      name: req.body.username,
      password: hashedPassword,
    });

    // Save the user session and set the session variables
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