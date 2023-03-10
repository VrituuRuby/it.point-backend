<h1 align="center">IT.POINT - Back-end</h1>

<h3 align="center">
A simple ITSM (IT service manager) API made with NodeJS and Express
</h3>

## About

IT.POINT is an ITSM (i.t. service manager) tool system, basically, a way for its users to communicate through tickets with the IT staff, for service desk help. But it can also be used for field service.

This project was created to learn about Node js API routing with express, Prisma.io, JsonWebToken Authentication, SOLID principles and more!

\*_THIS PROJECT COMES WITH THE FRONT-END, CHECK IT OUT [HERE](https://github.com/VrituuRuby/it.point-web)_

## Installation

To run it you will need [Docker](https://www.docker.com) and [Docker Compose](https://docs.docker.com/compose/) to run the database and backend.

Clone this repository and then run it with `docker compose up -d` in your terminal to start it in the background.
It will create and start the database and backend containers. Then run `npm run prisma:docker db seed` or `yarn prisma:docker db seed` to seed the database with some tickets and create the users.

Server will be running at `http://localhost:3333/`

## API Route Docs

You can know about the routes docs accessing `http://localhost:3333/docs` with the backend running.

Documentation made with Swagger UI Express.

## Functionalities and Features

- Tickets categories and subcategories CRUD
- Create Tickets
- Add notes to tickets
- Create and read Branches
- Create and read users (not showing passwords)

## Technologies

- Express
- Node.js
- Prisma.io
- zod
- TypeScript

## Contributors

- [Peterson Adami Candido](https://github.com/wetrustinprize) - Helped with dockerfile and docker compose networking
