import React, { useEffect, useState } from "react";
import { fetchEvent, fetchAttendees, addAttendeeToEvent, type Event, type Attendee } from "../api";
import { useParams } from "react-router-dom";

const EventPage: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [attendee, setAttendee] = useState<Attendee>({ name: '', email: '', phone: '', eventid: 0 });
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [message, setMessage] = useState('');
  const [adminMessage, setAdminMessage] = useState('');

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
      setAdminMessage('Successfully fetched attendees');
    } catch (error: any) {
      console.error("Error fetching attendees:", error);
      setAdminMessage('Error fetching attendees: ' + (error.response ? error.response.data : error.message));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addAttendeeToEvent(Number(id!), attendee);
      setMessage(`You have been added to the event!`);
    } catch (error: any) {
      setMessage('Error signing up to event: ' + (error.response ? error.response.data : error.message));
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Event</h1>
      EVENT ID: {id}
      EVENT: {event?.title}
      SIGN UP:
      <input
        type="text"
        name="name"
        value={attendee.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={attendee.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="tel"
        name="phone"
        value={attendee.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <button onClick={handleSubmit}>Register for event</button>
      {message && <p>{message}</p>}
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button onClick={handleFetchAttendees}>Fetch Attendees</button>
        { adminMessage && <p>{adminMessage}</p>}
      </div>
      {attendees.length > 0 && (
        <>
          <h1>Attendees</h1>
          { attendees.map((attendee) => (
            <div key={attendee.email}>{attendee.name}</div>
          ))}
        </>
      )}
    </div>
  );
};

export default EventPage;
