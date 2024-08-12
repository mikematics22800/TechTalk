const router = require('express').Router();
const { User } = require('../../../models');
const bcrypt = require('bcrypt');

// Route to handle user registration
router.post('/', async (req, res) => {
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user with the hashed password
    const userData = await User.create({
      username: req.body.username,
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