# PORCA — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** PORCA · **Model / how reached:** PORCA / API · **State:** advisor
- **ID block:** none filed · **First seen:** 2026-11-19 (admitted by the Owner)
- **Worktree:** `/Users/kosi/Desktop/wt/porca` · **Branch:** `council/porca` · `git merge-base HEAD origin/council/base` → `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`
- **Evidence standard:** receipts come from fresh `git show`/`git grep`/`md5sum`/node runs or real file reads. No shared tree writes, product file, engine, pin or other seat's file touched. A wrong claim is kept in the record with a superseding correction: C8 week overclaim, A1 pin claim, A3 mirror critique, C1 ancestry claim.

## Current work — session 6 (Owner's cakepanz-12 relay + review, closed 2026-11-20)
- **Relay pushed verbatim:** `_agents/porca/deliverables/zip-root-cakepanz-12/` (37 files, 376 KB, 0 byte mismatches vs source, 36/36 md5 OK, shipped verifier 36/0/0), commit `48b8e245d5418b6086465e1c5a0eb16134a2bdcb`, `git ls-remote` verified. Same convention as the c10 relay.
- **Review filed:** `inbox/20261120-1614-porca-zai-cakepanz-12-review.md`, `VERDICT: improved` — 3 shown defects, 4 risks, 2 minor/nit, 1 honest OPEN item. Unique findings: (D1) `cakepanz-4-changed/README.md:5` says "stage 13b is CLOSED" while the report, START file and receipts say OPEN — a recurrence of the c10 bootstrap/report defect class; (D2) §1.7 claims SHELL-STATUS.md/ACCEPTANCE-RECEIPTS.txt shipped — neither is in the zip; (D4) Svelte MCP autofixer flags `a11y_no_noninteractive_tabindex` on the focusable gone%-method span (`BoardRow.svelte:53`), and the battery asserts that exact string so a real fix breaks the law.
- **Ideas filed:** `inbox/20261120-1615-porca-IDEA-cakepanz-shell-leverage.md` — 10 ideas in 3 groups: (I) make receipts a data product with provenance + tree-hash, law-coverage counters asserted by falsifiers, deterministic batteries via `--seed`, shared D-2 guard, strict verifier (hy4's converse check), generated engine-contract card; (II) explainable + persisted ring, engine-sourced counterfactual, paste-a-code home input, measured 390/768/1280 gate; (III) explicit ruled-outs. Extends, does not repeat, session-5's eight ideas.
- **What I re-ran (VERIFIED):** T2 seed receipt exact reproduction (700/9000 → 0, exit 0, `seedCode.ts` sha `bd9ff36a…`); T8 beam c10 wrapper 51 files/49 entries/48 OK/1 missing + named file absent on all four fetched host tips; verifier converse gap (added unlisted file → exit 0, hy4 found it first, I reproduced); T3 ruling existence (`git show 17e79b1a`, patch on architect branch, NOW.md line 4). T1 guard code read and confirmed (lsof kill, readiness poll, served-hash, killGroup, UNRUNNABLE-is-failure).
- **Svelte review method:** dispatched a read-only `svelte-file-editor` subagent using the Svelte MCP (autofixer + docs), then re-verified every finding myself with direct file reads. Findings: S3 a11y warning (D4), unkeyed each, toast/guard UX risks, timer leaks, stale `requestedSlot` on restore, wrong `a3f2` value in a comment, sandbox path in a comment, no-op `$effect`/unsubscribed store.
- **End state:** HEAD to be recorded at final commit; worktree `0 dirty / 0 unpushed OK` expected at the preservation gate.

## Corrections carried in the record
- Ring verdict: **B** (`rawSort`), not A. Re-pin is owed even for a view-only change.
- Q7: plain week/season readers are already caught by the no-snapshot QB assertion; the real gap is unpopulated keys and non-QB-only metadata reads. The relay reports `week: 6` as the confirmed fix.
- **Pin provenance (CORRECTED):** 06d89724 is the true pickSlot introduction and IS an ancestor of pin 408410477 and the live Architect tip. 560b8364f carries identical lines but is a different commit. Neither is an ancestor of the frozen d3bd81d2 (2026-11-14) — expected. Verify ancestry in full history, never in `/Users/kosi/Desktop/wt/porca` (its common repo has `.git/shallow`).
- Part 0 is REPORTED, not accepted. `d3bd81d2` = Colors engine pin; `4ca9a071` = 67-cakepanz snapshot pin; `408410477` = plan-M docs pin (REPORTED from the relay).
- C12 README "stage 13b CLOSED" is a **new 2026-11-20 correction**: the authoritative state is OPEN per sitting-report §1.2/§8/§9 and `START-OF-CHAT-ZAI.md:21`. The receipt shows F20 = RED ELSEWHERE, not DIED — FAIL L13.

## What the next session needs
- **Read first:** the two session-6 inbox files above, then the relay at `_agents/porca/deliverables/zip-root-cakepanz-12/deliverables/sitting-report-2026-11-20.md`.
- **Do not redo:** C1–C12, A1/A2/A3, C18/B8, the c10 re-measurement, `hosted-c9.diff`, passGap, the 18-provider Q7 probe, the cakepanz-10 review + Svelte pass, the ancestry re-check, or any session-6 verification listed above.
- **Still open (not mine, no claim):** the full hardened falsifier re-run (13b); the C′1 ring ruling (council position B, awaiting Architect); the six AA holes; the Owner's Part 0 / sport-two rulings; Z.ai's next sitting; the c10 landing on four hosts (blocked on repair bytes); hy4's strict verifier + my D1–D4 fixes awaiting Z.ai/Architect integration.
- **Unanswered brainstorm question to the Owner:** is the main frustration the slow loop around the engine (re-pins, receipts, stale generators) or the player-facing board on a phone? The 10-idea shortlist in session 6 is ordered on hypothesis A; it would be re-ranked on the answer.
- **End-of-chat gate:** `node tools/preserve.mjs check` exits 1 for OTHER worktrees only (shared Football Sim tree, council-ds/super, architect-colors, boc, dsd, flint, GH, glm, mimo, q, vloc; local-only commit on council/vlorca). My `council/porca` reported `0 dirty / 0 unpushed OK`. Do not touch another seat's worktree.

## Files in this lane
- `_agents/porca/PORCA.md` — this file.
- `_agents/porca/deliverables/zip-root-cakepanz-10/` — c10 relay (verbatim).
- `_agents/porca/deliverables/zip-root-cakepanz-12/` — c12 relay (verbatim, new this session).
- No build copies, images or lane code (advisor role). Work lives in `inbox/` plus one bulletin file per session.

## Role
General advisor. Admitted by the Owner on 2026-11-19. Propose, test, dissent, measure; never build or rule.
