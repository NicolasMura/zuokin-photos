#!/bin/bash

set -e

BACKUP_NAME=$(date +%y%m%d_%H%M%S)_family-calendar-dump.tar.gz

date
echo "Backing up MongoDB database to DigitalOcean Space: $SPACE_NAME"

echo "Dumping MongoDB $DB database to compressed archive"
#mongodump --uri="mongodb://localhost:27017" --archive=$HOME/projects/family-calendar/db-backup/$BACKUP_NAME --gzip
mongodump --uri="mongodb://localhost:28067" --authenticationDatabase "family_calendar_db" -u "family_calendar_db_user" -p "nelsen-Bring-chopin-Quasi-7Cornstalk-Wispy3"
tar czf $HOME/projects/family-calendar/db-backup/$BACKUP_NAME dump/

echo "Send back up to Syno DS214 NAS"
#...
#TODO

#echo "Cleaning up compressed archive"
#rm $HOME/projects/family-calendar/db-backup/$BACKUP_NAME
rm -R $HOME/projects/family-calendar/db-backup/dump

# To restore all events (script à part => TODO) :
#tar xzf $HOME/projects/family-calendar/db-backup/$BACKUP_NAME
#mongorestore --nsInclude=family_calendar_db.eventmodel $HOME/projects/family-calendar/db-backup/$BACKUP_NAME/dump/
#rm -R $HOME/projects/family-calendar/db-backup/$BACKUP_NAME/dump/
