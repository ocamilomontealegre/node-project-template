import { injectable } from "inversify";
import { Logger } from "@common/logger/logger.config";
import type { NextFunction, Request, Response } from "express";

@injectable()
export class HttpLoggingInterceptor {
  private readonly _logger: Logger;

  public constructor() {
    this._logger = new Logger("HTTP Logging Interceptor");
  }

  public intercept = (req: Request, res: Response, next: NextFunction): void => {
    const { method, url, headers } = req;
    const requestBody = req.body ? JSON.stringify(req.body) : "";

    this._logger.debug(
      `🕵️  Incoming request: METHOD: ${method} | URL: ${url} | HEADERS: ${JSON.stringify(
        headers,
      )} | BODY: ${requestBody} |`,
    );

    const originalSend = res.send.bind(res);

    res.send = (body: unknown): Response => {
      this._logger.debug(`🕵️  Outgoing response: STATUS_CODE: ${res.statusCode} | BODY: ${body}`);
      return originalSend(body);
    };

    next();
  };
}
