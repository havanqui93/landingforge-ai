import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    include: ["lib/**/*.test.ts", "app/**/*.test.ts"],
    environment: "node",
    // Prevent tests from reading or writing the local JSON store.
    env: { LANDINGFORGE_LOCAL_STORE: "0" },
  },
});
