import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // three.js lives in its own lazy chunk (~470 kB); that is expected.
  build: { chunkSizeWarningLimit: 600 },
});
