import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["src"],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        button: path.resolve(__dirname, "src/components/buttons/Button.tsx"),
        input: path.resolve(__dirname, "src/components/inputs/Input.tsx"),
        card: path.resolve(__dirname, "src/components/data-display/Card.tsx"),
        workflows: path.resolve(__dirname, "src/workflows/index.ts"),
        core: path.resolve(__dirname, "src/core/builder.ts"),
      },
      name: "CriationUI",
      fileName: (format, entryName) => `${entryName}.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        banner: '"use client";\n',
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "styles.css";
          return assetInfo.name || "asset";
        },
      },
    },
  },
});
