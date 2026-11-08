# Z.ai continuation prompt — w86 done, 67 Cakepanz Slice 1 next (long) — 2026-11-08

**From:** MUSE, High Councillor
**To:** Z.ai, Executor / High Councillor
**Tone:** Proposing, as always — suggestions and open questions, not commands. And: w86 is good work. The six asks each got a root cause found, not guessed, and the residuals are stated honestly. Keep going.

This prompt continues from your w86 delivery (local zai/w86, commit ac6aba7, unpushed) and the pinned 67 Cakepanz plan. It does not replace the ONE prompt for 67 Cakepanz (`_agents/muse/deliveries/prompts-2026-11-05/zai-67-cakepanz-prompt-2026-11-08.md`) — that is still the standing spec for the track. This prompt is the next step: finish the w86 follow-through, then open Slice 1.

---

## §0 · Where we are

- **w86 SHIPPED** (your delivery): md5 31828a37…, 1,878,268 B, base w85 (2) eb91abd2…, zip c1b476af…, commit ac6aba7 on local zai/w86, unpushed (sandbox law). All six asks shipped with root causes found.
- **Base VERIFIED:** w85 (2) eb91abd2… is the live index.html on gh-pages (md5 eb91abd22f335e34f6898dcff5e6dde6, 1,864,914 B). Your base is correct.
- **w86 fixes REPORTED, not yet independently verified:** the product file and zip are unpushed, so no council seat has run them yet. The review will verify them once the file lands (see §1). Your root causes are consistent with the w85 base (the DCC collapse matches the P-285 live finding; the TE fill logic and the zpb:tab stamp are present in w85; --tPill is absent in w85, as expected — it is new in w86). The proof claims (84/0 batteries, 31/31 functional, census 0/0, zero page errors) are yours to stand behind; the review will re-run them.
- **67 Cakepanz: opened, not built.** The pinned plan sits in the package. Slice 1 (the Svelte Draft Board) opens next chat — this prompt.
- **The Owner's Nov 8 decisions (for reference — these govern everything below):** model-first (the salary table is dead as a target and as the default; weights come OUT of the engine's measured impact); the measured mode is the default (either name, "Engine Value" or "Model Value", is fine; Owner Preset one click away); RNG Stage 1 approved; CI-gate N=100; CI tagging approved; cutover = a fully functioning Colors v1; 67 Cakepanz is your parallel track (you build Colors; Claude reviews slices + integrates + owns the engine); the autonomy grant (below, §5).

---

## §1 · The w86 follow-through (finish this first — it is short)

### 1a · Get w86 pushed so it can be reviewed

The file and zip are unpushed. Beam pushes via `tools/import-zip.sh` (the import-zip / gh-pages convention inside the zip). Please make sure the zip's README names the product file, the md5, and the base (w85 eb91abd2…) so the import is unambiguous. Once it lands on gh-pages, the council reviews it (a P-285 successor — the w86 review). Do not start w87 until w86 is reviewed; the review is what catches a dropped change (the P-285 review found the Round 3 rebuild had dropped the R2-19 rating scale, the W85-8 linescore frame, and the R2-16 guard casing — the review exists to catch exactly that).

### 1b · The three residuals — address or confirm

You stated three honest residuals. Please close each one, either by fixing it or by confirming it is accepted:

1. **49ers dark footer pill at 4.43:1 (best allowed ink).** Is there a better ink within the allowed set, or is 4.43:1 the best the palette allows? If it is the best allowed, say so in the delivery README and move on. If a better ink exists, use it.
2. **Three teams' view-toggle golds at ~3.9:1 on light washes.** Same question: is there a better gold, or is ~3.9:1 the best allowed? Name the three teams in the README.
3. **Fuller lineups slightly lift weak teams (w79 calibration not re-swept).** You wrote "say the word." Here is the word: please re-sweep the w79 calibration against the fuller lineups (the census fix means more real bodies in lineups, which shifts team strength). If the re-sweep shows the lift is within noise, say so with the numbers. If it shows a real shift, report the size and ask the Owner whether to re-calibrate or accept it. Do not silently re-calibrate — the calibration is the Architect's, and the Owner decides.

### 1c · Confirm the P-285 items (the w86 fix note)

The P-285 review (MUSE, 2026-11-08) found four gaps in w85 that were filed as P-299..P-302 for w86, plus a docs correction (P-304). Your six asks were the Owner's w86 list, and these four may not have been in your w86 scope. Please confirm, one line each, whether w86 addressed them — and if not, they go in the next wave (w87) or into 67 Cakepanz, not silently dropped:

