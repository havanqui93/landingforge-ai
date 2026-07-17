import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    // Only run our unit tests; keep the suite fast and node-only.
    include: ["lib/**/*.test.ts"],
    environment: "node",
  },
});
