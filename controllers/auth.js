const router = require('express').Router();

router.use('/', (req, res, next) => {
  if (req.session.logged_in) {
    return res.redirect('/home');
  }
  next();
})

router.get('/login', (req, res) => {
  res.render('auth', { partial: 'login' });
});

router.get('/register', (req, res) => {
  res.render('auth', { partial: 'register' });
});

module.exports = router;