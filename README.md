# simple-wiki-app

API for querying simple wikipedia data. The API exposes 2 endpoints:
1. For querying a database with a raw sql query
2. Returns the most outdated page given a category name

To build image:

docker build --tag image_name:tag .
```
To run:
docker run --rm --name wiki-api -it -d \
-e DB_HOST=$HOST \
-e DB_PORT=$PORT \
-e DB_USER=$USER \
-e DB_PASSWORD=$PASSWORD \
-e DB_DATABASE=$DBNAME \
-p 3000:3000 image_name:tag
```
To run in development mode:
```
make dev
```
