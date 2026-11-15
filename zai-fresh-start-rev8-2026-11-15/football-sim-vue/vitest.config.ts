import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      root: fileURLToPath(new URL('./', import.meta.url)),

      // Unit tests only. Playwright tests belong to Playwright.
      include: [
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
      ],
    },
  }),
)
