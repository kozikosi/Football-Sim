SPEAKER: glyph | ROLE: council seat (verifier/reviewer/organizer, advisory) | TASK: review zai-cakepanz-12-2026-11-20 (P-317/T1–T8 fix-round package) and propose Cakepanz/UI-UX implications and innovations | DATE: 2026-11-20T18:10Z
FOR: Owner, Architect, MUSE, and any seat continuing the Cakepanz / Z-post-blue UI shell or relay/acceptance work
VERDICT: ok as a thorough, receipt-backed fix-round relay package with strong defect analysis and honesty — **not fully acceptance-closed** (13b/full hardened falsifier rerun and final composite regeneration remain OPEN per package’s own receipts/report); safe to publish/read, not safe to treat as final green without the named reruns/relay actions.

## 0. Delivery (Owner request) — VERIFIED

- Source (Desktop): `/Users/kosi/Desktop/Football Sim/zai-cakepanz-12-2026-11-20` (37 files, `du -sh` 376K).
- Published copy (glyph lane): `_agents/glyph/deliveries/zai-cakepanz-12-2026-11-20/` on `council/glyph` at `/Users/kosi/Desktop/wt/glyph`.
  - `find .../zai-cakepanz-12-2026-11-20 -type f | wc -l` → `37`
  - `diff -rq "/Users/kosi/Desktop/Football Sim/zai-cakepanz-12-2026-11-20" "_agents/glyph/deliveries/zai-cakepanz-12-2026-11-20"` → exit 0 (byte-identical)
  - Independent checksum verify: `python3` md5 over `CHECKSUMS.txt` entries → **36 OK / 0 missing / 0 bad** (36 entries; CHECKSUMS follows T4 convention — no self-entry). Root `CHECKSUMS.txt` lists every content file under `README.md`, `START-OF-CHAT-ZAI.md`, `cakepanz-4-changed/**`, `deliverables/**`, `inbox/**`, `receipts/**`.
  - README states `node tools/verify-package.mjs .` from extracted root, but root contains no `tools/` dir (verifier shipped at `cakepanz-4-changed/tools/verify-package.mjs`); `node tools/verify-package.mjs .` from package root failed here with `MODULE_NOT_FOUND` for that path. **Finding (INFERRED/VERIFIED by layout):** README invocation/path is inconsistent with packaged layout; portable verifier logic itself is present and md5 integrity is independently verified.
- Contents (VERIFIED): delta-oriented relay package — `cakepanz-4-changed/` (src diffs-as-whole files, batteries, scripts, tools, package.json, README, VERIFY-§24-append), `deliverables/gh-pages-repoint/{lineup.test.ts,versions.test.ts}`, `deliverables/sitting-report-2026-11-20.md`, 6 inbox notes (T3/T5/T8), 7 receipt logs, root README/START-OF-CHAT-ZAI/CHECKSUMS. Not a full runnable source checkout; reproduction targets the cakepanz-11/c9-c10-c11 reconstructed tree described in docs.

## 1. Claimed scope (REPORTED by package docs/receipts)

- Base: cakepanz-11 fix round, engine pin `408410477`, reconstruction validated before fixes (engine 430/430, node 33/33, slice 29/0/10/3, shell 48/0, board 11/0, slot 27/0, visual 13/0, contrast 2/0 reproduced; baseline 13b stopped on F20 TAUTOLOGY).
- **T2/PORCA S1 (seed):** prefixed `b36:` seed code parsed first (`src/lib/port/seedCode.ts`), legacy int/bare-base36 back-compat, R2 random draw widened to 100,000–9,999,999 and resolved seed written back to URL; round-trip receipt 0 failures (old parser 700/9000, first 1296→"100"→100); W10 product-module law.
- **T1 (F20/13b):** D-2 stale-server guard added to `scripts/falsify-board.mjs` (per-case kill/readiness/served-hash assert, UNRUNNABLE is failure) and battery hardened (L16a requires ring ≥3, one-click walk fails loud/skips, L21 focus row decoupled from `.cp-suggest`) so planted mutant no longer crashes/vacuously passes. Full 9-case DIED rerun **OPEN** (~20 min, next sitting first command); 13b not closed.
- **T4 (packaging):** `tools/verify-package.mjs` (node crypto, explicit fail, exit 1), no self-entry CHECKSUMS convention, `package-delivery.sh` step 4 uses it; tamper proof receipted.
- **T3 (gh-pages, Architect ruling `17e79b1a`/NOW):** tests-only repoint 277/286→286/286 receipted; patched files shipped for relay (gh-pages not pushed by seat).
- **T6/T7:** D2 value-announcing aria-labels (L20) + N26 re-anchor; S3 focusable gone% method after buttons with reveal-on-focus (L21); R1 380ms one-click guard (L18) + “Drafted · Undo” status (role=status, polite) + S2 staged banner disarm (L19); S4 restore reassurance renders on restore path (B2b); R2 widened range + URL write-back (W8 updated); S5 768px wrap band (W11). Batteries at final bytes reported: board 15/0, slot 28/0, visual 15/0, node 33/33, slice 29/0/10/3, contrast 2/0.
- **T5/docs:** C25 corrections filed to inbox (ring Contract B prepared, `?seed=` shipped, P-316 slice 3 built/receipted), VERIFY §24 written, missing `battery:slot/visual` scripts restored; no governance files edited.
- **T8 (c10 hosts):** beam/glyph/inkling/orcaink measured 48 OK / 1 missing / 51 files / 49 entries; repair bytes `6418 B / md5 0a286953…` absent from fetched history and slice receipt run-variant → copy **BLOCKED** (named), script refusal verified on all four; relay must copy exact bytes from Owner zip root.

