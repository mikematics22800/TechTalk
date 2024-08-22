const router = require('express').Router();
const api = require('./api');
const home = require('./home');
const auth = require('./auth');

router.use('/home', home);
router.use('/auth', auth);
router.use('/api', api);

router.use((req, res, next) => {
  if (req.session.logged_in && !req.url.startsWith('home')) {
    res.redirect('/home');
  }
  
  if (!req.session.logged_in && !req.url.startsWith('auth')) {
    res.redirect('/auth/login');
  }

  next();
});


module.exports = router;
