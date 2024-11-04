import "reflect-metadata";
import { Container } from "inversify";
import { HealthController } from "@health/controllers/health.controller";
import { HealthService } from "@health/services/health.service";
import { HealthModule } from "@health/health.module";

describe("HealthModule Unit Test", () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
    container.load(HealthModule);
  });

  it("should bind HealthService as a singleton", () => {
    const healthService1 = container.get<HealthService>(HealthService);
    const healthService2 = container.get<HealthService>(HealthService);

    expect(healthService1).toBe(healthService2);
  });

  it("should bind HealthController as a singleton", () => {
    const healthController1 = container.get<HealthController>(HealthController);
    const healthController2 = container.get<HealthController>(HealthController);

    expect(healthController1).toBe(healthController2);
  });

  it("should resolve HealthController and HealthService", () => {
    const healthController = container.get<HealthController>(HealthController);
    const healthService = container.get<HealthService>(HealthService);

    expect(healthController).toBeInstanceOf(HealthController);
    expect(healthService).toBeInstanceOf(HealthService);
  });
});
