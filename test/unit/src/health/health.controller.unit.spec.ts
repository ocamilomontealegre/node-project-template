import "reflect-metadata";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HealthController } from "@health/controllers/health.controller";
import { HEALTH_MESSAGE } from "@health/models/constants";
import type { Request, Response } from "express";
import type { HealthService } from "@health/services/health.service";

describe("HealthController Unit Test", () => {
  let healthController: HealthController;
  let mockHealthService: HealthService;
  let mockRequest: Request;
  let mockResponse: Response;

  beforeEach(() => {
    mockHealthService = {
      check: vi.fn().mockReturnValue(HEALTH_MESSAGE),
    } as unknown as HealthService;

    healthController = new HealthController(mockHealthService);

    mockRequest = {} as Request;
    mockResponse = { json: vi.fn() } as unknown as Response;
  });

  it("Should return the health status from the HealthService", () => {
    healthController.check(mockRequest, mockResponse);

    expect(mockHealthService.check).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith(HEALTH_MESSAGE);
  });
});
