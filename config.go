package main

import (
	"flag"
)

type Config struct {
	Port          int
	PostgresURL   string
	BasicAuthUser string
	BasicAuthPass string
}

var globalConfig Config

// Parses command line flags and returns a filled instance of Config
func ParseFlag() Config {
	var (
		fPort          = flag.Int("port", 8080, "Port for the HTTP server to listen on")
		fPostgresURL   = flag.String("postgres-url", "postgres://localhost/marks", "PostgreSQL url or connection string")
		fBasicAuthUser = flag.String("basic-auth-user", "", "Basic auth user, also specify password for it to be enabled")
		fBasicAuthPass = flag.String("basic-auth-pass", "", "Basic auth pass")
	)

	flag.Parse()

	return Config{
		Port:          *fPort,
		PostgresURL:   *fPostgresURL,
		BasicAuthUser: *fBasicAuthUser,
		BasicAuthPass: *fBasicAuthPass,
	}
}

// Accessor to global config
func Cfg() Config {
	return globalConfig
}

// Setter for global config
// used at startup and in tests
func SetCfg(c Config) {
	globalConfig = c
}
