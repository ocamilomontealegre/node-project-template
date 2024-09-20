import { Logger } from "common/logger/logger.config";
import type { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  const logger = new Logger("Error Handler Middleware");

  const statusCode = 500;
  const message = err.message || "Internal Server Error";

  if (err.stack) logger.error(`❌ ${err.stack}`);

  res.status(statusCode).json({
    statusCode,
    message,
  });
};
