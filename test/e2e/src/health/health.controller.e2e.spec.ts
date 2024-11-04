import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { AppBuilder } from "@app/builder/app.builder";
import { appConfig, nodeConfig } from "@common/env";
import { HTTPResponseModel } from "@common/models";
import { HEALTH_MESSAGE } from "@health/models/constants";
import type { Application } from "express";

describe("HealthController E2E Tests", () => {
  let app: Application;

  beforeEach(async () => {
    const appBuilder = new AppBuilder(nodeConfig, appConfig)
      .useCors()
      .useJSonParser()
      .useHttpInterceptor()
      .configureOpenAPI()
      .setupRouters()
      .useErrorHandler();

    app = appBuilder.build();
  });

  it("should return health check message", async () => {
    const response = await request(app).get("/api/v1/health");

    const expectedResponse = new HTTPResponseModel({
      message: "OK - Request completed successfully",
      data: HEALTH_MESSAGE,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ...expectedResponse,
      timestamp: expect.any(String),
    });
  });
});
