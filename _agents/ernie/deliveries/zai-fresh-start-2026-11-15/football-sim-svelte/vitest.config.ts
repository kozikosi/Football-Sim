import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

// REV (2026-11-15, Z.ai E0b): the scaffold's vitest config did not apply the Svelte plugin, so
// .svelte.ts runes ($state) failed at runtime under Vitest ("$state is not defined") — the house
// rule says bridges MUST run headless under Vitest, so the config now merges the app's vite
// config (the same pattern the Vue scaffold ships). Recorded as a scaffold gap in E3, not a
// workaround: without it the bridge cannot be unit-tested at all.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'node',   // the scaffold ships node; jsdom is NOT installed (kept, not added)
      include: [
        'src/**/*.test.ts',
        'src/**/*.spec.ts'
      ]
    }
  })
);
