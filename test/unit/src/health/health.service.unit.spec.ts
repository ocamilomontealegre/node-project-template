import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { HealthService } from "@health/services/health.service";
import { HEALTH_MESSAGE } from "@health/models/constants";

describe("HealthService Unit Test", () => {
  let healthService: HealthService;

  beforeEach(() => {
    healthService = new HealthService();
  });

  it("It should return the correct health message", () => {
    const result = healthService.check();
    expect(result).toEqual(HEALTH_MESSAGE);
  });
});
