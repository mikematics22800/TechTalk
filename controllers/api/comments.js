const router = require('express').Router();
const { Comment } = require('../../models');

// POST a new comment
router.post('/', async (req, res) => {
  try {
    await Comment.create({
      content: req.body.content,
      username: req.session.user.name,
      post_id: req.body.post_id,
    });
    res.status(200).json({ message: 'Comment uploaded!' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to upload comment' });
  }
});

module.exports = router;