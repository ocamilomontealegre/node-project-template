import { injectable } from "inversify";
import { HEALTH_MESSAGE } from "@health/models/constants/health-message.constant";
import type { IHealthMessage, IHealthService } from "@health/models/interfaces";

@injectable()
export class HealthService implements IHealthService {
  public constructor() {}

  public check(): IHealthMessage {
    return HEALTH_MESSAGE;
  }
}
