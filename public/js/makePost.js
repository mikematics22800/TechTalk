const makePost = async () => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: document.querySelector('#post-title').value,
      content: document.querySelector('#post-content').value,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#submit-post').addEventListener('submit', makePost);