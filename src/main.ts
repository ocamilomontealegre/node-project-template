import "reflect-metadata";
import "dotenv/config";
import { AppModule } from "@app/app.module";
import { AppBuilder } from "@app/builder/app.builder";
import { Logger } from "@common/logger/logger.config";
import { UncaughtExceptionFilter } from "@common/exception-filters";
import { appConfig, nodeConfig } from "@common/env";
import type { Application } from "express";

const startServer = (app: Application, port: number): void => {
  const server = app.listen(port, () =>
    new Logger().info(
      `Server listening on http://localhost:${port}/${appConfig.appGlobalPrefix}/${appConfig.appVersion}`,
      "🚀",
    ),
  );
  new UncaughtExceptionFilter(server).initialize();
};

const bootstrap = (): void => {
  const appModule = new AppModule();
  const appContainer = appModule.getContainer();

  const app = new AppBuilder(nodeConfig, appConfig, appContainer)
    .useJSonParser()
    .useHelmet()
    .useCors()
    .useHttpInterceptor()
    .configureOpenAPI()
    .setupRouters()
    .useErrorHandler()
    .build();

  startServer(app, nodeConfig.port);
};

bootstrap();

