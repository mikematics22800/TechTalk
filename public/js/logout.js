// Function to handle the logout process
const logout = async (e) => {
  // Prevent the default behavior of the form
  e.preventDefault();
  // Send a POST request to the logout API endpoint
  const res = await fetch('/api/users/logout', {
    method: 'POST', // Use the POST method for the request
    headers: { 'Content-Type': 'application/json' }, // Set the request headers to indicate JSON content
  });

  // If the res is OK, redirect to the login page
  if (res.ok) {
    document.location.replace('/api/users/login');
  } else {
    // If the res is not OK, show an alert with an error message
    const err = await res.json();
    alert(err.message);
  }
};

// Add an event listener to the logout button to handle the click event
document.querySelector('#logout').addEventListener('click', logout);