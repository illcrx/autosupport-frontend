export function logout() {
    const token = localStorage.getItem('jwtToken');
  
    fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          // Remove the token from local storage
          localStorage.removeItem('jwtToken');
          // Redirect to login page or home page
          window.location.href = '/login';
        } else {
          console.error('Failed to log out');
        }
      })
      .catch(error => console.error('Error:', error));
  }
  