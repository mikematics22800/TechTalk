const router = require('express').Router();
const { Comment } = require('../../models');

// POST a new comment
router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      user_name: req.session.user.name,
      post_id: req.body.post_id,
    });
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;