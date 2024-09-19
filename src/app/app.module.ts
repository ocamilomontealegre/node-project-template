import { Container } from "inversify";
import { HealthModule } from "health/health.module";
import { AppRouter } from "./router/app.router";

export class AppModule {
  private readonly _container: Container;

  public constructor() {
    this._container = new Container();
    this._initializeModules();
  }

  private _initializeModules(): void {
    this._container.load(HealthModule);
    this._container.bind<AppRouter>(AppRouter).toSelf().inSingletonScope();
  }

  public getContainer(): Container {
    return this._container;
  }
}
