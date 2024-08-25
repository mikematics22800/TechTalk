const modal = document.querySelector('.modal');

modal.style.display = 'none';

const openCommentModal = (e) => {
  e.preventDefault();
  modal.style.display = 'flex';
}

const closeCommentModal = (e) => {
  e.preventDefault();
  modal.style.display = 'none';
}

const submitComment = async (e) => {
  e.preventDefault();
  const postId = e.target.getAttribute('id');
  const res = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({
      content: document.querySelector('.comment-content').value,
      post_id: postId
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  const jsonData = await res.json();
  alert(jsonData.message);
  modal.style.display = 'none';
  if (!res.ok) {
    console.log(jsonData.err);
  }
}

document.querySelector('.new-comment').addEventListener('click', openCommentModal);
document.querySelector('.discard-comment').addEventListener('click', closeCommentModal);
document.querySelector('.add-comment').addEventListener('submit', submitComment);

