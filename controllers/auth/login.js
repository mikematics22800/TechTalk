const router = require('express').Router();
const { User } = require('../../models');

// Route to render the login page
router.get('/', (req, res) => {
  res.render('login');
});

// Route for user login
router.post('/', async (req, res) => {
  try {
    // Find user by username
    const userData = await User.findOne({ where: { username: req.body.username } });

    // If user not found, send error response
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username' });
      return;
    }

    // Check if the provided password is valid
    const validPassword = await userData.checkPassword(req.body.password);

    // If password is invalid, send error response
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password' });
      return;
    }

    // Save user session and set session variables
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      // Send success response
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    // Send error response in case of any issues
    res.status(400).json({error: err.message});
  }
});

module.exports = router;