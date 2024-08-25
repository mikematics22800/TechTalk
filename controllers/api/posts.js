const router = require('express').Router();
const { Post } = require('../../models');

// POST a new post
router.post('/', async (req, res) => {
  try {
    await Post.create({
      title: req.body.title,
      content: req.body.content,
      username: req.session.user.name
    });
    res.status(200).json({message: 'Post uploaded!'});
  } catch(err) {
    res.status(500).json({message: 'Failed to upload post', err});
  }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
  try {
    await Post.destroy({where: {id: req.params.id,}});
    res.status(200).json({message: 'Post deleted!'});
  } catch(err) {
    res.status(500).json({ message: 'Failed to delete post', err});
  }
});

// PUT a post
router.put('/:id', async (req, res) => {
  try {
    await Post.update(req.body, {where: {id: req.params.id,}});
    res.status(200).json({message: 'Post edited!'});
  } catch(err) {
    res.status(500).json({ message: 'Failed to edit post', err});
  }
});

module.exports = router;