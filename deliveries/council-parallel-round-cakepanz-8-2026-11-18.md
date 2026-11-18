SPEAKER: inkling (MUSE delegation) | ROLE: council infrastructure | TASK: council parallel round — work and test while Z.ai works on cakepanz-8 | DATE: 2026-11-18

# Council — parallel round, 2026-11-18 (while Z.ai sits cakepanz-8)

Z.ai is on the cakepanz-8 work order (close the cakepanz-7 review, Block B = P-337; Block C = R-13 framework only after). **Nobody is assigned to anything.** Items below are first-come, most-valuable; a review beats new work; three different seats confirm before anything is REVIEWED. English only. **Tags used everywhere: VERIFIED (you ran it) · REPORTED (someone else measured) · INFERRED · UNKNOWN.**

## Ground rules — read twice

1. Read-only against delivered artifacts, or scratch OUTSIDE any repo (`/tmp` or your lane) with fresh `git archive` extracts. Never edit the Architect's tree, never edit the product HTML, never touch the flex table, never move a protected constant.
2. **Owner-gated is never council scope:** gh-pages placement (his click) · prepared re-pin activation at any pin · the 277/9 stale-flex-expectation decision · Part-E labels · dark `--text` · light gold2 · Bodoni Moda · 2PT · the GLM default · the framework verdict. Flag, do not fix.
3. Network commands with 60 s stall limit. Your branch only; never force-push; never `git stash`; add by path only.
4. **A receipt is the raw stdout of the tool at the final state** — anything else is REPORTED and named. Do not ship claims from memory.
5. Filing: `inbox/<UTC yyyymmdd-hhmm>-<seat>-<slug>.md`, first line `SPEAKER: <seat> | TASK: <item id>`, push your branch, verify with `git ls-remote origin refs/heads/council/<seat>`.
6. **When an item smells like a ruling, stop.** Architect rules engineering; Owner rules product/protected constants. Disagreement is filed, never resolved silently.

## What is live on the refs right now (facts to lean on)

- cakepanz-7 delivered → hosted twice: `council/inkling @ 0fcbc2c0` (`_agents/inkling/67-cakepanz-7-2026-11-18/`) and `council/ernie @ ee8f39c9` (`_agents/ernie/deliveries/cakepanz-7-2026-11-18/`). Both 796 files; byte-identical claim un-verified by Inkling — see B5.
- Ernie's review found and **Inkling verified in source**: **A1** (mid-season refresh → blank draft board; `hydrateBoot`'s `if (!r.draft) go('hub')` + the swallowed `goneOdds` throw for done drafts), **A2** (S29 phase-blind locator = law cannot fail; he deleted `void hydrateBoot();` and the battery stayed 46/0), **A3–A8** (stale counts throughout the package; gate prints **311 / 316**, docs said 319/324/326/24-24/284/F0–F8), plus **A9** (doubled RECEIPT LAW sentence in root+shipped START-OF-CHAT-ZAI.md).
- Engine tip `architect/engine-and-seats @ 57fb83c` — the default pools node changed; GLM stays off; CI green at `1aa7fb3` (run `44262444359`).
- note: anything owned by Z.ai lands as one zip to the Owner; Z.ai cannot push; verification artifacts from him exist only after a delivery lands.

---

## GROUP A — verify while Z.ai is working (do now; all read-only against delivered bytes)

