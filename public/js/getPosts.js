const { User } = require('../../models');

const getPosts = async () => {
  const userId = sessionStorage.getItem('userData').id;
  try {
    const response = await fetch('/api/posts', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    let posts = await response.json();
    // Check if the current URL is /dashboard
    if (window.location.pathname === '/dashboard') {
      // Filter posts to include only those with the matching userId
      posts = posts.filter(post => post.user_id === userId);
    }
    return posts;
  } catch (err) {
    console.log(err);
  }
}

const renderPosts = (posts) => {
  posts.forEach(async (post) => {
    const user = await User.findByPk(post.user_id);
    const date = new Date(post.createdAt);
    const li = document.createElement('li');
    li.classList.add('post');
    li.innerHTML = `
      <header>
        <h1>${post.title}</h1>
        <h4>Posted by ${user.username} at ${date}</h4>
      </header>
      <p>${post.content}</p>
    `
    document.querySelector('.posts').appendChild(post);
  });
};

getPosts().then(posts => renderPosts(posts));