package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/kiasaki/batbelt/http/middlewares"
	"github.com/kiasaki/batbelt/http/mm"
	"github.com/kiasaki/batbelt/mst"

	"github.com/kiasaki/marks/data"
)

var db *sql.DB

func SetDB(d *sql.DB) {
	db = d
}

func DB() *sql.DB {
	return db
}

// Entrypoint
func main() {
	SetCfg(ParseFlag())
	SetDB(data.Connect(Cfg().PostgresURL))
	handleHTTP()
}

func handleHTTP() {
	registerHandlers()

	var stringPort = strconv.Itoa(Cfg().Port)
	log.Println("Started listening on port " + stringPort)
	log.Fatal(http.ListenAndServe(":"+stringPort, nil))
}

func registerHandlers() {
	mmChain := mm.New()

	// Add basic auth middleware if configuration specifies user & pass
	u, p := Cfg().BasicAuthUser, Cfg().BasicAuthPass
	if u != "" && p != "" {
		mmChain = mmChain.Append(middlewares.BasicAuth(u, p))
	}

	http.Handle("/", mmChain.Then(http.HandlerFunc(routeRequest)))
}

func routeRequest(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		rows, err := db.Query("SELECT id FROM notes")
		mst.MustNotErr(err)
		defer rows.Close()
		for rows.Next() {
			var note struct {
				Id string
			}
			if err := rows.Scan(&note.Id); err != nil {
				log.Fatal(err)
			}
			fmt.Printf("%s is it's id\n", note.Id)
		}
		if err := rows.Err(); err != nil {
			log.Fatal(err)
		}
	}
}
