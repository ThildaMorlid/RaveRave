import React, { useState } from 'react';
import { addUser } from '../api';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser = { username, email, password, role };
      const response = await addUser(newUser);
      setMessage(`User ${response.username} registered successfully!`);
    } catch (error: any) {
      if (error.response && error.response.data) {
        // Hantera specifika felmeddelanden från backend
        if (error.response.data.includes('violates check constraint "users_role_check"')) {
          setMessage('Invalid role. Allowed roles are: member, admin, etc.');
        } else if (error.response.data.includes('violates unique constraint "users_email_key"')) {
          setMessage('Email already exists.');
        } else {
          setMessage('Error registering user: ' + error.response.data);
        }
      } else {
        setMessage('Error registering user');
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
