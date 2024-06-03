import axios from 'axios';

const API_URL = 'http://localhost:3001';

export interface User {
  id: number; // 'id' is now required and must be a number
  username: string;
  email: string;
  password: string;
  role: string;
}
export interface Role {
  role: string;
}
export interface Login {
  email: string;
  password: string;
}


export interface Event {
  id: number;
  name: string;
  date: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const loginUser = async (login: Login): Promise<String> => {
  const response = await axios.post(`${API_URL}/login`, login);
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

// Andra API-förfrågningar kan läggas till här
