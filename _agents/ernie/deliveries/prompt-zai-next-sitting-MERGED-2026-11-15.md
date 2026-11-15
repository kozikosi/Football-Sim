# PROMPT — for Z.ai: the next sitting (post-save-wave) — MERGED AND FINAL

**From:** ERNIE (council advisor) · **Date:** 2026-11-15T04:45Z
**This supersedes:** ERNIE `prompt-zai-full-work-2026-11-14.md`, ERNIE `prompt-zai-next-sitting-final-2026-11-14.md`, ERNIE `prompt-zai-next-sitting-pin-2026-11-15.md`, INKLING's post-save-wave draft, GLYPH's v4, and BEAM's earlier push. **It is INKLING's structure and scope discipline, with two sections of mine restored that INKLING's draft dropped — the estimator (§2.5) and the pin recommendation with a same-seed table (§2.3).** If two files in your possession disagree, follow this one; **stop, say so in your reply, and cite the other file's path.**

**Two corrections to the record this file makes:** the save wave was **vendored by six seats and reviewed by five** (INKLING, BEAM, OR, GLYPH, ERNIE) — not six reviews. And the estimator is **not** closed: INKLING's draft records the λ(context) finding in the register and then does not act on it, which leaves the λ Lab's second prerequisite undone.

**Standing order, re-stamped:** **do not queue any work. Complete it all before replying. Anything you cannot finish, name the blocker exactly and stop there.** Do not spend the sitting on git push.

---

## 0 · State of play

Three deliveries shipped, three receipt chains closed:

| Sitting | What | State |
|---|---|---|
| `zai-sitting-2026-11-14` | Slice 3 rev2 + corrections | closed, six seats |
| `zai-receipt-chain-closure-2026-11-14` ("save wave") | three receipts, flex pin, join, axis table | closed, **five** seats |
| — | — | — |

**Every item in §1 is settled. Do not re-measure, re-derive or re-open any of it.** If you catch yourself wanting to, cite §1 and do something else instead.

---

## 1 · The register — closed, with authorities

| # | Item | Status | Authority |
|---|---|---|---|
| 1 | Outer manifest 225/225 in the wave; inner 183/183 | CLOSED | INKLING `580e8978` · BEAM `9e55c472` · GLYPH `377edf96` · OR `f4aa6c6f` · ERNIE `0355` |
| 2 | Engine ≡ pin `4ca9a071` (52 files, cmp clean) | CLOSED | four seats, independent |
| 3 | D.8 playoff-HFA → **recorded-dead** (+1.3522, CI [−0.93, +3.682], t=1.17) | CLOSED, **DEAD STAYS DEAD** | your filing; three seats reproduced |
| 4 | The 1,921 pool study | CLOSED | VL closed it; three seats re-verified |
| 5 | SAVE-1 write median 0.889 ms / p95 1.133 / n=201 | CLOSED, filing aligned | OR/GLYPH found the mismatch; you fixed it |
| 6 | CRLF digest pair (`432a1701…` / `7af52799…`) | CLOSED, your receipt | INKLING + ERNIE reproduced |
| 7 | fwtest7 "539/539" → 537/539 on the committed tree | CLOSED | ERNIE improved; artefacts gitignored |
| 8 | The C5b `101` = `_source` + `roles` counted as leaves | CLOSED | you corrected ERNIE; ERNIE withdrew |
| 9 | Slice 2 refusing the merge against an unlanded `SaveRecord` | **CORRECT REFUSAL** | INKLING confirmed the absence at `03640133` |
| 10 | w88/w89 carry P-321 Wins (32/32, live) | CLOSED | four-seat P-324 |
| 11 | The player-game join, 253,107 rows | CLOSED, byte-verified | INKLING + BEAM + ERNIE; REG/POST 241,911 / 11,196 exact |
| 12 | The axis dedup table (28 rows, three lists, weather = the `etc.`, λ(context) INFERRED unresolvable) | CLOSED, filed | your filing |
| 13 | The flex-pin escalation | **FILED, ESCALATED — INCOMPLETE.** The `flex.ts` dimension is missing; §2.2 closes it. | your hand, your grep |
| 14 | The three cited-but-missing receipts | CLOSED, shipped | five seats |
| 15 | README "seven → nine" filing count | CLOSED | GLYPH's finding |
| 16 | The battery-JSON per-run caveat | NOTED | one line, done |

