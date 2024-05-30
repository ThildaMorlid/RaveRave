import React, { useState } from 'react';

const AdminPanel: React.FC = () => {
  const [event, setEvent] = useState({ name: '', date: '', location: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle creating event logic
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name</label>
          <input type="text" name="name" value={event.name} onChange={handleChange} />
        </div>
        <div>
          <label>Event Date</label>
          <input type="date" name="date" value={event.date} onChange={handleChange} />
        </div>
        <div>
          <label>Event Location</label>
          <input type="text" name="location" value={event.location} onChange={handleChange} />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default AdminPanel;
