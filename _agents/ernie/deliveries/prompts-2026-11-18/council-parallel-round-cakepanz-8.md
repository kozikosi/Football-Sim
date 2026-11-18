SPEAKER: ERNIE (MUSE delegation) | ROLE: council infrastructure | TASK: council parallel round — work and test while Z.ai sits cakepanz-8 | DATE: 2026-11-18T19:35Z

# Council — parallel round, 2026-11-18 (while Z.ai sits cakepanz-8)

Z.ai is on the **cakepanz-8 work order v2** (`council/ernie f4a59895` → `_agents/ernie/deliveries/prompts-2026-11-18/zai-cakepanz-8-v2.md`). v2 has two blocks: **A = hygiene, no code** (the doubled RECEIPT LAW sentence, the FIX-RECEIPT "two files" line, the D-1 headline, `acceptance-run.sh`'s stale counts, `284 tests` in two files, the README's shell-battery run line, the 319/324-vs-311/316 doc mismatch, the "×2 majors" phrase, a fresh dual-major receipt table, a §1 re-verify, a START-OF-CHAT §2 rewrite, and a D-1) and **B = the P-316 fix** (B1 the mid-season blank board, B2 the S29 tautology). **P-337 and R-13 are NOT in this sitting** — they are a later brief.

**Nobody is assigned to anything.** Items below are first-come, most-valuable-first; **a review beats new work**; three different seats confirm before anything is REVIEWED. English only. **Tags: VERIFIED (you ran it) · REPORTED (someone else measured) · INFERRED · UNKNOWN.**

**The starred items are A1 and A2** — the two P-316 blockers. If you do nothing else, do one of those. **B1 and B2 have the highest decision value** — B1 is the number the pools fix is owed, B2 is a decision the Owner/Architect can take this week.

---

## Ground rules — read twice

1. **Read-only against delivered artifacts**, or scratch OUTSIDE any repo (`/tmp`, or your lane) from fresh `git archive` extracts. Never edit the Architect's tree (`colors/`), never edit the product HTML, never touch the flex table, never move a protected constant.
2. **Owner-gated is never council scope:** gh-pages placement (his click) · prepared re-pin activation at any pin · the 277/9 stale-flex-expectation decision · Part-E labels ("Model Value" vs "Value", 2PT chip, dark `--text` 3.17:1, light gold2 1.65:1, Bodoni Moda) · the GLM default (lambda 0) · the framework verdict. **Flag, do not fix.**
3. Network commands with a 60 s stall limit (`git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …`), at most twice. **Your branch only**; never force-push; never `git stash`; add by path only; `git status` before every commit.
4. **A receipt is the raw stdout of the tool at the final state.** Anything else is REPORTED and named. Never ship a claim from memory, and never paste a FAIL as a pass.
5. **Filing:** `inbox/<UTC yyyymmdd-hhmm>-<seat>-<slug>.md`, first line `SPEAKER: <seat> | TASK: <item id>`, then the evidence. Push your branch; verify with `git ls-remote origin refs/heads/council/<seat>`.
6. **When an item smells like a ruling, stop.** The Architect rules engineering; the Owner rules product and protected constants. Disagreement is filed, never resolved silently. **A stop you filed is a result; a phantom green is a failure.**

---

## What is live on the refs right now (facts to lean on)

| Ref | What |
|---|---|
| `council/ernie f4a59895` | **cakepanz-8 work order v2** for Z.ai — the operative brief. Supersedes v1 (`a40a5133`). |
| `council/inkling 9c2d6c67` | Inkling's cakepanz-8 brief (hygiene scope, ground rules, blocked list). |
| `council/inkling ed72c629` | Inkling's parallel-round draft. **Its §1 describes v1 and is wrong** — see the note at the end. |
| `council/ernie 6e33d9b6` | My review of that draft (the corrections are folded into this prompt). |
| `council/ernie ee8f39c9` | cakepanz-7 hosted: `_agents/ernie/deliveries/cakepanz-7-2026-11-18/` (796 files). |
| `council/inkling 0fcbc2c0` | cakepanz-7 hosted: `_agents/inkling/67-cakepanz-7-2026-11-18/` (796 files). |
| `architect/engine-and-seats 57fb83c` | **Engine tip.** Pools node: down-preserving record hierarchy. |
| `origin/gh-pages 66096fb` | Live site, **wave 89**. The 67-cakepanz fix is **NOT placed** (still names `4ca9a071` / 52 files). |

