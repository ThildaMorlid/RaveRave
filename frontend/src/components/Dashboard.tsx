import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchEvents, User, Event } from '../api';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const getEvents = async () => {
      try {
        const events = await fetchEvents();
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    getUsers();
    getEvents();
  }, []);

  return (
    <div>
      <h1>Member Dashboard</h1>
      <h2>Welcome back, [username]!</h2>

      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} - {event.date}
          </li>
        ))}
      </ul>

      <h2>Membership Information</h2>
      <p>Membership Level: [level]</p>
      <p>Membership Expiry: [expiry_date]</p>

      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
