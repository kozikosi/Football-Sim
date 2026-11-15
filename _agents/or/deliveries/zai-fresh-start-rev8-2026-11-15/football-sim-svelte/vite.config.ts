import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  base: './',   // relative asset paths for the offline single-file dist (see scripts/singlefile.mjs)
  plugins: [
    svelte({
      compilerOptions: {
        runes: true
      }
    })
  ]
});
