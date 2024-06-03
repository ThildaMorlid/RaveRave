import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchEvents, User, Event } from '../api';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };

    const getEvents = async () => {
      const events = await fetchEvents();
      setEvents(events);
    };

    Promise.all([getUsers(), getEvents()]).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Member Dashboard</h1>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title} - {event.date}
          </li>
        ))}
      </ul>
      <h2>Membership Information</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
