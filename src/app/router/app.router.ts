import { Router } from "express";
import { injectable } from "inversify";
import type { Request, Response } from "express";

@injectable()
export class AppRouter {
  private _router: Router;

  public constructor() {
    this._router = Router();
    this._setupRouter();
  }

  private _setupRouter(): void {
    this._router.get("/", (req: Request, res: Response) =>
      res.status(200).json({ message: "Hello World" })
    );
    this._router.use((req: Request, res: Response) =>
      res.status(404).json({ message: "Endpoint Not Found!" })
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
