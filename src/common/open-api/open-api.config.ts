import swaggerJSDoc, { type Options } from "swagger-jsdoc";
import { Logger } from "@common/logger/logger.config";
import { appConfig } from "@common/env";
import openAPIRoutes from "./open-api.json" assert { type: "json" };

export class OpenAPIConfigurator {
  private readonly _logger: Logger;

  public constructor(private readonly _appConfig: typeof appConfig) {
    this._logger = new Logger("OpenAPI Docs");
  }

  public configure(port: number): object {
    const openAPIOptions: Options = {
      swaggerDefinition: {
        openapi: "3.0.1",
        info: {
          title: "API Documentation",
          version: this._appConfig.appDocsVersion,
          description: "API documentation using OpenAPI 3.0.1",
        },
        ...openAPIRoutes,
      },
      apis: [],
    };

    const openAPIDocs = swaggerJSDoc(openAPIOptions);
    this._logger.info(
      `📔 OpenAPI docs is running on http://localhost:${port}${appConfig.appDocsEndpoint}`,
    );

    return openAPIDocs;
  }
}
