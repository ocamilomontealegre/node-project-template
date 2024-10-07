import { inject } from "inversify";
import { interfaces, controller, httpGet } from "inversify-express-utils";
import { HealthService } from "@health/services/health.service";
import { HEALTH_ENDPOINT } from "@health/models/constants";
import { IHealthMessage } from "@health/models/interfaces";

@controller(HEALTH_ENDPOINT)
export class HealthController implements interfaces.Controller {
  public constructor(@inject(HealthService) private readonly _healthService: HealthService) {}

  @httpGet("/")
  public async check(): Promise<IHealthMessage> {
    return this._healthService.check();
  }
}

