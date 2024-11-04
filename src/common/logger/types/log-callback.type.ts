import type { LogEntry } from "winston";

export type LogCallback = (error: Error | null, info: LogEntry) => void;
