// fresh-server.mjs — S14 (the order §4.10): the falsifiers' D-2 stale-server guard, ported to the
// STANDALONE batteries. A zombie preview on the port once served a stale build and turned a 6/10
// run into a 16/0 receipt — a green read over the WRONG bytes. The batteries now assert the
// served build IS this tree's build before the first law runs; a mismatch fails LOUD (exit 1),
// never green, and names the exact remedy on the port.
import fs from 'node:fs';
import path from 'node:path';

export async function assertFreshServer(port, root, tries = 40) {
  const want = (fs.readFileSync(path.join(root, 'dist', 'index.html'), 'utf8').match(/assets\/index-[^"]+\.js/) || [])[0];
  if (!want) throw new Error(`fresh-server: ${path.join(root, 'dist', 'index.html')} names no js asset — run npm run distfile first`);
  let got = null;
  for (let i = 0; i < tries && !got; i++) {
    try { const r = await fetch(`http://localhost:${port}/`); if (r.ok) got = (await r.text()).match(/assets\/index-[^"]+\.js/)?.[0] ?? null; } catch {}
    if (!got) await new Promise((res) => setTimeout(res, 500));
  }
  if (got !== want) throw new Error(`fresh-server: STALE SERVER on :${port} — served ${got ?? 'nothing'}, this tree built ${want}. Kill the listener (lsof -t -i:${port} | xargs -r kill -9), rebuild, re-run.`);
  return want;
}
