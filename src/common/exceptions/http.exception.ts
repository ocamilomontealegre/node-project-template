import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { BaseException } from "./base.exception";

export class HTTPException extends BaseException {
  public constructor(statusCode: number, errorMessage: string) {
    super("HttpException", statusCode, errorMessage);
  }
}

export class NotFoundException extends HTTPException {
  public constructor(errorMessage: string = getReasonPhrase(StatusCodes.NOT_FOUND)) {
    super(StatusCodes.NOT_FOUND, errorMessage);
  }
}

export class BadRequestException extends HTTPException {
  public constructor(errorMessage: string = getReasonPhrase(StatusCodes.BAD_REQUEST)) {
    super(StatusCodes.BAD_REQUEST, errorMessage);
  }
}
