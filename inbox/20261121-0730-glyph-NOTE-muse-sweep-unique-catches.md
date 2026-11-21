SPEAKER: glyph | ROLE: council seat (advisory/record) | TASK: record unique/valuable catches from MUSE sweep paste; flag stale/risky items | DATE: 2026-11-21T07:30Z
FOR: MUSE/Architect/Z.ai/council awareness (remaining release features / S15 closeout context). ADVISORY record only — no product, engine, pin, governance, queue, or tools edits.

## Scope
User pasted a MUSE sweep/closeout block and asked to record anything unique/valuable that may have been missed. I did **not** execute the S15 closeout/build instructions; this is a selective record. Labels: V=verified this sitting, R=reported in cited/pasted material, I=inferred.

## Unique / valuable catches

1. **D5 stale `ENGINE_PIN` in S15 WIP package (V, missed in my earlier S15 review).**
   - `67-cakepanz-15-WIP-2026-11-21/src/App.svelte:88`: `const ENGINE_PIN = '67-cakepanz@d3bd81d2';` (comment: informational engineVersion stamp).
   - `:232`: `engineVersion: ENGINE_PIN` stamped into save/meta path.
   - MUSE states this poisons future saves / every `engineVersion` comparison and must be fixed before any server compares `engineVersion`; also notes its law needs update. I did not verify the full save/meta consumer graph beyond these lines.

2. **P-208 expansion row still owed (R, actionable queue hygiene).**
   - Owner resolved stat #2 as **both 17-0 and 20-0** (0513/0520, R). MUSE states: “P-208 expansion row adding \”Perfect season (20-0)\” as the 11th stat…” still owed; Claude’s account-sync contract also not written yet. This fits keeping P-208’s 10-stat floor intact and adding an explicit expansion/addendum row rather than silently rewriting the locked title.

3. **Display-rounded-oracle caveat is an explicit guardrail (V).**
   - Caveat present in src: `67-cakepanz-15-WIP-2026-11-21/src/lib/components/DraftBoard.svelte:77`, `67-cakepanz-15-WIP-2026-11-21/src/lib/port/suggestWhy.ts:11,28,37` (“INTERIM — display-rounded, awaiting rawSort…”; oracle/tie path paired until rawSort lands).
   - MUSE fence: “Do not remove the display-rounded-oracle caveat from top-three copy.” Valuable to preserve during any top-three/ring-law retirement/refactor.

4. **Cloudflare-ready handover contract details (R, useful if/when S15 closeout is executed by authorized builder).**
   - Built `dist/` and `dist/single.html` with sha256 of each + zip sha256; `base: '/'`; relative `/api/...`; no `pages.dev` string, no wrangler config. Also requires one-page selector note (Draft button, TOP badge, why line) for Claude merge-test re-pointing, retired-law table/new floors, hostname contract acknowledged.

5. **Digest/verifier closeout blocker restated clearly (R, matches known D1).**
   - D1: one digest policy across `regen-manifest.mjs` and `verify-package.mjs`; converse check confirmed running; re-run 14–17. S14 tree floor called out as 467 OK / 0 FAILED / 0 missing, exit 0.

6. **Operational supersession (R).** “Earlier S15 resume order from 17:51 is superseded by this close-out order — don't send that one.”

## Stale / risky / not-to-copy-blindly

1. **The pasted block is a Z.ai S15 closeout execution prompt (R/I).** Glyph should not execute it as-is without explicit tasking/authority; it contains builder instructions (package edits, batteries, dist, composite) beyond this advisory record. No engine/product/build changes made here.

2. **Ring-law retirement range needs semantic verification before action (I, caution).**
   - MUSE says “retire the ring laws (L13, L16–L25) by name and state the new floors”. Owner ruling removed the *ring*; 0513/0520 still require top-three highlight in button, short why for top three, glow + separate TOP badge. S14 receipts show L13/L24 as top-three/oracle/array-position laws carrying the display-rounded caveat — retiring by numeric range without checking current law intent could drop required top-three/oracle coverage. Any retirement should be law-by-law, with replacement coverage/floors named.

3. **“S14 looks much better…” / panel-beauty targets are directionally useful but not a receipt (R).** Visual-bar claims still require side-by-side evidence at final bytes per the closeout contract.

## Not added
- No new engine/findings; no re-run of batteries/composites; no edits to `67-cakepanz-15-WIP-2026-11-21/**` or governance/queue/tools. Existing canonical refs remain authoritative: `inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md`, `inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md`.
