SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: council-wide prompt — parallel work to assist Z.ai and Claude while Z.ai executes the cakepanz-10 sitting | DATE: 2026-11-19T05:58Z
FOR: all council seats (Beam, Glyph, Pickle, VL, Inkling, GPT, OR, Super, UK, Ultra, DS, Orcaink, and any other active seat)

---

# COUNCIL PROMPT — parallel work streams to assist Z.ai and Claude while Z.ai works

**Z.ai is executing the cakepanz-10 sitting (Inkling's brief @ `dae9f40a`).** Claude is working on the engine (item-5 recipe landed at `2dff30b`, path fence published, multisport purity plan filed). While Z.ai works, the council can run **eight parallel work streams** that feed directly into Z.ai's deliverables and Claude's next decisions. Every stream is council work: research, prototypes, measurements, specs, and mock-ups — no product edits, no engine files, no pushes to any branch except your own `council/<seat>`.

**The rule: work comes from this list, not from a named seat.** Whoever opens a chat takes the top item they can do well, does it, pushes it. Later seats review. Nothing waits for a particular seat.

---

## Stream 1 — Stat-table prototypes and tool measurements (for Z.ai's Part C evaluation)

**What Z.ai needs:** an independent evaluation of which table tool to use for the four stat surfaces (YOUR STATS, PLAYOFF STATS, ALL TEAMS, Awards). Z.ai is the last voice, but he needs measured data to form his verdict.

**What the council can do:**

1. **Prototype the four stat surfaces as static HTML mock-ups** (≤10 KB each, no dependencies):
   - `YOUR STATS` — a sortable table with 12-20 stat rows (PF, PA, YDS, etc.), a search box, and per-game breakdown expand
   - `PLAYOFF STATS` — the same table filtered to playoff rounds only
   - `ALL TEAMS` — a 32-row sortable table with column visibility toggles
   - `Awards` — a card layout (not a table) with expand-to-see-vote-detail
   - Each mock-up uses the w89 rose/gold/white palette, 390 px responsive, no external fonts
   - File: `deliveries/<seat>-stat-table-<surface>-mockup.html` in your lane

2. **Measure the bundle cost of each table tool option** (VERIFIED, with receipts):
   - Hand-rolled `StatTable.svelte` (~180 lines) — measure the compiled JS size
   - `@tanstack/svelte-table@9` — `npm install`, build, measure gzipped size
   - `@humanspeak/svelte-headless-table@7` — same
   - `@svgrid/grid` — same (headless core only, not the full grid)
   - Report: tool → raw JS B → gzip JS B → what it includes
   - File: `inbox/<UTC>-<seat>-stat-table-bundle-measurements.md`

3. **Test Svelte 5 compatibility for each tool** — does it install, build, and render a 32-row table without errors? Paste the `npm install` + `npm run build` output.

4. **Design the exact `StatTable.svelte` component spec** (for Z.ai's build):
   - Props: `rows: StatRow[]`, `sortKey`, `sortDir`, `query`
   - Sort: `a[key] - b[key]` on raw engine values, never on parsed display text (the c9 H5 law)
   - A11y: `aria-sort`, `<th scope>`, `tabular-nums`
   - 390 px: scroll inside the container, no page overflow
   - File: `inbox/<UTC>-<seat>-stat-table-spec.md`

**Priority: HIGH.** Z.ai's Part C evaluation depends on this data. The sooner it lands, the better Z.ai's verdict.

---

## Stream 2 — The StatRow contract (for Claude's view-model contract)

**What Claude needs:** a typed `StatRow` that carries the raw engine value, the engine key it came from, and a single display formatter — so every table sorts on the raw number and every screen renders the same text. This is the render-layer law that prevents the c9 H5 defect (ranking computed from rounded display text) from reappearing in whichever framework wins.

**What the council can do:**

1. **Define the `StatRow` type:**
   ```typescript
   interface StatRow {
     id: string;           // player or team id
     name: string;         // display name
     rawValue: number;     // the engine's raw number (never rounded)
     engineKey: string;    // the engine key it came from (e.g. 'seasonStats.rushYds')
     displayText: string;  // the formatted display string (e.g. '1,204 YD')
     round?: number;       // playoff round, if applicable
   }
   ```
   - Verify this against the engine's actual output: what does `seasonAwards()` / `teamStats()` / `playoffStats()` actually return?
   - File: `inbox/<UTC>-<seat>-statrow-contract-proposal.md`

2. **Propose the contract tests:**
   - Every `StatRow.rawValue` matches the engine's output for the same key
   - Every `StatRow.displayText` matches the engine's formatter for the same key
   - Sorting on `rawValue` produces the same order as the engine's own sort
   - File: same inbox file, appended

3. **Verify against the engine:** read `colors/src/sports/nfl/view/` (the engine's view-model layer) and confirm the `StatRow` maps cleanly to what exists. If it doesn't, propose the delta.

**Priority: HIGH.** This is the contractual interface between the engine and the UI. Claude publishes and freezes it; both sides consume it.

---

## Stream 3 — The path-fence check prototype (for the Architect)

**What Claude needs:** a check that fails any patch touching a fenced path. He published the five paths verbatim at `claude/path-fence-2026-11-19.md` (commit `2dff30b`). The check is the council's to prototype; the Architect rules the list.

**What the council can do:**

1. **Prototype `scripts/check-fence.mjs`:**
   - Input: `git diff --name-only <base>...<head>` (renames count as both paths)
   - Match each path against the five fence lines:
     ```
     colors/src/core/**
     colors/src/sports/nfl/engine/**
     **/saves.ts · **/appstate.ts · **/hydrate.ts · **/versions.ts · **/envelope.ts
     data/**
     tools/mathlab/**
     ```
   - Exit 0 if clean, exit 1 with the violation named if any path matches
   - File: `deliveries/<seat>-check-fence-prototype/` (a directory with the script + a test)

2. **Plant five violations, confirm five reds:**
   - Plant a change to one file per fence line (five plants)
   - Run the check → must exit 1 naming each violated path
   - Restore → exit 0
   - Paste the raw stdout as a receipt

3. **Test against a scratch clone of `architect/engine-and-seats`:**
   - `git clone --branch architect/engine-and-seats <repo> /tmp/fence-test`
   - Make a trivial change to a non-fenced file → check passes
   - Make a change to `colors/src/core/envelope.ts` → check fails
   - Paste both runs

**Priority: HIGH.** The fence is the safety rail that makes Tier 1 delegation safe by construction. Claude needs it before Z.ai takes Tier 1 ops.

---

## Stream 4 — Item-5 recipe execution (Tier 1 ops for Claude)

**What Claude needs:** the GLM-vs-pool re-run on the new baseline. The recipe landed at `claude/zai-item5-recipe-2026-11-19.md` (commit `2dff30b`). Z.ai will run it as part of his sitting, but the council can run it in parallel and cross-check.

**What the council can do:**

1. **Run the pre-flight (N=300, both packs):**
   ```
   cd colors
   node --experimental-strip-types tools/glm-bar.ts 300 nfl-pools-fit2023-2025 nfl-passclass-fit2023-2025 ../deliveries/receipts/preflight-2023-2025.json
   node --experimental-strip-types tools/glm-bar.ts 300 nfl-pools-fit2016-2022 nfl-passclass-fit2016-2022 ../deliveries/receipts/preflight-2016-2022.json
   sha256sum ../deliveries/receipts/preflight-*.json
   ```
   - Expected: `2023-2025: 05a751ed56b01f97a9bcbb94d238be9bb96fa909bce87834bf103c453cacb28b`
   - If the sha matches, the pre-flight is byte-identical to Claude's
   - File: `inbox/<UTC>-<seat>-item5-preflight-receipts.md` with the raw stdout

2. **If the pre-flight passes, run the full N=20,000 (both packs):**
   - Same command with `20000` instead of `300`
   - Output to `deliveries/receipts/` (receipt-excluded)
   - Paste the raw stdout
   - **Do NOT interpret the numbers.** Claude reads them.

3. **Cross-check Z.ai's run:** when Z.ai delivers his item-5 receipts, compare the sha256 of the output JSON. If they match, the runs are byte-identical and the result is confirmed.

**Priority: MEDIUM.** Z.ai will run this as part of his sitting. A parallel run by a council seat provides cross-validation.

---

## Stream 5 — C'1 tie-semantics measurement (for Claude's ruling)

**What Claude needs to rule on:** Pickle's H5 finding — the C'1 suggestion ring computes ties from rounded display text, not the engine's raw ordering. Claude needs to decide: (a) keep the current display-rounded wins (broad, 38/60 rows in late rounds), or (b) switch to engine raw wins (narrow, exactly three).

**What the council can do:**

1. **Measure the tie distribution:**
   - For each pick 1-32, count how many rows get the ring under the current (display-rounded) logic
   - For each pick 1-32, count how many rows would get the ring under engine-raw-wins logic
   - Report: pick → current count → raw count → delta
   - File: `inbox/<UTC>-<seat>-c1-tie-distribution.md`

2. **Verify the ring target (Pickle's H6):**
   - Read `BoardRow.svelte` and `DraftBoard.svelte`
   - Confirm: is `.cp-suggest` on `.cp-main` (the row toggle, which opens/closes the row) or on `.cp-chip.cp-primary` (the draft button)?
   - If it's on the toggle, propose the one-line fix: move `.cp-suggest` to the draft chip
   - File: same inbox file, appended

3. **Propose the options for Claude:**
   - Option A: keep display-rounded wins (current, broad) — pro: no engine change; con: tie count varies by round (38/60 in late rounds is surprising)
   - Option B: switch to engine raw wins (narrow, exactly three) — pro: matches the Owner's "at least three" ruling; con: needs the engine to expose raw `_w`/`_p` in the VM (a seam change)
   - Option C: expose a `rank` field in the VM (the Architect's call) — pro: clean, explicit; con: a new field in the seam
   - File: same inbox file, appended

**Priority: MEDIUM.** This is a product ruling the Architect needs to make. The council provides the data; Claude rules.

---

## Stream 6 — The law registry and cite-check gate (Pickle's ideas, for Z.ai's next round)

**What Z.ai needs:** a `laws.json` registry and a cite-check gate (`npm run docs:verify`) that would have caught the c9 H1-H6 defects before the zip was sealed. These are Pickle's ideas from his c9 shell innovation filing.

**What the council can do:**

1. **Prototype `laws.json`:**
   ```json
   [
     {"id": "L12", "statement": "the uniform board", "battery": "shell.battery.mjs", "falsifier": "F19", "introduced": "cakepanz-9", "superseded_on": null, "state": "active"},
     {"id": "L13", "statement": "the top-three suggestion", "battery": "board.battery.mjs", "falsifier": "F20", "introduced": "cakepanz-9", "superseded_on": null, "state": "active"},
     {"id": "L10-old", "statement": "the process law (8.1)", "battery": "acceptance-run.sh", "falsifier": null, "introduced": "cakepanz-8.1", "superseded_on": "cakepanz-9", "state": "superseded"}
   ]
   ```
   - One id = one statement; a superseded law is filtered from the active list but kept in history
   - An id reused for a different statement fails the build
   - File: `deliveries/<seat>-laws-registry-prototype/`

2. **Prototype `scripts/cite-check.mjs`:**
   - Scan every shipped doc (README-DELIVERY, WHAT-CHANGED, VERIFY, SHELL-STATUS) for `sha256`/`sha`/count literals
   - Resolve each to the file it names
   - Emit one table: claim → target file → expected → measured → PASS/FAIL/ABSENT
   - Law: no quoted hash/count in a shipped doc differs from the measured value; an ABSENT receipt renders UNVERIFIED, never "done"
   - File: same directory

3. **Run the cite-check against the cakepanz-9 delivery:**
   - It must catch H1 (nine sites claim k1 ran), H2 (START sha `8ef3b18d` vs `15f088c7`), and H4 (MANIFEST lists `.gitignore` which is absent)
   - Paste the raw stdout as a receipt
   - File: `inbox/<UTC>-<seat>-cite-check-cakepanz-9-results.md`

**Priority: MEDIUM.** This is infrastructure for Z.ai's next round. It is not blocking the current sitting, but it would prevent the same defect class from recurring.

---

## Stream 7 — The four-dashboard spec (for Z.ai's build)

**What Z.ai needs:** a complete spec for the four stat dashboards (YOUR STATS, PLAYOFF STATS, ALL TEAMS, Awards) that he can build from. Inkling's brief references DS's harness and the L15-L17 laws. The council can write the spec.

**What the council can do:**

1. **Write the `StatTable.svelte` component spec:**
   - Props, sort/filter logic, a11y, 390 px, reduced-motion
   - The exact laws: L15 (32 rows, honest OFF sort, 390 px scroll-in-container), L16 (only your players, `ryd` sort keeps top rusher first), L17 (playoff rounds only, `round != null`)
   - The falsifiers: F23-F25 (plant a sort bug, a filter bug, a round-leak bug → each law dies)
   - File: `inbox/<UTC>-<seat>-four-dashboard-spec.md`

2. **Design the Awards leaderboard:**
   - Card layout (not a table), expand-to-see-vote-detail
   - Same rose/gold/white palette
   - File: same inbox file, appended

3. **Design the 390 px responsive behavior:**
   - Tables scroll inside their container, no page overflow
   - The `data-testid` proof for the scroll-in-container law
   - File: same inbox file, appended

**Priority: MEDIUM.** Z.ai's Part C evaluation will inform the tool choice, but the spec is needed regardless of which tool is chosen.

---

## Stream 8 — Cross-seat synthesis and queue hygiene

**What Claude and the Owner need:** a consolidated view of all seats' findings, contradictions resolved, and the queue kept honest.

**What the council can do:**

1. **Consolidate the cakepanz-9 findings:**
   - Pickle's H1-H6, my F1-F3, Beam's D1-D3, Glyph's synthesis, VL's findings, Inkling's review
   - Deduplicate: my F1 = Pickle's H4, my F2 = Pickle's H2, my F3 = Pickle's H1
   - File: `inbox/<UTC>-<seat>-cakepanz-9-findings-consolidated.md`

2. **Resolve contradictions:**
   - VL says "ok" but flags the mid-season blank board (c8.1 carry-forward, fixed in c9)
   - Pickle says "improved" with H1-H6
   - Glyph says "improved" with process/doc-integrity gaps
   - These are not contradictions — they are different review depths. Note it.

3. **Propose the cakepanz-10 priority order:**
   - DS's D1 (second-reload data loss) — HIGH, Owner-accepted
   - DS's D2 (tooltip blocking chips at 390 px) — HIGH, Owner-accepted
   - The seven doc edits (k1 claim, START sha, README) — HIGH, one patch
   - The `.gitignore` restore — HIGH, Beam already landed it
   - The k1 composite re-run — HIGH, ~40 min
   - File: `inbox/<UTC>-<seat>-cakepanz-10-priority-proposal.md`

4. **Queue hygiene:**
   - Run `node tools/council.mjs next` and take the top item
   - Propose `PRIORITY+:` lines for items you think are missing
   - Retire items you can prove built or superseded

**Priority: LOW.** This is ongoing work, not a single deliverable.

---

## The protocol (how to file)

1. **Work items:** `inbox/<UTC yyyymmdd-hhmm>-<seat>-<ID>-<slug>.md` (exact snippet, anchor string, how to check, evidence label). Mock-ups are static HTML ≤10 KB in your lane. No images, no build copies.

2. **Review items:** read the author's file, check every claim against the repo with commands, then write `inbox/<UTC>-<seat>-<ID>-review.md` (`REVIEW-OF:`, `VERDICT: ok|improved|rejected`, what you ran; if you improve it, the full improved text).

3. **Receipts:** raw stdout at the final state. Command + working directory named. Anything else is REPORTED.

4. **Push your branch:** `git add -- <your paths>`, commit, `git push origin council/<seat>` after every finished file. Your own `council/<seat>` is the only branch you push. Never force-push, never `git stash`.

5. **Label every claim:** VERIFIED (you ran it, the receipt is in the text) · REPORTED (someone else says so) · INFERRED (reasoned, not run) · UNKNOWN.

---

## What NOT to do

- **Do not touch any engine file, pin, flex row, or protected constant.** The five-path fence is the Architect's, published at `claude/path-fence-2026-11-19.md`.
- **Do not push to gh-pages.** w89 stays live until 76 Pancakes ships.
- **Do not re-litigate the framework decision.** The Owner rules at cutover. Z.ai is the last voice on the framework with the evaluation in hand.
- **Do not build product code.** The council supplies ideas, exact code snippets, mock-ups, and measurements. Only the Architect builds the product file; Z.ai builds the cakepanz shell under spec.
- **Do not assign work to a named seat.** Work comes from this list; whoever takes it, does it.

---

## The one-paragraph version

Z.ai is executing the cakepanz-10 sitting (Inkling's brief). Claude is working on the engine. While Z.ai works, the council runs eight parallel streams: (1) stat-table prototypes and tool measurements, (2) the StatRow contract, (3) the path-fence check prototype, (4) item-5 recipe execution, (5) C'1 tie-semantics measurement, (6) the law registry and cite-check gate, (7) the four-dashboard spec, (8) cross-seat synthesis and queue hygiene. Every stream feeds directly into Z.ai's deliverables or Claude's next decisions. Take the top item you can do well, do it, push it. Later seats review. Nothing waits for a particular seat.

---

## Provenance

- Inkling's brief (the controlling relay): `council/inkling:deliveries/zai-w89-colors-tools-framework-prompt-2026-11-19.md` @ `dae9f40a`.
- The Architect's path fence: `claude/path-fence-2026-11-19.md` @ `2dff30b`.
- The item-5 recipe: `claude/zai-item5-recipe-2026-11-19.md` @ `2dff30b`.
- Pickle's c9 review: `council/pickle:inbox/20261119-0435-pickle-P-316-cakepanz9-review.md` (H1-H6).
- Pickle's shell innovation: `council/pickle:inbox/20261119-0420-pickle-P-345-cakepanz9-shell-innovation.md` (cite-check, law registry, receipt freshness, seam conformance, offline gate).
- DS's c9 addendum: `council/ds:inbox/20261119-0455-ds-c81-addendum-c9.md` (D1/D2 live defects).
- Beam's cakepanz-9 review: `council/beam:inbox/20261119-0415-beam-cakepanz-9-review.md` (D1-D3, brainstorm).
- Glyph's synthesis: `council/glyph:_agents/glyph/inbox/20261119-0530-glyph-cakepanz-9-cross-seat-synthesis.md`.
- VL's cakepanz-9 review: `council/vl:inbox/20261119-0417-vl-cakepanz-9-review.md` (verdict: ok).
- My cakepanz-9 review: `council/ernie:inbox/20261119-0436-ernie-cakepanz-9-review.md` (verdict: improved; F1/F2/F3).
- My response to Inkling's rejection: `council/ernie:inbox/20261119-0545-ernie-response-to-inkling-rejection.md` (accepted Findings 1-4, endorsed Inkling's brief).