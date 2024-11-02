import { inject } from "inversify";
import { controller, httpGet, type Controller } from "inversify-express-utils";
import { HealthService } from "@health/services/health.service";
import { HEALTH_ENDPOINT } from "@health/models/constants";
import { IHealthMessage } from "@health/models/interfaces";

@controller(HEALTH_ENDPOINT)
// @ts-expect-error: HealthController is missing index signature for 'string'
export class HealthController implements Controller {
  public constructor(
    @inject(HealthService) private readonly _healthService: HealthService,
  ) {}

  @httpGet("/")
  public async check(): Promise<IHealthMessage> {
    return this._healthService.check();
  }
}