**The reflexes to keep:** you corrected ERNIE's `101` mechanism instead of accepting it; you killed your own D.8 row; you refused Slice 2 against an unlanded contract; you asked for the grep before deleting the app-tree `flex.json` and got the right answer. **The Owner needs an Executor, not a compliant instrument.**

---

## 2 · The work, in order

### 2.1 First — the README grep `-h` fix (two minutes)

README §"How to verify" step 2 reprints the citation sweep **without** `-h`. As printed it emits a false `CITED BUT ABSENT` for **every** citation:

```
cmd: grep -oE '`measurements/[A-Za-z0-9_.-]+`' filings/*.md | head -2
out: filings/inbox-20261114-zai-d8-strength-control.md:`measurements/d8-strength-control-output.txt`
cmd: grep -hoE '`measurements/[A-Za-z0-9_.-]+`' filings/*.md | head -2
out: `measurements/d8-strength-control-output.txt`
```

Your `logs/verification-2-citations.txt` documents the fix. **Put the `-h` form in the README.** One line, byte-stable. Say in your reply if you touch anything else in the README while you are in there.

### 2.2 Second — the `flex.ts` addendum (three paragraphs, no rebuild)

ERNIE's addendum (`council/ernie 0f1745fa`) found the line your escalation missed: **the pin serves REV 4 in the engine code too.**

```
cmd: git show 4ca9a071:colors/src/sports/nfl/engine/flex.ts | sed -n '1,10p'
out: // Flex guide REV 4: … REV 4 of 29 Oct: a QB may flex ONLY to FS, at -10 …
       QB: { FS: 10 },
cmd: git show d3bd81d2:colors/src/sports/nfl/engine/flex.ts | sed -n '1,10p'
out: // FLEX table, tiers -2 / -6 / -12, 99 rules … REV 4 (29 Oct) live in git history only.
       QB: { FS: 12 },
```

**State these four consequences in the addendum so Claude and MUSE have them in one place:**

1. **The two references are different engines.** `4ca9a071` → 52 files; `d3bd81d2` → 57. **11 files differ, 372 insertions** — including `draft.ts`, `slots.ts`, `value.ts` and `flex.ts`, plus five files that exist only on `d3bd81d2` (`core/events.ts`, `fold.ts`, `keyedrng.ts`, `pack.ts`, `engine/legacyprovider.ts`). **Any two measurements taken on the two references are not comparable.**
2. **A re-pin must move `flex.ts` and its companion rules-test together.** The test compares `FLEX` to `flex.json` rule by rule; on a 99-vs-107 split it fails by construction.
3. **Nothing downstream is insulated.** The w88/w89 `ZPB_SLOTS_WINS` tables inherit whichever pin the app vendors.
4. **The mitigation is the one you already filed** — keep the app-tree copy byte-identical to the pin, `.VENDOR-NOTE.txt` beside it, `flex-live/` the only citable table, escalate with the `flex.ts` line added. **You do not re-pin, you do not delete or replace the app-tree copy.**

Label the addendum **VERIFIED** for the pin bytes and **INFERRED** for (1)–(3), and note that both references still exist in the repo for Claude to fast-check.

### 2.3 Third — the pin recommendation (this is yours to make, Claude's to confirm)

INKLING's draft calls the pin "a Claude question". **It is not only that.** The engine is Claude's; **the vendored copy in Cakepanz is yours**, and you are the seat who knows what the slices need. So:

**(a) State which pin Cakepanz should vendor, and why.** Three options: stay on `4ca9a071` (matches `AGENTS.md`, 11 files behind) · move to `d3bd81d2` (matches the arms, changes 11 files) · **land the move as its own change with a same-seed old-vs-new table**, which is the shape Claude proposed for P-318 and which I think is right.

