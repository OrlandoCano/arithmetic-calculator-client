import React, { useState } from 'react';

const Login = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('token', data.token);
          window.location.href = "/records";
        })
        .catch(error => {
          alert('Authentication Failed, try again');
          console.error(error);
        });
  };

  return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
                className="form-control"
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
                className="form-control"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
            />
          </div>
          <button className="btn btn-success" type="submit">Login</button>
        </form>
      </div>
  );
};

export default Login;
