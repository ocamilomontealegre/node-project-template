import { Router } from "express";
import { inject, injectable } from "inversify";
import { HealthController } from "health/controllers/health.controller";
import { HEALTH_ENDPOINT } from "health/models/constants";

@injectable()
export class HealthRouter {
  private _router: Router;

  public constructor(
    @inject(HealthController)
    private readonly _healthController: HealthController
  ) {
    this._router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this._router.get(HEALTH_ENDPOINT, this._healthController.check);
  }

  public getRouter(): Router {
    return this._router;
  }
}
