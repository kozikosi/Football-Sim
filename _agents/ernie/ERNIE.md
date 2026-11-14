# ERNIE — lane file (rewritten each session; never append)

## BOOT — read this first, every session (do not re-derive anything)

1. `git fetch -q origin` then the **step-0** checkout from `START-HERE` §1 (the four governance docs).
2. Read this file to the end. It is the handover: what is measured, what is open, what not to redo.
3. Read the two working documents — they are in your worktree, no path needed from anyone:
   `_agents/ernie/deliveries/council-work-request-fwtest-v3-support-2026-11-14.md` (WR-1…WR-10) and
   `_agents/ernie/deliveries/fwtest-ledger-2026-11-14.md` (append-only; append your row only).
4. Then take the next item from the live queue (`node tools/council.mjs next`, tool fetched from
   `origin/council/muse`), or the substance still open in §3 below.

Nothing else is needed to resume.

## Identity
- **Seat:** ERNIE · **Model / how reached:** ERNIE / API (kilo gateway) · **State:** advisor (admitted by the Owner 2026-11-13)
- **What I am good at:** taking a claim apart with a command, and **reporting my own refutations**. Every session has closed with a receipt and at least one withdrawal of my own error.
- **Standing rule I run on:** four lines per claim (cwd · exact command · ref+sha · output). VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim. "No signal" is a result.

## Current state (2026-11-14T16:26Z)
- **Nothing in progress.** Branch tip **`218bbafa`**, all pushed to `origin/council/ernie`.
- **DONE:** WR-1…WR-7, WR-10, WR-G2, WR-4/5/6, Phase 1/5, directives 21/24/26, Phase 8.2, the Z.ai v3 review, the recovery review, the P-355…P-359 queue items, the framework-decision evidence work, the prompt to Claude (v3), the reply-to-Claude, and the two v2 prompts (Z.ai + returning council).
- **Not mine to close:** the framework decision, λ's shape, P-345, MUSE's doc corrections, the P0 October reviews, WR-9 (needs an Owner ruling).

## 1 · Session 6 — two v2 prompts shipped (2026-11-14, tip `218bbafa`)

Four seats wrote prompts for the same two audiences (Z.ai; absent council). The Owner took mine and asked
for a merge. Filed as `_agents/ernie/deliveries/prompt-zai-continuation-v2-2026-11-14.md` and
`prompt-council-returning-v2-2026-11-14.md`.

**What I folded in from the other seats (they had these and I did not):**
- INKLING: the four **closure loose ends** only Z.ai can close — the sveltekit cell's two contradictory
  run results ("5 passed (2.1s)" vs "4 failed, 1 passed (1.1m)"), `OK: 751` vs 753 listed, the Phase-J
  log cited as "log in the zip", and Firefox/WebKit ("record verbatim and stop asking root"). Plus
  **no new P-IDs**, and the **decimal rule** (integers everywhere except Wins and Priority).
- GLYPH: the **P-315 deep verification** (draft as an early-pick and a late-pick team; confirm on-clock,
  roster, CPU picks, mode lock — receipt per round), the **w88 ±10 trap** (the ±10 form reproduces the
  old `slotWins20`), and a **drift check** on what Cakepanz already vendors.
- INKLING: the **wave honours** as a compact restatement, and the line that the week's real result was
  **byte-level agreement across four independent seats** — that is the evidence the instrument works.

**What I deliberately excluded, and why:**
- INKLING's **goneOdds sizing paragraph** (their R2). Claude has already diagnosed the mechanism in code
  (`goneodds.ts:15-29`: 30 sims × 62 CPU picks × `cpuChoose`, 0.65 ms each). Asking Z.ai for a second
  measurement would produce a worse answer than the one on the record.
- GLYPH's full engine-inventory restatement — Z.ai already has it in his own deliveries.

**One factual correction I made to INKLING's council prompt:** it described Pickle's relevant prior work
as *"projection/valuation (P-354/P-346-adjacent)"*. Wrong. His two real pieces are the **P-346 checksum
review** (settled 69/72 vs 72/72 against git blobs, not a checkout) and the **P-347 λ variance budget**
(ANOVA split of P-344; λ = 3.63 pts/SD; Owner band [2.50, 3.63]). Sending him after work he did not do
would have wasted his one sitting.

## 2 · Session 5 — Claude landed plan v3; four of my claims were wrong (2026-11-14)

Claude pushed `0364013` (engine plan v3, docs only). He corrected **four** things I had wrong, each with
a file and a line. All four verified by me against the bytes:

1. **The playoff home-field signal is confounded.** `d8_data_cuts.py` computes a raw margin by
   `season_type` with bootstrap CIs — **no team-strength control**. Playoff home teams are the higher
   seeds. My v3 prompt presented 5.57 vs 1.78 as "outside the noise band". **Withdrawn.**
2. **`goneOdds` mechanism.** `goneodds.ts:15-29` runs `for (s < 30) for (i < picks-until-your-next-turn)`
   with a `cpuChoose` each. r1-u0 = 62 picks → 1,860 calls → 1,214.8 ms / 1,860 = **0.65 ms per call**.
   My "1.2 s" was a symptom with no diagnosis.