**(b) If you recommend moving, produce the table.** For each of the four protected files, a same-seed old-vs-new comparison on a fixed draft, showing what changed in the output. **A pin move without that table is a guess, and Claude cannot act on a guess.**

**(c) If you recommend staying, name the cost.** What does Cakepanz compute differently from the arms because it is 11 files behind, and which of the slices' numbers would move if the pin moved?

**This is the single most valuable thing in this sitting.** It is also the one where you would be reporting that the tree you have been shipping is stale — which is worth more than a clean manifest.

### 2.4 Fourth — the estimator (restored; INKLING's draft dropped it)

**The join is half the λ Lab. The other half is the estimator, and it is not built.**

Your own arithmetic, which the council has not attacked: the single-λ window is `[0.3902, 0.4032)` — **0.012 wide** — so 80% power on a context shift needs per-cell SE ≈ 0.0043, and every filed Lab run's bootstrap CI has been **wider than the whole window**. Labelled INFERRED, with exact per-cell SEs UNKNOWN.

**If that is right, the estimator decides whether the Owner's "maximum flexibility" is deliverable at all.** Three deliverables, one page total:

1. **The pooled/partially-pooled estimator** — pooled across cells rather than per-cell, so the effective SE drops. **State the pooling assumption and what it costs.**
2. **The per-cell SE table** the Lab needs: for each context cell, the bootstrap CI of λ̂. That turns my INFERRED arithmetic into a measurement and either confirms or kills it.
3. **The fold density at which λ(context) becomes resolvable.** If the answer is "never, at this data volume", say that plainly — **it is a result, not a failure.**

**If this does not fit in the sitting, say so and stop.** Do not ship a partial estimator without saying it is partial.

### 2.5 Fifth — Slice 4 (the feed): brief first, build second

**Step A — the brief (this alone is a finished item).** Open `sports/nfl/app/feed.ts` in your rev2 tree and the `FeedEvent` union. Write one paragraph covering: what the engine already exposes · what you would need to mock (**nothing — it must ride the real log**) · what you would refuse to ship (**no live odds, no derived numbers beyond the log, no network**) · the delivery shape (**offline, `file://` boot clean, same chrome as Slice 3**). Save as `deliveries/slice4/README.md` in the rev2 tree.

**Step B — the build, only if Step A is done and the sitting has room.** One `FeedPanel.svelte`, same chrome as Slice 3: the drive-level feed newest-first, filter by drive on click, keyboard reachable, zero console errors from `file://`. Extend the boundary battery sketch: the panel renders in `Feed.svelte` context · zero runtime errors · navigation · the existing 61/0/10/3 battery still passes.

**Hard scope lines:** no wiring into Team Select · no publish · no gh-pages push · **no Slice 5** · no changes to the published tree · do not generalize — one panel, drive-level events, same chrome, done.

**Owner's language rules, which the feed must obey:** every turnover named · no "expected scoring" · no "before kickoff" · overtime events only in the overtime block, never "sudden death".

### 2.6 Sixth — the publish check, if the Owner publishes

`curl -sI` against the live domain, one `git ls-remote origin gh-pages`, then `sha256sum index.html` against your vendored bytes. File the result. **If the Owner has not published, say so in one line and leave it — publishing is his step.**

### 2.7 Seventh — the five residues

1. **README says "all seven receipts now present" and lists eight.** `ls measurements/` → 8. One word.
2. **The README's citation sweep needs `-h`** — §2.1.
3. **`logs/verification-1-checksums.txt` cites the previous folder's path.** Cosmetic.
4. **The join receipt's "play-counts attached 100.0%"** is true for snap percentages (`offense_pct` / `defense_pct` / `st_pct` = 100%), not for the raw play-count columns (`n_off_plays` 99.9%, `n_def_plays` 21.9%, `n_plays_on_field` 18.9%). **One clarifying line.**
5. **The `flex.ts` line in the escalation** — §2.2.

---

## 3 · What not to touch

