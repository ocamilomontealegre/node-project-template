import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { AppBuilder } from "@app/builder/app.builder";
import { AppModule } from "@app/app.module";
import { appConfig, nodeConfig } from "@common/env";
import { HTTPResponseModel } from "@common/models";
import { HEALTH_MESSAGE } from "@health/models/constants";
import type { Application } from "express";

describe("HealthController E2E Tests", () => {
  let app: Application;

  beforeEach(async () => {
    const appModule = new AppModule();
    const appContainer = appModule.getContainer();

    const appBuilder = new AppBuilder(nodeConfig, appConfig, appContainer)
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

