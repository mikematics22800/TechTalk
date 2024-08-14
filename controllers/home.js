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
    const plainPost = post.get({ plain: true });
    plainPost.createdAt = formatDate(plainPost.createdAt);
    return plainPost;
  });
  return posts;
}

getPosts().then((posts) => {
  router.get('/', (req, res) => {
    try {
      res.render('home', { partial: 'homepage', posts });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/dashboard', (req, res) => {
    const user = req.session.user;
    try {
      const userPosts = posts.filter(post => post.username === user.name);
      res.render('home', { partial: 'dashboard', userPosts});
    } catch (err) {
      res.status(500).json(err);
    }
  });
});



module.exports = router;