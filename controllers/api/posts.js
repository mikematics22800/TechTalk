const router = require('express').Router();
const { Post } = require('../../models');

// POST a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      user_id: req.session.user_id,
      title: req.body.title,
      content: req.body.content,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({where: {id: req.params.id,}});
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;