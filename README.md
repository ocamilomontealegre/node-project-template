<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="images/nestjs.png" width="512" alt="Nest Logo" />
  </a>
</p>

<h1 align="center">⭐ Typescript Service Template ⭐</h1>

<p align="center">
  Template for new services based on NestJS with the Best Practices and Ready for Production
</p>

<p align="center">
  <a href="https://nodejs.org/docs/latest-v20.x/api/index.html">
    <img src="https://img.shields.io/badge/node-20.x-green.svg" alt="node"/>
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"/>
  </a>
  <a href="https://docs.nestjs.com/v10/">
    <img src="https://img.shields.io/badge/npm-10.x-red.svg" alt="npm"/>
  </a>
  <a href="https://expressjs.com/">
    <img src="https://img.shields.io/badge/Web_Framework-Express⚡-black.svg" alt="fastify"/>
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
pnpm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
