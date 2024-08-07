// Function to handle the login form submission
const loginFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the values from the email and password input fields
  const email = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if both email and password are provided
  if (email && password) {
    // Send a POST request to the login API endpoint
    const response = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }), // Send email and password in the request body
      headers: { 'Content-Type': 'application/json' }, // Set the request headers to indicate JSON content
    });

    // If the response is OK, redirect to the homepage
    if (response.ok) {
      document.location.replace('/');
    } else {
      // If the response is not OK, show an alert with an error message
      alert('Failed to log in');
    }
  }
};

// Add an event listener to the login form to handle form submission
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);