3. **Pool arithmetic.** `madden27-ratings.csv` = 1,942 lines − 1 header = **1,941**; free agents = 13 − 1
   = **12**; 1,941 + 12 = **1,953** = `poolCount`. My §4.7's three numbers become two: 1,953 explained,
   **1,921 still unexplained**.
4. **My re-pin assumption was stale.** `5a3bb75` ("de-gate the two red tests (Owner: no weight
   pinning)") made the lineup 2400-pin and the engine stamp **REPORTED**; `npm test` is 320 pass / 0 fail.
   One nuance kept: the *data* stamp is still asserted and **structure still gates**.

**Also verified in that pass:** `core/rng.ts:33-35` and `core/keyedrng.ts:74` use `Math.log`/`Math.cos`;
`draft.ts:59` uses `Math.exp`. Claude's portable-math plan targets a real hazard.

**The Owner's answers to Claude (all six yes, no new gates):** TS port hold lifted · league scale approved
as direction · Title Odds approved **post-cutover** (does not extend the cutover bar) · chunked envelope
approved · version-honesty check approved as provenance (not a pin) · `@types/node` + **Node 24**.
**No gates anywhere**; the two red tests stay de-gated; the QB-first check stays a report.

**One question I asked and the Owner ruled against:** I suggested the QB-first check be a *gate* rather
than a report. He said no gates. I have not re-raised it.

## 3 · What the next session needs

**The substance still open, in the order I would take it:**
1. **The λ-axis Lab run** — Claude owns it, but it has two named prerequisites nobody has built: the
   player-game join and the context-aware estimator. Z.ai has been asked for the join (axis (c)). If a
   third seat can do it, it unblocks the single most-cited gap in the dynamic thread.
2. **The axis-list comparison** — Claude (8), GLM (6), Z.ai (D.1–D.9 / PD.1–PD.7). Nobody has compared
   them. Where do they disagree? Which is not measurable with P-344?
3. **The pool gap: 1,953 → 1,921.** 32 rows, definite answer, no framework, unblocks a report Claude
   must write. **Best first task for a returning seat.**
4. **"Fully functioning Colors v1"** — the cutover bar has never been written as a checklist. Someone
   should draft it.
5. **The docket for Z.ai's return:** §9 of the Z.ai prompt is the priority order (Slice 3 → player-game
   join → SAVE-1 write median → the eight closure items → axis comparison → P-317 revision → w88).

**Do NOT redo (receipts exist):** the four digests (`432a1701` / `753997ba` / `4c3c8f17` / `fef700c7`);
goldens `0ccb6319…f3f5`; the 57-file `cmp`; offline (five arms, `file://`, 0 errors); the 30-vs-40
sample count; the save-log / no-RNG-cursor mechanism; `cd298e99` (dead).

## 4 · Environment notes (so the next session does not rediscover them)

- Worktree `/Users/kosi/Desktop/wt/ernie`, branch `council/ernie`. Never edit the Owner's shared tree;
  never push anything but `council/ernie`; never force-push; never stash.
- Scratch: `git archive <ref> -- <path> | tar -x -C /var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/<name>`.
  Node **v26.13.0**, npm 11.20.0, Playwright **1.65.0** (installed in the scratch dir, not the repo).
- **Use `background_process start` for servers**, not `nohup … &`.
- `council/beam` is a moving branch — always cite the sha you extracted at.
- macOS `shasum -c` mis-parses a 3-field manifest; verify with an explicit Python recompute.
- Push gotcha: the shared repo is shallow — `git push --no-thin origin council/ernie`. Do not
  `--unshallow`; do not force-push.
- `tools/hooks/pre-commit` is not executable here, so git prints "hook was ignored" on every commit.
  Harmless; do not chmod it.
- **The local-only `gh-pages` commit `7c9694e9`** ("Publish w89 as live index") shows on
  `preserve.mjs check`. It is in the shared tree, not mine. Listed as pending; not mine to touch.

## 5 · Open questions I could not close (carry them)

1. **Why 1,953 → 1,921?** 32 rows, unexplained, and Claude's pool ledger must account for them.
2. **The exact `@solidjs/start` line** where the SSR lazy route fails to resolve (from WR-4, session 3).
3. **Cross-browser float agreement** of the current engine — Claude lists it as UNKNOWN; `a3.json` is
   chromium-only by construction.
4. **Whether `753997ba` is worth keeping** in the record at all, or whether the 57-file arm digest
   (`4c3c8f17`) is the only one anyone needs.
5. **Whether arm-lit belongs in the framework set at all** (Owner named 8 stacks; the wave has 9 arms).

## 6 · Role

General advisor. Propose, test, dissent, measure. I never edit the product file, governance docs or the
queue; proposals go to `inbox/`, terminal states are proposed with evidence, never moved. I do not review
my own work. **I have been wrong four times this week and each time the correction came from Claude with
a file and a line — that is the protocol working, and it is why I keep asking him to check me.**