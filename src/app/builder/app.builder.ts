import express, { json, type Application } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { serve, setup } from "swagger-ui-express";
import cors from "cors";
import helmet from "helmet";
import { AppRouter } from "@app/router/app.router";
import { HttpInterceptor } from "@common/interceptors";
import { OpenAPIConfigurator } from "@common/open-api/open-api.config";
import { HTTPExceptionFilter } from "@common/exception-filters";
import { Environment } from "@common/enums";
import type { Container } from "inversify";
import type { appConfig, nodeConfig } from "@common/env";

export class AppBuilder {
  private readonly app: Application;

  public constructor(
    private readonly nodeEnvConfig: typeof nodeConfig,
    private readonly appEnvConfig: typeof appConfig,
    private readonly appContainer: Container,
  ) {
    this.app = express();
    this.nodeEnvConfig = nodeEnvConfig;
    this.appEnvConfig = appEnvConfig;
    this.appContainer = appContainer;
  }

  public useJSonParser(): this {
    this.app.use(json());
    return this;
  }

  public useHelmet(): this {
    this.app.use(helmet());
    return this;
  }

  public useCors(): this {
    this.app.use(cors());
    return this;
  }

  public useHttpInterceptor(): this {
    this.app.use(new HttpInterceptor().intercept);
    return this;
  }

  public configureOpenAPI(): this {
    if (this.nodeEnvConfig.env === Environment.development) {
      const openAPIDocs = new OpenAPIConfigurator(this.appEnvConfig).configure(
        this.nodeEnvConfig.port,
      );
      this.app.use(this.appEnvConfig.appDocsEndpoint, serve, setup(openAPIDocs));
    }

    return this;
  }

  public setupRouters(): this {
    const inversifyRouter = new InversifyExpressServer(this.appContainer).build()
      ._router;
    const appRouter = this.appContainer.get<AppRouter>(AppRouter).getRouter();

    const apiPrefix = `/${this.appEnvConfig.appGlobalPrefix}/${this.appEnvConfig.appVersion}`;

    this.app.use(apiPrefix, inversifyRouter);
    this.app.use(appRouter);

    return this;
  }

  public useErrorHandler(): this {
    this.app.use(new HTTPExceptionFilter().catch);
    return this;
  }

  public build(): Application {
    return this.app;
  }
}


