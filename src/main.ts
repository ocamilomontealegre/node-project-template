import "reflect-metadata";
import "dotenv/config";
import express, { json, type Application, type Router } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { AppModule } from "app/app.module";
import { AppRouter } from "app/router/app.router";
import { Logger } from "common/logger/logger.config";
import { configureOpenAPI } from "common/open-api/open-api.config";
import { errorHandler } from "common/middleware";
import { loggingInterceptor } from "common/interceptors";
import { nodeConfig } from "common/env";
import { Environment } from "common/enums";
import { initializeErrorHandling } from "common/utils";

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
  app.use(loggingInterceptor);

  if (nodeConfig.env === Environment.DEVELOPMENT) configureOpenAPI(app, nodeConfig.port);
  app.use(inversifyRouter);
  app.use(appRouter);

  app.use(errorHandler);
};

const startServer = (app: Application, port: number): void => {
  const server = app.listen(port, () =>
    new Logger().info(`🚀 Server listening on http://localhost:${port}`),
  );
  initializeErrorHandling(server);
};

const bootstrap = (): void => {
  const app = createExpressApp();
  configureApp(app);

  startServer(app, nodeConfig.port);
};

bootstrap();
