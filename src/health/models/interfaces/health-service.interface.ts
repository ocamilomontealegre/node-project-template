import type { IHealthMessage } from "./health-message.interface";

export interface IHealthService {
  readonly check: () => IHealthMessage;
}
