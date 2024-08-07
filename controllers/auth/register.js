const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Route to render the register page
router.get('/', (req, res) => {
  res.render('register');
});

// Route to handle user registration
router.post('/', async (req, res) => {
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user with the hashed password
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Respond with the created user data
      res.json(userData);
    });
  } catch (err) {
    // Handle any errors that occur during user creation
    res.status(400).json({error: err.message});
    console.log(err);
  }
});

module.exports = router;