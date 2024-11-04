import { injectable } from "inversify";
import {
  createLogger,
  format,
  transports,
  type Logger as WinstonLogger,
} from "winston";
import { ANSIColors } from "./enums";
import { LOGGER_COLORS } from "./constants";
import type { LogCallback } from "./types/log-callback.type";

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
        colors: LOGGER_COLORS,
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
          colorize({ all: true }),
          printf(function (info) {
            const processId = process.pid;
            return `${ANSIColors.BRIGHT_YELLOW}[Node] ${processId} - ${ANSIColors.BRIGHT_WHITE}${info.timestamp} ${ANSIColors.BRIGHT_YELLOW}- ${info.label} ${info.level} : ${info.message}`;
          }),
        ),
        transports: [this.consoleTransport, this.debugFileTransport],
        exceptionHandlers: [this.consoleTransport, this.exceptionFileTransport],
      });
    }
    return this._logger;
  }

  public info(message: string, icon: string = "📄", callback?: LogCallback): void {
    this.logger.info(`${icon} ${message}`, callback);
  }

  public warn(message: string, icon: string = "⚠️", callback?: LogCallback): void {
    this.logger.warn(`${icon} ${message}`, callback);
  }

  public error(message: string, icon: string = "💥", callback?: LogCallback): void {
    this.logger.error(`${icon} ${message}`, callback);
  }

  public debug(message: string, icon: string = "🐛", callback?: LogCallback): void {
    this.logger.debug(`${icon} ${message}`, callback);
  }
}
