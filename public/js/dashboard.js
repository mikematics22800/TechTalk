const modal = document.querySelector('#modal');

modal.style.display = 'none';

const openPostModal = (e) => {
  e.preventDefault();
  modal.style.display = 'flex';
}

const closePostModal = (e) => {
  e.preventDefault();
  modal.style.display = 'none';
}

const submitPost = async (e) => {
  e.preventDefault();
  const res = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: document.querySelector('#post-title').value,
      content: document.querySelector('#post-content').value,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  if (res.ok) {
    alert('Post uploaded!');
  } else {
    // If the res is not OK, show an alert with an error message
    const err = await res.json();
    modal.style.display = 'none';
    alert(err.message);
  }
}

document.querySelector('#new-post').addEventListener('click', openPostModal);
document.querySelector('#discard').addEventListener('click', closePostModal);
document.querySelector('#make-post').addEventListener('submit', submitPost);