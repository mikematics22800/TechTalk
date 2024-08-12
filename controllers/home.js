const router = require('express').Router();

// Route to render the home partial
router.get('/', (req, res) => {
  res.render('home', { partial: 'homepage' });
});

// Route to render the dashboard partial
router.get('/dashboard', (req, res) => {
  res.render('home', { partial: 'dashboard' });
});


module.exports = router;