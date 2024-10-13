import { HTTPResponse } from "@common/utils";
import { HTTPException } from "@common/exceptions/http.exception";
import type { NextFunction, Request, Response } from "express";

export class HTTPExceptionFilter {
  public catch(err: Error, req: Request, res: Response, _: NextFunction): void {
    const statusCode = err instanceof HTTPException ? err.statusCode : 500;;
    const message = err.message ?? "Internal Server Error";

    const errorRespnse = new HTTPResponse({}, statusCode, false, message);

    res.status(statusCode).json(errorRespnse);
  }
}