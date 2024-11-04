import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    environment: "node",
    restoreMocks: true,
    include: ["test/**/*.{e2e,unit}.test.{js,ts}", "test/**/*.{e2e,unit}.spec.{js,ts}"],
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
      exclude: [
        "src/**/*.interface.ts",
        "src/**/*.d.ts",
        "**/index.ts",
        "node_modules",
        "dist",
        "test",
        "eslint.config.js",
      ],
      thresholds: {
        lines: 10,
        functions: 10,
        branches: 10,
        statements: 10,
      },
    },
  },
});
