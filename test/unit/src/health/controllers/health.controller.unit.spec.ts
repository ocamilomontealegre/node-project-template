import "reflect-metadata";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HealthController } from "@health/controllers/health.controller";
import { HEALTH_MESSAGE } from "@health/models/constants";
import type { HealthService } from "@health/services/health.service";
import type { IHealthMessage } from "@health/models/interfaces";

describe("HealthController Unit Test", () => {
  let healthController: HealthController;
  let mockHealthService: HealthService;

  beforeEach(() => {
    mockHealthService = {
      check: vi.fn().mockReturnValue(HEALTH_MESSAGE),
    } as unknown as HealthService;

    healthController = new HealthController(mockHealthService);
  });

  it("Should return the health status from the HealthService", async () => {
    const result: IHealthMessage = await healthController.check();

    expect(mockHealthService.check).toHaveBeenCalledTimes(1);
    expect(result).toEqual(HEALTH_MESSAGE);
  });
});
