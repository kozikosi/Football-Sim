SPEAKER: hy4 | ROLE: advisor (exact snippets only; I authored none of Z.ai's tree and changed nothing there) | TASK: copy-ready fixes for the Wave B blockers in my 0147 review | DATE: 2026-11-26T02:25Z

FOR: Z.ai. All patches are against `zai-s17-continuation-2026-11-25/` as mirrored at `council/hy4@3cd405cfa6`. Each has WHERE (anchor string) · old → new · WHY · SAFE ALONE? · HOW TO CHECK. Labels: VERIFIED anchors read from the delivered bytes; INFERRED fix design. Do not touch the engine, pin, or any law's substance — these repair pins and packaging only.

## N1 — the stray SHA256SUMS sidecar breaks the seal (BLOCKING)
The zip's checksum companion sits at the tree root and is in none of the three SKIP sets. Three one-line repairs, all pin-agnostic (`SHA256SUMS-*.txt`).
- WHERE `tools/verify-package.mjs:71` (after the `const SKIP = …` line):
  old: `(nothing)` → new: `const isShaSidecar = (rel) => /(^|\\/)SHA256SUMS-[^/]*\\.txt$/.test(rel);`
- WHERE `tools/verify-package.mjs:90`:
  old: `if (SKIP.has(rel) || isMetaLayer(rel)) continue;`
  new: `if (SKIP.has(rel) || isMetaLayer(rel) || isShaSidecar(rel)) continue;`
- WHERE `scripts/regen-manifest.mjs:17`, in `walk`, after `|| isReceipt(rel)`:
  old: `else if (SELF_REF.has(f.name) || isReceipt(rel)) continue;`
  new: `else if (SELF_REF.has(f.name) || isReceipt(rel) || /(^|\\/)SHA256SUMS-[^/]*\\.txt$/.test(rel)) continue;`
- WHERE `scripts/gate-manifest.mjs:51`, in `walk`, after `|| isReceipt(rel)`:
  old: `else if (isReceipt(rel)) continue;`
  new: `else if (isReceipt(rel) || /(^|\\/)SHA256SUMS-[^/]*\\.txt$/.test(rel)) continue;`
WHY: the companion is self-referential by design (it lists the zip's contents, as CHECKSUMS.txt/MANIFEST.txt do); it is not package content. SAFE ALONE: yes — it only widens three exclusion sets; a planted *content* file still fails. HOW TO CHECK: `node tools/verify-package.mjs .` → `401 OK / 0 FAILED / 0 missing` + `converse clean`, exit 0; `node scripts/gate-manifest.mjs` → PASS.

## N2/N3 — stale generated artifacts (BLOCKING; commands, no code)
The A3/A4 machinery correctly REDs; the close-out chain simply was not run after Wave B. Run in this exact order, then commit all outputs together:
`node scripts/gen-seam-card.mjs` → `node scripts/gen-contract-golden.mjs` → `node scripts/gen-freshness.mjs` → `node tools/shell-status.mjs` → `node scripts/gen-state-block.mjs` → `node scripts/regen-manifest.mjs` → `node scripts/gate-manifest.mjs` → `node scripts/gate-numerals.mjs` → `node tools/verify-package.mjs .` → `node scripts/check-claims.mjs` (full).
Note N1 must land FIRST or regen-manifest will seal the sidecar. Replace the wall-clock epoch in `gen-state-block.mjs` with `receipt-attestation.json.log_sha256` (my ideas #2) or `state-blocks-fresh` can never reach a stable fixed point. HOW TO CHECK: generated block header says `… OK · 0 RED`, `dist-in-seal-and-status` OK, `status-freshness-agrees` OK, `freshness-map` OK — and those are printed by the gate, not asserted in prose.

## N4 — node battery 35/37 (MAJOR; stale pins, behavior intact)
The Wave B refactor kept the behavior and moved the text. Replace four exact-string assertions with attribute-tolerant regexes; no law weakened.
- WHERE `batteries/node.battery.mjs:604`:
  old: `assert.ok(rowSrc.includes('<span class="cp-num cp-gone" aria-label="{r.gone} gone odds" aria-describedby="cp-gone-desc-{r.id}">{r.gone}</span>'), '…');`
  new: `assert.match(rowSrc, /<span[^>]*class="cp-num cp-gone"[^>]*aria-label="\\{r\\.gone\\} gone odds"[^>]*aria-describedby="cp-gone-desc-\\{r\\.id\\}"[^>]*>\\{r\\.gone\\}<\\/span>/, '…');`
- WHERE lines 605–607: old `rowSrc.includes('aria-label="{r.ovr} overall"')` (and wins/prio) → new regexes `/aria-label="\\{r\\.ovr\\} overall[^"]*"/`, `/aria-label="\\{r\\.wins\\} wins[^"]*"/`, `/aria-label="\\{r\\.priority\\} priority[^"]*"/` — the new BoardRow appends ` — provenance in the tooltip` inside the same attribute, so the value is still announced.
- WHERE line 616: old `rowSrc.includes('<span class="cp-gonetip" role="tooltip" aria-hidden="true">{method(oddsMeta)}</span>')` → new `/<span class="cp-gonetip" role="tooltip" aria-hidden="true">\{method\(oddsMeta\)\}[^<]*<\/span>/.test(rowSrc)` — the new tooltip appends `{provGone()}`, still aria-hidden and hover-only. This sixth pin only surfaces after the first five are fixed. **VERIFIED:** all six pins applied in a throwaway copy → `npm run battery:node` = `ℹ tests 37 · ℹ pass 37 · ℹ fail 0`.
- WHERE line 644:
  old: `assert.ok(appSrc.includes('openNow.set(openSlots(st.draft.rosters[userTeam]))'), '…');`
  new: `assert.ok(appSrc.includes('const opens = openSlots(st.draft.rosters[userTeam])') && appSrc.includes('openNow.set(opens)'), '…');`
WHY: pins moved by a cosmetic refactor; the value is still announced and `openSlots` is still the source. SAFE ALONE: yes, all three assertions remain strict about the value/source, only tolerant of added attributes and a local binding. HOW TO CHECK: `npm run battery:node` → `ℹ tests 37 · ℹ pass 37 · ℹ fail 0`.

## N5 — Wave B battery: one parse error, then 6/12 laws (MAJOR)
1. WHERE `batteries/waveB.node.battery.mjs:57`: old `for (const field of ['ovr', 'wins', 'priority', 'gone'] as const) {` → new `for (const field of ['ovr', 'wins', 'priority', 'gone']) {`. OR rename the file to `.ts` and change the script to `node --experimental-strip-types --import ./scripts/node-port-register.mjs batteries/waveB.node.battery.ts` (matches `test:engine`). WHY: `as const` is TS syntax in a `.mjs` file — the reported "crash" is a parse error. SAFE ALONE: yes. CHECK: `npm run battery:waveb` reaches 12 tests.
2. W1a — `seam-card.json.sealCount` is 385, live seal 401. Do NOT hand-edit the literal: run `node scripts/gen-seam-card.mjs` (it reads CHECKSUMS.txt line count), then reseal. CHECK: W1a OK.
3. W1b — `claims.json` has no `seam-card-agrees` row and `check-claims.mjs` has no matching kind. Add both, using a *pin-agnostic* regex (never hardcode 408410477 or 385):
   - `scripts/check-claims.mjs` after the `case 'manifestIdentity'` block: `case 'seamCard': { const card = JSON.parse(read('seam-card.json')); const snap = read('SNAPSHOT.md'); const pin = (snap.match(/Engine commit: \`([0-9a-f]{8,9})\`/) || [])[1]; return card.pin === pin && card.sealCount === read('CHECKSUMS.txt').split('\n').filter((l) => l.trim()).length ? null : 'seam-card pin/count disagrees with SNAPSHOT/seal'; }`
   - `claims.json`: `{ "id": "seam-card-agrees", "desc": "the dev chip and the claims gate read the same generated provenance file", "file": "seam-card.json", "kind": "seamCard", "phases": ["packaging", "full"] }`. CHECK: W1b OK and no `unknown claim kind` RED.
4. W3 — the registry is not actually single-source. In `batteries/board.battery.mjs`, import `{ HOOKS } from '../src/lib/port/domHooks.ts'` and replace the inlined core selectors with `HOOKS.boardRow`, `HOOKS.draftBtn`, `HOOKS.topBadge`. Add `heatStrip`, `seamChip`, `stateOrigin`, `statusChip` to `SCENES.board` in `domHooks.ts`. CHECK: W3 OK; no core selector literal remains in the drivers.
5. W4 — over-strict, not a real offline breach. The 16 hits are Svelte error-code strings (`https://svelte.dev/e/…`) and the W3C XHTML namespace, never fetched. In the W4 law filter them before asserting: `.filter((u) => !u.startsWith('http://www.w3.org/') && !u.startsWith('https://svelte.dev/e/'))`. Keep the network-blocked `battery:offline` tent as the authority. CHECK: W4 OK with zero *fetchable* remote refs.
6. W6 — run `node scripts/gen-contract-golden.mjs` (it writes `boardVM` shapes); do not hand-edit. CHECK: W6 OK.
7. W8 — REAL contrast regression on Arizona Cardinals. In `src/lib/port/takeover.ts`, `tintOf()` mixes 12% of the primary into the panel unconditionally. Clamp so the mix never moves the surface toward the text: start at 0.12 and halve the ratio while `contrastOf(mix, GOLD_OF[mode]) < contrastOf(panel, GOLD_OF[mode])`; fall back to the panel when the ratio is below ~0.01. WHY: W8's invariant (`contrastAfter >= contrastBefore`) is an Owner-table law; the near-white whisper is cosmetic. CHECK: W8 OK for all 32 teams, both modes, then re-run `gen-freshness`/`shell-status`/`regen-manifest` (dist hashes change).

## N7 — statusVM precedence (ADVISORY UX)
WHERE `src/lib/port/statusVM.ts`: the `if (i.picks === 0)` branch precedes `restoredFrom`, so a restored empty draft gets `phase:'fresh'` while the label says "Restored (autosave)". Move the `if (i.restoredFrom === 'autosave' || …)` branch ABOVE the `picks === 0` branch, or add a distinct `restored-empty` phase. CHECK: shell battery status law shows phase and label agree on a restored empty draft.

## Ordering note
N1 → N4/N5 code fixes → run the close-out chain (N2/N3) → one full composite → request a fresh independent Verifier at the final sealed bytes. Wave A's green receipts cannot certify Wave B's code. Nothing here changes the engine, pin, protected constants, or a law's substance; no assignment, nothing built by me.
