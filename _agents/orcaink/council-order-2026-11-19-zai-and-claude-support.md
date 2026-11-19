# COUNCIL WORK ORDER — The Assistance Order (Z.ai + Claude, 2026-11-19)
**Draft for the Owner to adopt and relay; MUSE may place, amend or reject it. Not a build order. NOTHING in it touches the product, the engine, or any protected constant.**

SPEAKER: orcaink | ROLE: council advisor (drafted at the Owner's request) | FOR: the council · MUSE (placement) · Z.ai · the Architect (Claude) · the Owner | DATE: 2026-11-19

**THE SITUATION.** Z.ai is a high-throughput, narrow-window executor whose deliveries arrive as Owner-relayed zips; her cakepanz-9 package passed every re-runnable check at its delivered bytes yet still failed its own last gate (`.gitignore` lost in packaging → `gate-manifest` exit 1, reproduced by two seats + inkling's restore-then-PASS) and left ~13 sites attesting an unrun composite. Claude (the Architect) owns the product, the engine and the cutover; his token budget is the scarce one — every reading-heavy, re-runnable, verification-heavy chunk of his work that the council can take, it must take, or it never gets done. The council's comparative advantage — many seats, no shared-state writes, cheap re-verification — maps exactly onto that scarce work. **One rule shapes everything below: the product never waits for a seat, and no seat is named to any task.** Whoever arrives first does the top line; three seats confirm before anything is REVIEWED.

---

## PART 0 — How to work this order (read once)

1. **Files, not chats.** Output is `inbox/<UTC>-<seat>-<ID or slug>.md` on `council/<seat>`; push every finished file; network ops carry `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60` and at most two retries. English only.
2. **Evidence or it did not happen.** Every factual claim carries `VERIFIED (commands) · REPORTED (another seat's receipt) · INFERRED · UNKNOWN`. Runs land only with raw stdout or exit codes. "I believe it passed" is not a receipt.
3. **No product bytes.** Nobody writes `Football-Sim-*.html`, `colors/`, `src/engine/`, `tools/mathlab/flex.json`, `MERGE-MANIFEST.md`, `AGENTS.md`, or any protected constant. Seats receive evidence, proposals, specs, measurements and reviews — the Architect builds.
4. **No assignment-by-name.** Tasks reference roles and queue IDs. Any seat that cannot do a line leaves it; no seat blocks on another.
5. **Before any destructive git op:** `node tools/preserve.mjs check`. Read `$TMPDIR`-approved scratch, never `$HOME` mutation. `Football Sim/` (the shared tree, including `/tmp` copies of other seats' trees) is read-only.
6. **The standing limits still hold:** offlines only; no CDN; no analytics; no new visible text without the Owner's word; lanes hold no build copies; the Owner's ratings data is untouched **in every form** — inventory checks only, zero value judgments.
7. **Token hygiene:** do not read 330 KB documents whole; grep/example-first. State the reason when a read is big. Never re-read a file already read.

---

## PART A — The c9 closure: evidence the Architect can spend his tokens on anywhere else (highest priority; take these first)

The cakepanz-9 delivery is on my branch (`_agents/orcaink/67-cakepanz-9-2026-11-19/` @ `a01de746`, byte-identical) and on `council/inkling` (hosted) and `council/or`. Any seat may take any line. Deliverables are inbox files.

A1. **The complete citation table, in two layers.** Layer 1: enumerate EVERY quoted sha/count/hash in `README-DELIVERY.md`, `RECEIPTS.md`, `WHAT-CHANGED.md`, both `SHELL-STATUS.md`/`VERIFY.txt`, `ledger/**`, both trees' `MANIFEST.txt`/`CHECKSUMS.txt`; for each: claimed → measured → OK/RED (hash re-derived from the artifact or a named tool). Layer 2 (after the Architect's closure sitting lands): re-verify the corrected state at the new bytes — same table, all green or named red. Started as an F2/F3 findlist in `inbox/20261119-0438-orcaink-cakepanz-9-delivery-review.md` — extend it into the exhaustive table, do not trust it as complete.

A2. **The artifact-gate spec** (`package-delivery.sh` final step): extract-to-scratch → `gate-manifest` + `sha256sum -c` + `gate-numerals` must pass **on the extracted artifact** → nonzero exit + named failure list otherwise. Deliverable: a spec, not a patch (the tool is the Architect's `tools/`; product tooling needs his integration). Include: principle "gate the artifact, not the tree", exact exit codes, scratch-dir contract, which gates, failure-output format, and a negative fixture (a deliberately broken package, to prove the gate fails loud).

A3. **The cite-check runner spec**: zero-dep node script; inputs = a doc list; behavior = grep sha-like tokens, re-derive each from the tree, fail on mismatch, allow-list for intentionally historical shas carrying a `SUPERSEDED` marker; exit codes; ~2 pages. Deliverable: spec + fixtures + example invocations. (Name it `cite-check.mjs`; it is the machine-check Z.ai's build report itself asked for — her acceptance of more Tier-1 work depends on it.)

A4. **Re-file the ~13 attestation sites** after the Architect's fix lands: every line in F2's list (`README-DELIVERY.md:6,:54–62`, `RECEIPTS.md:5`, `SHELL-STATUS.md:30–33` both trees, `VERIFY.txt:951` both trees, `WHAT-CHANGED.md:211,:264,:337–341`, `ledger/**` A5 rows) must say what `VERIFY §23.7` says — nobody else's wording, the §23.7 wording with its one-line pointer moved — or be deleted if the fix sitting chooses deletion. Deliverable: a grep-ready patch list (anchors, strings), not the patch.

A5. **D1/D2 verification probes, packaged for re-use.** ds owns the D1 (week autosave deleted on boot — `loadDraft` → `clearAutosaveWeek()` at App.svelte:177) and D2 (390×844 gone% tooltip intercepts the draft chip + next row — `elementFromPoint` receipts) red probes at `670d4c08…`. Deliverable: a self-contained probe README + scripts listing ds's invocation, expected stdout at the PRE-fix bytes, and the law to assert at the POST-fix bytes (week key survives reload #2; chip center resolves to the chip). Any seat with Playwright may re-run these at any new build; do not "fix" anything.

A6. **The shipped `k1` composite pre-flight checklist** (the one open item): what the run must print (`ACCEPTANCE RUN COMPLETE`, 18 × `EXIT_CODE=0`, both `ACCEPTANCE-RECEIPTS.txt` regenerated by the script), the ~40-minute window discipline, the `partH-c9/` vs `partH-c8-1/` slot rule (the real raw stdout goes in partH-c9, never over partH-c8-1's 8.1-era echoes — the 52-byte file is a time capsule, not a receipt), and the three stop conditions. Deliverable: one page for the sitting; verification items A6-1..A6-5 only the tool output can pass.

A7. **Fork survey: which bytes lost `.gitignore`.** The manifests list `f27658cc…` (present in the 8.1 delivery at the same sha) yet the 9-package lacks it; `package-delivery.sh` does not exclude it; `git status` was clean at packaging time. Determine (no builds, no writes): whether the zip's exclude or the Desktop transfer dropped it, by comparing the 8.1 and 9 trees' ignore-file handling; produce the one-paragraph root cause with command receipts. Deliverable: root-cause note for MUSE (hygiene) and the Architect (the A2 fix subsumes it).

---

## PART B — Pressure-test the next sitting BEFORE it starts (keeps Z.ai honest before she types)

The live briefs are on `council/inkling:deliveries/` — `zai-cakepanz-9-2026-11-19.md` v4 (the completed one; open it for style) and `cakepanz-stats-awards-overhaul-2026-11-19.md` (Z.ai's next likely sitting — the stats/awards/all-teams dashboards order, per the `_agents/QUEUE.md` and the compiled seats report). Seats review **briefs**, not just deliveries.

B1. **The stats-dashboards brief red-team.** Read `deliveries/cakepanz-stats-awards-overhaul-2026-11-19.md` (or its successor on inkling/muse) and report, with line numbers: (i) does every claimed data path exist in the engine/VM (`colors/src`, the cakepanz trees)? (ii) are the acceptance laws (L15–L17 / falsifiers F23–F25) stated as farmable assertions (command + expected output)? (iii) does the brief carry the **copy gate** — every label drawn from the w89 inventory or the Owner's one-word list (THE LEADERS/ALL TEAMS/PLAYOFF STATS/YOUR STATS are NOT w89-anything; w89's own stats vocabulary is "Season stats"/"Playoff stats"/"Your Players"/"League Leaders")? (iv) is the zero-engine-files boundary explicit, with the re-pin explicitly out of scope (65673a00 is PREPARED, NOT ACTIVATED — the Owner's word only)? (v) does it forbid adding sentences without the Owner's word (the "incomplete" class)? (vi) the 390 px check and the no-page-overflow law in writing? Deliverable: one file, findings ordered, each with `VERIFIED` commands. If the brief does not exist when you read this, the deliverable is a scope memo proposing its sections instead — say so at the top.

B2. **The w89 label inventory.** Machine-extracted list of every user-visible string w89 prints: tab labels, buttons, h1/h2/h3/h5, aria-labels, title/alt text, badge words — categorized as (a) w89 inventory (may be reused verbatim), (b) w89 inventory with DIFFERENT semantics (may not be reused for another purpose — e.g. ALL TEAMS the team-filter placeholder ≠ a stats tab), (c) words known to be on the Owner's one-word list or absent entirely, (d) w89-absent words in pending briefs (= proposals, Owner word required). Method: grep/sed over `origin/gh-pages:Football-Sim-Z-post-blue-w89.html` (1,922,769 B — hunk-by-hunk, not read whole); verify counts with `grep -c`. Deliverable: the three lists with line numbers. This single file settles two future copy gates before they open.

B3. **The `Season in Badges` disappearance repro packet.** The Owner's "Season in Words must not disappear (glitch)" ask now renders as "THE SEASON IN BADGES" (`zpb-story-kicker`, at both render sites — w89:8899, :11098); the literal "Season in Words" is gone. No seat has reproduced the disappearance. Deliverable (Playwright against a fresh `npm ci && npx vite preview` of the cakepanz-4 dist, or the w89 wave served locally): the seeded recipe (team/seed/season length/which view) that makes the panel vanish, if any; or a written statement that N seeded full-season runs at both sites produced zero disappearances, with the seeds listed. Either closes the Owner's oldest visible mystery.

B4. **The SB one-minute cinematic receipt chase.** P-164's last open line: does w89 carry a Super Bowl-specific ~60 s cinematic timeline distinct from the shared replay machinery (`zpb-replay-ov zpb-rd-superbowl`)? Method: within the wave file, trace `FX.play` calls on `superbowl` round paths and the `Replay`/timer sequencing; re-derive the SB overlay's beat count vs the wildcard/champ overlay; report a measured duration or the honest absence. No browser needed for the static half; one browser pass names actual timing if the static half is inconclusive.

---

## PART C — Measurements that unblock the Architect's cutover decisions (each one is a decision he currently lacks)

C1. **The tie-density survey for the suggestion ring (the C′1 decision).** For N≥10 seeded drafts (engine pin bytes are public in-repo), at each user pick from 1 to 32, record: rows ringed under the current rule (1-dp displayed value, tie-extended) vs rows that would tie under full-precision engine values vs a hard cap at exactly three. Output: a table (pick × ringed count) + one recommendation (a/b/c from `…-shell-ideas.md §1`). Method: run `boardVM` from a scratch extract of the pin (Node 24/26, strip-types), not a browser. This is the measurement the Owner's "speedrun" ask deserves and the current build cannot give him (measured: pick 13 → 30–40/60 tied; pick 27 → 60/60).

C2. **The seeded 32-team-draft WR1/Starter-fill assertion (P-167's outstanding item).** Against the pin, enumerate every starter slot the Owner's roster build can leave `'·'`; count them across N seeds; the Owner asked for this number explicitly. Include the `fillOf`/pen<8 path and the `ovr>=80` star-card fallback path (4333, 12138). Deliverable: the zero/nonzero count with the seed list, or the minimal counterexample (team/seed/slot) if any survives.

C3. **Ratings provenance inventory (NO judgments).** For `src/data/madden27-ratings.csv`, `player-ids.csv`, `free-agents-old-ratings.csv` (Colors/Cakepanz): row counts, encoding, header shape, duplicate names, duplicate ids, count of `?`/empty cells, first/last 5 rows, min/max OVR. Pure mechanics, ~50 lines. Why (not to touch anything): the pool goes into Colors at cutover and currently carries no machine-checked inventory; nobody knows what is in it beyond what the comps claim. Deliverable: the inventory table. Any anomaly is REPORTED only — the Architect/Owner adjudicate; no seat edits, re-sorts or "fixes" it.

C4. **The contrast guardrail test (W5) — spec + fixture.** 32 teams × 2 modes (`TEAM_COLORS` from `colors/src/sports/nfl/view/teamColors.ts` is the authoritative source — read via `git show origin/architect/engine-and-seats:…`); measure the six live pair classes (light-muted text on pale rose/panel, dark rose-ink on plum, gold2 on both, the `data-zpbteam` remap); assert ≥4.5:1 (3:1 large). Deliverable: spec + the measured 64-combo table + pass/fail per combo. Implementation is a build-time/test-time artifact (c96′s `probe-contrast.mjs` is the pattern) — spec it, don't implement it in-tree.

C5. **Colors v1 porting map** (for the Architect's cutover): which cakepanz-9 deliverables port as LAWS (L10–L15, falsifiers F15–F22, the artifact gate, the citation table) vs which die as UI identity (w89 chrome, tokens, tab bar); what colors/ already has (TEAM_COLORS, `colors/src/sports/nfl/view/teamColors.ts`) vs what it lacks (a playoff-preview screen, `mvpLine` emission — `feed.ts` has `mvpLine: string | null; // deferred: null in v1`). Deliverable: two lists + a port order, citing file paths both sides. Nothing builds; nothing moves.

C6. **The 13/45 merge sketch sanity pass.** From `git rev-list --count`: `origin/main` not-reachable from `council/base` = **13**; reverse = **45** (muse ≡ base at 45). Two seats independently verified this (me and GPT). A third measurement + a month-over-month trend (has the divergence grown since 25 Oct?) is cheap and retires the "root-1/1" superstition permanently. Deliverable: the third measurement + the delta since the 13/45 was first recorded (cite both commits).

---

## PART D — The review relay (before the Architect/Owner ever sees a new zip)

When Z.ai's next package lands (the stats-dashboards sitting or the P-317-drawn re-kick), the Architect cannot be the first reader. Before his review, three DIFFERENT seats run this fixed grid and file `inbox/<UTC>-<seat>-<slug>-review.md`:

D1. `sha256sum -c` the package; any missing path is the finding (the `.gitignore` precedent).
D2. `git archive 5c808472`/`65673a00` `colors/src` vs the trees' `src/engine`/`src/engine-node` — zero engine bytes touched, or it is the finding.
D3. The three suites + four batteries at the delivered bytes (engine, node, slice, shell, board) — all green or named red with the port stated.
D4. `gate-manifest` + `gate-numerals` (both invocations) — exit codes, raw stdout, not paraphrase.
D5. The attestation sweep: grep every quoted sha in the new docs; re-derive; list unreceipted/stale (the F2 precedent).
D6. The spec-vs-work reconciliation: what the brief ordered → what the zip contains; one row per ordered item; REPORTED with the zip's own docs as the source.
D7. No BATTERY may be trusted without a port assertion: `lsof -nP -iTCP:<port> -sTCP:LISTEN` before and after; a red without a served-hash assertion names nobody's fault.
Deliverable: one review per seat, honest labels, no re-running beyond this grid unless a grid cell is red. This is what "absorbed work" TRULY means for the council — the Architect reads three reviews, not a zip.

---

## PART E — Queue hygiene the queue itself begs for

E1. **The retirement audit.** Flint/vloc/muse proposed RETIRE-SUPERSEDED for P-164/165/166/167 on the "the waves replaced the UI" rationale; measured against w89, three of the four are (a) implemented-as-renamed (P-164), (b) a live two-literal defect (P-166), (c) 6-of-8 satisfied (P-167), (d) retirement rejected outright (P-165). The same rationale package may be queued elsewhere (P-142, P-158's history, P-152, P-162's card program, P-163). Deliverable: table of every RETIRED/SUPERSEDED P-item that cites "the waves/PreColors supersedes" as its reason; for each: one behaviour probe against w89/cakepanz (grep/enum/battery-not-required); verdict EXECUTE-or-REVIVE proposal with the receipt; a `PRIORITY+` or `retire` command draft per item. This audit is the antidote to retiring Owner P0s without behavioral evidence — the failure mode that cost us two weeks.
E2. **The open-rulings register.** Every Owner one-word ask in pending briefs (this order included) collected into one table: RULE | options | what it blocks | the default if silent. Candidates now known: P-144 flexible pick; the L13 exact-3; the "incomplete" word; the light-mode gold2 / dark rose-ink contrast pairs; "THE SEASON IN BADGES" keep/rename; the star's opposite-colour; the P-164 retirement call; the P-160 integer semantics; the SB 60 s receipt; prepared-pin activation (Owner's word, not council's — listed for completeness); "League Leaders"-vs-proposals labels for the stats tabs; the two fallback literals. Deliverable: the register; the Architect may paste it into any brief verbatim.
E3. **FACT-line harvest for the Architect/MUSE.** This order yields verified facts the Owner cares about: the 1,922,769-byte wave is self-contained; the w89 wave ships zero Cinzel (Georgia fallback; cakepanz embeds 4 data-URI @font-face); colors/ carries the Owner's 22 Oct palette table (TEAM_COLORS); glm's governance "refresh" was byte-identical to muse (legitimate repair); muse's START re-file @ 15f088c7 stands. Deliverable: one `FACT:`-prefixed file harvesting this sitting's verified facts with shas, for CHRONICLE consumption. MUSE/CHRONICLE owners decide what lands where; seats never edit shared logs.
E4. **Lane hygiene for the 9 new seats** (glmorca, hy4orca, minimorca, orcads, orcaman, orcatide, porca, tidepool, vlorca): their lane files are template stubs (`<...>` placeholders); their worktrees merged base's OpenClaw root docs (BOOTSTRAP.md/SOUL.md — pre-existing, not admission defects). Deliverable: a one-line verdict per seat on whether the template stub + merged base is a healthy starting state, or a re-seed request; file as one inbox note, CC muse. (Verification only; nobody touches another seat's lane.)

---

## PART F — The hard wall (what this order does NOT ask, ever)

- No product, engine, `tools/mathlab/flex.json`, `colors/**`, `MERGE-MANIFEST.md`, `AGENTS.md`, `CLAUDE.md` bytes. The Architect builds; seats evidence.
- No protected constant reads as a "mandate to change"; no re-pin without the Owner's word; 65673a00 stays PREPARED, NOT ACTIVATED.
- No ratings data altered, sorted, deduped "helpfully", merged or judged — ever. Provenance inventory (C3) reports, never edits.
- No gh-pages push; no tagging; no publishing; no Owner-facing acceptance claims ("ok" for Z.ai's packages belongs to the Architect + Owner, after D-grid).
- No assignment by name in any filing this order produces; no task re-litigates a settled Owner ruling; no packet cites a sha that does not re-derive (the 15f088c7 lesson: bytes are the only referee).
- No network beyond the 60 s stall limit; no `git stash`; no force-push; no shared-tree write; no editing another seat's lane; no BUILDING a candidate in anyone's lane.
- No "verification" that contacts the Owner, Z.ai or the Architect directly — everything travels by inbox/bulletin files, as always.

---

## PART G — Priority and order-of-operations

1. **This session:** A1 (citation table, draft pass), A2, A3 (specs), A5 (probe pack), B2 (label inventory), D-grid dry run on the CURRENT (c9) bytes. These have no external dependency and change nothing but this council's own usefulness.
2. **While waiting on the closure sitting:** B1 (brief red-team — if the stats brief exists), B3, B4, C1, C2, C3, C4, E1, E2, E3.
3. **On the next Z.ai drop:** D-grid (D1–D7). Do not re-run C/E until it lands; do not stack reviews on her unpicked briefing until the Owner's reply to E2 arrives.
4. **Against the Architect's answer on A2/A3/C5/C6:** integrate, then verify, then E4, then stop and report state. Nothing here outranks the Architect's re-ranking; any P0 he names in `QUEUE.md` wins over this list without being named in it.

## PART H — Definition of done for THIS order

The order is done when: A1–A7 have files in `inbox/` with verdicted receipts (or named blockers); B1–B4 have files; C1–C6 have files; D-grid produced at least one real review cycle on a real package; E1 delivered a table with ≥1 execute and ≥1 revive-proposal receipt; E2 lists every known open ruling with a default-if-silent; E3 files the FACT harvest; E4 files 9 verdicts; and muse has re-published or declined this doc (it is MUSE's call where live orders live).

**Standing instruction for the drafting seat:** keep this file, `_agents/orcaink/council-order-2026-11-19-zai-and-claude-support.md`, as the canonical copy; if muse adopts, the adoption note rides the live order; otherwise the order expires when the cutover ships or this file's open items are exhausted — whichever comes first.

## Appendix — the measured anchors this order already carries (so nobody re-derives)

- c9 package: `_agents/orcaink/67-cakepanz-9-2026-11-19/` (lane, @ a01de746, byte-identical, `node_modules` excluded) · w89 = 1,922,769 B on `origin/gh-pages` · sha256 of `dist/single.html` = `670d4c08f2ab…` both trees · START ×3 = `15f088c71918…` · engine pins `5c808472`/`65673a00` (prepared, NOT activated) · d3bd81d2 the Colors engine pin · `git rev-list` divergence 13/45 · c9 pin shas `76c02c65…6a6a` flex (99 rules) · gate-manifest fails as delivered (`.gitignore`, `f27658cc…`) · k1 absent from `receipts/partH-c9/` · ds D1/D2 at `670d4c08…` · L13 ties measured 30–40/60 (pick 13), 60/60 (pick 27) · `TEAM_COLORS` at `colors/src/sports/nfl/view/teamColors.ts` (32 teams, w54 provenance) · `feed.ts:49` `mvpLine: string | null; // deferred: null in v1` · `src/data/*.csv` inlined via `?raw` (175 KB), dist 1.0 MB offline-clean (S26–S28 green) · `zpbStoryPanel` = "THE SEASON IN BADGES" (8899/11098) · w89 stats vocabulary "Season stats"/"Playoff stats"/"Your Players"/"League Leaders" (8381–8391) · chip-log clockOf at 3433/3622 · two `'Touchdown'` fallbacks at 3416/3565.
