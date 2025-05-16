import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  base: "https://IrynaS1.github.io/weather-app-react",
  plugins: [react()],
});
