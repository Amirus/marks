package main

import "github.com/kiasaki/marks/data"

type Page struct {
	Notes       []data.Note
	Id          string
	Title       string
	Body        string
	PostbackURL string
}
