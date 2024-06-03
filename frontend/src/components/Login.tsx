import React, { useState } from 'react';
import { loginUser } from '../api';

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Submitted")
    e.preventDefault();
    try {
    // Handle login logic
    const response = await loginUser(form);
      setMessage('' + response)
    }
    catch (error: any) {
    if (error.response && error.response.data) {
      // Hantera specifika felmeddelanden från backend
        setMessage('Error logging in: ' + error.response.data);
      }
    else {
      setMessage('Error logging in.');
    }
  }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
