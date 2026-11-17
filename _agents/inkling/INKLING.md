# INKLING — lane file (rewrite in place when seat state changes; never append; ≤60 lines)

**Seat:** INKLING · Inkling 2 Small Free (opencode/inkling-2-small-free) via OpenChamber · admitted 2026-11-09 · **transient, not permanent**. If a task contradicts `AGENTS.md` (on `origin/council/muse`) or the Owner, the muse file and the Owner win.

## Boot protocol
1. `git fetch -q origin; git log --oneline -1; git status --short` — worktree clean, branch `council/inkling`.
2. Read this file. Then the task's named files only.
3. **The live rules live on `origin/council/muse`**. Refresh first.
4. `node tools/preserve.mjs check` — my worktree must be clean; unsaved work elsewhere is not mine to touch.

## Permanent seat rules
- Byte-check everything: every VERIFIED needs directory · exact command · ref/sha · output neighbourhood.
- Never edit governance, never touch `colors/src/**`, flex, the product file, or any other seat's bytes. INKLING reviews, measures, advises; does not build the engine/product/shell.
- No new P-IDs without the Owner; dissent in writing, inside the filing.

## Current state (2026-11-17T19:36Z — cakepanz-4 pushed + reviewed; GLM-prompt got vetted; session ending)

**This sitting, in order:**
1. **cakepanz-4 pushed verbatim** — `Desktop/Football Sim/cakepanz-4` → `_agents/inkling/deliveries/cakepanz-4/` @ commit **`c2c23834`** (327 files, 41,121 insertions; `diff -qr` clean vs Desktop). Anyone can read it.
2. **cakepanz-4 independently verified** (machine: Node v26.13.0 default, Node v24.22.3 via npx for TS-parameter-property paths): snapshot byte-identity vs `5c808472` **exit 0 (67/67)**; flex.json identical, my count **99 rules · 17/17/42/23**; packs identical; engine suite **394/394**; node battery **24/24** (`npx node@24 --experimental-transform-types`); slice battery **29/0/10/3**; shell battery **46/0**; file:// `single.html` boots vanilla file:// (S26–S28); `dist/` rebuilds **deterministically** (asset hashes + `single.html` byte-identical); `tsc --noEmit` exit 0; zero build warnings; gate-manifest **PASS (305 entries; converse clean; boot target asserted)**; numerals **CLEAN ×2**; 3 shell falsifiers **all DIE under Node 24** (FB = full battery log with `restoreSeason is not defined`).
3. **Review filed** `inbox/20261117-0747-inkling-cakepanz4-review.md` — pushed **`32b67f25`**; verdict **ok** (merge-ready class) with **D-1** playwright undeclared (fresh clone can't run batteries; absolute-user-home fallback) · **D-2** `shell-falsifier.mjs` Node-24-only; **false TAUTOLOGY on Node ≥ 26** (fail-silent — Beam/inkling disagreement's next form) · **D-3** nits (README 26/10 stale; gate receipts 300→305). **Delivered bytes untouched; my repo copy `git status`-clean; all scratch runs in temp copies.**
4. **GLM verification prompt (the GLM pass-class node round) vetted before send**, everything re-checked: tip **`65673a00`** ✓ (`origin/architect/engine-and-seats`); `5c808472` ancestor ✓; `f9991424` = pack-hash correction, the one commit between ✓; flex.json **0 diff** ✓; every prompt-named file exists at the tip ✓ (`passclass.ts`, `glm-bar.ts`, `passclass.test.ts`, `passclass-vectors.json`, `passclass.py` [`report` exists], report md, both fit packs); **P-342** is the right queue row ✓.
   **Two required edits before send (told the Owner):** (a) "Cakepanz-4 … five ok reviews" → **four green-class reviews** (Beam ok · Ernie "closes the re-pin" · VL merge-ready-behind-P-317 · inkling ok) + the Owner's own verification; **Glyph has not filed**; (b) **"(P-347–P-353)"** are NOT queue rows — they were my 2026-11-11 proposals (`inbox/20261111-1746-inkling-P-345-triage.md`) awaiting Owner ratification; name the file or drop the IDs.
   **Go-ahead given AFTER those edits** — the go-ahead certifies the prompt is factually sound and council-ready. **It is NOT a verdict on the GLM node** — that round is unowned and unrun; the sacks/drives shift is the council's to measure. **The council/muse push itself is the Owner's/MUSE's step — I did not push it.**
5. Session ended via END-OF-CHAT.

## What the next session needs
1. `git fetch -q origin; git log --oneline -1; git status --short` + `node tools/preserve.mjs check` (mine was OK; `/Users/kosi/Desktop/Football Sim` gh-pages 11027 dirty, flint 452, glm 4, pickle 2, ds 2, architect-colors 1, boc 1 — none mine).
2. If the GLM round was sent: read fresh filings in inbox/; the headline is the paired 12,000-key sacks/drives shift question — verify by re-running, never by trusting. Context: engine tip is now `65673a00` (Cakepanz-4's re-pin target was `5c808472`); the next shell re-pin would move to `65673a00` — **Owner's call**.
3. **Unchanged standing:** shell-of-record ruling; palette gold2 + `--text`; Engine vs Model Value; FEED_YEAR 2027; `.ub` scope; shimmer/touchdown sources; Option B DIME legs re-rule; P-317 store (Architect's); the gh-pages README pin-line is now `5c808472` (Z.ai shipped corrected file, Owner places it).
4. **Do NOT re-litigate** the pin, flex rulings, cap ruling, D1/D2, 99-rule flex (17/17/42/23). Prove fresh every time; measurement > position.
5. Queue: `node .council_tool.mjs next` (v9 from `origin/council/muse`).

## Where this worktree is
Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · merge-base with base `1b91f50e` · HEAD = pushed tip (`ls-remote` verified, = `32b67f25`).

## Transition discipline
Wave state lives in wave directories and is expected to die with the wave. Rewrite this file wholesale on seat-state change; never grow it.
