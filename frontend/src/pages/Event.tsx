import React, { useEffect, useState } from "react";
import {
  fetchEvent,
  fetchAttendees,
  deleteEvent,
  addAttendeeToEvent,
  type Event,
  type Attendee,
} from "../api";
import { useParams } from "react-router-dom";
import "./Event.css";

const EventPage: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [attendee, setAttendee] = useState<Attendee>({
    name: "",
    email: "",
    phone: "",
    eventid: 0,
  });
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [message, setMessage] = useState("");
  const [adminMessage, setAdminMessage] = useState("");

  useEffect(() => {
    const getEvent = async () => {
      try {
        const event = await fetchEvent(Number(id!));
        setEvent(event);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttendee({
      ...attendee,
      [e.target.name]: e.target.value,
    });
  };

  const handleFetchAttendees = async () => {
    try {
      const fetchedAttendees = await fetchAttendees(Number(id!), password);
      console.log(fetchedAttendees);
      setAttendees(fetchedAttendees);
      setAdminMessage("Successfully fetched attendees");
    } catch (error: any) {
      console.error("Error fetching attendees:", error);
      setAdminMessage(
        "Error fetching attendees: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await deleteEvent(Number(id!), password);
      // Redirect to home page
      window.location.href = "/";
    } catch (error: any) {
      setAdminMessage(
        "Error deleting event: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addAttendeeToEvent(Number(id!), attendee);
      setMessage(`You have been added to the event!`);
      setHasSignedUp(true);
    } catch (error: any) {
      setMessage(
        "Error signing up to event: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container" style={{ marginBottom: '2rem' }}>
      <div className="event-container">
        <div className="event-image">
          <img src={event?.img_url} alt={event?.title} />
        </div>
        <div className="rave-title">{event?.title}</div>
        <div className="event-date">{new Date(event!.date).toLocaleDateString()}</div>
        <div className="event-description">
          { event?.description }
        </div>
      </div>
      {hasSignedUp ? <div className="rave-subtitle">You have signed up for the event!</div> : (
        <div className="event-signup">
          <div className="rave-subtitle">Sign up</div>
          <div className="rave-form">
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={attendee.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={attendee.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={attendee.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </div>
            <button onClick={handleSubmit} disabled={!attendee.name || !attendee.email || !attendee.phone}>
              Register for event
            </button>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
      <div className="event-admin">
        <div className="rave-subtitle" style={{ marginTop: '3rem' }}>Admin Panel</div>
        <div className="rave-form">
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
            <button disabled={!password} onClick={handleFetchAttendees}>Fetch Attendees</button>
            <button disabled={!password} onClick={handleDeleteEvent}>Delete Event</button>
          </div>
          {adminMessage && <p>{adminMessage}</p>}
        </div>
        {attendees.length > 0 && (
          <>
            <h1>Attendees</h1>
            {attendees.map((attendee) => (
              <div key={attendee.email}>{attendee.name}</div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default EventPage;
