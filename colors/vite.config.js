import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  // the dev page loads the baked pack from ../data/packs, outside this folder
  server: { fs: { allow: ['..'] } }
})
