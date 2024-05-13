import { defineConfig } from "vitest/config"
import { loadEnv } from 'vite';
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    // To access env vars here use process.env.TEST_VAR
    plugins: [react()],
    server: {
      open: true,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests",
      mockReset: true,
    },
  });
}