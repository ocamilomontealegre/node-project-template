<p align="center">
  <a href="https://nodejs.org/en" target="blank">
    <img src="images/node.png" width="512" alt="Node Logo" />
  </a>
</p>

<h1 align="center">⭐ Node-Typescript Service Template ⭐</h1>

<p align="center">
  Template for new services based on NodeJS with the Best Practices and Ready for Production
</p>

<p align="center">
  <a href="https://nodejs.org/docs/latest-v20.x/api/index.html" target="_blank">
    <img src="https://img.shields.io/badge/node-20.x-green.svg" alt="node"/>
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"/>
  </a>
  <a href="https://www.npmjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/npm-10.x-red.svg" alt="npm"/>
  </a>
  <a href="https://expressjs.com/">
    <img src="https://img.shields.io/badge/Web_Framework-Express-black.svg" alt="express"/>
  </a>
  <a href="https://swc.rs/">
    <img src="https://img.shields.io/badge/Compiler-SWC_-orange.svg" alt="swc"/>
  </a>
  <a href="https://www.docker.com/">
    <img src="https://img.shields.io/badge/Dockerized 🐳_-blue.svg" alt="docker"/>
  </a>
</p>

## 👀 Motivation

When we start creating some new service based on NestJS most often we just use the Nest cli for starting a new service that already give us some convention and structure for our project. This is a good starting point however I was missing a couple of interesting things that almost all services should have to be ready to deploy to production like fully dockerized, ensuring coding conventions...

For this reason I created this custom template for new services based on this framework, with everything I would like to have to start developing a service with the best practices but with a simple file structure so later developers can change to implement their logic.

Here we are not providing any specific architecture like hexagonal architecture or others, this is like a simple template where later we can customize and create the architecture we need.

## Project setup

```bash
npm install
```

## Compile and run

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start
```

## Lint

```bash
# lint
$ npm run lint

# lint:fix
$ npm run lint:fix
```

## Test

```bash
# run unit tests
$ npm run test:unit

# run e2e tests
$ npm run test:e2e

# run all tests
$ npm run test
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
