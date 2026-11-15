# PROMPT — for Z.ai: the next sitting — COMPLETE AND FINAL

**From:** ERNIE (council advisor) · **Date:** 2026-11-15T06:05Z
**Supersedes:** every prior Z.ai prompt draft (continuation v2 and v3, the full-work prompt, the pin prompt, the merged draft, INKLING's post-save-wave draft and its amendment, GLYPH's v4, BEAM's push). **If two files in your possession disagree, follow this one; stop, say so, and cite the other file's path.**

**This sitting is scoped to be at least 30 minutes of real work.** The order below is deliberate: §2.1–§2.2 are minutes, §2.3–§2.5c are the substance, §2.6–§2.7 are minutes. **Do them in order. Do not stop after the cheap ones.**

**Standing order, re-stamped:** **do not queue any work. Complete it all before replying. Anything you cannot finish, name the blocker exactly and stop there.** Do not spend the sitting on git push.

---

## 0 · State of play

Three deliveries shipped; three receipt chains closed:

| Sitting | What | State |
|---|---|---|
| `zai-sitting-2026-11-14` | Slice 3 rev2 + corrections | closed, six seats |
| `zai-receipt-chain-closure-2026-11-14` ("save wave") | three receipts, flex pin, join, axis table | closed, five seats |

**Five seats reviewed the save wave** (INKLING `ok` · BEAM `ok` · OR "all three findings resolved on pushed bytes" · GLYPH "materially improved, internally consistent" · ERNIE `improved`). Byte-identity was machine-verified between `council/inkling 5b1d022e` and `council/ernie 90ae7456` — 227/227, rename-invariant.

**The Owner ruled on twelve items on 2026-11-15.** Those rulings are in §1 and they change the work. **Read them before you start.**

**Boot, in this order:** (1) `git fetch -q origin`; (2) the step-0 governance checkout from `origin/council/muse` (four docs); (3) read this file and nothing else; (4) fetch your own previous delivery from `council/inkling:_agents/inkling/deliveries/zai-save-wave-2026-11-14/` (`5b1d022e`, byte-identical to `council/ernie 90ae7456`, 227/227) — **your previous sitting is complete; do not rebuild it.**

**Your push credentials still do not work.** Finish the folder, verify it, hand it over. **Do not spend time on git push.**

---

## 1 · The register — closed, and the Owner's rulings

### 1.1 Closed — do not re-measure, re-derive or re-open

| # | Item | Authority |
|---|---|---|
| 1 | Outer manifest 225/225; inner 183/183 | INKLING · BEAM · GLYPH · OR · ERNIE |
| 2 | Engine ≡ pin (52 files, cmp clean) — **superseded by R-2 below** | four seats |
| 3 | D.8 playoff-HFA → **recorded-dead** (+1.3522, CI [−0.93, +3.682], t=1.17) | your filing; three seats reproduced |
| 4 | The 1,921 pool study | VL closed it; three seats re-verified |
| 5 | SAVE-1 write median 0.889 ms / p95 1.133 / n=201 | OR/GLYPH found the mismatch; you fixed it |
| 6 | CRLF digest pair (`432a1701…` / `7af52799…`) | INKLING + ERNIE reproduced |
| 7 | fwtest7 "539/539" → 537/539 on the committed tree | ERNIE improved; artefacts gitignored |
| 8 | The C5b `101` = `_source` + `roles` counted as leaves | you corrected ERNIE; ERNIE withdrew |
| 9 | Slice 2 refusing the merge against an unlanded `SaveRecord` | **CORRECT REFUSAL** |
| 10 | w88/w89 carry P-321 Wins (32/32, live) | four-seat P-324 |
| 11 | The player-game join, 253,107 rows | INKLING + BEAM + ERNIE; REG/POST 241,911 / 11,196 exact |
| 12 | The axis dedup table (28 rows, three lists, weather = the `etc.`) | your filing |
| 14 | The three cited-but-missing receipts | five seats |
| 15 | README "seven → nine" filing count | GLYPH's finding |
| 16 | The battery-JSON per-run caveat | one line, done |

### 1.2 The Owner's rulings — these are new work, not background

| # | Item | Ruling |
|---|---|---|
| **R-1** | **Framework** | **Two arms only: Vue 3 + Vite vs Svelte 5 + Vite.** You build the same feature in both and report, with a falsifier. **§2.5c.** |
| **R-2** | **The pin** | **`d3bd81d2`** — *"whatever claude built last"*, verified identical to the branch tip. Cakepanz's engine moves 52 → 57 files. **§2.3.** |
| **R-3** | **Save file** | **One blob + a version check** — *"why not just record everything at once?"* `{version, seed, userTeam, pool, picks, awards, user}`. No critical/ancillary split. |
| **R-4** | `@types/node` | **Approved** as Claude specified: dev-only, **second** ratchet, the engine's pinned 91 unchanged. |
| **R-5** | Title Odds | **Rejected** except in a 100-season context. Not in the draft header, not in the recap. |
| **R-6** | λ / dial | **Accepted as designed** — one scale, varying by context, inside the band, each rule beating fixed-λ on held-out seasons. No further ruling. |
| **R-7** | Flex SS/ILB/OLB | **Not an inconsistency** — *"ilb is a better player so can flex for less."* The table stands. |
| **R-8** | Ratings | **Not yet.** The Madden set stands. |
| **R-9** | React | **Remove it now.** The 13 Nov hold is lifted. |
| **R-10** | Publish | **No.** Cakepanz is slices 1–3 of 5; the live site is w85. |
| **R-11** | Two red tests | **Fix them.** 318/320 → 320/320. |
| **R-12** | "Players" copy | **1,953** (the pool total). 1,921 only if labelled with the 32 long snappers named. |

**R-7 changes one of your filings:** the flex asymmetries you escalated are now **ruled deliberate**. Keep the escalation as the record; add one line: *"Owner 2026-11-15: not an inconsistency — the ILB is the more valuable player and so flexes for less. Table stands."*

### 1.3 The product laws — these bind the UI work, not just the copy

- **No complete sentences on the board, the feed, or any card.** English belongs to the Guide. Chips, panels, cards, glyphs. **w88 is the look authority; when in doubt, borrow, not invent.**
- **No yardages anywhere in the feed.** The v1 union's `yards: null` is a reserved-field law — nothing is faked to fill it.
- **The Owner's wording is the product.** The feed's visual direction is settled: the badge format and the colours of the current version, preserved line-for-line.
- **User's team in blue** · every turnover named (a chip, not a sentence) · overtime events only in the overtime block.
- **No flex values from any delivery tree.** The live table is `flex-live/` (`0a26d7c2…`); the app tree's copy is the pin's and is not citable.

---

## 2 · The work, in order

### 2.1 First — the README grep `-h` fix (two minutes)

README §"How to verify" step 2 reprints the citation sweep **without** `-h`, so it emits a false `CITED BUT ABSENT` for every citation:

```
cmd: grep -oE '`measurements/[A-Za-z0-9_.-]+`' filings/*.md | head -2
out: filings/inbox-20261114-zai-d8-strength-control.md:`measurements/d8-strength-control-output.txt`
cmd: grep -hoE '`measurements/[A-Za-z0-9_.-]+`' filings/*.md | head -2
out: `measurements/d8-strength-control-output.txt`
```

Your `logs/verification-2-citations.txt` documents the fix. **Put the `-h` form in the README.** One line. Say if you touch anything else in the README.

### 2.2 Second — the `flex.ts` addendum (three paragraphs, no rebuild)

Your escalation names `tools/mathlab/flex.json`. **The pin serves REV 4 in the engine code too.**

```
cmd: git show 4ca9a071:colors/src/sports/nfl/engine/flex.ts | sed -n '1,10p'
out: // Flex guide REV 4: … REV 4 of 29 Oct: a QB may flex ONLY to FS, at -10 …
       QB: { FS: 10 },
cmd: git show d3bd81d2:colors/src/sports/nfl/engine/flex.ts | sed -n '1,10p'
out: // FLEX table, tiers -2 / -6 / -12, 99 rules … REV 4 (29 Oct) live in git history only.
       QB: { FS: 12 },
```

Add the four consequences: (1) the two references are different engines — **11 files differ, 372 insertions**, including `draft.ts`, `slots.ts`, `value.ts`, `flex.ts`, plus five files only on `d3bd81d2`; (2) a re-pin must move `flex.ts` and its companion rules-test together, or the test fails on the 99-vs-107 split by construction; (3) nothing downstream is insulated — the w88/w89 `ZPB_SLOTS_WINS` tables inherit whichever pin the app vendors; (4) the mitigation is the one you already filed. **Label VERIFIED for the pin bytes, INFERRED for (1)–(3).**

### 2.3 Third — the pin migration table (the substantive work)

**R-2 settles the decision: the pin is `d3bd81d2`.** Verified — `colors/src` at the branch tip `03640133` is byte-identical to it (57 files, empty diff). **Cakepanz's engine moves from 52 to 57 files.**

**What I need from you:**

**(a) A same-seed old-vs-new table for the four protected files** — `draft.ts`, `slots.ts`, `value.ts`, `flex.ts`. One fixed draft (name the seed, the user team, the pool), run on `4ca9a071` and on `d3bd81d2`, showing **what changed in the output**. Rows are the observable differences: pick order at the user's picks, `effOvr` for any flexed player, the value of the same player at the same slot, and the QB→FS flex penalty (10 → 12).

**(b) A one-line statement of what the product gains and loses.** Gains: the 99-rule flex table — your Owner-ruled table. Loses: comparability with every Cakepanz measurement taken before the move. **Name which numbers those are.**

**(c) Do not edit the engine.** The migration is the Architect's. Yours is the table and the impact statement.

**Three numbers, kept straight:** **12** = live and now the pin · **10** = the old pin `4ca9a071` · **−10** = stale prose in `AGENTS.md` l.73 (MUSE's to fix).

### 2.4 Fourth — the estimator (the λ Lab's second half)

**The join is built (253,107 rows / 2,761 games, 24 columns, verified by three seats). The estimator is not.** R-6 accepts the design, so this is now the open work.

Your own arithmetic: the single-λ window is `[0.3902, 0.4032)` — **0.0130 wide** — so 80% power on a context shift needs per-cell SE ≈ **0.0046**, and every filed Lab run's bootstrap CI has been **wider than the whole window** (INFERRED; exact per-cell SEs UNKNOWN).

**Three deliverables, one page total:**

1. **The pooled/partially-pooled estimator** — pooled across cells rather than per-cell, so the effective SE drops. **State the pooling assumption and its cost.**
2. **The per-cell SE table** — for each context cell, the bootstrap CI of λ̂. That turns the INFERRED arithmetic into a receipt and either confirms or kills it.
3. **The fold density at which λ(context) becomes resolvable** — or the plain sentence saying it never is, at this data volume. **That is a result, not a failure.**

**Two join caveats to record while you are here:** `offense_pct` / `defense_pct` / `st_pct` are **100%** filled; the raw play-count columns are not (`n_off_plays` 99.9%, `n_def_plays` 21.9%, `n_plays_on_field` 18.9%). And 2016–22 keys on `nfl_id`, 2023–25 on `gsis_id`, bridged through `players.parquet` — the one place a season could silently drop.

### 2.5 Fifth — Slice 4 is ALREADY BUILT. Re-run it, receipt it, do not rebuild it.

**Correction to every prior draft, including mine:** Slice 4 is not a brief to write and a panel to build. **It shipped on 2026-11-10** and it is in your save wave:

```
deliveries/slice4/README.md          3,813 B — data path, look, dynamics, files, laws, boundaries
batteries/probe-slice4.mjs           the end-to-end probe
batteries/slice1.battery.mjs         18 feed laws inside the 61/0/10/3 battery
shots/slice4-feed.png  shots/probe-feed.png
```

**Do not rebuild it. Do not restyle it. Do not add English to it.** What this sitting does is **re-run it on the tree you ship and produce the receipts:**

1. **Fresh end-to-end probe** (`batteries/probe-slice4.mjs`): 32 turns through the real store reducer, engine advising each take, `.cp-feed` mounts; print the DOM counts (drive lines, ME lines, FINAL card text) and **re-compute the same game node-side through `feedVM`, matching the DOM exactly.** If any of the four numbers disagree between DOM and VM, **file it as a finding and stop — do not edit `src` to make them agree.**
2. **Fresh battery run** (`slice1.battery.mjs`): expect **61 ok / 0 fail / 10 loud SKIP / 3 DEFER** plus the 18 feed laws.
5. **`shots/slice4-feed.png`** — re-take it if it re-renders differently; if it matches the committed shot, say so in one line and name the comparison command (`cmp -s` or `sha256sum`).
4. **Zero-console-error confirmation** from `file://`, one line.
5. **Confirm the README's two-check sentence exists** — this is your reply to §2.1 from the product side.

**Append all confirmations as `logs/verification-5-feed-rerun.txt`, generated on the tree you ship, four lines per claim. The deliverable is the log, not a new look and not a new component.**

### 2.5a The feed's own finding — carry it forward, do not lose it

Your slice4 README already records a real defect: **the snapshot's `app/feed.ts` `clock()` maps overtime starts (3600s+) to `Q4` with a NEGATIVE mm:ss remainder** (`Math.min(4, ceil(secs/900))` + `900*q − secs`). The feed renders period ≥ 5 with an honest `OT` stamp and the quarter marks say `OT` — presentation working around a frozen-snapshot quirk.

**Restate it in this sitting's reply, addressed to the Architect, with the file and line.** It is a `feed.ts` defect in the pinned snapshot, so it lands at the next re-pin — and R-2 has just made a re-pin live.

### 2.5b Slice 5 — one line, not a build

v2 §4.4: *"your `receipts/brag-card.html` is already a working, self-contained, offline-openable card … **That is a strong head start on Slice 5 and you should say so in the slice README.**"* **The deliverable is the sentence.** If you build one anyway: 390 px, no horizontal scroll, self-contained (no CDN, no external fonts), measured with a worst-case screenshot (longest team name, longest player name, a three-score game) and the file size of one card. **"It fits" is not a receipt.**

### 2.5c Sixth — THE TWO-ARM FRAMEWORK BUILD (the Owner's instruction; this is the 30 minutes)

**R-1: the field is two — Vue 3 + Vite vs Svelte 5 + Vite.** The other seven arms are retired from the contest; they stay in the record as measurements, nothing is deleted. **You build the same feature twice, once in each, and report.**

**The feature, identical in both:** the §2.5 feed panel — drive-level events, newest-first, filter by drive, keyboard reachable, user's team in blue, every turnover named. **Same feature, same chrome, two frameworks.**

**Measure both on these criteria — fixed before you build, so the scores cannot be chosen after:**

| Criterion | How |
|---|---|
| Offline | boots from `file://`, **0 blocked requests, 0 console errors** |
| Cold load | to first paint at **6× CPU throttle**, in ms |
| Bundle | KB, gzipped |
| 390 px | no horizontal scroll on the heaviest view (longest names, a three-score game) |
| Type check | each framework's own checker passes |
| **Maintainability proxy** | **lines of app code to render the same view** |

**Then two things, both required:**

1. **Your preference, with reasons.** Which would you rather build in for the next two years, and why.
2. **What measurement would change your mind.** A preference with no falsifier is an opinion.

**The measurement decides, not the seat.** Your preference is *input*, not the verdict — the same rule the council adopted for λ. If the two arms tie on every criterion, say so: **it costs nothing, because the engine is behind the `ValueProvider` seam and the framework is a view choice that can be swapped.**

**Do not** re-run the seven retired arms · do not edit `colors/` · do not pick silently. **Build both, measure both, say which you prefer and what would change your mind.**

### 2.6 Seventh — the publish check, if the Owner publishes

`curl -sI` against the live domain, one `git ls-remote origin gh-pages`, then `sha256sum index.html` against your vendored bytes. **R-10 says no publish, and the live site is w85 — so unless the Owner publishes mid-sitting, this is one line saying so.**

### 2.7 Eighth — the five residues

1. **README says "all seven receipts now present" and lists eight.** `ls measurements/` → 8. One word.
2. **The README's citation sweep needs `-h`** — §2.1.
3. **`logs/verification-1-checksums.txt` cites the previous folder's path.** Cosmetic.
4. **The join receipt's "play-counts attached 100.0%"** is true for snap percentages, not the raw play-count columns (§2.4). One clarifying line.
5. **The `flex.ts` line in the escalation** — §2.2.

---

## 3 · What not to touch

- **The engine is Claude's.** You own shell, UI, measurements and proposals — **not `colors/`, `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts`, or the pin's `flex.ts`.**
- **The pin migration is the Architect's.** Your table informs it; you do not perform it.
- **S1/S2** (the P-318 seam, `core/pmath.ts`, the purity lint) is Claude's and unparked.
- **UX-3** remains engine-bound (64 ms vs 50 ms, probably `selectRoster`). Not yours.
- **The ratification packet's SAVE-1 row** — the Owner signs it.
- **The optional axis-(c) cut** from your own join: **do not run it unless the Owner relays it.** If you want to, write one sentence naming why, do not run it, and stop.

---

## 4 · The MANIFEST rule

One manifest per delivery, generated **after your last byte-changing step**, with `git ls-files` as the file list and `git cat-file blob` for hashes. If the manifest lists a file the tree cannot contain, say one line about how many and why. **Every delivery this wave met this rule and every seat verified it. Do not relax it.**

## 5 · Ruled out — do not re-open, do not "improve"

Injuries (every sport, forever) · per-player clutch ratings · flex-price fluctuation · draft slot value (MOOT) · calibration targets (static) · WR/CB floors · the cross-side −6/−12 lines · your REV-4→99 win-table migration. **Your wins-at-±5 / slope×20 work at w89 is the blessed path; do not visit the ±10 form.** · **Title Odds** (R-5: 100-season context only) · **the seven retired framework arms** (R-1).

---

## 6 · CONTINUATION-DELTAS — include verbatim, last

```
CONTINUATION-DELTAS (for the next prompting of Z.ai)
1. STALE ITEMS CLOSED THIS SITTING: <README grep -h fix; flex.ts addendum; pin migration table;
   estimator + per-cell SE table or the blocker; Slice 4 brief + build status; the two-arm build + scores
   + your preference + your falsifier; publish state>
2. STILL-BLOCKED: <SaveRecord — Claude, until it lands · Slice 5 — unblocked only by Slice 4 ·
   gh-pages publish — Owner (R-10: no) · pin migration — Architect · React removal — Architect (R-9)>
3. NEW INPUTS FOR THE NEXT PROMPT: <pointers to your addendum, slice4/README.md, the estimator note,
   the two-arm report, the built panel if any>
4. NEXT-SEATING OWNER STATE: <anything the Owner relayed mid-sitting, verbatim>
5. WHAT THE OWNER SHOULD TELL YOU FIRST: <one sentence>
```

**The Owner's workflow depends on these five lines. Without them the next prompt is written blind.**

---

## 6b · If the sitting runs out (the contingency ladder, in order)

1. §2.1, §2.2 and §2.7 done; §2.5's re-run log shipped.
2. §2.5c — the two-arm build — **at least one arm built and measured**, with the second named as the blocker if it did not fit.
3. §2.3's migration table, or §2.4's estimator note.
4. **If and only if 1–3 are green and there is room:** the one-page λ estimator note (pooled assumption + cost · per-cell SE table from the shipped Lab outputs, UNKNOWN where it cannot be computed · the fold density at which λ(context) is resolvable, or the sentence saying it never is). **No fitting code.**

**If you stop early, say which rung you stopped on and why.** Do not invent work to fill the sitting.

## 7 · Reply format — table first, four lines per row, five deltas last

**Table:** item · status (`DONE` | `BLOCKED` | `UNKNOWN` | `ESCALATED` | `NOT-RETRYING`) · receipt · one line each.

**Then per item:** four lines — `cwd · command · ref@sha · output`.

**Last:** §6's block. **Do not add commentary beyond it.** If something needs saying, append a labelled note at the very end (`NOTE:`, `QUESTION:`). Pressure is not your job; **completing** is.

---

## 8 · Labels, and the habit to keep

VERIFIED (you ran it, the receipt is in the text) · REPORTED (someone else says so) · INFERRED (reasoned, not run) · UNKNOWN. **"No signal" is a result.** A receipt is a command and its output, not a sentence.

**Three things you have done that the council should keep seeing:** you killed your own D.8 row · you corrected ERNIE's `101` mechanism · you settled a flex question with a grep instead of an argument.

**The one this sitting asks that the last three did not: build the same feature twice, in two frameworks, and say which you would rather live in — with the measurement that would change your mind.** That is a harder thing than a clean manifest, and it is the last thing standing between the council and a "fully functioning Colors v1."

**When you find your own defect first, file it before someone else does.** That is the difference between a delivery and a defence.

— ERNIE (council advisor) · 2026-11-15T06:05Z · read-only on every other seat's branch.
Review wave: INKLING `580e8978` · BEAM `9e55c472` · GLYPH `377edf96` · OR `f4aa6c6f` · ERNIE `0355` + `0430` · DS / PICKLE / GLM: UNKNOWN.