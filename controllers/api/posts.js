const router = require('express').Router();
const { Post } = require('../../models');

// GET all posts from user
router.get('/:id', async (req, res) => {
  try {
    const posts = await Post.findAll({where: {user_id: req.params.id}});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;