package main

import "github.com/kiasaki/marks/data"

type Page struct {
	Notes       []data.Note
	Title       string
	Body        string
	PostbackURL string
}
