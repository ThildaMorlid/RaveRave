// Home.tsx
import React, { useEffect, useState } from 'react';
import SmileyContainer from "../components/SmileyContainer";
import EventCard from "../components/EventCard";
import { fetchEvents, type Event } from '../api';
import { Link } from 'react-router-dom';
import "./Home.css";

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {

    const getEvents = async () => {
      try {
        const events = await fetchEvents();
        setEvents(events);
      } catch (error: any) {
        console.error('Error fetching events:', error);
        setMessage('Error fetching events: ' + error.message);
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
      <div
        className="home-hero"
      >
        <div className="hero-content container">
          <div className="rave-title">
            Welcome to RaveRave
          </div>
          <div className="rave-subtitle">
            RaveRave is a place where you can rave and dance to your heart's content.
          </div>
        </div>
        <SmileyContainer />
      </div>
      <div className="events-container container" id="events">
        <div className="rave-title">
          Events
        </div>
        {message && <div className="error">{message}</div>}
        <div className="events-list">
          {events.map((event) => (
            <Link to={`/events/${event.id}`} key={event.id}>
              <EventCard event={event} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