**The cakepanz-7 baseline, VERIFIED by me on node v26.13.0 (and independently by Inkling):**

| Claim | Result |
|---|---|
| shipped `src/engine` vs `5c808472` | `diff -rq` exit 0, **67 files** each |
| prepared `src/engine` vs `65673a00` | `diff -rq` exit 0, **68 files** each |
| flex table across both pins | `cmp` exit 0 ×3; **99 rules {0:17, 2:17, 6:42, 12:23}**; `SS>NICKEL` at 0; six 0→2 at 2; `FB>TE` at 2 |
| engine suite | **394/394** shipped · **406/406** prepared |
| node battery | **31/31** both trees |
| manifest gate | **PASS 311** shipped · **PASS 316** prepared, at the final state |
| `dist/` | `npm ci && npm run distfile && diff -rq` **exit 0**; `single.html` `15b44104…5b08` on **both** trees |
| shell / slice battery | **46/0** · **29/0/10/3** |
| CI | `1aa7fb3` run `44262444359` **success**; `3363eb0` run `44266214860` **success**; `57fb83c` run `44351214198` **success** |

**Z.ai delivers one zip; the Owner places it; Z.ai cannot push.** Verification artifacts from Z.ai exist only after a delivery lands. **The cakepanz-8 zip does not exist yet — Group C is empty until it does.**

---

## GROUP A — verify now (all read-only against delivered bytes)

### A1 ★ — Reproduce the mid-season blank board independently

**The claim.** A user who drafts normally, starts the season, plays a week and refreshes lands on a **blank draft board** — topbar and nav, no rows, no error. The season *has* resumed (clicking SEASON renders `data-phase="running"`), so the data is intact and only the landing screen is wrong.

**Reproduce it yourself — do not trust my log.** My repro is **single-seat**; Inkling confirmed the mechanism by reading source, which is not a reproduction. This item needs **≥2 independent seats** before Block B of the work order is verified.

```
# 1 · scratch copy of the hosted tree (do not build inside the lane)
rm -rf /tmp/c7 && mkdir -p /tmp/c7
git -C <this repo> archive council/ernie _agents/ernie/deliveries/cakepanz-7-2026-11-18 | tar -x -C /tmp/c7
cd /tmp/c7/_agents/ernie/deliveries/cakepanz-7-2026-11-18/cakepanz-4

# 2 · build + serve
npm ci && npm run distfile
npx vite preview --port 4179 --strictPort &

# 3 · make the two autosave envelopes (a completed 1024-pick draft + a stepped week)
node --import ./scripts/node-port-register.mjs \
  /tmp/c7/_agents/ernie/deliveries/cakepanz-7-review-2026-11-18/gen-envelopes.mjs . /tmp/env.json
#    expect: draft env bytes 187341 | week env bytes 51040 | nextWeek 2 | stepped true

# 4 · boot with both keys present
node /tmp/c7/_agents/ernie/deliveries/cakepanz-7-review-2026-11-18/midseason-boot-probe2.mjs \
  'http://localhost:4179/?dev=1' /tmp/env.json
```

**What confirming looks like:**

```json
{ "screen": "board", "hub": 0, "rows": 0, "err": null,
  "storeStatus": "done", "picks": 1024, "userTeam": 5 }
```

**What denying looks like:** `screen: "hub"`, `hub: 1`, or `rows: 60`.

**Then check the four required outcomes** (write your own driver if you prefer; the point is independence):
1. mid-season (both autosaves) → **hub**, phase `running`, week restored;
2. done draft, no week → **Complete**, never a blank board;
3. **DRAFT** nav with a finished draft → Complete;
4. mid-draft (draft only) → board **with rows** (the control; mine gives `{"screen":"board","rows":60,"status":"drafting","picks":121}`).

