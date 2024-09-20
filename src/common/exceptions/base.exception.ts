export class BaseException extends Error {
  public type: string;
  public statusCode: number;
  public errorMessage: string;

  public constructor(type: string, statusCode: number, errorMessage: string) {
    super(errorMessage);
    this.type = type;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;

    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
