import { BaseException } from "./base.exception";

export class HTTPException extends BaseException {
  public constructor(statusCode: number, errorMessage: string) {
    super("HttpException", statusCode, errorMessage);
  }
}

export class NotFoundException extends HTTPException {
  public constructor(errorMessage: string = "Resource not found") {
    super(404, errorMessage);
  }
}

export class BadRequestException extends HTTPException {
  public constructor(errorMessage: string = "Bad Request") {
    super(400, errorMessage);
  }
}
