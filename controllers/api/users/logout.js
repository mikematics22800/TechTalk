const router = require('express').Router();

// Route for user logout
router.post('/', (req, res) => {
  req.session.destroy();
});

module.exports = router;