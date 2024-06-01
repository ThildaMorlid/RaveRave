import axios from 'axios';

const API_URL = 'http://localhost:3001';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  organizerid: number;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

export const addEvent = async (event: { title: string; description: string; date: string; location: string; organizerid: number }) => {
  const response = await axios.post(`${API_URL}/events`, event);
  return response.data;
};
