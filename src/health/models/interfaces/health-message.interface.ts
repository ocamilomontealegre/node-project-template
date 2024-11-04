import type { GenericObject } from "@common/types";

export interface IHealthMessage extends GenericObject {
  readonly status: string;
}
