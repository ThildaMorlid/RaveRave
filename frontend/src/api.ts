import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export interface Event {
  id: number
  title: string
  date: string
  img_url: string
  description: string
  location: string
}

export type EventWithoutId = Omit<Event, 'id'>;

export interface Attendee {
  name: string
  email: string
  phone: string
  eventid: number
}

export const fetchAttendees = async (event_id: number, password: string): Promise<Attendee[]> => {
  const response = await axios.get(`${API_URL}/events/${event_id}/attendees/${password}`);
  return response.data;
};

export const addAttendeeToEvent = async (eventid: number, attendee: Attendee): Promise<void> => {
  const response = await axios.post(`${API_URL}/events/${eventid}/attendees`, attendee);
  return response.data;
};

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

export const fetchEvent = async (id: number): Promise<Event> => {
  const response = await axios.get(`${API_URL}/events/${id}`);
  return response.data;
};

export const deleteEvent = async (id: number, password: string): Promise<void> => {
  const response = await axios.delete(`${API_URL}/events/${id}/${password}`);
  return response.data;
};

export const addEvent = async (data: { event: EventWithoutId, password: string}) => {
  const response = await axios.post(`${API_URL}/events`, data);
  return response.data;
};
