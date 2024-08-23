const submitEdit = async (e) => {
  e.preventDefault();
  const id = document.querySelector('.modal').getAttribute('id');
  const res = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: document.querySelector('.post-title').value,
      content: document.querySelector('.post-content').value,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  if (res.ok) {
    alert('Post updated!');
    modal.style.display = 'none';
  } else {
    // If the res is not OK, show an alert with an error message
    const err = await res.json();
    alert(err.message);
  }
}

document.querySelector('.edit-post').addEventListener('submit', submitEdit);

