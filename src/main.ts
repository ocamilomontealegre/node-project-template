import "reflect-metadata";
import "dotenv/config";
import express, { json, type Application, type Router } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { AppModule } from "app/app.module";
import { AppRouter } from "app/router/app.router";
import { LoggerService } from "common/logger/services/logger.service";
import { nodeConfig } from "common/env";

const createExpressApp = (): Application => {
  return express();
};

const setRouter = (): Record<string, Router> => {
  const appContainer = new AppModule().getContainer();
  return {
    inversifyRouter: new InversifyExpressServer(appContainer).build()._router,
    appRouter: appContainer.get<AppRouter>(AppRouter).getRouter(),
  };
};

const configureApp = (app: Application): void => {
  const { inversifyRouter, appRouter } = setRouter();

  app.use(json());
  app.use(inversifyRouter);
  app.use(appRouter);
};

const startServer = (app: Application, port: number): void => {
  app.listen(port, () =>
    new LoggerService().info(`🚀 Server listening on http://localhost:${port}`),
  );
};

const bootstrap = (): void => {
  const app = createExpressApp();
  configureApp(app);

  startServer(app, nodeConfig.port);
};

bootstrap();
