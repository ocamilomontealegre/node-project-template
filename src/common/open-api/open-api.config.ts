import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { serve, setup } from "swagger-ui-express";
import swaggerJSDoc, { type Options } from "swagger-jsdoc";
import { Logger } from "common/logger/logger.config";
import { appConfig } from "common/env";
import type { Application } from "express";

/* eslint-disable */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/* eslint-disable*/

export const configureOpenAPI = (app: Application, port: number): void => {
  const logger = new Logger("OpenAPI Docs");

  const openAPIOptions: Options = {
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "API Documentation",
        version: appConfig.appDocsVersion,
        description: "API documentation using OpenAPI 3.0.1",
      },
    },
    apis: [join(__dirname, "../../health/controllers/health.controller.ts")],
  };

  const openAPIDocs = swaggerJSDoc(openAPIOptions);
  app.use(appConfig.appDocsEndpoint, serve, setup(openAPIDocs));
  logger.info(`📔 OpenAPI docs is running on http://localhost:${port}${appConfig.appDocsEndpoint}`);
};
