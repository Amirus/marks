package main

import (
	"bytes"
	"html/template"

	"github.com/kiasaki/batbelt/mst"
)

const layoutContents = `
{{define "layout"}}
<!DOCTYPE html>
<html>
  <head>
	<title>Marks - {{.Title}}</title>
	<link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
	<nav>
	  <header>
		<h1>Marks</h1>
	  </header>
	  <ul>
		{{range .Notes}}
		  <li>
			<a href="/n/{{.Id}}">{{.Title}}</a>
		  </li>
		{{end}}
	  </ul>
	  <footer>
		<a href="http://github.com/kiasaki/marks">Marks</a>
		is open source sorftware by
		<a href="http://github.com/kiasaki">kiasaki</a>
	  </footer>
	</nav>

	<section>
	  <form action="{{.PostbackURL}}" method="post">
		<header>
		  <input type="text" name="title" class="title" value="{{.Title}}" placeholder="Fancy note title" />
		  <div class="buttons">
			{{template "buttons" .}}
		  </div>
		</header>
		<div class="contents">
		  {{template "contents" .}}
		<div>
	  </form>
	</section>
  </body>
</html>
{{end}}
`

const newContents = `
{{define "buttons"}}
  <button type="submit" class="btn btn-save">Save</button>
{{end}}
{{define "contents"}}
  <textarea name="body" placeholder="Write you markdown here..."></textarea>
{{end}}
`

var newPageTempate *template.Template

func init() {
	var err error
	var t *template.Template
	t, err = template.New("page").Parse(layoutContents)
	mst.MustNotErr(err)
	newPageTempate, err = t.Parse(newContents)
	mst.MustNotErr(err)
}

func RenderNewPage(p Page) ([]byte, error) {
	var out bytes.Buffer
	err := newPageTempate.ExecuteTemplate(&out, "layout", p)
	if err != nil {
		return []byte{}, err
	}
	return out.Bytes(), nil
}
