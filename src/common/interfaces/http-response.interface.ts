import type { GenericObject } from "@common/types";

export interface IHTTPResponse {
  readonly status?: number;
  readonly success?: boolean;
  readonly message?: string;
  readonly data?: GenericObject;
  readonly timestamp?: string;
}
