const router = require('express').Router();
const api = require('./api');
const home = require('./home');
const auth = require('./auth');

router.use('/home', home);
router.use('/auth', auth);
router.use('/api', api);

router.use((req, res, next) => {
  if (req.session.logged_in && req.url !== '/home' && req.url !== '/home/dashboard') {
    res.redirect('/home');
  }
  
  if (!req.session.logged_in && req.url !== '/auth/login' && req.url !== '/auth/register') {
    res.redirect('/auth/login');
  }

  next();
});


module.exports = router;
