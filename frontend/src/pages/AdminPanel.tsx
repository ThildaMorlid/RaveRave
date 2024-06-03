import React, { useState } from 'react';
import type { EventWithoutId } from '../api';
import { addEvent } from '../api';

const AdminPanel: React.FC = () => {
  const [event, setEvent] = useState<EventWithoutId>({ title: '', description: '', date: '', location: '', img_url: '' });
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { event: event, password: password };
      const response = await addEvent(data);
      setMessage(`Event ${response.title} created successfully!`);
    } catch (error: any) {
      setMessage('Error creating event: ' + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Password</label>
          <input type="password" name='password' value={password} onChange = {handlePasswordChange}/>
        </div>
        <div>
          <label>Event Title</label>
          <input type="text" name='title' value={event.title} onChange = {handleChange}/>
        </div>
        <div>
          <label>Event Description</label>
          <input type="text" name = 'description'value={event.description} onChange = {handleChange}/>
        </div>
        <div>
          <label>Image URL</label>
          <input type="text" name = 'img_url'value={event.img_url} onChange = {handleChange}/>
        </div>
        <div>
          <label>Event Date</label>
          <input type="date" name = 'date' value={event.date} onChange = {handleChange}/>
        </div>
        <div>
          <label>Event Location</label>
          <input type="text" name = 'location' value={event.location} onChange = {handleChange}/>
        </div>
        <button type="submit">Create Event</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminPanel;
