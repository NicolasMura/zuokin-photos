<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<p align="center">
  <a href="https://campaign-test.nicolasmura.com" target="_blank">
    <img alt="Campaign test image" src="./apps/frontend-public/src/assets/icons/favicon.ico" width="400" />
  </a>
</p>

# Zuokin Photos

Fullstack monorepo for Zuokin Photos PWA project. With Angular frontend, NestJS backend REST API and MongoDB.

- [Zuokin Photos](#zuokin-photos)
- [Requirements](#requirements)
- [Quick start](#quick-start)
  - [Run & test locally with Docker](#run--test-locally-with-docker)
  - [Run & test (& dev!) locally without Docker](#run--test--dev-locally-without-docker)
    - [Option 1: use your own local MongoDB](#option-1-use-your-own-local-mongodb)
    - [Option 2: run MongoDB inside Docker compose container](#option-2-run-mongodb-inside-docker-compose-container)

# Requirements

To contribute to this project and run it locally, you will need:

- [Node JS >= v12.19.0 & NPM >= 6.14.8](https://nodejs.org/en)
- [Angular 12.x](https://angular.io)
- [Typescript >= 4.0.5](https://www.typescriptlang.org)

> :bulb: **_Tip_**
>
> [Microsoft VS Code editor](https://code.visualstudio.com/) is already packaged with Typescript.

# Quick start

## Run & test locally with Docker

@TODO...

## Run & test (& dev!) locally without Docker

Run:

```bash
  git clone git@github.com:NicolasMura/zuokin-photos.git
  cd zuokin-photos
  # create .env file
  cp .env.example .env
  # install dependencies
  yarn install
```

If needed, adjust environment variables in `apps/frontend-public/src/env.js`

### Option 1: use your own local MongoDB

In this case, I'm pretty sure you know what to do

### Option 2: run MongoDB inside Docker compose container

Adjust `MONGODB_URI` environment variable in `.env` file:

```bash
  (...)
  # Backend is living OUTSIDE the Docker compose container, so change `database` to `localhost`
  MONGODB_URI=mongodb://<MONGO_INITDB_DBUSER_USERNAME>:<MONGO_INITDB_DBUSER_PASSWORD>@localhost:<MONGODB_PORT>/
  (...)
```

Build new image for `database`:

```bash
  docker build -t zuokin-photos-database -f .docker/Dockerfile.mongodb .
```

Adjust database image to use the one you just created:

```yml
  (...)
  database: # name of database service
    image: zuokin-photos-database
  (...)
```

In you favorite terminal, run the database container in the background:

```bash
  docker-compose --env-file .env up -d database
```

Finally, start frontend and backend apps:

```bash
  nx serve frontend-public backend-api
```

Visit `http://localhost:4200` to see the result.
