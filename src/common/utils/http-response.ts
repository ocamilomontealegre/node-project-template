import type { IHTTPResponse } from "@common/interfaces";
import type { GenericObject } from "@common/types";

export class HTTPResponse implements IHTTPResponse {
  public readonly status: number;
  public readonly success: boolean;
  public readonly message: string;
  public readonly data: GenericObject;
  public readonly timestamp: string;

  public constructor(
    data: GenericObject = {},
    status: number = 200,
    success: boolean = true,
    message: string = "",
    timestamp: string = new Date().toISOString()
  ) {
    this.status = status;
    this.success = success;
    this.message = message;
    this.data = data;
    this.timestamp = timestamp;
  }
}