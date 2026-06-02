import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// Definimos la configuracion normal de vite
const viteConfig = defineViteConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

// definimos exclusivamente la configuracion de vitest
// Necesitamos modificar asi viteConfig.config.ts para hacer los test
const vitestConfig = defineVitestConfig({
  test: {
    environment: "jsdom",
    globals: true,
  },
});

// fusionamos ambas de configuraciones de forma segura para typescript
export default mergeConfig(viteConfig, vitestConfig);
