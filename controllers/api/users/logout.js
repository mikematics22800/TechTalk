const router = require('express').Router();

// Route for user logout
router.post('/', (req, res) => {
  // Check if user is logged in
  if (req.session.logged_in) {
    // Destroy the session and send success response
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If user is not logged in, send error response
    res.status(400).json({error: err.message});
  }
});

module.exports = router;