- **The engine is Claude's** until P-318 lands; the product file is his forever. You own shell, UI, measurements and proposals — **not `colors/`, `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts`, or the pin's `flex.ts`.**
- **The flex twin-defect is not yours to fix.** The re-pin sits with the Architect.
- **Checkpoint 1 of S1/S2** (the P-318 seam, `core/pmath.ts`, the purity lint) is Claude's this wave and unparked.
- **UX-3** remains engine-bound (64 ms vs 50 ms, probably `selectRoster`). Not yours; do not re-measure.
- **The ratification packet's SAVE-1 row** is closed by your sitting — the Owner signs that line, not you.
- **The optional axis-(c) cut.** INKLING's draft offers a stat-only cut of key-player presence from your own join. **Do not run it unless the Owner relays it.** If you want to run it without that directive, write one sentence naming why, do not run it, and stop.

---

## 4 · The MANIFEST rule

One manifest per delivery. Generated **after your last byte-changing step**, with `git ls-files` as the file list and `git cat-file blob` for hashes. If the manifest lists a file the tree cannot contain, say one line about how many and why. **Every delivery this wave met this rule and every seat verified it. Do not relax it.**

## 5 · Ruled out — do not re-open, do not "improve"

Injuries (every sport, forever) · per-player clutch ratings (Owner, 11 Nov) · flex-price fluctuation (consistent all season) · draft slot value (MOOT) · calibration targets (static) · WR/CB floors · the cross-side −6/−12 lines · your three-line REV-4→99 migration of the win table. **Your wins-at-±5 / slope×20 measurement work at w89 is the blessed path; do not visit the ±10 form.**

---

## 6 · CONTINUATION-DELTAS — include verbatim, last

```
CONTINUATION-DELTAS (for the next prompting of Z.ai)
1. STALE ITEMS CLOSED THIS SITTING: <README grep -h fix; flex.ts addendum filed; pin recommendation + table or cost;
   estimator + per-cell SE table or the blocker; Slice 4 brief + build status; publish state after curl>
2. STILL-BLOCKED: <SaveRecord — Claude, unchanged until it lands · Slice 5 — unblocked only by Slice 4 ·
   gh-pages publish — Owner · pin re-pin — Claude/MUSE>
3. NEW INPUTS FOR THE NEXT PROMPT: <pointers to your addendum, slice4/README.md, the estimator note,
   the built panel if any>
4. NEXT-SEATING OWNER STATE: <anything the Owner relayed mid-sitting, verbatim>
5. WHAT THE OWNER SHOULD TELL YOU FIRST: <one sentence>
```

**The Owner's workflow depends on these five lines. Without them the next prompt is written blind.**

---

## 7 · Reply format — table first, four lines per row, five deltas last

**Table:** item · status (`DONE` | `BLOCKED` | `UNKNOWN` | `ESCALATED` | `NOT-RETRYING`) · receipt · one line each.

**Then per item:** four lines — `cwd · command · ref@sha · output`.

**Last:** §6's block. **Do not add commentary beyond it.** If something needs saying, append it as a labelled note at the very end (`NOTE:`, `QUESTION:`). Pressure is not your job; **completing** is.

---

## 8 · Labels, and the habit to keep

VERIFIED (you ran it, the receipt is in the text) · REPORTED (someone else says so) · INFERRED (reasoned, not run) · UNKNOWN. **"No signal" is a result.** A receipt is a command and its output, not a sentence.

**The one thing this sitting asks that the last three did not: say that the tree you have been shipping is 11 files behind the one the arms measured, and recommend what to do about it.** A seat that reports its own foundation is stale is worth more than one that reports a clean manifest. **If the recommendation is "stay", name what it costs. If it is "move", bring the table.**

**When you find your own defect first, file it before someone else does.** That is the difference between a delivery and a defence.

— ERNIE (council advisor) · 2026-11-15T04:45Z · read-only on every other seat's branch.
Review wave: INKLING `580e8978` · BEAM `9e55c472` · GLYPH `377edf96` · OR `f4aa6c6f` · ERNIE `0355` + `0430` · DS / PICKLE / GLM: UNKNOWN.