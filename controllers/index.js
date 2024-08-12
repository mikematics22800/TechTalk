const router = require('express').Router();
const api = require('./api');
const home = require('./home');
const auth = require('./auth');

router.use('/home', home);
router.use('/auth', auth);
router.use('/api', api);

module.exports = router;
