const router = require('express').Router();
const api = require('./api');
const home = require('./home');
const auth = require('./auth');

router.use('/home', home);
router.use('/auth', auth);
router.use('/api', api);

router.use((req, res) => {
  res.status(404).send('Error: Page not found');
});


module.exports = router;
