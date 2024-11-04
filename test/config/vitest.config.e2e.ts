import { defineConfig } from "vitest/config";
import baseConfig from "./vitest.config";

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ["test/**/*.e2e.test.{js,ts}", "test/**/*.e2e.spec.{js,ts}"],
    coverage: {
      ...baseConfig.test?.coverage,
      reportsDirectory: "../../test/coverage/e2e",
    },
  },
});