**The mechanism, so you can check the fix rather than the symptom:** `src/App.svelte:194` `if (!r.draft) go('hub');` — the hub is reached only when there is *no* draft autosave, and `beginSeason()` (line 199) never calls `clearAutosaveWeek()` (the only call sites are 115 and 167). Mid-season both keys always exist, and `loadDraft()` (193) already did `go('board')`. Then `refresh()` (119-128) swallows `goneOdds`'s throw for a completed draft (`done-draft goneOdds THREW: goneOdds: it is not the user's pick`), so `vmStore` is never set and `{:else if screen === 'board' && $vmStore}` (342) renders nothing.

**File:** pass/fail per outcome, your driver, and your raw output. If you deny it, say so loudly — a denial is as valuable as a confirmation.

### A2 ★ — Confirm the S29 tautology yourself

**The claim.** `S29` in `batteries/shell.battery.mjs` is phase-blind: it passes if **either** the boot autosave resumed the hub **or** the manual `RESTORE A SAVED WEEK` click works. So the shell battery's 46/0 is **not evidence for Slice 3** — the law cannot fail when the hydration is removed.

**Do it yourself, do not trust the log:**

```
grep -n "S29" batteries/shell.battery.mjs          # show the locator tolerates both paths
# delete the boot rehydration:
#   src/App.svelte:95   void hydrateBoot();
npm run distfile
CP_PORT=4180 npx vite preview --port 4180 --strictPort &
CP_PORT=4180 node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs
```

**Confirming looks like:** `PASS S29 … — hub re-mounted from the week save` and `== SHELL BATTERY · 46 pass · 0 fail ==` — i.e. **the battery stays green with the hydration deleted**. That is the tautology.

**Then restore the line** (`git status` must be clean; add by path). Report both runs.

**File:** the two battery tails (mutated and restored) + the S29 source lines you read.

### A3 — Exhaustive stale-count sweep (completes A8)

Sweep **both** delivered trees for the full fossil list and produce the **complete** list with `file:line`. **Use this recipe** — a naive grep returns sha256 hash lines, not stale counts:

```
grep -rn --exclude=MANIFEST.txt --exclude=CHECKSUMS.txt \
     --exclude-dir=engine --exclude-dir=engine-node --exclude-dir=shots --exclude-dir=dist \
     -E '\b(284|319|324|326|24/24|F0[–-]F8|12 new laws)\b' <tree>
```

Classify every hit into exactly three buckets:
- **stale** — a count that is wrong now (e.g. `README.md:29` "284 tests" vs 394; `SHELL-STATUS.md:21-22` and `VERIFY.txt:69-71,328,375` "319/324" vs the gate's **311/316**; `scripts/acceptance-run.sh:20,46` "24/24" and "F0–F8");
- **history** — a per-slice record that is *correctly* superseded and must be left alone (`CHECKSUMS-slice1/2.txt` and `deliveries/gh-pages-fix/README.md` copies of `284`; the cakepanz-6 `326` references);
- **hash noise** — sha256 substrings in MANIFEST/CHECKSUMS.

**Do not edit my review text.** Propose additions as an inbox addendum to A8; if you find a stale token I missed, that is a real contribution — file it.

### A4 — CI runs (I already checked; confirm or extend)

`gh run list` on this machine:

| run | sha | title | conclusion |
|---|---|---|---|
| `44266214860` | `3363eb0` | pin-watch: print '… and N more (use --full)' | **success** |
| `44351214198` | `57fb83c` | Pools node: down-preserving record hierarchy | **success** |
| `44262444359` | `1aa7fb3` | Promote tools/pin-watch.mjs … and gate its --self-test | **success** |

**Remaining work here is small:** confirm with `gh run view 44266214860` (or your own `gh` call) and, if you can read the log, report the falsifier step's output. If you cannot read it, say **NOT VISIBLE** — do not infer.

### A5 — pin-watch self-test, one more datapoint (optional, ten seconds)

```
node tools/pin-watch.mjs --self-test --pin 65673a009b29035e8dc993279be656f12aa40a13
```

Run it **from inside a worktree of this repo** — the self-test reads the pin from the repo object store, so `/tmp` gives exit 1 ("pin does not resolve in this repository"), which is a correct precondition failure but looks like a red. Report pass/fail + `node --version`. I got 8/8 on node v26.13.0.

### A6 — the prepared tree's doc mismatch (new, unconfirmed)

I confirmed A7/A8 on the **shipped** tree only: `SHELL-STATUS.md` and `VERIFY.txt` say the gate is **319/324** while the delivered gate prints **311/316**. The prepared tree carries the same doc text and its gate prints **316**. **Nobody has confirmed the prepared tree's doc lines are stale too.** Check `cakepanz-4-prepared/SHELL-STATUS.md` and `VERIFY.txt` for `319`/`324`/`327` and report whether they name a count the prepared gate does not print.

### A7 — hosted-copy identity (B5 in Inkling's draft)

`diff -rq` the two hosted cakepanz-7 copies:

```
git diff --no-index --stat <(git archive council/inkling _agents/inkling/67-cakepanz-7-2026-11-18) \
                         <(git archive council/ernie  _agents/ernie/deliveries/cakepanz-7-2026-11-18)
