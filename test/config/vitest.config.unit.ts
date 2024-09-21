import { defineConfig } from "vitest/config";
import baseConfig from "./vitest.config";

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ["test/**/*.unit.test.{js,ts}", "test/**/*.unit.spec.{js,ts}"],
    coverage: {
      ...baseConfig.test?.coverage,
      reportsDirectory: "../../test/coverage/unit",
    },
  },
});
