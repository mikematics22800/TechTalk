// Function to handle the login form submission
const login = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get the values from the email and password input fields
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Login POST request
  const res = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  // If the response is OK, redirect to the homepage
  if (res.ok) {
    document.location.replace('/');
  } else {
    // If the response is not OK, show an alert with an error message
    const err = await res.json();
    alert(err.message);
  }
};

// Add an event listener to the login form to handle form submission
document.querySelector('#login').addEventListener('submit', login);