## 2. Inspected evidence (glyph, this session)

- **Package integrity:** `diff -rq` clean, 37 files, md5 36/36 OK (VERIFIED).
- **Receipts read (heads/tails, VERIFIED content):** `baseline-13b-tautology.log` reproduces F20 TAUTOLOGY/exit 1 at reconstructed base; `falsify-board-13b.log` (guarded, pre-hardening bytes per report context) shows baselines 15/0 & 48/0, F15/F17/F18/F19/F21/F22 DIED, **F20 = RED ELSEWHERE** (L16/L17/L18 failures from dead ring/walk), exit 1 — stale-server false-green removed but planted-law-by-name death still pending; `f20-mutant-hardening-run.log` documents crash-before-L13/vacuous-L16a root cause and hardened behavior; `seed-roundtrip.log` before 700/9000 (1296) after 0 across 1000–9999, widened range, stride 1…2147483647/997, boundaries+legacy, exit 0; `t4-verify-package-proof.log` tamper → 39 OK/2 FAILED/0 missing exit 1 (names files), clean self-line-omitted → 40 OK/0 FAILED/0 missing exit 0; `t3-ghpages-repoint.log` 277/286 → 286/286; `t8-host-counts-and-refusal.log` four hosts 48/1/51/49 and refusal on wrong bytes 6423B/333c588a exit 2.
- **Key implementations inspected (VERIFIED by read):**
  - `src/lib/port/seedCode.ts`: `seedToCode` → `b36:<n>`; `parseSeedCode` checks prefix first, then `/^\d{1,10}$/` in 1..SEED_MAX, then legacy `/^[0-9a-z]{1,6}$/i`; `randomSeed` draws `SEED_MIN=100000`..`SEED_MIN+SEED_RANGE-1` (9,900,000); `writeSeedToUrl` uses `history.replaceState` with try/catch.
  - `App.svelte`: imports/uses contract module; `parseSeed()` returns contract parse or `randomSeed()`; `startDraft` sets seed, calls `writeSeedToUrl(seed)` before START dispatch; `seedCode` derived from `seedToCode(seed)`.
  - `BoardRow.svelte`: value cells announce values (`aria-label="{r.ovr} overall"` etc.), gone cell describedby `.cp-sr` method copy; `.cp-sr` is focusable (`tabindex="0"`) and placed after quick button with CSS reveal on `:focus` (S3) while retaining visually-hidden default; quick button on suggested rows only, labeled “Draft {name} at {slotLabel}”.
  - `DraftBoard.svelte`: `quickDraft` enforces 380ms guard, clears staged confirm (`picked=null`), dispatches direct pick, shows “Drafted <b>name</b> · Undo” status (`role="status" aria-live="polite"`) with 2.6s auto-hide; passes `onpickDirect={quickDraft}` and staged `onpick`.
  - `Complete.svelte` + `shareable.ts`: use `seedToCode`; Complete restore note renders when `requestedSlot !== null || record.pickSlot !== undefined` (S4 path covered).
  - `scripts/falsify-board.mjs`: per-case port cleanup, readiness poll, served-asset hash match vs `dist/index.html`, killGroup, UNRUNNABLE treated as failure; F20 mutation targets `suggest={false}` on ring row; outputs per-case child log.
  - `batteries/board.battery.mjs` (header/walk excerpts): L16 requires ring present (≥3) and named quick buttons only on ringed rows; quick-path failure skips dependent walk loudly (no crash); includes L18 double-activation guard, L19 staged-banner disarm, L20 value-announcing labels, L21 keyboard path main→quick→method with focus reveal.
  - `batteries/visual.battery.mjs`: W6/W8 aligned to prefixed code/range/URL; W10 imports product `seedCode.ts` and checks old range, widened range, stride sweep, boundaries, legacy forms; W11 validates 768px no horizontal scroll, quick button renders/usable, one pick lands, zero page errors.
  - `tools/verify-package.mjs`: node `crypto` md5, parses `^([0-9a-f]{32})\s\s?(.+)$`, reports FAILED/MISSING by name, exits 1 on any issue. `tools/package-delivery.sh`: regenerates CHECKSUMS excluding self/receipt, verifies via portable node verifier, explains count delta, refuses on mismatch.
  - `scripts/acceptance-run.sh`: count/step updates (slot 28/0, visual 13/0, board 15/0, contrast, falsify-slot, shell-status, CP_PIN gates) and 13b wording reflecting hardened behavior; still pipelines through 13b–17 as scripted gates.
  - `deliverables/gh-pages-repoint/lineup.test.ts` (23677 B, md5 `c7929c3…`) and `versions.test.ts` (7069 B, md5 `02c9643…`) present and checksummed.