- **P-299 — the R2-19 rating scale.** The function `zpbSeasonRating` and the constant `ZPB_MEDIAN_OVR` have 0 occurrences in the shipped w85 file; the r2 battery crashes on them. Is the rating scale restored in w86 (or present under a different implementation)? Do not claim restored until the r2 battery runs clean.
- **P-300 — the W85-8 linescore frame.** Claimed 2px + inset ring + drop shadow, 14px radius; shipped w85 has 1px, 12px, no shadow. Is it restored in w86? Verify via the w85_battery W85-8a assertion.
- **P-301 — the W85-4 badge specificity.** The .6rem rule exists but is overridden by the more-specific .68rem rule, so badges render 14.28px, not 12.6px. Fixed in w86?
- **P-302 — the R2-16 guard casing.** The draft dropdown reads "Offensive Guard" (capital G); the claimed lowercase "Offensive guard" change is not in w85. Applied in w86?
- **P-304 — the stale battery counts in the delivery docs.** 26 scripts, not 14; 10 screenshots, not 11; the 28/28 claim is Round-1. Docs only — correct them in the w86 delivery docs.

If any of these were deliberately left out of w86 (because the Owner's six asks took priority), that is fine — just say so, and they stay open for the next wave. What must not happen is a gap closing silently without a record.

### 1d · The two Owner decisions from the P-285 review (P-303, P-305)

These are the Owner's calls, not yours to decide — but please note their status in your next delivery:

- **P-303 — re-anchor the w77 acceptance battery for w85.** The battery's V1 expects FS-before-SS; w85 orders SS-before-FS consistently. V8b/V8c expect "BACK TO WEEK 17" / "SUPER BOWL"; w85 uses exact stage labels. V13 is class-based and the class was kept while the box was removed. Do NOT change w85 for these — the battery needs re-anchoring (the Owner's confirmation on the SS-before-FS order is the open piece).
- **P-305 — Google Fonts.** The product loads Google Fonts externally, which is the sole cause of the r3 "console clean" failure and a standing tension with the offline requirement. Bundle locally (preferred for offline) or accept the external load — the Owner/Architect decide; do not silently bundle or silently accept.

---

## §2 · 67 Cakepanz Slice 1 — the Svelte Draft Board (the main work)

This is the critical path. The shell UI (w86) is feature-complete as a design; the Colors UI is at 0% (zero .svelte files in the entire colors/ tree). Slice 1 is the first real Colors UI. The ONE prompt (§3) is the standing spec — here is the Slice 1 kickoff, with the pieces that matter most.

### 2a · The scaffold (ships WITH Slice 1 — do not ship the scaffold alone)

- Top-level `67-cakepanz/` directory (coordinate with Beam on placement — a branch like `zai/67-cakepanz` is the natural home).
- Fresh Svelte 5 + Vite scaffold: package.json, vite config, index.html entry. The framework is locked (Svelte 5 + Vite, confirmed by the Owner).
- The internal name is "67 Cakepanz"; the user-facing brand is still **76 Pancakes** (the track name is for the builders, not the product).
- The scaffold ships WITH Slice 1, not before it — one delivery, one review.

### 2b · The frozen engine snapshot (consume, never edit)

- Vendor the engine as a frozen snapshot from the pinned commit **`4ca9a071`** on `architect/engine-and-seats`. The snapshot contents are listed in the ONE prompt (§2) — copy them, do not import them live (the snapshot is frozen so your tree is stable while Claude keeps working).
- **Never edit the snapshot.** If a contract needs to change, say so in inbox/bulletin so Claude can change it and you can re-pin. You consume the engine; Claude owns it.
- Re-pin by copying (a fresh snapshot from a newer commit), never by editing in place.

### 2c · Slice 1: the Draft Board (what to build)

Build the Svelte components for the Draft Board, against the existing Draft Board view-model (`colors/src/sports/nfl/view/draftBoard.ts`, 66 lines, data-shaping only — plain JSON out, no DOM, no framework). The components:

- The board (the list of available players, ranked by priority/Wins).
- The rows (each player row: name, position, OVR, Wins, priority, gone-odds).
- The header (draft state: round, pick, team on the clock, time).
- The footer (draft controls: sort, filter, the pick button).
- The slot picker (choose which slot the pick fills; chips read the flex cost, e.g. just `−10` where the flex table says so).
- The pick flow (select a player → confirm → the pick lands → the board updates).
- The on-clock indicator (which team is picking).
- The gone-odds display (the probability a player is gone before your next pick).
- The flex display (the flex cost of slotting a player at a non-natural position).
- The lineup advice (the best lineup given the current roster).
- The sort controls (Wins / OVR / priority — the user can sort by any of them; the default sort is Wins/priority, not raw OVR).

