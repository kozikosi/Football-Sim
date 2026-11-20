SPEAKER: PORCA | ROLE: advisor | TASK: C10 | DATE: 2026-11-20T03:33Z

# C10 — board measurement protocol (1–32, both viewports)

STATUS: protocol only — I did not run a browser this sitting. Tool availability VERIFIED:
`command -v agent-browser` → `/Users/kosi/.npm-global/bin/agent-browser`; `playwright` and
`playwright-cli` also on PATH. Selectors read from the c9 component sources on `origin/council/pickle`.

## 0 · FIX THE STATE FIRST (otherwise the numbers are not comparable)

- Build from the prepared tree (not a host copy): `cd <seat-worktree>/_agents/<seat>/deliveries/…/cakepanz-4 && npm ci && npm run build`.
- Serve the **built** app on a fixed port: `npm run preview -- --port 4173 --strictPort` → `http://127.0.0.1:4173/`.
- Seed: use Z.ai's `?seed=` query (his T3 in flight). **Until that lands, a full 1–32 sweep is
  UNKNOWN-repeatable** — record the seedless receipt as `REPORTED`, never as a seeded A/B. To make
  picks 1–32 deterministic during this window, drive the app through a fixed test draft state via the
  port seam rather than clicking through 32 random CPU picks; state in the receipt which method was used.
- One measurement per deck state; do not reuse a browser page across a pick and its re-measurement.

## 1 · SELECTORS (VERIFIED from source)

| Thing | Selector / expression | Source |
|---|---|---|
| Rendered row count | `document.querySelectorAll('.cp-row').length` | `BoardRow.svelte:23` `class="cp-row …"` |
| Deck count (contract) | `document.querySelector('.cp-rows')?.dataset.count` | header/chrome contract |
| Ring affordance | `document.querySelectorAll('.cp-row.cp-suggest').length` and their `data-id` | `BoardRow.svelte:23,82` |
| Pick counter | `document.querySelector('.cp-round')?.textContent` (e.g. `Round 1 · Pick 12`) | `BoardHeader.svelte:9` |
| Overall counter | `document.querySelector('.cp-overall')?.textContent` (`overall N of M`) | `BoardHeader.svelte:10` |
| On-clock label | `document.querySelector('.cp-onclock')?.textContent` | `BoardHeader.svelte:12` |
| Horizontal overflow | `document.documentElement.scrollWidth > document.documentElement.clientWidth` | DOM metric |

## 2 · agent-browser COMMANDS (quick visual pass)

```
agent-browser open http://127.0.0.1:4173/
agent-browser viewport 1180 900
agent-browser eval "({w:document.documentElement.scrollWidth,c:document.documentElement.clientWidth,rows:document.querySelectorAll('.cp-row').length,decks:document.querySelector('.cp-rows')?.dataset.count,rings:[...document.querySelectorAll('.cp-suggest')].map(e=>e.dataset.id),round:document.querySelector('.cp-round')?.textContent,overall:document.querySelector('.cp-overall')?.textContent})"
agent-browser viewport 390 320
agent-browser eval "<the same eval expression>"
```
Expected at 390 px: `w <= c`, and `rows === Number(decks)` at every pick. The `eval` expression is the
single source of truth for both viewports — do not count by eye.

## 3 · Playwright COMMANDS (deterministic 1–32 sweep + console capture)

```
node - <<'JS'
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1180, height: 900 } });
  const errors = [];
  p.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  p.on('pageerror', e => errors.push('pageerror: ' + e.message));
  await p.goto('http://127.0.0.1:4173/');
  for (const width of [1180, 390]) {
    await p.setViewportSize({ width, height: width === 390 ? 320 : 900 });
    for (let pick = 1; pick <= 32; pick++) {
      // advance one pick through the seeded test state, then read the same probe object
      const probe = await p.evaluate(() => ({
        rows: document.querySelectorAll('.cp-row').length,
        decks: Number(document.querySelector('.cp-rows')?.dataset.count),
        rings: [...document.querySelectorAll('.cp-row.cp-suggest')].map(e => e.dataset.id),
        round: document.querySelector('.cp-round')?.textContent,
        overall: document.querySelector('.cp-overall')?.textContent,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      }));
      console.log(JSON.stringify({ width, pick, ...probe }));
      if (probe.rows !== probe.decks || probe.overflow || probe.rings.length > 3) process.exitCode = 1;
      // await p.locator('<the seeded pick control>').click(); // one deterministic advance
    }
  }
  console.log(JSON.stringify({ errors })); if (errors.length) process.exitCode = 1;
  await b.close();
})();
JS
```
The pick-advance locator is deliberately a placeholder: it depends on Z.ai's seeded test-state API,
which is in flight (UNKNOWN to me). Do not fabricate it; fill it from his T3 receipt before running.

## 4 · PASS CONDITIONS (what a receipt must show)

- 64 probe lines (32 picks × 2 viewports), each with `rows === decks`, `overflow === false`, and
  `rings.length === 3` except on a declared tie (then 4+ with the tie ids and their raw values listed).
- `round`/`overall` advance monotonically 1→32 / N→M with no skipped or repeated pick.
- `errors: []` — zero console errors and zero pageerrors.
- The exact build sha256, the seed (or the explicit `SEEDLESS — REPORTED` label), the command and the
  raw output go in the bulletin entry. Stale results are re-measured, never quoted.

## 5 · KNOWN TRAP

The ring check must compare ids against the **raw-key oracle** in C5, not against the rendered text and
not against `.cp-suggest` alone. A DOM-only count can be self-consistently wrong (rounded-string ties
produce 60 rings); measure count AND ids against the engine-side expectation.
