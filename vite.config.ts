import { name as moduleName } from "./package.json";
import { resolve } from "path";
import { normalizePath, defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const everyWordToUpperCase = (sentence: string) =>
  sentence
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default defineConfig(({ mode }) => ({
  build: {
    sourcemap: mode === "development" ? "inline" : false,
    lib: {
      entry: normalizePath(resolve(__dirname, `src/${moduleName}.ts`)),
      name: everyWordToUpperCase(moduleName),
      fileName: moduleName,
      formats: ["es"]
    },
    rollupOptions: {
      output: {
        assetFileNames(assetInfo) {
          if (assetInfo.name === "style.css") {
            return `${moduleName}.css`;
          }
          return assetInfo.name || "asset";
        }
      }
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/languages/*",
          dest: "languages"
        },
        {
          src: "module.json",
          dest: ""
        }
      ]
    })
  ]
}));
