const postModal = document.querySelector('#make-post-modal');
const editPostModal = document.querySelector('#edit-post-modal');

postModal.style.display = 'none';
editPostModal.style.display = 'none';

let editId

const openPostModal = (e) => {
  e.preventDefault();
  postModal.style.display = 'flex';
}

const closePostModal = (e) => {
  e.preventDefault();
  postModal.style.display = 'none';
}

const openEditPostModal = (e) => {
  e.preventDefault();
  editId = e.target.getAttribute('id');
  const title = document.querySelector('.edit-post-title');
  const content = document.querySelector('.edit-post-content');
  const originalPost = document.querySelector(`.post[id="${editId}"]`);
  const originalTitle = originalPost.querySelector('.post-title').innerText;
  const originalContent = originalPost.querySelector('.post-content').innerText;
  title.value = originalTitle;
  content.value = originalContent;
  editPostModal.style.display = 'flex';
}

const closeEditPostModal = (e) => {
  e.preventDefault();
  editPostModal.style.display = 'none';
}

const submitPost = async (e) => {
  e.preventDefault();
  const title = document.querySelector('.make-post-title');
  const content = document.querySelector('.make-post-content');
  const res = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: title.value,
      content: content.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  postModal.style.display = 'none';
  title.value = '';
  content.value = '';
  const jsonData = await res.json();
  alert(jsonData.message);
  if (!res.ok) {
    console.log(jsonData.err);
  }
}

const editPost = async (e) => {
  e.preventDefault();
  const title = document.querySelector('.edit-post-title');
  const content = document.querySelector('.edit-post-content');
  const res = await fetch(`/api/posts/${editId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: title.value,
      content: content.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  editPostModal.style.display = 'none';
  title.value = '';
  content.value = '';
  const jsonData = await res.json();
  alert(jsonData.message);
  if (!res.ok) {
    console.log(jsonData.err);
  }
}

const deletePost = async (e) => {
  e.preventDefault()
  const id = e.target.getAttribute('id')
  const res = await fetch(`/api/posts/${id}`, {method: 'DELETE'})
  const jsonData = await res.json();
  alert(jsonData.message);
  if (!res.ok) {
    console.log(jsonData.err);
  }
}

document.querySelector('.new-post').addEventListener('click', openPostModal);
document.querySelector('.discard-post').addEventListener('click', closePostModal);
document.querySelector('.edit-post-btn').addEventListener('click', openEditPostModal);
document.querySelector('.discard-edit').addEventListener('click', closeEditPostModal);
document.querySelector('.make-post').addEventListener('submit', submitPost);
document.querySelector('.edit-post').addEventListener('submit', editPost);

document.querySelectorAll('.del-post').forEach(element => {
  element.addEventListener('click', deletePost);
});




