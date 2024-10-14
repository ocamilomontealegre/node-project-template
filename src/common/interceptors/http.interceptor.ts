import { Logger } from "@common/logger/logger.config";
import { HTTPResponse, getHttpMessage } from "@common/utils";
import { appConfig } from "@common/env";
import type { NextFunction, Request, Response, Send } from "express";
import type { GenericObject } from "@common/types";

export class HttpInterceptor {
  private readonly _logger: Logger;

  public constructor() {
    this._logger = new Logger(HttpInterceptor.name);
  }

  private _overrideResMethod(res: Response, method: Send): Send {
    return (body: GenericObject): Response => {
      if (res.statusCode >= 400) {
        res.locals.httpResponse = body;
        return method.call(res, body);
      }

      const httpResponse = new HTTPResponse(
        { message: getHttpMessage(res.statusCode), data: body }
      );
      res.locals.httpResponse = httpResponse;

      return method.call(res, httpResponse);
    }
  }

  public intercept = (req: Request, res: Response, next: NextFunction): void => {
    const { method, url, headers } = req;

    const requestBody = req.body ? JSON.stringify(req.body) : "";

    if (url.includes(`${appConfig.appDocsEndpoint}`)) {
      return next();
    }

    const originalJson = res.json.bind(res);
    res.json = this._overrideResMethod(res, originalJson);

    res.on("finish", () => {
      const { statusCode, locals } = res;

      const logBody = `Incoming request: METHOD: ${method} | URL: ${url} | HEADERS: ${JSON.stringify(
        headers,
      )} | REQUEST-BODY: ${requestBody} | Outgoing response: STATUS_CODE: ${statusCode
        } | RESPONSE-BODY: ${JSON.stringify(locals.httpResponse)}`;

      if (statusCode >= 400)
        this._logger.error(logBody)
      else
        this._logger.info(logBody);
    });

    next();
  };
}

