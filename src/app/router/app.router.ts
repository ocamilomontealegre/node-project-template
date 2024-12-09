import { injectable } from "inversify";
import { type NextFunction, type Request, type Response, Router } from "express";
import { NotFoundException } from "@common/exceptions/http.exception";

@injectable()
export class AppRouter {
  private readonly _router: Router;

  public constructor() {
    this._router = Router();
    this._setupRouter();
  }

  private _setupRouter(): void {
    this._router.get("/", (req: Request, res: Response) =>
      res.status(200).json({ message: "Hello World" }),
    );
    this._router.use((req: Request, res: Response, next: NextFunction) =>
      next(new NotFoundException("Endpoint Not Found!")),
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}

