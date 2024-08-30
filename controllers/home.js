const router = require('express').Router();
const { Post, Comment } = require('../models');

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

const getPosts = async () => {
  let posts = await Post.findAll();
  posts = posts.map((post) => {
    const postValues = post.dataValues;
    postValues.createdAt = formatDate(postValues.createdAt);
    return postValues;
  });
  return posts;
}

router.use('/', (req, res, next) => {
  if (!req.session.logged_in) {
    return res.redirect('/auth/login');
  }
  next();
})

router.get('/', async (req, res) => {
  const posts = await getPosts();
  try {
    res.render('home', { partial: 'homepage', posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  let posts = await getPosts();
  posts = posts.filter(post => post.username === req.session.user.name);
  try {
    res.render('home', { partial: 'dashboard', posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  let post = await Post.findByPk(req.params.id)
  post = post.dataValues;
  post.createdAt = formatDate(post.createdAt);
  let comments =  await Comment.findAll({ where: { post_id: req.params.id } });
  comments = comments.map(comment => {
    const commentValues = comment.dataValues;
    commentValues.createdAt = formatDate(commentValues.createdAt);
    return commentValues;
  });
  try {
    res.render('home', { partial: 'post', post, comments });
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;