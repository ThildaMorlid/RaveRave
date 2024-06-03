import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from 'pg';
import { isNull } from 'util';

// Laddar konfiguration från .env-filen
dotenv.config();

// Skapar en ny klient för att hantera anslutningen till databasen
const client = new Client({
  connectionString: process.env.PGURI,
  ssl: {
    rejectUnauthorized: false
  }
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

// POST förfrågan för inloggning
app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
      // För user som den requestar
      // Hämta först lösenord och kolla att det stämmer.
      // Om det stämmer, hämta roll och skicka tillbaka innehåll för roll
      // Annars felmeddelande

    const { rows } = await client.query(
      'SELECT * FROM USERS' //"SELECT * FROM USERS WHERE email = '$1'",[email]
    );
    var user = null
    for (let i=0; i < rows.length; i++){
      if (rows[i].email == email) {
        user = rows[i]
        break
      }
    }
    // Kolla om vi hittade en användare med den emailen
    if (user == null) {
      // Här ska vi egentligen ge ett felmeddelande.
      console.log("User does not exist!")
    }
    else {
      if (user.password == password) {
        console.log("Password is correct.")
        console.log("User role is ",user.role)
        if (user.role == 'member') {
          res.status(201).send('User role is member')
        }
        // Skicka tillbaka till frontend vad den ska visa beroende på vilken roll user.role är.
      }
      else {
        console.log("Password is incorrect!")
        // Ge felmeddelande om fel lösenord.
      }

    }
    //res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
    res.status(500).send(`Error executing query: ${(err as Error).message}`);
  }
});

// POST för participants
app.post('/participants', async (req: Request, res: Response) => {
  const { eventId, userId, status } = req.body;
  try {
    const { rows } = await client.query(
      'INSERT INTO Participants (eventId, userId, status) VALUES ($1, $2, $3) RETURNING *',
      [eventId, userId, status]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
    res.status(500).send(`Error executing query: ${(err as Error).message}`);
  }
});

// GET för participants
app.get('/participants', async (req: Request, res: Response) => {
  try {
    const { rows } = await client.query('SELECT * FROM Participants');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
    res.status(500).send(`Error executing query: ${(err as Error).message}`);
  }
});

// PUT för att uppdatera status på en participant
app.put('/participants/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const { rows } = await client.query(
      'UPDATE Participants SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
    res.status(500).send(`Error executing query: ${(err as Error).message}`);
  }
});

// DELETE för att ta bort en participant
app.delete('/participants/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await client.query('DELETE FROM Participants WHERE id = $1', [id]);
    res.sendStatus(204);
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
