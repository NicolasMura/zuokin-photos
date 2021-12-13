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
- [Dockerization](#dockerization)
  - [MongoDB images for Dev](#mongodb-images-for-dev)
  - [Frontend, backend and MongoDB images for Prod](#frontend-backend-and-mongodb-images-for-prod)
- [Deploy in a real-world production environment](#deploy-in-a-real-world-production-environment)
- [Unit tests with Jest](#unit-tests-with-jest)
- [End-to-end (e2e) tests with Cypress](#end-to-end-e2e-tests-with-cypress)
- [Interesting stuffs to do / Nice to have](#interesting-stuffs-to-do--nice-to-have)
- [Common troubleshootings](#common-troubleshootings)
  - [API Container is unhealthy and doesn't start](#api-container-is-unhealthy-and-doesnt-start)
- [A few words about Nx](#a-few-words-about-nx)
  - [CheatSheet](#cheatsheet)

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

Build locally new image for `database`:

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

# Dockerization

## MongoDB images for Dev

Build locally new image for `database`:

```bash
  docker build -t zuokin-photos-database -f .docker/Dockerfile.mongodb .
```

## Frontend, backend and MongoDB images for Prod

Mandatory server-side files and folders:

* <PROJECT_FOLDER>/config/(dev.)<URL_SITE>-le-ssl-host-proxy.conf
* <PROJECT_FOLDER>/ssl/fullchain.pem
* <PROJECT_FOLDER>/ssl/privkey.pem
* /var/log/<URL_SITE>

```bash
  # mkdir -p .docker/apache_vol/log && mkdir .docker/apache_vol/ssl ??
```

Build locally and push new Docker image for:

`frontend-public`:

```bash
  nx build frontend-public --prod
  docker build -t zuokin-photos-frontend-public -f .docker/Dockerfile.frontend-public .
  docker tag zuokin-photos-frontend-public nicolasmura/zuokin-photos-frontend-public
  docker push nicolasmura/zuokin-photos-frontend-public
  docker tag zuokin-photos-frontend-public nicolasmura/zuokin-photos-frontend-public:v1.0
  docker push nicolasmura/zuokin-photos-frontend-public:v1.0
```

`backend-api`:

```bash
  docker build -t zuokin-photos-backend-api -f .docker/Dockerfile.backend-api .
  docker tag zuokin-photos-backend-api nicolasmura/zuokin-photos-backend-api
  docker push nicolasmura/zuokin-photos-backend-api
  docker tag zuokin-photos-backend-api nicolasmura/zuokin-photos-backend-api:v1.0
  docker push nicolasmura/zuokin-photos-backend-api:v1.0
```

`database`:

```bash
  docker build -t zuokin-photos-database -f .docker/Dockerfile.mongodb .
  docker tag zuokin-photos-database nicolasmura/zuokin-photos-database
  docker push nicolasmura/zuokin-photos-database
  docker tag zuokin-photos-database nicolasmura/zuokin-photos-database:v1.0
  docker push nicolasmura/zuokin-photos-database:v1.0
```

Finally, on server side:

```bash
  docker-compose --env-file .env up -d
```

To get latest images:

```bash
  docker pull nicolasmura/zuokin-photos-frontend-public \
  docker pull nicolasmura/zuokin-photos-backend-api \
  docker pull nicolasmura/zuokin-photos-database
```

# Deploy in a real-world production environment

> :warning: **_Important_**
>
> On Linux systems with Apache web server, you must set the Apache log folder ownership as following to make it work:
> ```bash
>   sudo chmod 777 .docker/mongodb_vol/log
> ```
>
> Don't worry about that.

Don't forget also to give correct ownership to Apache log folder:

```bash
  sudo chown -R <you>:www-data /var/log/<URL_SITE>
```

# Unit tests with Jest

@TODO

See also https://github.com/molily/angular-form-testing

# End-to-end (e2e) tests with Cypress

@TODO

# Interesting stuffs to do / Nice to have

* Signup form (see https://github.com/molily/angular-form-testing)

# Common troubleshootings

## API Container is unhealthy and doesn't start

You have:

```bash
  $ docker-compose --env-file .env up -d # OR docker-compose --env-file .env up -d database
  Creating photos-database ... done

  ERROR: for api Container "2b24bf6f0f69 (or whatever)" is unhealthy.
```

In general, that's because:

- you removed the `MONGODB_DB_MAIN` database defined in `.env` file, or changed some critical environment variables
- you removed the`users` collection in `MONGODB_DB_MAIN`
- you changed, added or removed some critical environment variables (probably in .env file)

The solutions is to double check:

- MongoDB port variable is named `MONGODB_PORT` in the following files:
  - `.env`
  - `docker-compose.yml`
  - `scripts/database-healthcheck.sh`
- Database port in `MONGODB_URI` value is the same as `MONGODB_PORT` value
- Host MongoDB log folder has correct permissions: `sudo chmod 777 .docker/mongodb_vol/log`
- Apache log folder has correct ownership: `sudo chown -R <you>:www-data /var/log/<WEBAPP_FOLDER>`

For Linux users using `docker-compose.production.yml` in production environment, also try to remove the named volume `mongodb`:

```bash
  docker volume rm -f <mongodb-volume-name>
  # for example:
  docker volume rm -f zuokin-photos_mongodb
```

For Mac OS X users, also try to clean the bind mounted volume for MongoDB `/data/db` (see `MONGODB_DB_DIR_FOR_MAC_ONLY` in `.env ` and `docker-compose.macosx-override.yml` files):

```bash
  rm -R .docker/mongodb_vol/db
```

> :information_source: **_Note_**
>
> `MONGODB_PORT` is used to check database health when container is starting (via `scripts/database-healthcheck.sh` script), so if you change it you will need to re-build the database image:
>
> ```bash
>   docker build -t zuokin-photos-database -f .docker/Dockerfile.mongodb . --no-cache && docker tag zuokin-photos-database nicolasmura/zuokin-photos-database
>   docker push nicolasmura/zuokin-photos-database
>   docker-compose --env-file .env down
>   docker-compose --env-file .env up -d # OR docker-compose --env-file .env up -d database
> ```

# A few words about Nx

🔎 **Powerful, Extensible Dev Tools**

This project was generated using [Nx](https://nx.dev) and below command:

```bash
  npx create-nx-workspace --preset=angular
```

This resulted in following output:

```bash
  Need to install the following packages:
    create-nx-workspace
  Ok to proceed? (y) y
  ✔ Workspace name (e.g., org name)     · zuokin-photos
  ✔ Application name                    · frontend-public
  ✔ Default stylesheet format           · scss
  ✔ Use Nx Cloud? (It's free and doesn't require registration.) · No

  >  NX  Nx is creating your workspace.

    To make sure the command works reliably in all environments, and that the preset is applied correctly,
    Nx will run "npm install" several times. Please wait.

  ✔ Installing dependencies with npm
  ✔ Nx has successfully created the workspace.

  ———————————————————————————————————————————————


  >  NX   NOTE  First time using Nx? Check out this interactive Nx tutorial.

    https://nx.dev/latest/angular/tutorial/01-create-application

    Prefer watching videos? Check out this free Nx course on YouTube.
    https://www.youtube.com/watch?v=2mYLe9Kp9VM&list=PLakNactNC1dH38AfqmwabvOszDmKriGco

  nmura@Nico-MBA-WiFi $
```

Visit the [Nx Angular Documentation](https://nx.dev/angular) to learn more.

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## CheatSheet

Create `auth` module running the 'module' NestJs generator with Nx project support:

```bash
  nx g @nrwl/nest:module auth --project backend-api --directory app
```

Create `auth` controller running the 'controller' NestJs generator with Nx project support:

```bash
  nx g @nrwl/nest:controller auth --project backend-api --directory app/auth  --flat
```

Create `auth` service inside `auth` module running the 'service' NestJs generator with Nx project support:

```bash
  nx g @nrwl/nest:service auth --project backend-api --directory app/auth --flat
```

Create auth service inside `frontend-tools` Angular library running the 'service' Angular generator with Nx project support:

```bash
  nx g @nrwl/angular:service services/auth --project frontend-tools --flat
```

Create Angular `frontend-tools` and `vendors` libraries:

```bash
  nx g @nrwl/angular:lib frontend-tools
  nx g @nrwl/angular:lib vendors
```

Create `models` global shared lib:

```bash
  npx nx g @nrwl/workspace:lib models
```