**The valuation modes (wire them in from the start — do not bolt them on later):**

- The measured mode is the **default**. Either name is fine ("Engine Value" or "Model Value" — pick the one that reads better; the Owner said either is fine).
- The Owner Preset is **one click away** (a segmented control on the Rankings/Weights page: "Measured impact · Game balance · Owner preset").
- The current mode is echoed in the page subtitle **everywhere numbers appear** (the mode label travels with every displayed number — provenance).
- The mode switch is **disabled mid-draft** (never change the valuation basis in the middle of a draft).
- Never blend modes silently. One mode at a time, labelled.

**The contracts (already landed — build against them, do not redesign them):**

- `AppState` / `Action` in `appstate.ts` (the only AppState/Action — F1 ruling).
- `DraftStoreState` / `DraftStoreAction` in `store.ts`.
- The envelope (saveId/createdAt now; no datasetId — dataset identified by content hash; SHA-256).
- The 32 slots (the Colors/design.json set governs — NOT the old 34-key DEFAULT_WEIGHTS set, which is dead).

### 2d · The battery (Slice 1 must pass it)

- Run the w77 acceptance battery (84 assertions, `batteries/accept.js` + the adapter) against Slice 1. The battery is the shared truth for both trees (yours and Claude's) — the same contract, the same battery, so the Architect can compare them at cutover.
- If an assertion does not apply to a Svelte component (it was written for the shell), mark it SKIP loudly with the reason — do not silently drop it, and do not weaken the battery to make it pass.
- Report the battery result in the delivery README (pass/fail/skip counts, and which assertions were re-pointed, if any).

### 2e · One slice at a time

- Do **not** start Slice 2 (Team Select + Season/Standings) until Slice 1 is **reviewed**. The review is the gate — Z.ai cannot start Slice 2 until Slice 1 is reviewed, because the review is what catches a wrong contract or a wrong pattern before it is repeated across five slices.
- If the review finds a contract problem, fix the contract question via inbox/bulletin (Claude owns the contract) and re-pin — do not work around a broken contract in your tree.

### 2f · Delivery (per-slice folder + README)

Deliver Slice 1 as a folder with a README, per the ONE prompt (§10). The README states:

- The slice (Slice 1 — Draft Board).
- The pinned engine commit (4ca9a071).
- The copied modules (which engine modules you vendored).
- The battery result (pass/fail/skip, and any re-points).
- Comparison notes (how Slice 1 compares to the shell's Draft Board — what is the same, what is different, and why).
- Innovations (what you built that the plan did not ask for — the autonomy grant covers this; say what you invented and why).

---

## §3 · What Slice 1 is NOT (the boundaries — do not build these in Slice 1)

- **Do not build Slices 2–5 in this pass.** Slice 1 only. (Slice 2: Team Select + Season/Standings. Slice 3: hydration + FeedEvent union. Slice 4: N3 drive-level feed UI. Slice 5: N2 brag shareables + seed card. They come after Slice 1 is reviewed, one at a time.)
- **Do not generate ratings.** Ratings generation is the Owner's alone, later. Do not build a ratings generator, a ratings pipeline, or a synthetic ratings pool for the product. (Tests use real harness/fixtures, not a dev pool.)
- **Do not fit anything to the salary table.** The salary table is dead as a target and as the default. It survives only as an anchor (a sanity band) in the triangulation, never as a fit input. The witness gate labels a display that equals a fit table as FITTED — and under model-first, the display must be MEASURED. If you find a display that is fitted, say so; do not hide it.
- **Do not edit the engine.** (See §2b.) The engine is Claude's. You consume the snapshot.
- **Do not redesign the UI.** Colors v1 is a faithful rebuild of the latest wave UI (w86), not a redesign. The shell is the reference. (The UI/UX adaptations in the ONE prompt §3 — state shape, draft flow, mode switch, save UI, typed feed, 32 slots, offline, mode labels — are adaptations, not a redesign.)
- **Do not change the brand.** The product is 76 Pancakes. "20-0" as a season record stays ("Can you go 20-0?"); "20-0" as brand/banner is gone (the banner is "76"). No NFL logos/trademarks in the public repo.
- **Do not build the rejected four.** ("What If" alternate-history, deterministic multiplayer, 20-0 roguelike mode, cross-era draft pools.) They are rejected, never re-pitch.

---

## §4 · The calibration targets and the definitions (do not tune against anything else)

- **Skilled** (Owner definition, locked): a drafter who selects within the top 30 players ranked by priority (Wins/Priority, not raw OVR) in every draft round. A class, not a single pick (always-#1 to always-#30). The targets apply to the AVERAGE skilled drafter.
- **Calibration targets** (refined, supersede 80/25/10): **90% playoffs, ~35% Super Bowl appearance, 25% title** for the average skilled drafter. Going 20-0 (a perfect season) about **1–2%** possible for a skilled player. The Lab must count perfect seasons (P(20-0)) as a metric.
- **Parity:** the Owner does NOT want a flat league. Higher win-SD than real NFL, clear losers, at least 3 other top teams (at least two in the opposite conference, at least one in the user's conference). The 3.07 ± 0.35 band is the real-NFL REFERENCE, not the target; the Lab derives the target.
- **Offline is a hard requirement.** Local-first, sync-on-reconnect. (The Google Fonts question in §1d is part of this — the product must work in a tent in the woods.)
- **The game is currently too hard** (N=300 anchor: skilled 47% playoffs / 6% Super Bowl). Nothing should be tuned until the protocol is pinned at N=1000 — the P-263 cluster split is sampling noise until then. Do not tune the engine against a small sample.

---

## §5 · The autonomy grant (from the Owner — scoped to 67 Cakepanz)

The Owner gave you permission and encouragement to **execute whatever you think is best inside 67 Cakepanz**. You decide the implementation (component structure, slice order, view-model shapes, adapters, tooling), you build first and let review catch problems after (no pre-approval needed to build inside your tree), and you innovate/brainstorm what the track needs beyond the listed work — building the ideas you believe in.

**Scope of the grant:** 67 Cakepanz only (your tree, your implementation). It does NOT extend to the engine (Claude's), the product brand, ratings generation, or Owner decisions (calibration targets, cutover trigger, flex pick).

**What I would suggest you innovate on first (proposing, not ordering):** the Draft Board is the screen the user stares at longest, so the highest-leverage innovation is there — the gone-odds display, the lineup advice, and the sort controls are the places where a better idea pays off most. If you have a better idea for how the board should feel (not just how it should look), build it and say why in the README. The review will catch it if it is wrong; the grant means you do not need permission first.

---

## §6 · The lab track (secondary — Slice 1 first)

The lab/tools prompt v7 (`_agents/muse/deliveries/prompts-2026-11-05/zai-lab-tools-prompt-v7-2026-11-08.md`) is the standing spec for the lab track. Slice 1 is the priority; the lab is secondary. If you have time after Slice 1 (before its review lands), the highest-value lab items are:

1. **The Lab harness runner in Node (no deno)** — the single most important unblocker (it gates M2–M5, and OR/vloc are blocked on tooling with no deno).
2. **M2 P(20-0) counter, M3 baseline re-report, M4 game-noise sweep, M5 parity target** — subject to what the lab window T-items already shipped.
3. **The CI workflow drafts** (tag-on-merge, nightly N=100 Lab run, tsc gate) for Claude's review — he reviews and merges; you draft.
4. **The witness export in zai-lab** (mirror the witness gate in your tree).

Do not let the lab grow while the product waits. If the lab keeps growing while Slice 1 waits, the project starts looking like a research program instead of a game. Slice 1 first.

---

## §7 · Delivery and open questions

**Delivery:** per-slice folders + READMEs (see §2f). The w86 follow-through (§1) ships as its own delivery (the push via Beam, the residuals, the P-285 confirmations). Do not bundle the w86 follow-through and Slice 1 into one delivery — they are reviewed separately.

**Open questions (yours to answer, or to send back):**

- Slice 1: is the Draft Board view-model (`draftBoard.ts`, 66 lines) sufficient as the data layer, or does it need extending for the Svelte components (and if so, what — propose the shape)?
- The adapter: does the w77 battery's adapter fit a Svelte component tree, or does it need a Svelte-specific adapter (and if so, what is the shape)?
- Slice order: is Draft Board → Team Select → hydration → feed → shareables still the right order, or would you reorder (and why)?
- The snapshot vs import alternative: is vendoring the frozen snapshot the right mechanism, or would you prefer a different one (and why)?
- The w79 calibration re-sweep (§1b, item 3): what does it show, and does the Owner need to re-calibrate or accept the lift?
- What would you innovate on first in Slice 1 (beyond the listed components)?

Build Slice 1. Let review catch what is wrong. Tell us what you invented.
