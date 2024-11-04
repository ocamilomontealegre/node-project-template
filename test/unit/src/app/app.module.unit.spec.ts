import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { Container } from "inversify";
import { AppModule } from "@app/app.module";
import { HealthService } from "@health/services/health.service";
import { HealthController } from "@health/controllers/health.controller";
import { AppRouter } from "@app/router/app.router";

describe("AppModule Unit Test", () => {
  let appModule: AppModule;
  let container: Container;

  beforeEach(() => {
    appModule = new AppModule();
    container = appModule.getContainer();
  });

  it("should return the container instance", () => {
    const container = appModule.getContainer();
    expect(container).toBeInstanceOf(Container);
  });

  it("should load the HealthModule", () => {
    const healthService = container.get<HealthService>(HealthService);
    expect(healthService).toBeDefined();

    const healthController = container.get<HealthController>(HealthController);
    expect(healthController).toBeDefined();
  });

  it("should bind AppRouter as a singleton", () => {
    const appRouter1 = container.get<AppRouter>(AppRouter);
    const appRouter2 = container.get<AppRouter>(AppRouter);

    expect(appRouter1).toBe(appRouter2);
  });
});
