import { Logger } from "common/logger/logger.config";
import type { NextFunction, Request, Response } from "express";

export const loggingInterceptor = (req: Request, res: Response, next: NextFunction): void => {
  const logger = new Logger("Logging Interceptor");

  const { method, url, headers } = req;
  const requestBody = req.body ? JSON.stringify(req.body) : "";

  logger.info(
    `🧩 Incoming request: METHOD: ${method} | URL: ${url} | HEADERS: ${JSON.stringify(
      headers,
    )} | BODY: ${requestBody} |`,
  );

  const originalSend = res.send.bind(res);

  res.send = function (body: unknown): Response {
    logger.info(`🧩 Outgoing response: STATUS_CODE: ${res.statusCode} | BODY: ${body}`);

    return originalSend(body);
  };

  next();
};
