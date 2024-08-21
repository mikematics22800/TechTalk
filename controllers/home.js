const router = require('express').Router();
const { Post } = require('../models');

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

const getPosts = async () => {
  const postData = await Post.findAll();
  const posts = postData.map((post) => {
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
  const posts = await getPosts();
  const user = req.session.user;
  try {
    const userPosts = posts.filter(post => post.username === user.name);
    res.render('home', { partial: 'dashboard', userPosts});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;