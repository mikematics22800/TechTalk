const router = require('express').Router();
const { Comment } = require('../../models');

// GET all comments from post
router.get('/:id', async (req, res) => {
  try {
    const comments = await Comment.findAll({where: {post_id: req.params.id}});
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;