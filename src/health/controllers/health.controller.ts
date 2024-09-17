import { HealthService } from "health/services/health.service";
import type { Request, Response } from "express";
import type { IHealthMessage } from "health/models/interfaces/health-message.interface";

export class HealthController {
  public constructor(private readonly _healthService: HealthService) {}

  async check(req: Request, res: Response): Promise<IHealthMessage> {
    return this._healthService.check();
  }
}
