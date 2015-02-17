package data

import (
	"database/sql"
	"time"

	"github.com/kiasaki/batbelt/mst"
)

type Note struct {
	Id      string
	Title   string
	Body    string
	Updated int64
}

const insertSql = "INSERT INTO notes (id, title, body, updated) VALUES ($1,$2,$3,$4)"
const selectAllSql = "SELECT id, title, updated FROM notes ORDER BY title"
const selectByIdSql = "SELECT id, title, body, updated FROM notes WHERE id = $1 LIMIT 1"
const deleteSql = "DELETE FROM notes WHERE id = $1"
const updateSql = "UPDATE notes SET title = $2, body = $3, updated = $4 WHERE id = $1"

func CreateNote(db *sql.DB, title string, body string) (Note, error) {
	note := Note{NewUUID().String(), title, body, time.Now().Unix()}
	_, err := db.Exec(insertSql, note.Id, note.Title, note.Body, note.Updated)
	return note, err
}

func GetAllNotes(db *sql.DB) ([]Note, error) {
	notes := []Note{}
	rows, err := db.Query(selectAllSql)
	if err != nil {
		return notes, err
	}
	defer rows.Close()
	for rows.Next() {
		var note Note
		if err := rows.Scan(&note.Id, &note.Title, &note.Updated); err != nil {
			return notes, err
		} else {
			notes = append(notes, note)
		}
	}
	return notes, rows.Err()
}

func MustGetAllNotes(db *sql.DB) []Note {
	notes, err := GetAllNotes(db)
	mst.MustNotErr(err)
	return notes
}

func GetNote(db *sql.DB, id string) (Note, error) {
	var note Note
	row := db.QueryRow(selectByIdSql, id)
	err := row.Scan(&note.Id, &note.Title, &note.Body, &note.Updated)
	return note, err
}

func DeleteNote(db *sql.DB, id string) error {
	_, err := db.Exec(deleteSql, id)
	return err
}

func UpdateNote(db *sql.DB, note Note) (Note, error) {
	note.Updated = time.Now().Unix()
	_, err := db.Exec(updateSql, note.Id, note.Title, note.Body, time.Now().Unix())
	return note, err
}
