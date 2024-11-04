import type { IHTTPResponse } from "@common/interfaces";
import type { GenericObject } from "@common/types";

export class HTTPResponseModel {
  public readonly status: number;
  public readonly success: boolean;
  public readonly message: string;
  public readonly data: GenericObject;
  public readonly timestamp: string;

  public constructor({
    status = 200,
    success = true,
    message = "",
    data = {},
    timestamp = new Date().toISOString(),
  }: IHTTPResponse = {}) {
    this.status = status;
    this.success = success;
    this.message = message;
    this.data = data;
    this.timestamp = timestamp;
  }
}
