import React, { useEffect, useState } from 'react';
import { fetchEvents, type Event } from '../api';
import { Link } from 'react-router-dom';

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getEvents = async () => {
      try {
        const events = await fetchEvents();
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Events</h1>
      {events.map((event) => (
        <Link to={`/events/${event.id}`} key={event.id}>
          <li>{event.title}</li>
        </Link>
      ))}
    </div>
  );
};

export default Events;
