.PHONY: all run setup
all: run

run:
	go run *.go -postgres-url=postgres://localhost/marks?sslmode=disable

setup:
	psql marks -f db.sql
