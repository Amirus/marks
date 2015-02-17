FROM google/golang-runtime
ENTRYPOINT /bin/go-run -postgres-url=$DATABASE_URL
