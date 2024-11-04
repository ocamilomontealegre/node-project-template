import type { EnumValues } from "@common/types";

export const Environment = {
  development: "development",
  production: "production",
  test: "test",
} as const;

export type EnvironmentType = EnumValues<typeof Environment>;
