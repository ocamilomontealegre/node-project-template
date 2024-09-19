import { inject } from "inversify";
import { HealthService } from "health/services/health.service";
import { controller, httpGet } from "inversify-express-utils";
import { HEALTH_ENDPOINT } from "health/models/constants";
import type { Request, Response } from "express";

@controller(HEALTH_ENDPOINT)
export class HealthController {
  public constructor(@inject(HealthService) private readonly _healthService: HealthService) {}

  @httpGet("/")
  public check(_: Request, res: Response): void {
    const healthStatus = this._healthService.check();
    res.json(healthStatus);
  }
}
