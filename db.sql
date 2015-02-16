CREATE TABLE notes (
  id uuid,
  title varchar(255),
  body text,
  updated bigint,
  PRIMARY KEY (id),
  CONSTRAINT notes_id UNIQUE (id)
);
