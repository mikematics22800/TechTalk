const router = require('express').Router();
const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const { User } = require('../../../models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);


module.exports = router;