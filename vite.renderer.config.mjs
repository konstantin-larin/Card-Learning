import { defineConfig } from 'vite';
import { pluginExposeRenderer } from './vite.base.config.mjs';
import {viteStaticCopy} from "vite-plugin-static-copy";

// https://vitejs.dev/config
export default defineConfig((env) => {
  /** @type {import('vite').ConfigEnv<'renderer'>} */
  const forgeEnv = env;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? '';

  /** @type {import('vite').UserConfig} */
  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [
        pluginExposeRenderer(name),
        viteStaticCopy({
          targets: [
            {
              src: "node_modules/quill/dist/quill.snow.css",
              dist: "lib/quill/",
            }
          ]
        })
    ],
    resolve: {
      preserveSymlinks: true,
    },
    clearScreen: false,
  };
});
