import "reflect-metadata";
import "dotenv/config";
import express, { json } from "express";
import { think } from "cowsay";
import { AppModule } from "app/app.module";
import { AppRouter } from "app/router/app.router";
import { nodeConfig } from "common/env";
import type { Express, Router } from "express";

const createExpressApp = (): Express => {
  return express();
};

const setRouter = (): Router => {
  const appContainer = new AppModule().getContainer();
  return appContainer.get<AppRouter>(AppRouter).getRouter();
};

const configureApp = (app: Express): void => {
  const appRouter = setRouter();

  app.use(json());
  app.use(appRouter);
};

const startServer = (app: Express, port: number): void => {
  app.listen(port, () =>
    console.info(
      think({
        text: `🚀 Server listening on http://localhost:${port}`,
        e: "oO",
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

void bootstrap();
