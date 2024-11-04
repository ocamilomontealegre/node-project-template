import express, { json, type Application } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { serve, setup } from "swagger-ui-express";
import cors from "cors";
import helmet from "helmet";
import { AppModule } from "@app/app.module";
import { AppRouter } from "@app/router/app.router";
import { HttpInterceptor } from "@common/interceptors";
import { OpenAPIConfigurator } from "@common/open-api/open-api.config";
import { HTTPExceptionFilter } from "@common/exception-filters";
import { Environment } from "@common/enums";
import type { Container } from "inversify";
import type { appConfig, nodeConfig } from "@common/env";

export class AppBuilder {
  private readonly _app: Application;
  private readonly _appContainer: Container;

  public constructor(
    private readonly _nodeConfig: typeof nodeConfig,
    private readonly _appConfig: typeof appConfig,
  ) {
    this._app = express();
    this._nodeConfig = _nodeConfig;
    this._appConfig = _appConfig;
    this._appContainer = new AppModule().getContainer();
  }

  public useJSonParser(): this {
    this._app.use(json());
    return this;
  }

  public useHelmet(): this {
    this._app.use(helmet());
    return this;
  }

  public useCors(): this {
    this._app.use(cors());
    return this;
  }

  public useHttpInterceptor(): this {
    this._app.use(new HttpInterceptor().intercept);
    return this;
  }

  public configureOpenAPI(): this {
    if (this._nodeConfig.env === Environment.development) {
      const openAPIDocs = new OpenAPIConfigurator(this._appConfig).configure(
        this._nodeConfig.port,
      );
      this._app.use(this._appConfig.appDocsEndpoint, serve, setup(openAPIDocs));
    }

    return this;
  }

  public setupRouters(): this {
    const inversifyRouter = new InversifyExpressServer(this._appContainer).build()
      ._router;
    const appRouter = this._appContainer.get<AppRouter>(AppRouter).getRouter();

    const apiPrefix = `/${this._appConfig.appGlobalPrefix}/${this._appConfig.appVersion}`;

    this._app.use(apiPrefix, inversifyRouter);
    this._app.use(appRouter);

    return this;
  }

  public useErrorHandler(): this {
    this._app.use(new HTTPExceptionFilter().catch);
    return this;
  }

  public build(): Application {
    return this._app;
  }
}