```

**Expect one known difference:** I excluded the gitignored build artifact `src/engine-node/` (~67 files) when I committed; if Inkling's copy includes it, that is the *only* expected drift. Report anything beyond it.

---

## GROUP B — measure and prepare for decisions (no product, no mutation)

### B1 ★ — THE TOTALS BAR (highest decision value)

**The number the pools fix is owed.** The fix moved points −0.28/game; nobody has yet said whether the sim is now closer to real or further.

**Two corrections to the obvious approach:**
1. **`colors/tools/totals-bar.ts` does not need nflverse.** It reads its `real` columns from `tools/mathlab/results/phase1-reference-2026-11-15.json`, which is in the tree. Do not burn the item on a fetch.
2. **The tool defaults to the IN-SAMPLE pack** (`nfl-pools-fit2016-2022.json`). Running it bare gives a match-by-construction and will read as "the bar is fine". **Run both packs and name which is which.**

```
rm -rf /tmp/tb && mkdir -p /tmp/tb && git worktree add --detach /tmp/tb 57fb83c
cd /tmp/tb && git checkout HEAD -- colors data tools
cd colors && npm ci

# out-of-sample (the one that matters)
node --experimental-strip-types tools/totals-bar.ts 12000 ../data/packs/nfl-pools-fit2023-2025.json
# in-sample (the control)
node --experimental-strip-types tools/totals-bar.ts 12000 ../data/packs/nfl-pools-fit2016-2022.json
```

**My first read, VERIFIED at 300 games (out-of-sample pack, node v26, scratch worktree at `57fb83c`):**

| metric | sim | real23 | v% | real24 | v% | real25 | v% |
|---|---|---|---|---|---|---|---|
| points | 23.96 | 21.77 | **+10.1** | 22.91 | +4.6 | 23.01 | +4.1 |
| drives | 11.14 | 11.07 | +0.7 | 10.70 | +4.1 | 10.47 | +6.4 |
| plays | 75.07 | 75.20 | −0.2 | 74.08 | +1.3 | 72.66 | +3.3 |
| sacks | 2.40 | 2.58 | −6.9 | 2.40 | −0.1 | 2.35 | +1.9 |
| giveaways | 1.14 | 1.31 | −13.0 | 1.17 | −2.3 | 1.11 | +2.7 |
| yards | 327.15 | 326.65 | +0.2 | 332.33 | −1.6 | 322.08 | +1.6 |

**Read:** the sim is ~1 point per team per game hot vs real 2023-25; everything else is inside ±7% and mostly ±3%. **The pools fix moved points the right way but did not close the gap — the residual is points, not volume.** Caveat: 300 games, `sim_sd` 9.07 → ±0.52, so ~4σ but not the tool's default 12,000.

**Report:** both packs, the full table, the points distribution (not just the mean — the tool prints `sim_sd` vs `real_sd`), and one line on whether the fix moved anything off real. **Measurement only — no cutover verdict.** If you cannot run it, say exactly what is missing.

### B2 ★ — Stage the 277/9 re-point (a decision the Owner can take this week)

Fresh `git archive origin/gh-pages 67-cakepanz`; run its own suite; produce the **exact list of the 9 failing tests** (name, file, line, assertion, expected vs actual). Then draft the **minimal re-point snippet** for the `lineup.test.ts`-class stale flex expectations as an inbox patch.

**Hard limits:** do not touch the deployment, do not stage a zip, do not "just fix it". **Say in the filing that the snippet is a stopgap and that P-355 (the Architect's re-pin of the carried expectations) is the real fix** — otherwise the Owner/Architect may read the snippet as the resolution.

### B3 — P-344 reviewers 1–3

`_agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11/` on `council/muse`:
`INDEX.md` · `analyze_nflverse.py` · `fetch_nflverse.sh` · `verification.json` · `manifest.json` · `league_means_sds.csv` · `team_game_summary_2016-2025.csv` · `team_game_summary_nopenalty_2016-2025.csv`.

The Architect may consume P-344 only after **3 council reviews**. Check: the script's chain methodology; league means/sds against an independent second source you trust; whether the nopenalty variant is handled honestly; whether `verification.json` matches the CSVs; whether 2016–2025 are symmetric in coverage. **Say what you could not check.** A review here unblocks the Architect directly.

### B4 — Margin gap, one page — and a warning about the obvious tool

**Warning first:** `colors/tools/margins.ts` exists and looks purpose-built, but it drives `simulateSeason` from `sports/nfl/engine/season.ts` → `drives.ts` — **the old engine path**, not `sim/game.ts` (the pools node the fix touched). A seat who runs it for this item measures a different simulator and will not know. **Do not use `margins.ts` as the instrument for this item.**

Two honest options — pick one and say which:
- **(a) Desk napkin.** From the `glm-shift.ts` report facts (early trailing 16.1% real vs 13.9% sim; early within 8 50.4/52.8; late 8.0/7.5), plus real 2023-25 data you can stand behind, one page: how far apart real and sim margins look in the ≥8 bucket, both tails. **UNKNOWN is an acceptable answer.**
- **(b) A real harness (better if anyone has cycles).** Measure margins through `runGame` (the `totals-bar.ts` shape) with a margin histogram. That is a small, reusable tool, and it would be the first instrument that measures the pools node's margins. If you build it, put it in your lane and file the path.

### B5 — The cakepanz-8 zip, when it lands

Nothing to do until Z.ai delivers. When it does, Group C applies.

---

## GROUP C — after Z.ai lands (empty until the zip exists — do not start early)

**C1–C3 — three different seats re-run the cakepanz-8 delivery, in order of independence:**

1. **The §1 table** re-run on the fixed build — every count must match what a reader will re-run (engine suite, node battery, gates, `dist/` reproducibility, shell, slice).
2. **The A1 outcomes** — mid-season → hub; done draft no week → Complete; DRAFT nav → Complete; mid-draft control intact.
3. **The A2 mutation** — `hydrateBoot` deleted → the battery **MUST FAIL**; restored → green. Paste both.
4. **The Block A receipts** — each of the work order's A1–A12 items present, final-state, no FAIL printed as a pass.
5. **Block B's laws, if the P-316 fix landed** — N28 (RESUME) and N29 (DONE-DRAFT) present and falsifiable; the split S29/S31; **no engine number moved**.

Anything you improve of the delivery, say so explicitly (`VERDICT: improved`).

---

## Stop rules — a bypass invalidates the review

- no edits to the Architect's tree, the product HTML, the flex table, the engine pools, or any protected constant;
- no placing or "helping" the gh-pages fix; no activation of anything; no framework verdict; no lambda/GLM ruling;
- no calling your own work a verification — another seat, a different mouth;
- no overwriting another seat's text;
- no pushing to anyone's branch but your own.

**When in doubt, file it and wait. A stop you filed is a result; a phantom green is a failure.**

---

## Why this round, now

The council's edge this week is small measurements that keep the Architect unblocked and Z.ai honest — not votes. Two mechanism errors were caught this week by doing the work, not by deciding: the manifest listing its own receipts, and the S29 tautology. **Worth doing now:** B2 (a decision the Owner can take this week) and B1 (the number the pools fix is owed). **Worth doing well:** A1/A2, the two starred fixes — they are what stands between cakepanz-7 and a verified P-316.

**One note on the source material:** Inkling's parallel-round draft (`ed72c629`) is the base for this prompt, and its §1 describes the **superseded v1** work order. If you read it, read v2 (`f4a59895`) instead — the differences are that P-337 and R-13 are out of this sitting and Block B is the P-316 fix, not P-337.