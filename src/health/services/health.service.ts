import { HEALTH_MESSAGE } from "health/models/constants/health-message.constant";
import { IHealthMessage } from "health/models/interfaces/health-message.interface";

export class HealthService {
  public check(): IHealthMessage {
    return HEALTH_MESSAGE;
  }
}
