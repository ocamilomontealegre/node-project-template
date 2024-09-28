import { Logger } from "@common/logger/logger.config";
import type { Server } from "http";

export class ServerExceptionFilter {
  private readonly _httpServer: Server;
  private readonly _logger: Logger;

  public constructor(httpServer: Server) {
    this._httpServer = httpServer;
    this._logger = new Logger(ServerExceptionFilter.name);
  }

  public initialize(): void {
    process.on("uncaughtException", this.handleUncaughtException);
    process.on("unhandledRejection", this.handleUnhandledRejection);
  }

  private readonly handleUncaughtException = (err: Error): void => {
    this._logger.error(`Uncaught Exception: ${err.message}`);
    this.handleShutdown();
  };

  private readonly handleUnhandledRejection = (reason: unknown): void => {
    this._logger.error(`Unhandled Rejection: ${JSON.stringify(reason)}`);
    this.handleShutdown();
  };

  private readonly handleShutdown = (): void => {
    this._logger.debug("Shutting down gracefully...");
    this._httpServer.close(() => {
      this._logger.debug("Closed all remaining connections.");
      process.exit(1);
    });
  };
}

