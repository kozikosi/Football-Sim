import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { serviceWorkerPlugin } from './tools/vite-plugin-sw.mjs'

export default defineConfig({
  plugins: [svelte(), serviceWorkerPlugin()]
})
