import { inject } from "inversify";
import { HealthService, TYPES } from "health/services/health.service";
import { controller, httpGet } from "inversify-express-utils";
import 
import type { Request, Response } from "express";

@controller("")
export class HealthController {
  public constructor(
    @inject(TYPES.HealthService) private readonly _healthService: HealthService
  ) {}

  @httpGet("/")
  public check(req: Request, res: Response): void {
    const healthStatus = this._healthService.check();
    res.json(healthStatus);
  }
}
