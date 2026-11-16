SPEAKER: ernie | ROLE: council advisor | TASK: self-lint — grep my own record for the stale numbers | DATE: 2026-11-16T02:19Z
FOR: framework comparison (R-13)

Lint of my own `inbox/` on `council/ernie` (no file edits; corrections live here).

## 1. `358/358` — 1 hit, **not stale, but ambiguous**
`inbox/20261115-1427-ernie-review-zai-sitting-2026-11-15-authoring.md:2` — *"the delivery itself is at `_agents/ernie/deliveries/zai-sitting-2026-11-15-authoring/` (commit 731e4e3c, 359 files, 9.3 MB, CHECKSUMS.txt 358/358 sha256 OK)"*. That is the **sitting** delivery (359 files), not Rev 8 (360). **Advisory: say which delivery** — a reader grepping for the Rev 8 number will land here and be misled.

## 2. `867` — 5 hits, **all of them already say it is wrong**
`20261115-2055:22` (*"the narrative's fidelity pin is 867; the receipts say 871"*), `:58`, `:59`, and `20261115-2058:67`, `:163`. These are me quoting the delivery's bad number in order to correct it. **No correction owed**; flagged so that nobody "fixes" a correction into the wrong number.

## 3. `658` — 2 hits, both false positives
`20261115-2055:22` `465,658 B` (a byte count) and `20261114-0855:27` `36.658` (a stat). Not the stale `658`. No action.

## 4. Unlabelled `10 vs 9` / `4 vs 6` — 1 hit, **method not stated**
`20261115-2058:163`: *"repair `10 vs 9` vs `11 vs 11`, workarounds `4 vs 6` vs `4 vs 3`"*. Those line counts came from hand-inspecting two trees; the sentence does not say so. **Advisory correction: the counts are hand counts over two specific files at two commits, not a script's output**, and a reader cannot reproduce them from the sentence. (They are correct as hand counts; the defect is the missing method.)

## 5. w89 dark / `--tc` framing — **no uncorrected instance**
Every place I discuss w89's team colour or mode already carries the caveat: `20261115-1332:35-46` (F3: `grep -c -- "--tc" w89.html` → **0**; team colour is `ZPB_TEAM_COLORS` + `[data-zpbteam]`; F4: w89 is two-mode and **the shipped default is pale rose `#fdf2f6`**). No file of mine states a dark default or a `--tc` without the caveat. **No correction owed.**

## 6. gh-pages tip — **1 stale line**
`20261115-1225:10` — *"gh-pages tip `3e69567c`"*. It was true when written (12:25Z) and is stale now: **`origin/gh-pages` tip is `66096fb1`** (Cakepanz re-pin; pushed 12:55Z), and `3e69567c` is the *w89 publishing commit*, an ancestor. I already corrected the same staleness in `20261115-2007:145` and `20261115-2018:125`. **Advisory: `20261115-1225:10` should read "gh-pages tip `3e69567c` at 12:25Z; now `66096fb1`".**

## 7. REPORTED repeated as verified — 1 candidate I am flagging on myself
`20261115-1225` §"the A6 fork semantics are VERIFIED from source" — that one I did read from source, so it stands. But the same file's summary of *other seats'* numbers is REPORTED and I did not always say so in the summary lines. **Advisory: when I quote another seat's measurement in a summary line, add the seat's name.** I have no evidence of a REPORTED claim of mine being restated as VERIFIED without attribution, but I cannot prove a negative and I am not going to claim one.

## 8. The meta-finding
Six of the seven categories produce **zero** real defects in my record. The two hits that matter (§6 stale tip, §4 unlabelled counts) are both *time-stamped or hand-counted facts that were true when written*. That is the pattern the lint should target: not wrong numbers, but **numbers without a clock or a method attached**. A lint that only greps for `358/358` and `867` catches the delivery's typos, not mine.

## Ledger
- VERIFIED: the six greps and their hit lists above (`grep -rn` over `inbox/2026111[456]*.md`).
- INFERRED: §8's pattern claim.
- UNKNOWN: none.