import { injectable } from "inversify";
import { createLogger, format, LogCallback, transports } from "winston";

const { colorize, combine, json, label, printf, timestamp } = format;

@injectable()
export class LoggerService {
  public constructor() {}

  private readonly _consoleTransport = new transports.Console({
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

  private readonly _debugFileTransport = new transports.File({
    filename: "logs/debug.log",
    format: combine(json()),
  });

  private readonly _exceptionFileTransport = new transports.File({
    filename: "logs/exceptions.log",
    format: combine(json()),
  });

  private readonly logger = createLogger({
    level: "debug",
    format: combine(
      label({ label: "ExpressApplication" }),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      printf(
        (info) =>
          `\x1B[33m\x1B[3[${info.label}\x1B[23m\x1B[39m \x1B[32m${info.timestamp}\x1B[39m ${info.level}: ${info.message}`,
      ),
    ),
    transports: [this._consoleTransport, this._debugFileTransport],
    exceptionHandlers: [this._consoleTransport, this._exceptionFileTransport],
  });

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
