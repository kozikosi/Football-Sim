# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat only (IM); the sandbox reads GitHub but cannot push — the end-of-chat zip is the push, relayed by the Owner or Beam (`tools/import-zip.sh zai <zip>` → `_agents/zai/imports/…` on `council/zai`).
- **State:** High Councillor (below the Architect, above advisors; Owner's ruling, 24 Oct 2026). Architect and builder of the Z-post-blue shell track.
- **First seen:** 2026-10-24 · **Waves shipped:** the prototype (v8–v11 suites), w52/w53 laws, w55 phone laws, w66–w75 rounds, w76 · **cutover support (2026-11-06): the acceptance batteries, no wave.**

## Current work
- **The shell freeze HOLDS — w76 is the frozen reference implementation.** This chat shipped no product HTML and minted no wave number (w77 is the Owner's to spend on his next UI round + flag calls).
- **The cutover batteries shipped and verified:** `batteries/accept.js` (the w76 battery's 84 assertions, adapter-driven: `--file <any build>` `--adapter <any hooks module>`), `adapters/w76.js` (the frozen reference hooks + 10 engine snippets), `adapters/pancakes.stub.js` (the port's annotated homework), `contract.json` (the machine-readable contract), `CUTOVER-BATTERIES.md` (the 84-assertion Owner-law map + the known gaps), `RUNBOOK.md` (REFERENCE → ACCEPTANCE → DELTA). **Reference run: 84 pass · 0 fail vs the w76 bytes, labels byte-identical** to `tools/w76/verify_w76.js`; the detail-string drift is the simulator's nondeterminism (proven by re-running the original battery twice).
- **The five flags — measured views delivered** (20261106-zai-answers-to-muse.md): veto (b) KEEP the floor (sample hygiene; `floor = max(3, round(games×0.4))`) + KEEP the TRUE OVR test (rules read the book number) · the twin header KEEP (it IS the no-rooms empty state — load-bearing; the silent variant = collapse the section) · the U3 casing: caps is the only honest render — MEASURED at glyph level (the font's 26 lowercase codepoints are cap-height outlines; the casing only toggles plain vs swash forms) · SEASON RATING reads right · the explainer's line already lives in the Guide; delete the retired recap assembly at cutover, never port it.
- **REV 20 written:** §0 gains the battery law + the freeze + the flag views; §1's fallback chain re-ordered (gh-pages first — council/zai is stale in practice, tip sat at w55 through the w56–w76 era); §5 rule 4 gains "every new surface ships with an assertion"; new rule 11 = the re-pointing pattern (fill the adapter, never edit assertions).

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` REV 20 §3 (the anti-amnesia block — it carries the cutover state); the answers doc `20261106-zai-answers-to-muse.md` (the five-flag views + the grounds); `CUTOVER-BATTERIES.md` (the acceptance spec).
- **Open items waiting on the Owner:** the five flags (veto (b) · the twin header · the casing · the label · the explainer's home) — the views are INPUTS, nothing applied · w77 (his UI fixes list + flag decisions, if he sends them).
- **Open items on the Architect:** fill `adapters/pancakes.js` (the runbook's three-run ritual: re-prove the harness on w76, run the acceptance, work the delta) · add the typescript devDependency (Vite ^8.3.6 is ALREADY there since 425f72a — the record is corrected) · the M1 policy relabels ride his next Lab pass, not a shell wave.
- **Do not redo:** the battery transformation (done and label-verified) · the font measurement (both weights, cmap + glyph bounds + rendered samples — pinned in the answers doc) · the veto (b) code read (the floor and TRUE OVR lines are quoted there).

## Rules that changed since REV 19
- §0: THE BATTERY LAW (the acceptance battery + adapters is standing machinery; the three-run ritual) · THE SHELL FREEZE stated as standing · the five-flag views recorded.
- §5: rule 4 gains the assertion rule; rule 11 the re-pointing pattern.
- §1: gh-pages-first fallback (council/zai stale in practice).

## Files in this lane
- `_agents/zai/START-OF-CHAT-ZAI.md` (REV 20) · this file · `END-OF-CHAT-ZAI.md` — all inside the cutover zip
- The cutover zip root: `batteries/` (accept.js + both adapters) · `contract.json` · `CUTOVER-BATTERIES.md` · `RUNBOOK.md` · `20261106-zai-answers-to-muse.md` · `UPDATE-README.md` · `CHECKSUMS.txt` · `shots/` (six evidence shots from the reference run)
