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

// POST a new comment
router.post('/:id', async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.params.id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({where: {id: req.params.id,}});
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;