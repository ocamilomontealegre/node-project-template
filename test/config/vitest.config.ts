import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    environment: "node",
    restoreMocks: true,
    include: ["**/*.test.{js.ts}", "**/*.spec.{js.ts}"],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
    poolOptions: {
      threads: {
        maxThreads: 4,
      },
    },
    testTimeout: 5000,
    hookTimeout: 10000,
    clearMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      all: true,
      include: ["src/**/*.{js,ts}"],
      exclude: ["node_modules", "dist", "test", "eslint.config.js"],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },
  },
});
