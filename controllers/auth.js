const router = require('express').Router();

// Route to render the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
  }
  res.render('auth', { partial: 'login' });
});

// Route to render the register page
router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
  }
  res.render('auth', { partial: 'register' });
});


module.exports = router;