- **Inbox notes read (VERIFIED):** T5 C25 corrections (ring contract wording, P-316 attribution; filed not applied), T3 gh-pages relay instructions, four T8 host notes with consistent before-state/block/refusal/relay procedure.

## 3. Findings, corrections, and risks

1. **Acceptance closure is genuinely open (HIGH, VERIFIED):** full hardened 9-case falsifier rerun and final composite regeneration at final bytes not completed. Guard/hardening converted F20 from false TAUTOLOGY to detectable failure class, but “DIED — FAIL L13” by name remains the required proof to close 13b. Treat stage 13b/13c–17 final state as **OPEN/REPORTED-incomplete**, not green.
2. **Root verifier UX mismatch (MEDIUM, VERIFIED layout):** README instructs `node tools/verify-package.mjs .` at extracted root, but only `cakepanz-4-changed/tools/verify-package.mjs` is packaged. Content integrity is fine (36/36 md5), but relay/consumer instructions should point to the actual path or include root shim to avoid false “missing verifier” confusion.
3. **Manifest-pinned run-variant receipts (MEDIUM, VERIFIED rationale):** T8 is correctly blocked because `slice1-battery.json` bytes differ across runs (random draws). Future repairability requires deterministic receipt generation (fixed seed/inputs) or separating semantic attestation from byte-pinned artifacts.
4. **Double-activation guard semantics (LOW/MEDIUM, INFERRED):** 380ms window blocks rapid double-click/auto-repeat (good for integrity) but can feel unresponsive to fast intentional taps; toast/Undo mitigate, yet UX should be validated on touch devices and with assistive tech timing.
5. **A11y improvements are strong but need holistic pass (LOW/MEDIUM, INFERRED):** value-announcing labels and focusable/revealed method copy address reported defects; added per-row focusable method increases tab stops. Live announcements for pick/undo/turn progression and focus management after quick-draft/undo/toast actions should be verified end-to-end (especially SR + keyboard-only).
6. **Seed shareability/privacy tradeoff (LOW, INFERRED):** automatic `replaceState` URL write-back is correct for replay/share, but visible URL mutation is a product-choice side effect; consider explicit “copy replay link” affordance and clarity in UI copy.
7. **C25/governance and ring contract still pending (REPORTED):** corrections filed (not integrated); C′1 contract (Contract B prepared) awaits Architect ruling — ring remains display-derived until then.
8. **Contrast debt remains named, not fixed (REPORTED):** six AA holes previously recorded (per package context) still require Owner/design ruling and token/team-ink policy; no regression evidence beyond receipts provided.

## 4. Open items / relay actions (advisory, per package + inspection)

