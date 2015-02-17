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
			handleNewPage(w, r)
		} else {
			handleNewPagePost(w, r)
		}
	} else if r.URL.Path[:3] == "/n/" {
		handleViewPage(w, r)
	} else {
		w.WriteHeader(404)
		w.Write([]byte("404 - Page not found"))
	}
}

func handleNewPage(w http.ResponseWriter, r *http.Request) {
	contents, err := RenderNewPage(Page{
		Notes:       data.MustGetAllNotes(DB()),
		Title:       "New note",
		Body:        "",
		PostbackURL: "/new",
	})
	mst.MustNotErr(err)
	w.Write(contents)
}

func handleNewPagePost(w http.ResponseWriter, r *http.Request) {
	title, body := r.FormValue("title"), r.FormValue("body")
	if savedNote, err := data.CreateNote(DB(), title, body); err != nil {
		contents, rerr := RenderNewPage(Page{
			Notes:       data.MustGetAllNotes(DB()),
			Title:       title,
			Body:        err.Error() + "\n\n" + body,
			PostbackURL: "/new",
		})
		mst.MustNotErr(rerr)
		w.WriteHeader(400)
		w.Write(contents)
	} else {
		http.Redirect(w, r, "/n/"+savedNote.Id, 302)
	}
}

func handleViewPage(w http.ResponseWriter, r *http.Request) {
	noteId := r.URL.Path[3:]
	note, err := data.GetNote(DB(), noteId)
	if err == sql.ErrNoRows {
		w.WriteHeader(404)
		w.Write([]byte("404 - Page not found"))
	} else if err != nil {
		w.WriteHeader(500)
		w.Write([]byte("500 - Error fetching note"))
		log.Fatal(err)
	} else {
		contents, err := RenderViewPage(Page{
			Notes:       data.MustGetAllNotes(DB()),
			Id:          note.Id,
			Title:       note.Title,
			Body:        note.Body,
			PostbackURL: "/n/" + note.Id,
		})
		mst.MustNotErr(err)
		w.Write(contents)
	}
}
