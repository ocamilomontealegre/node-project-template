import { injectable } from "inversify";
import { HEALTH_MESSAGE } from "health/models/constants/health-message.constant";
import { IHealthMessage, IHealthService } from "health/models/interfaces";
export const TYPES = {
  HealthService: Symbol.for("HealthService"),
};

@injectable()
export class HealthService implements IHealthService {
  public constructor() {}

  public check(): IHealthMessage {
    return HEALTH_MESSAGE;
  }
}
