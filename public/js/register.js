// Function to handle the register form submission
const register = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get the values from the email and password input fields
  const username = document.querySelector('.username-register').value.trim();
  const password = document.querySelector('.password-register').value.trim();
  const passwordConfirm = document.querySelector('.password-confirm').value.trim();

  // Check if both email and password are provided
  if (username && password) {
    // If the password and passwordConfirm do not match, show an alert
    if (password !== passwordConfirm) {
      alert('Passwords do not match.');
      return;
    }
    // Send a POST request to the register API endpoint
    const res = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }), // Send email and password in the request body
      headers: { 'Content-Type': 'application/json' }, // Set the request headers to indicate JSON content
    });
    // If the response is OK, redirect to the homepage
    if (res.ok) {
      document.location.replace('/home');
    } else {
      // If the response is not OK, show an alert with an error message
      const error = await res.json();
      alert(error.message);
      console.log(error.err);
    }
  }
};

// Add an event listener to the register form to handle form submission
document.querySelector('.register').addEventListener('submit', register);