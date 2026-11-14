import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'node:path'

// BENCH-2: multi-page build — the bench board (index.html) + the library-test board (library.html)
export default defineConfig({
  plugins: [svelte()],
  build: { rollupOptions: { input: { main: resolve(__dirname, 'index.html'), library: resolve(__dirname, 'library.html') } } },
})
