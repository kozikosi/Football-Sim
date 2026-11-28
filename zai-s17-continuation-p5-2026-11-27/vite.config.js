import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sourceTreeSha } from './scripts/source-tree-sha.mjs';

// item 10 (byte-latch — orcads R9 / porca B1): the build embeds the SOURCE-TREE hash it was built
// from (__CP_TREE_SHA__, the same walk scripts/gen-seam-card.mjs records as the card's treeSha).
// The dev-gated SeamCard chip shows the card ONLY when the two match; unequal or missing renders
// `UNKNOWN · generated before the last edit` with NO numeric fields — no default-green fallback.
const CP_TREE_SHA = sourceTreeSha();

export default defineConfig({
  plugins: [svelte()],
  // S15 §4.10 (the Workers static hand-over): asset URLs are ROOT-RELATIVE — a Worker serves
  // dist/ at the origin root, so every asset path must resolve from '/'. The single-file
  // distfile inlines everything, so the file:// law is unaffected.
  base: '/',
  server: { port: 5179 },
  define: {
    __CP_TREE_SHA__: JSON.stringify(CP_TREE_SHA),
  },
});
