import "reflect-metadata";
import "dotenv/config";
import express, { json } from "express";
import { think } from "cowsay";
import { InversifyExpressServer } from "inversify-express-utils";
import { AppModule } from "app/app.module";
import { AppRouter } from "app/router/app.router";
import { nodeConfig } from "common/env";
import type { Application, Router } from "express";

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
    console.log(
      think({
        text: `🚀 Server listening on http://localhost:${port}`,
        e: "Oo",
        T: "U",
      })
    )
  );
};

const bootstrap = (): void => {
  const app = createExpressApp();
  configureApp(app);

  startServer(app, nodeConfig.port);
};

bootstrap();
