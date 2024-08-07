// Function to handle the logout process
const logout = async (event) => {
  // Prevent the default behavior of the form
  event.preventDefault();
  // Send a POST request to the logout API endpoint
  const response = await fetch('/auth/logout', {
    method: 'POST', // Use the POST method for the request
    headers: { 'Content-Type': 'application/json' }, // Set the request headers to indicate JSON content
  });

  // If the response is OK, redirect to the login page
  if (response.ok) {
    document.location.replace('/auth/login');
  } else {
    // If the response is not OK, show an alert with the response status text
    alert(response.statusText);
  }
};

// Add an event listener to the logout button to handle the click event
document.querySelector('#logout').addEventListener('click', logout);