import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// vapor-mode falsifier (item 1): the ONLY delta from the canonical arm-vue config.
//   features.vapor: true   — force all <script setup> SFCs to compile in Vapor mode
//                            (plugin-vue 6.0.11, Vue 3.6+; the option lives under `features` —
//                            a top-level `vapor` is silently ignored, first attempt's lesson)
//   features.optionsAPI: false — composition-only tree-shaking: Options-API support
//                            dead-code-eliminated from the runtime
// Same source, same chrome, same probe; the framework compile is the only variable.
export default defineConfig({
  plugins: [vue({ features: { vapor: true, optionsAPI: false } })],
  base: './',
  server: { port: 5190 },
});
