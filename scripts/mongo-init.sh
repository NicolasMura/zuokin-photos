#!/bin/sh
# https://stackoverflow.com/questions/63088368/mongdb-authentication-not-able-to-create-user-using-docker-ignoring-docker-entr

mongo --eval "
  db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD');
  db = db.getSiblingDB('$MONGODB_DB_MAIN');
  db.createUser(
    {
      user: '$MONGO_INITDB_DBUSER_USERNAME',
      pwd: '$MONGO_INITDB_DBUSER_PASSWORD',
      roles: [
        {
          role: 'readWrite', db: '$MONGODB_DB_MAIN'
        },
        {
          role: 'clusterMonitor', db: '$MONGO_INITDB_DATABASE'
        }
      ]
    }
  )

  db.getCollection('users').insertOne({
    username: '$MONGO_INITDB_APPUSER_EMAIL',
    email: '$MONGO_INITDB_APPUSER_EMAIL',
    password: '$MONGO_INITDB_APPUSER_HASHED_PASSWORD',
    mobile: '$MONGO_INITDB_APPUSER_MOBILE',
    tokens: [],
    isAdmin: true,
    profile: {
      isChild: false,
      name: 'Bob',
      gender: '',
      location: '',
      picture: ''
    }
  });
"
