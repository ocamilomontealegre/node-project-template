import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { HealthService } from "@health/services/health.service";
import { HEALTH_MESSAGE } from "@health/models/constants";
import type { IHealthMessage, IHealthService } from "@health/models/interfaces";

describe("HealthService Unit Test", () => {
  let healthService: IHealthService;

  beforeEach(() => {
    healthService = new HealthService();
  });

  it("should return the correct health message", () => {
    const result: IHealthMessage = healthService.check();
    expect(result).toEqual(HEALTH_MESSAGE);
  });
});
