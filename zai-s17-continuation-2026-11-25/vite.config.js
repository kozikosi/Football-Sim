import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  // S15 §4.10 (the Workers static hand-over): asset URLs are ROOT-RELATIVE — a Worker serves
  // dist/ at the origin root, so every asset path must resolve from '/'. The single-file
  // distfile inlines everything, so the file:// law is unaffected.
  base: '/',
  server: { port: 5179 },
});
