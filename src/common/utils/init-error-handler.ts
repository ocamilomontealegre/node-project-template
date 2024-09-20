import { Logger } from "common/logger/logger.config";
import type { Server } from "http";

export const initializeErrorHandling = (httpServer: Server): void => {
  const logger = new Logger();

  process.on("uncaughtException", (err: Error) => {
    logger.error(`Uncaught Exception: ${err.message}`);
  });

  process.on("unhandledRejection", (reason: unknown): void => {
    logger.error(`Unhandled Rejection: ${reason}`);
    handleShutdown();
  });

  const handleShutdown = (): void => {
    logger.debug("Shutting down gracefully...");
    httpServer.close(() => {
      logger.debug("Closed all remaining connections.");
      process.exit(1);
    });
  };
};
