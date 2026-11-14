# INKLING — lane file (rewrite in place when seat state changes; never append; ≤60 lines)

**Seat:** INKLING · Inkling 2 Small Free (opencode/inkling-2-small-free) via OpenChamber · admitted 2026-11-09 · **transient, not permanent** — deputized by the Owner while MUSE is out; answers to the Owner alone; holds no standing rank over any seat; may disappear at any moment without notice. If a task here contradicts `AGENTS.md` (on `origin/council/muse`) or the Owner, the muse file and the Owner win.

## Boot protocol (run in order; nothing else first)

1. `git fetch -q origin; git log --oneline -1; git status --short`
2. Read this file. Everything in it is permanent; if anything else in this lane claims currency, verify against git before trusting it.
3. **The live wave** is still `_agents/inkling/prompts-2026-11-13/` for the closeout items (handout: `council-closeout-handout-2026-11-14.md` — ERNIE/GLYPH/BEAM items; INKLING already consumed its share). Newest commit carries current truth. Instruction files reference each other by path; follow a pointer only if the current wave requires it.
4. `node tools/preserve.mjs check` — expect only the standing `gh-pages` local-only commit `7c9694e9` plus other seats' dirt (mimo, or, q, vl, vloc); anything unsaved in **this** worktree is yours to reconcile before you work.
5. If your task came with its own file list (the Owner, a prompt), that list **replaces** steps 2–3.

Delete `.council_tool.mjs` before any push. New chat recovery depends on branch `council/inkling` alone — not on this chat existing.

## Permanent seat rules

- Byte-check everything, a lot more (Owner, standing from 2026-11-13): every VERIFIED needs four lines — directory · exact command · ref/sha of the bytes · output neighborhood (exit code, counts, hashes). Archive beats the tree (`git archive <ref> | tar -x -C $SCRATCH`); state the ref and sha — "at tip" is not a fact. Independent re-run is the only confirmation. No speculating past a blocker — mark it OPEN.
- Never edit governance (`AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `CLAUDE.md`, `MERGE-MANIFEST.md`, `biome.json`, `tools/`), never touch `colors/src/**`, flex, the product file, or any other seat's bytes. INKLING reviews and advises; INKLING does not build the engine, the product, or the repo's rulings.
- Dissent in writing, always, inside the filing; the Owner and the Architect decide; INKLING proposes, measures, verifies, organizes. No INKLING claim is true until INKLING re-ran it.
- No new P-IDs without the Owner; no frameworks, no pins, no verdicts beyond what was rulable this wave (the framework call was the Owner's, deferred to his read of the council's table).

## Current state (2026-11-14, session end)

- **`zai-recovery-2026-11-14/` published at root @ `e79e7693` (pushed, `f83339af` tip).** Closes the three missing-artifact defects from `z open wave v3/`: `a3.json` (chromium-identical; Node ≡ Chromium logSha match; Firefox/WebKit UNKNOWN verbatim), `vendor-digest.mjs`, `digest-chase.mjs`, `vite.file.config.mjs` + 13 drivers. Review: `inbox/20261114-0950-inkling-REVIEW-zai-recovery-2026-11-14.md` (verdict **ok**) — digest reproduced byte-exactly on this machine (`colors/` @ d3bd81d2 → 112 files = `432a1701…`; arms 57-file subset = `4c3c8f17…`, identical across arms and v1/v3).
- **The vendor digest mystery is retired** (2026-11-14T09:50Z): different file sets over different roots; `753997bac4` (mine) matches nothing, stays UNKNOWN; `cd298e99` author-withdrawn, dead. Ratification packet UNKNOWN-bin updated accordingly.
- **`z open wave v3/` is published at repo root @ `908fbdb8`** — PUSHED; remote tip `f83339af` (ls-remote verified 2026-11-14T09:51Z). Review filed `inbox/20261114-0935-inkling-REVIEW-z-open-wave-v3.md` (`8f623a7f`): verdict **improved** — verified core (engine trees byte-identical to `colors/src @ d3bd81d2`, 112-file `colors/` count, G5 600/600 ×2, w89 offsets, errata table matches independent re-derivation); **defects**: `receipts/a3.json`, `scripts/vendor-digest.mjs`, `scripts/digest-chase.mjs`, `scripts/vite.file.config.mjs` are cited but absent (a3.json also absent from MANIFEST) — the "errata all closed" line is NOT signable until the Owner ships-or-annotates those.
- **BENCH-1 ratification packet now carries an ERRATA section** (`_agents/inkling/notes/2026-11-14-ratification-packet.md`, `be43d067`): ERNIE's WR-357 found two silent omissions — UX-3 (measured in tier2 receipts, p95 ≈ 64.3–64.7 ms, FAILS the spec's 50 ms budget; Z.ai's own analysis JSONs confirm p95 64.67/64.19) and SAVE-1's write-median (unmeasured; REPORTED 0.4 ms only). The Owner signs against the post-errata packet.
- **Phase-1 football baseline answered** (the top line of `council.mjs next`): full nflverse 2016–2025 index — 40 files with sha256/rows/bytes/URLs, required-field status, regime labels, UNKNOWN bins — in `inbox/20261114-0835-inkling-ASK-phase-1-football-baseline-data.md` (`eea8901b`). Raw parquet (~226 MB) NOT committed; **the Owner must download it** and verify against the listed hashes. Derived team-game summary (5,522 rows) + league mean/SD committed at `11b63867` under `_agents/inkling/deliveries/phase1-football-baseline-2026-11-14/`. BEAM filed a second Phase-1 answer (`council/beam @ …0832`) — hashes agree; cross-check notes in `inbox/20261114-0854-…`.
- **Other seats' closeout filings reviewed** (`inbox/20261114-0854-inkling-review-other-seats-closeout-filings.md`, `be43d067`): beam retractions = improved (Usage point 3 never explicitly withdrawn); glyph WR-358/360B = ok (all receipts re-verified); ernie 0050 = ok-with-errata; ernie 0740 = **rejected** (re-asserts the withdrawn ENG-2/3 accusation; its Z.ai prompt must not be sent; 0050 §4 is the replacement).
- MUSE still out (not retired). INKLING holds the Owner-facing organizing stream by delegation; on MUSE's return this lane reverts to reviewer-verifier without ceremony.

## Where this worktree is

Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · merge-base with base `1b91f50e161fa10d0607c8e09330115ffa27f1ff` · tip `eea8901b` (verify with `git rev-parse HEAD`).

## What the next session needs

1. Read the newest commit(s) touching `_agents/inkling/prompts-2026-11-13/` and `_agents/inkling/notes/` — the wave changes fast.
2. Run `node ./.council_tool.mjs next` (v9 from `origin/council/muse`) if no task is given; take the first line you can do well; refusal is fine.
3. `inbox/20261114-0935-inkling-REVIEW-z-open-wave-v3.md` and `_agents/inkling/notes/2026-11-14-ratification-packet.md` (read before re-measuring anything); if the push landed, tip must be `8f623a7f` or later.
4. If the Owner asks about UX-3/SAVE-1 write-median, the answer is in the packet's ERRATA section — do not re-measure it.

## Transition discipline (why this file is short)

Temporary state never lives in this file. Wave state lives in wave directories and is expected to die with the wave. Delete or archive the whole set in one commit when the Owner closes the wave, after harvesting anything worth keeping into the lane's pointers. Rewrite this file wholesale on seat-state change; never grow it.
