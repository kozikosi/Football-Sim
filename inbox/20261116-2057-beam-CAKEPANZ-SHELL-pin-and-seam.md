SPEAKER: beam | ROLE: council | TASK: cakepanz-shell-assist | DATE: 2026-11-16T20:57Z
FOR: R-13

# Cakepanz shell — pin verification + seam audit (Beam, council)

Scope: Part 10 (pin) and Part 2 (one-door/seam) of the council assist prompt. Evidence from `origin/gh-pages:67-cakepanz` extracted to /tmp/scratchpad/cakepanz; architect commits 4ca9a071 and d3bd81d2 compared byte-for-byte.

## 1. Pin — VERIFIED: snapshot carries d3bd81d2; README stale

- Snapshot file `src/engine/sports/nfl/view/draftBoard.ts` sha256 = `cb7b12434f3ae757a03a4bac47ac10fec6efe2cf41d72bcb83a85ce86bae39d8`.
- Same file at 4ca9a071 = `cb7b1243…` (identical). Same file at d3bd81d2 = `cb7b1243…` (identical).
- Full-tree `diff -rq` between extracted `src/engine/` and `git archive d3bd81d2 colors/src` = empty (zero differences). VERIFIED.
- README.md on gh-pages still reads "Pinned engine commit: 4ca9a071". STALE naming. The re-pin commit 66096fb1 already moved bytes to d3bd81d2; only the document lags.
- Conclusion: engine bytes are current (d3bd81d2); README is the stale artifact. Fix the README line, do not re-pin. MUSE/Owner note: this matches the AGENTS.md ruling (pin = d3bd81d2).

## 2. "One door" claim — FAILS as shipped

Claim (prompt M1): no screen imports the engine directly; all reads go through one adapter module.

Command: `grep -rn "engine/" 67-cakepanz/src/lib` (run on extracted tree).

Result — 7 files import engine directly, no adapter module exists (`find src -iname "*adapter*"` = empty):
- src/lib/draftStore.ts → ../engine/sports/nfl/app/store.ts (createStore, Store, Player)
- src/lib/screens/TeamSelect.svelte → ../../engine/sports/nfl/engine/league.ts (TEAMS, DIVS, divisionTeams, TEAM_BY_NAME, Conf)
- src/lib/components/SortControls.svelte → ../../engine/sports/nfl/view/draftBoard.ts (BoardSort)
- src/lib/components/BoardRow.svelte → ../../engine/sports/nfl/view/draftBoard.ts (BoardRowVM)
- src/lib/components/DraftBoard.svelte → ../../engine/sports/nfl/view/draftBoard.ts (BoardVM)
- src/lib/components/SlotPicker.svelte → ../../engine/sports/nfl/engine/slots.ts (SLOT_IDS, SLOTS, Dest, SlotId) AND ../../engine/sports/nfl/engine/flex.ts (fit)
- src/lib/components/BoardHeader.svelte → ../../engine/sports/nfl/view/draftBoard.ts (BoardHeaderVM)

No `SNAPSHOT.md`, `MERGE-README.md`, `MERGE-GUIDE.md`, or `SHELL-STATUS.md` present in the delivered tree (find = none). The seam document and merge cone (M1–M5) are unbuilt. This is the single highest-value gap: the Architect cannot swap the engine without touching screens today.

## 3. Neutral / framework check — REPORTED

- Render layer is Svelte 5 (App.svelte, components/*.svelte). src/lib also contains plain TS (draftStore.ts, valuation.ts) with no framework imports — good. No framework-specific imports inside src/lib/*.ts verified by grep. Svelte runes not checked line-by-line (INFERRED: components use Svelte 5 runes likely).
- Fresh-start arms comparison numbers (871/457/470/125/221/39) not re-measured here (no DOM run). UNKNOWN.

## 4. Battery — REPORTED

- batteries/slice1.battery.mjs: 8 test() calls; battery script `node batteries/slice1.battery.mjs`. SKIP/DEFER counts per README = 26 pass / 0 fail / 10 SKIP / 3 DEFER (REPORTED by Inkling; not re-run here). Could not run (node_modules not present in extracted tree) — UNKNOWN whether it still passes on this pin.

## What this unblocks
Z.ai: (a) update README pin line to d3bd81d2; (b) build the single adapter module and migrate the 7 import sites, then ship SNAPSHOT.md + seam doc. Council: seam-inventory audit (Part 2) can proceed once the seam exists.

## What I did not do
Parts 1 inventory screen-by-screen, 3 neutrality deep-dive, 4 blockers, 5 ideas, 6 mutations, 7 gap-find, 8 non-functional, 9 data-integrity, 11 style, 12 weight, 13 a11y, 14 cutover, 15 TS assets, 16 specs, 17 hygiene — not attempted this session (scope + token budget). Part 17 label-hygiene (P-345 vs R-13) also not done; noted.
