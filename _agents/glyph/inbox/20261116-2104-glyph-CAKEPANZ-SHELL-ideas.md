SPEAKER: glyph | ROLE: council | TASK: Cakepanz shell gaps, UX improvements, and future-proofing ideas (Part 5) | DATE: 2026-11-16T21:04Z
FOR: P-070

# Missing pieces, UX improvements, and platform-minded ideas

These are proposals to assist Z.ai/Architect; none are built by this seat. Labels are INFERRED unless tied to a verified gap.

## A. Gaps vs prompt v4 Step 2 (highest value to close)

1. **Draft-position picker (P-317, required):** Team Select must let user choose team and slot 1–32 together. UX: slot selector adjacent to team detail/start CTA, with "Pick N" preview and persisted in save provenance. (Gap VERIFIED on gh-pages.)
2. **States matrix coverage:** every screen needs explicit loading/empty/no-save/corrupt-save/newer-build/reduced-motion/offline/file:// states with receipts. s5 reports corrupt/newer handling in saves context (REPORTED), but full per-screen matrix not evidenced.
3. **Season surfaces missing/unevidenced:** season hub, week stepper/views, standings+playoff picture/bracket, season book, awards, season review, guide, player cards, stats table, settings — all specified in prompt Step 2 but not present on deployed tree and not fully claimed in s5 README.
4. **Single-file/file:// + offline proof:** w89-style singlefile discipline and zero-network boot must be receipted; Cinzel base64 inlined (not Google Fonts) per visual/offline law.
5. **Handoff package:** `SNAPSHOT.md`, `MERGE-README.md`, `MERGE-GUIDE.md`, `SHELL-STATUS.md`, seam inventory with file+sha256, fixture suite, cutover runbook.

## B. UX improvements (concrete)

1. **"Why this pick?" microcopy:** on board row/slot picker, show a one-line plain explanation (priority = wins/cost context label) without adding engine math in UI; data comes from adapter/VM.
2. **Needs row clarity:** show `X/32 slots filled` and which critical slots remain (QB/OT/CB etc.) as chips; keep clickable filter (already planned). Ensure flex-route visibility remains (do not hide legal fills).
3. **Gone-odds tooltip trust:** keep method explanation in plain words ("chance drafted before your next pick, based on N simulated CPU picks") and show the actual `picksBetween`/`sims` values from engine (s5 claims this — good; preserve as contract).
4. **Save safety UX:** on version mismatch/corrupt, show explicit refusal reason + recovery actions (export raw, start new, load other slot) — never silent repair.
5. **Keyboard/a11y basics:** focus order through team grid, slot picker, needs filter, save/load actions; visible focus rings; tooltip accessible on focus not just hover; reduced-motion disables animations/transitions globally.
6. **390px draft ergonomics:** horizontal scroll forbidden; consider collapsing secondary columns behind expandable row details on narrow widths while keeping Wins/Priority/OVR visible.
7. **Provenance always visible where numbers appear:** valuation mode label (Engine Value / Owner preset) travels with Wins/Priority/OVR on every relevant screen, not just board.

## C. Future-proofing (platform without premature build)

1. **EnginePort stability:** keep a versioned adapter interface (`EnginePort@pin`) so future sports/engines swap behind same UI contract (multisport readiness).
2. **Save schema evolution:** include explicit `schemaVersion`, `enginePin`, `dataVersion`, `sport`, and optional `draftOrder/draftSlot` fields now; write migration/refusal policy (refuse unknown major, never silent).
3. **Offline-first asset discipline:** all fonts/icons/data bundled locally; avoid runtime CDN assumptions; single-file export path for shareables and optionally whole app.
4. **Deterministic fixtures for CI:** node-side fixture renders per screen enable fast regression checks when engine pin moves.
5. **Telemetry-free diagnostics:** local debug panel/log export (user-initiated) for repro without network dependency — useful for "tent in the woods" constraint.

## D. Ideas to validate with Owner (do not assume)

- Exact player-card layout and which secondary attributes to show (Owner left format open).
- How "gravity/double-teams formally measured" appears in stats table UI (depends on engine outputs available).
- Stage shareables set and visual treatment consistent with w89/w88 badge grammar.
- Palette AA fixes (light gold2, dark `--text`) — flag only, Owner decision required.

## Priority suggestion (INFERRED)
1) P-317 slot picker + save contract doc, 2) merge-cone M1–M5 + handoff docs, 3) states matrix + file:// receipts, 4) season surfaces against stable VMs/fixtures, 5) polish/a11y/perf.

