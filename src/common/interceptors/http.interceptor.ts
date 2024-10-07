import { Logger } from "@common/logger/logger.config";
import type { NextFunction, Request, Response } from "express";

export class HttpInterceptor {
  private readonly _logger: Logger;

  public constructor() {
    this._logger = new Logger(HttpInterceptor.name);
  }

  public intercept = (req: Request, res: Response, next: NextFunction): void => {
    const { method, url, headers } = req;

    const requestBody = req.body ? JSON.stringify(req.body) : "";
    let responseBody: unknown;

    if (!url.includes("/docs/")) {
      const originalSend = res.send.bind(res);

      res.send = (body: unknown): Response => {
        responseBody = body;
        return originalSend(body);
      };

      res.on("finish", () => {
        this._logger.info(
          `🕵️  Incoming request: METHOD ${method} | URL: ${url} | HEADERS: ${JSON.stringify(
            headers,
          )} | REQUEST-BODY: ${requestBody} | Outgoing response: STATUS_CODE: ${
            res.statusCode
          } | RESPONSE-BODY: ${responseBody}`,
        );
      });
    }

    next();
  };
}

