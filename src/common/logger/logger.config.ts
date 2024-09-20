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
  private readonly logger: WinstonLogger;

  public constructor(private readonly _loggerLabel: string = "ExpressApplication") {
    this.logger = createLogger({
      level: "debug",
      format: combine(
        label({ label: this._loggerLabel }),
        timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        printf(
          (info) =>
            `\x1B[33m\x1B[3[${info.label}\x1B[23m\x1B[39m \x1B[32m${info.timestamp}\x1B[39m ${info.level}: ${info.message}`,
        ),
      ),
      transports: [
        new transports.Console({
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
        }),
        new transports.File({
          filename: "logs/debug.log",
          format: combine(json()),
        }),
      ],
      exceptionHandlers: [
        new transports.Console(),
        new transports.File({
          filename: "logs/exceptions.log",
          format: combine(json()),
        }),
      ],
    });
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
