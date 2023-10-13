import React, { useState } from 'react';
//import mockAPI from "../api/mockapi";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {

    const apiUrl = 'https://651ebd5c44a3a8aa4768e90d.mockapi.io/users'; 

    // Make an HTTP request to fetch the login data
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const user = data.find(user => user.loginEmail === email && user.loginPassword === password);
        if (user) {
          setMessage(`Login successful as ${user.loginType}: ${user.parentName}`);
        } else {
          setMessage('Invalid email or password. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage('An error occurred while logging in. Please try again later.');
      });
  };

  return (
    
  
 
    <div className="App">
      <h1>Login Page</h1>
      <div>
        <label>Email: </label>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>  
          

    
    
  );
}

export default Login;
