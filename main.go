package main

import (
	"database/sql"
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
	mmChain := mm.New(middlewares.LogWithTiming)

	// Add basic auth middleware if configuration specifies user & pass
	u, p := Cfg().BasicAuthUser, Cfg().BasicAuthPass
	if u != "" && p != "" {
		mmChain = mmChain.Append(middlewares.BasicAuth(u, p))
	}

	http.Handle("/", mmChain.Then(http.HandlerFunc(routeRequest)))
}

func routeRequest(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		http.Redirect(w, r, "/new", 302)
	} else if r.URL.Path == "/styles.css" {
		w.Header().Set("Content-Type", "text/css")
		w.Write([]byte(stylesContents))
	} else if r.URL.Path == "/new" {
		if r.Method != "POST" {
			contents, err := RenderNewPage(Page{
				Notes:       data.MustGetAllNotes(DB()),
				Title:       "New note",
				Body:        "",
				PostbackURL: "/new",
			})
			mst.MustNotErr(err)
			w.Write(contents)
		} else {
			title, body := r.FormValue("title"), r.FormValue("body")
			if savedNote, err := data.CreateNote(DB(), title, body); err != nil {
				http.Redirect(w, r, "/n"+savedNote.Id, 302)
			} else {
				contents, err := RenderNewPage(Page{
					Notes:       data.MustGetAllNotes(DB()),
					Title:       title,
					Body:        body,
					PostbackURL: "/new",
				})
				mst.MustNotErr(err)
				w.WriteHeader(400)
				w.Write(contents)
			}
		}
	}
}
