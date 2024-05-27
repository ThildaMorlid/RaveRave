import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from 'pg';

// Laddar konfiguration från .env-filen
dotenv.config();

// Skapar en ny klient för att hantera anslutningen till databasen
const client = new Client({
  connectionString: process.env.PGURI
});

// Ansluter till databasen
client.connect(err => {
  if (err) {
    console.error('Connection error', (err as Error).stack);
  } else {
    console.log('Connected to postgres');
  }
});

// Skapar en ny Express-applikation
const app = express();
app.use(cors());
app.use(express.json()); // Middleware för att hantera JSON body parsing

// GET för users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const { rows } = await client.query('SELECT * FROM Users');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
    res.status(500).send(`Error executing query: ${(err as Error).message}`);
  }
});

// GET för events
app.get('/events', async (req: Request, res: Response) => {
  try {
    const { rows } = await client.query('SELECT * FROM Events');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
    res.status(500).send(`Error executing query: ${(err as Error).message}`);
  }
});

// POST förfrågan för nya användare
app.post('/users', async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  try {
    const { rows } = await client.query(
      'INSERT INTO Users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, password, role]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
    res.status(500).send(`Error executing query: ${(err as Error).message}`);
  }
});

// Startar servern
app.listen(3001, () => {
  console.log('Webservice is active on port 3001');
});
