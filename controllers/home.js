const router = require('express').Router();

// Route to render the home partial
router.get('/', (req, res) => {
  res.render('home', { partial: 'home' });
});

// Route to render the dashboard partial
router.get('/dashboard', (req, res) => {
  res.render('dashboard', { partial: 'dashboard' });
});


module.exports = router;