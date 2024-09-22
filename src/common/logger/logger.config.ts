import { injectable } from "inversify";
import {
  createLogger,
  format,
  LogCallback,
  transports,
  type Logger as WinstonLogger,
} from "winston";

const { colorize, combine, json, label, printf, timestamp } = format;

@injectable()
export class Logger {
  private readonly _loggerLabel!: string;
  private _logger?: WinstonLogger;

  public constructor(_loggerLabel: string = "ExpressApplication") {
    this._loggerLabel = _loggerLabel;
  }

  private readonly consoleTransport = new transports.Console({
    format: combine(
      colorize({
        all: true,
        colors: {
          info: "bold blue",
          warn: "bold yellow",
          error: "bold red",
          debug: "bold magenta",
        },
      }),
    ),
  });

  private readonly debugFileTransport = new transports.File({
    filename: "logs/debug.log",
    format: combine(json()),
  });

  private readonly exceptionFileTransport = new transports.File({
    filename: "logs/exceptions.log",
    format: combine(json()),
  });

  private get logger(): WinstonLogger {
    if (!this._logger) {
      this._logger = createLogger({
        level: "debug",
        format: combine(
          label({ label: `[${this._loggerLabel}]` }),
          timestamp({
            format: "MMM-DD-YYYY HH:mm:ss",
          }),
          printf(function (info) {
            return `\x1B[33m\x1B[3m${info.label}\x1B[23m\x1B[39m \x1B[32m${info.timestamp}\x1B[39m ${info.level} : ${info.message}`;
          }),
        ),
        transports: [this.consoleTransport, this.debugFileTransport],
        exceptionHandlers: [this.consoleTransport, this.exceptionFileTransport],
      });
    }
    return this._logger;
  }

  public info(message: string, callback?: LogCallback): void {
    this.logger.info(message, callback);
  }

  public warn(message: string, callback?: LogCallback): void {
    this.logger.warn(message, callback);
  }

  public error(message: string, callback?: LogCallback): void {
    this.logger.error(message, callback);
  }

  public debug(message: string, callback?: LogCallback): void {
    this.logger.debug(message, callback);
  }
}
