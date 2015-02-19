package main

import "log"

func createDb() {
	log.Println("Creating tables...")
	_, err := DB().Exec(`

CREATE TABLE IF NOT EXISTS notes (
  id uuid,
  title varchar(255),
  body text,
  updated bigint,
  PRIMARY KEY (id),
  CONSTRAINT notes_id UNIQUE (id)
);

	`)
	if err != nil {
		panic(err)
	}
	log.Println("Done creating tables!")
}
