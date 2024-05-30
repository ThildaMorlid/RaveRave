// src/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Definiera en typ för User
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const addUser = async (user: User): Promise<User> => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

// Definiera en typ för Event
export interface Event {
  id: number;
  name: string;
  date: string;
}

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};
