-- The following commands will delete any existing tables and sequences (uncomment all DROP lines if you want to start from scratch)

-- Drop the attendees table and any dependent objects
-- DROP TABLE IF EXISTS attendees CASCADE;

-- Drop the events table and any dependent objects
-- DROP TABLE IF EXISTS events CASCADE;

-- Drop related sequences if they exist and are not automatically dropped
-- DROP SEQUENCE IF EXISTS events_id_seq;
-- DROP SEQUENCE IF EXISTS attendees_id_seq;-- Event table


-- The following commands will create the attendees table and any dependent objects

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  img_url TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT NOT NULL
);

-- Attendee table
CREATE TABLE attendees (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES events (id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  UNIQUE (event_id, email)
);

-- Secondary key for indexing attendees by event
CREATE INDEX attendees_event_id_idx ON attendees (event_id);