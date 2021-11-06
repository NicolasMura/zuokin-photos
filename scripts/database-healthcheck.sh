#!/bin/bash

set -eo pipefail

host="$(hostname --ip-address || echo '127.0.0.1')"

if mongo "$host:$MONGODB_PORT/$MONGODB_DB_MAIN" -u $MONGO_INITDB_DBUSER_USERNAME -p $MONGO_INITDB_DBUSER_PASSWORD --eval 'quit(db.getCollection("users").find().count() ? 0 : 2)'; then
# if mongo "$host:$MONGODB_PORT/$MONGODB_DB_MAIN" -u $MONGO_INITDB_DBUSER_USERNAME -p $MONGO_INITDB_DBUSER_PASSWORD --eval 'quit(db.runCommand({serverStatus:1}).ok ? 0 : 2)'; then
  exit 0
fi

exit 1