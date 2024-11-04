import { StatusCodes } from "http-status-codes";
import { HTTPException } from "@common/exceptions/";
import { HTTPUtils } from "@common/utils";
import { HTTPResponseModel } from "@common/models";
import type { NextFunction, Request, Response } from "express";

export class HTTPExceptionFilter {
  public catch(err: Error, req: Request, res: Response, _: NextFunction): void {
    const statusCode =
      err instanceof HTTPException ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message ?? HTTPUtils.getHttpMessage(statusCode);

    const errorResponse = new HTTPResponseModel({
      status: statusCode,
      success: false,
      message,
    });

    res.status(statusCode).json(errorResponse);
  }
}