- Next sitting: run hardened falsifier to get 9 DIED incl. `F20 … DIED — FAIL L13`; then run closing `bash scripts/acceptance-run.sh` at final bytes and regenerate receipts (SHELL-STATUS/ACCEPTANCE) accordingly. Poison-proof stale-server demo (UNRUNNABLE, non-zero) as named follow-up.
- Owner relay: apply gh-pages repoint (`deliverables/gh-pages-repoint/*` or Architect patch), expect 286/286; land c10 repair by copying exact `slice1-battery.json` (6418 B, md5 `0a286953…`) from Owner zip root per host with stop-on-mismatch (glyph host currently in this lane appears repaired in prior delivery state — verify host byte-state before action; do not guess).
- MUSE/INKLING: integrate T5 C25 wording corrections; Architect: rule C′1 ring contract.
- Packaging/doc nit: align README root verify command with actual verifier path or include root-level wrapper.

## 5. Implications and innovation ideas — Cakepanz / Claude-engine UI/UX shell

Ideas are advisory (no engine/product/governance edits implied); aimed at a fast, trustworthy, reproducible shell around Claude’s frozen engine snapshot.

1. **Deterministic drafts as shareable objects:** promote the `b36:` code as primary identity — “Copy replay link/code”, import-by-code on Team Select, and a persistent provenance chip (team, slot, seed code, engine/pin, mode) on Board/Complete/Share. Support “challenge same seed+slot/team” and diff views between runs (UI-level, same inputs).
2. **Seed/receipt determinism policy:** for any manifest-pinned artifact, enforce deterministic inputs (fixed RNG seed, stable sort/tie-break in emitters, frozen environment notes) so `verify-package` and host repairs are reproducible; emit a separate semantic result JSON that may include timing-variant metadata outside checksum scope.
3. **Ring explainability via Contract B:** when `rawSort`/suggestions land on `BoardRowVM`, show “why suggested” (reason, cutoff, tie badge) and keep ring stable across benign re-renders; allow power users to inspect raw rank delta without exposing engine internals in UI logic. This removes fragile display-value parsing.
4. **One-click speed with reversible confidence:** keep guard but add immediate tactile/visual acknowledgement (respect reduced motion) and make Undo globally reachable (hotkey hint, focus target after toast) plus a short “last action” history. Consider an opt-in confirm mode for new users while preserving speedrun default.
5. **A11y as a flow, not labels:** add a polite live region for turn/pick outcomes (“Drafted X at Y; pick N of 32; CPU picking…”), manage focus after quick-draft/undo, ensure toast actions are keyboard reachable, and audit tab-stop density introduced by focusable method copy (group/summary pattern if verbose). Continue decorative-vs-programmatic separation (done for gone%).
6. **Restore/session clarity:** extend S4 into a consistent boot banner “Restored draft/season · team · slot · seed code · pick N” with dismiss/focus, so autosave behavior is explicit and trusted.
7. **Responsive confidence bands:** keep W11 (768) and 390 laws; add snapshot checks for common tablet/landscape widths and enforce minimum touch target sizes for quick/undo/chips; ensure wrap band never hides ring/action affordances.
8. **Acceptance observability:** produce machine-readable per-stage reports (status, port, served asset/hash, child logs path, UNRUNNABLE vs FAIL vs TAUTOLOGY classification) to make partial/stale runs impossible to misread and easier for third-seat review.
9. **Contrast closure workflow:** convert known AA holes into tracked tokens/overrides with a “no new holes” gate and explicit per-team ink/backplate rules so brand colors remain but text stays readable in both modes.
10. **Shell-engine seam discipline:** keep UI pure over port VMs/frozen snapshot; request read-only explainability fields (suggestions, method metadata) through view contracts rather than recomputing rankings in the shell — preserves cutover safety and performance.

## 6. UNKNOWN / not verified here

- I did not run Node/Playwright batteries, builds, or acceptance scripts; all pass/fail counts beyond integrity checks are **REPORTED by included receipts/docs** (content verified, execution not reproduced).
- Final hardened 9-case falsifier outcome and closing composite (OPEN per package). UNVERIFIED.
- Actual gh-pages landing state and c10 repair-byte relay completion. UNVERIFIED.
- Full base-tree integration behavior when applying `cakepanz-4-changed/` delta. UNVERIFIED.

Commands used (glyph): `git fetch/origin show`, `pwd`, `git branch --show-current`, `git rev-parse --git-common-dir`, `sync-base.sh` (via show), `node tools/preserve.mjs check`, file reads/greps/find/ls/wc/du/diff -rq, `python3` md5 verification and hash/inspection scripts, `tail/sed/nl`.
