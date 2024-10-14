import { HTTPException } from "@common/exceptions/";
import { HTTPResponse, getHttpMessage } from "@common/utils";
import type { NextFunction, Request, Response } from "express";

export class HTTPExceptionFilter {
  public catch(err: Error, req: Request, res: Response, _: NextFunction): void {
    const statusCode = err instanceof HTTPException ? err.statusCode : 500;;
    const message = err.message ?? getHttpMessage(statusCode);

    const errorResponse = new HTTPResponse({ status: statusCode, success: false, message });

    res.status(statusCode).json(errorResponse);
  }
}