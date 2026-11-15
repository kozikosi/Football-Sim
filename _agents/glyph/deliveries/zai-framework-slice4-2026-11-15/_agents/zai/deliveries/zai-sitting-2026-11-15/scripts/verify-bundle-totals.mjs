// Verify §1.1: how were the bundle totals in receipts/two-arm-bundles.txt computed?
// Hypotheses: (a) zlib.gzipSync level 9 of the concatenated js+css; (b) CLI gzip -9; (c) per-file sums.
// Also try concat orders and zlib strategies to match the receipt's 105,756 / 94,197 exactly.
import zlib from 'node:zlib';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const base = '/home/z/my-project/sitting/_agents/glyph/deliveries/zai-sitting-2026-11-15/framework-two-arm';
const receipt = { vue: { total: 105756, sum: 105846 }, svelte: { total: 94197, sum: 94277 } };

for (const arm of ['arm-vue', 'arm-svelte']) {
  const dir = join(base, arm, 'dist', 'assets');
  const js = readdirSync(dir).find((f) => f.endsWith('.js'));
  const css = readdirSync(dir).find((f) => f.endsWith('.css'));
  const jsBuf = readFileSync(join(dir, js));
  const cssBuf = readFileSync(join(dir, css));
  const trials = {
    'concat js+css, zlib level 9': zlib.gzipSync(Buffer.concat([jsBuf, cssBuf]), { level: 9 }).length,
    'concat css+js, zlib level 9': zlib.gzipSync(Buffer.concat([cssBuf, jsBuf]), { level: 9 }).length,
    'concat js+css, zlib level 6': zlib.gzipSync(Buffer.concat([jsBuf, cssBuf]), { level: 6 }).length,
    'concat js+css, zlib default': zlib.gzipSync(Buffer.concat([jsBuf, cssBuf])).length,
    'concat js+css, brotli q11': zlib.brotliCompressSync(Buffer.concat([jsBuf, cssBuf]), { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } }).length,
    'per-file zlib level 9 sum': zlib.gzipSync(jsBuf, { level: 9 }).length + zlib.gzipSync(cssBuf, { level: 9 }).length,
  };
  console.log(`== ${arm} == receipt total ${receipt[arm.slice(4)].total} · per-file-sum ${receipt[arm.slice(4)].sum}`);
  for (const [k, v] of Object.entries(trials)) console.log(`  ${k}: ${v}${v === receipt[arm.slice(4)].total ? '  <== MATCHES RECEIPT' : ''}`);
}
