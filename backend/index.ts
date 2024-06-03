import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from 'pg';

// Laddar konfiguration från .env-filen
dotenv.config();

// Skapar en ny klient för att hantera anslutningen till databasen
const client = new Client({
  connectionString: process.env.PGURI,
  ssl: {
    rejectUnauthorized: false
  }
});

const PASSWORD = process.env.ADMIN_PASSWORD;

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

// GET för enskilt event
app.get('/events/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows } = await client.query('SELECT * FROM Events WHERE id = $1', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
    res.status(500).send(`Error executing query: ${(err as Error).message}`);
  }
});

// POST för att hämta attendees för event med lösenord
app.get('/events/:id/attendees/:password', async (req: Request, res: Response) => {
  const { id, password } = req.params;
  if (password.trim() !== PASSWORD) {
    return res.status(401).send('Invalid password');
  }
  try {
    const { rows } = await client.query(
      'SELECT * FROM Attendees WHERE event_id = $1',
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
    res.status(500).send(`Error executing query: ${(err as Error).message}`);
  }
});

// POST för att skapa ett nytt event
app.post('/events', async (req: Request, res: Response) => {
  const { event, password } = req.body;
  const { title, description, date, location, img_url } = event;
  if (password.trim() !== PASSWORD) {
    return res.status(401).send('Invalid password');
  }
  try {
    const { rows } = await client.query(
      'INSERT INTO Events (title, description, date, location, img_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, date, location, img_url]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
    res.status(500).send(`Error executing query: ${(err as Error).message}`);
  }
});

// POST för att skapa ny attendee
app.post('/events/:id/attendees', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const { rows } = await client.query(
      'INSERT INTO Attendees (name, email, phone, event_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
    res.status(500).send(`Error executing query: ${(err as Error).message}`);
  }
});

process.on('SIGINT', () => {
  client.end(err => {
    console.log('Client disconnected');
    if (err) {
      console.error('Error during disconnection', err.stack);
    }
    process.exit();
  });
});

// Startar servern
app.listen(3001, () => {
  console.log('Webservice is active on port 3001');
});
