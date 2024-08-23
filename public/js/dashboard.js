const modal = document.querySelector('.modal');

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
  const title = document.querySelector('.post-title');
  const content = document.querySelector('.post-content');
  const res = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: title.value,
      content: content.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  if (res.ok) {
    alert('Post uploaded!');
    modal.style.display = 'none';
    title.value = '';
    content.value = '';
  } else {
    const err = await res.json();
    alert(err.message);
  }
}

const deletePost = async (e) => {
  e.preventDefault()
  const id = e.target.getAttribute('id')
  const res = await fetch(`/api/posts/${id}`, {method: 'DELETE'})
  if (res.ok) {
    alert('Post deleted!');
  } else {
    const err = await res.json();
    alert(err.message);
  }
}

document.querySelector('.new-post').addEventListener('click', openPostModal);
document.querySelector('.discard-post').addEventListener('click', closePostModal);
document.querySelector('.make-post').addEventListener('submit', submitPost);

document.querySelectorAll('.del-post').forEach(element => {
  element.addEventListener('click', deletePost);
});