**A1 — Reproduce the mid-season blank board independently.** Build the delivered tree(s), serve, open `?dev=1`, use Ernie's repro (`_agents/ernie/deliveries/cakepanz-7-review-2026-11-18/` — gen-envelopes, midseason-boot-probe2, probe-then-season-nav) or your own driver. Confirm/deny the exact repro; then check Ernie's two-line fix against the four required outcomes (mid-season → hub; done draft no week → Complete; DRAFT nav → Complete; mid-draft control intact). **Independent reproduction by ≥2 seats before Block A is verified.**
**A2 — Confirm the S29 tautology without Ernie's scripts.** Read `batteries/shell.battery.mjs` S29 in both trees; show the locator tolerates both paths; then delete `void hydrateBoot();` yourself, rebuild, re-run the battery — do it yourself, do not trust the log. Restore the line afterwards (add by path, verify `git status` clean).
**A3 — Exhaustive stale-count sweep.** grep both delivered trees for the full fossil list: `284`, `319`, `326`, `24/24`, `F0–F8`, `12 new laws`, `344`, `every occurrence`; produce the COMPLETE list with file:line for each hit and mark each vs A8/A9 (my A9 was one of them; propose any additions to Ernie's sweep as an inbox addendum to A8, do not edit his text).
**A4 — Check the cap-fix CI run.** Look for the GitHub Actions run for `3363eb0` ("pin-watch: print '… and N more (use --full)'") — status green/red/not-found; if you can read the log (sign-in gated or not), report the falsifier step; if you cannot, say NOT VISIBLE.
**A5 — pin-watch self-test, one more datapoint.** Any ten seconds: `node tools/pin-watch.mjs --self-test --pin 65673a009b29035e8dc993279be656f12aa40a13`; report pass/fail and node version.

## GROUP B — measure / prepare for decisions (no product, no mutation)

**B1 — THE TOTALS BAR (highest value; grab it if you have cycles).** Fresh extract of `architect/engine-and-seats @ 57fb83c`; `colors/tools/totals-bar.ts` exists in the tree. Against real 2023-25 season totals (use `tools/mathlab/phase1/passstates.py`-adjacent data or fetch nflverse if your sandbox has it; if not, name the missing dataset explicitly — do NOT estimate from memory). Report: per-game points distribution both eras, mean vs the sim's ~46.2, |p95| tails, and whether the pools fix moved anything off real. **Measurement only — no verdict on cutover.** If your answer is "couldn't check", say exactly that and what's missing.
**B2 — THE 277/9 re-point, staged for the Owner/Architect's decision.** Fresh `git archive origin/gh-pages 67-cakepanz`; produce the EXACT list of the 9 failing tests (name, file, line, assertion) on the deployed tree's own suite; draft the minimal re-point snippet (for `lineup.test.ts`-class stale expectations only) as an inbox patch — **do not touch the deployment, do not stage a zip, do not "just fix it".** The staged gh-pages-fix zip deliberately excluded them; that is the Owner's line to move, with the Architect.
**B3 — P-344 reviewers needed (be reviewer 1–3).** `_agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11/` (INDEX.md, analyze_nflverse.py, verification.json, manifest.json, team_game_summary_2016-2025.csv, the nopenalty variant). The Architect may consume P-344 only after 3 council reviews. Check: the script's chain methodology; league means/sds vs an independent second source you trust; whether the nopenalty variant is handled honestly; whether `verification.json` matches the CSVs; whether seasons 2016–2025 are symmetric in coverage. Say what you could not check.
**B4 — Margin gap, one page.** From the `glm-shift.ts` report facts (early trailing 16.1% real vs 13.9% sim; early within 8 50.4/52.8; late 8.0/7.5), plus any real 2023-25 data you can stand behind (B3's dataset works for points-adjacent sanity, not for margins specifically), write one page: how far apart real and sim margins look, in the ≥8 bucket both tails. **UNKNOWN is an acceptable answer.**
**B5 — Hosted-copy identity.** `diff -rq` `council/inkling` @ `0fcbc2c0` vs `council/ernie` @ `ee8f39c9` for the cakepanz-7 delivery; report; flag any drift beyond timestamps.

## GROUP C — after Z.ai lands (C is empty until the zip exists — do not start early)

**C1–C3 — three different seats re-run the cakepanz-8 delivery, in order of independence:** (1) the §1 verification table re-run on the fixed build (all counts must match what the reader will re-run); (2) the A1 outcome check — mid-season resume → hub; done draft → Complete; DRAFT nav → Complete; mid-draft control intact; (3) the A2 mutation — `hydrateBoot` deleted → battery MUST FAIL; restored → green; (4) A3–A9 receipts present and final-state; (5) B-block laws if Block B (P-337) landed — no engine number moved, VM sha equal across the toggle.
Anything you improve of the delivery, say so explicitly in your review (`VERDICT: improved`).

## Stop rules — bypass invalidates the review

- no edits to Architect's tree, product HTML, flex table, engine pools, or any protected constant; no placing or "helping" the gh-pages fix; no activation of anything, no framework verdict, no lambda/GLM rulings; no calling your own work a verification (another seat, different mouth); no overwriting another seat's text; no pushing to anyone's branch but your own.
- **When in doubt, file it and wait. A stop you filed is a result; a phantom green is a failure.**

## Why this round, now

Inkling's two mechanism errors already this week were caught by doing the work, not by voting (the listed-not-excluded manifest; the S29 tautology missed). This week the council's edge is small measurements that keep the Architect unblocked and Z.ai honest. Worth doing now: **B2** (a decision the Owner/Architect can actually take this week) and **B1** (the number the pools fix is owed). Worth doing well: A1/A2 (the two starred fixes). Everything else ranks itself by whatever is on your plate.
