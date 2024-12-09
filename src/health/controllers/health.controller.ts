import { inject } from "inversify";
import { BaseHttpController, controller, httpGet } from "inversify-express-utils";
import { HealthService } from "@health/services/health.service";
import { HEALTH_ENDPOINT } from "@health/models/constants";
import type { IHealthMessage } from "@health/models/interfaces";

@controller(HEALTH_ENDPOINT)
export class HealthController extends BaseHttpController {
  public constructor(
    @inject(HealthService) private readonly _healthService: HealthService,
  ) {
    super();
  }

  @httpGet("/")
  public async check(): Promise<IHealthMessage> {
    return this._healthService.check();
  }
}

