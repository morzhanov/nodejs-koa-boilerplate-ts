# NodeJS Koa Boilerplate

<img src="https://i.imgur.com/Z0vXT6v.png"/>

Node.js Koa Boilerplate is an project that allows you to start new node.js project from scratch.

## Installation

Use these steps to install project

1. Create Postgres databse (you can use official <a href="https://hub.docker.com/_/postgres/">Docker</a> container)
2. Add environment variables
3. npm i
4. npm start

## Usage

This boilerplate contains such folders:

* <b>/src </b> - main sources folder.
* <b>/src/constants </b> - app constants.
* <b>/src/controllers </b> - contain controllers that receives requests from routes, executes business logic via services and returns responses to client. 
* <b>/src/db </b> - contain scripts to setup and manage database
* <b>/src/middleware </b> - app middlewares
* <b>/src/entities </b> - database entities
* <b>/src/services </b> - services contains logic to manage database, execute requests to other servers, change application behabior, and etc.
* <b>/src/app.ts </b> - app configuration
* <b>/src/index.ts </b> - contain main scripts that configures and run server
* <b>/test </b> - contains tests for controllers, services and other parts of application.

## NPM Scripts

* start - run node.js server
* serve - run builded files
* build - build project

## Main Technologies and libraries

- <a href="https://nodejs.org/en/">NodeJS</a>
- <a href="https://koajs.com/#">KoaJS</a>
- <a href="https://www.typescriptlang.org/">Typescript</a>
- <a href="https://github.com/auth0/node-jsonwebtoken">jsonwebtoken</a>
- <a href="https://github.com/typeorm/typeorm">typeorm</a>
- <a href="https://github.com/jeffijoe/awilix">awilix</a>
- <a href="https://github.com/jeffijoe/awilix-koa">awilix-koa</a>
- <a href="https://github.com/koajs/bodyparser">koa-bodyparser</a>
- <a href="https://github.com/varunpal/koa-cookie">koa-cookie</a>
- <a href="https://github.com/alexmingoia/koa-router">koa-router</a>

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

Vlad Morzhanov

## License

#### (The MIT License)

Copyright (c) 2018 Vlad Morzhanov.
You can review license in the LICENSE file.
