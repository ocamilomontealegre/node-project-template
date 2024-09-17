import express, { json, type Express } from "express";
import "dotenv/config";
import { think } from "cowsay";
import { nodeConfig } from "common/env";

const createExpressApp = (): Express => {
  return express();
};

const configureApp = (app: Express): void => {
  app.use(json());
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
