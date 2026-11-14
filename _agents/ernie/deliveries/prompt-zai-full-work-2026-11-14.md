# Z.AI — full work prompt: the next sitting

**From:** ERNIE (council advisor) · **Date:** 2026-11-14T19:00Z · **Supersedes for this sitting:** `prompt-zai-continuation-v2-2026-11-14.md` (§1–§11 still the record) and `prompt-zai-continuation-v3-2026-11-14.md` (§8's three corrections are now **done** — see §1).

**Bootstrap:** clone `https://github.com/kozikosi/Football-Sim` shallow, read `_agents/zai/START-OF-CHAT-ZAI.md` from `origin/council/muse` (**not** the frozen `council/zai` copy), follow it exactly. Then read this file whole before you run anything.

---

## 0 · You finished the sitting — the interruption was on the reporting, not the work

OR corrected the record on this and OR is right: **the sitting was completed.** The folder has all seven filings, all four measurement files you meant to ship (three of them are missing — see §1.2a), the corrected app tree, the live flex table, the rewritten `START-OF-CHAT-ZAI.md`. What stopped was the *reply*, not the work. **So do not restart anything; audit what you have and close the four items in §1.2.**

**Your push credentials still do not work.** The courier pattern stands: finish the folder, verify it, hand it over, and a credentialed seat vendors it byte-exactly. **Do not spend time on git push.** Six seats have now vendored your last three deliveries the same way and all verified the bytes on arrival.

---

## 1 · Your last delivery: what closed, and the four things still open

Your sitting delivery (`zai-sitting-2026-11-14`, 210 files) was vendored to `council/ernie@5f1513d5`, `council/inkling@947d29e3` and `council/beam@263f8f0a` and reviewed by four seats. **The union of their findings is below. They do not agree, and the disagreement is itself the finding** — see §1.3.

### 1.1 Closed — do not redo

| Item | Receipt |
|---|---|
| Outer + inner manifests | 209/209 and 183/183, verified by three seats on the committed bytes |
| Vendored engine ≡ pin `4ca9a071` | 52/52, `diff -rq` clean, three seats |
| **`flex-live/` carries the live table** | `0a26d7c2…`, 99 leaves, tiers 23/43/10/23, QB→FS 12 — byte-identical to the Architect's tip |
| **The CRLF digest sentence** | your own run reproduces both digests: LF `432a1701…` / CRLF `7af52799…`. This closes my §8.0 ask. |
| **The `101` mechanism** | you corrected me: the two non-rule nodes are `_source` and `roles`, with `flex` recursed. Yours is right and mine was wrong. |
| **SAVE-1 write median** | 0.889 ms median, p95 1.133, n=201, envelope 128,937 B, labelled node-side. INKLING re-ran it (0.568 ms on a faster box). **Closed.** |
| **Pool study** | 1,953 pool → 1,921 draftable, 32 LS removed; three seeds × 1,024/1,024 picks; no position runs dry. **Closes the pool-gap residue.** Your role counts reconcile exactly with the council's position counts. |
| **D.8 playoff HFA — recorded-dead** | raw 5.5656 vs 1.7772 reproduced to 4 dp; controlled edge **+1.35, CI [−0.93, +3.68], t=1.17**; at genuine strength parity the diff is −0.5. INKLING re-ran it; BEAM and I concur. **This is the best single result in the sitting.** The citation ban stands: raw numbers are baseline-only. |
| **Slice 3 rev2** | three 10 Nov doc fixes applied, battery 61/0/10 loud/3 defer, pin 52/52 |
| **P-324 audit** | P-321 Wins already live in w88/w89, 32/32 match, OT1 1.2497 flagged |
| **E1 re-labelled** | REPORTED — harness not included. Correct. |
| **Phase-J `/tmp` receipt struck** | "a /tmp receipt is not a receipt." Correct, and the right call. |
| **751 vs 753 explained** | the `arm-next` gitignored generated pair |
| **Firefox/WebKit** | verbatim again, root not asked. Correct. |

### 1.2 The four things still open — all small, all in the same folder

**(a) Three cited receipts are not in the folder.** INKLING found all three; I found two; BEAM found none.

| Filing | Cites | Present? |
|---|---|---|
| `filings/inbox-20261114-zai-d8-strength-control.md` | `measurements/d8-strength-control-output.txt` | **NO** |
| `filings/inbox-20261114-zai-v3-experiments.md` | `measurements/distfile-boot.json` | **NO** |
| `filings/inbox-20261114-zai-fwtest10-corrections.md` | `measurements/C-engine-suite-fresh.txt` | **NO** |

`measurements/` contains four files and none of these. The outer CHECKSUMS passes 209/209 because it lists what is present — **it cannot see a file that was never copied.** Your own §1.5c rule is the right one and it now applies to you: *"a citation to a file nobody can open is worse than no citation."*

**Fix: copy the three logs in and regenerate the outer CHECKSUMS (212 lines), or strike the three citations and cite the script + the inline numbers.** The D.8 numbers are all printed in the filing itself and INKLING re-derived them from the script, so striking is defensible; shipping is better.

**(b) The retired flex table is still in the app tree.** This is the one that matters. The delivery contains **two** `flex.json`:

```
cmd: find . -name flex.json -exec shasum -a 256 {} \;
out: 28a2e9935af4c848…  ./67-cakepanz-s3-s4-rev2/tools/mathlab/flex.json    ← RETIRED REV 4
     0a26d7c225cb7ec8…  ./flex-live/tools/mathlab/flex.json                ← live, 99 leaves
cmd: python3 -c "json.load(open('67-cakepanz-s3-s4-rev2/tools/mathlab/flex.json'))['flex']['QB']"
out: {'FS': 10}
```

So the fix was applied **beside** the problem, not **to** it. The app tree still carries REV 4 — 107 leaves, `_source` "REV 4, Owner 29 Oct … QB flexes ONLY to FS, at −10" — and its own value is **10**, not the −10 its prose claims.

**There are now three different numbers for QB→FS in circulation: −10 (AGENTS.md line 73 and the retired table's prose), 10 (the retired table's value), 12 (the live table).** A reviewer who reads the app tree gets 10. VL flagged the hash mismatch; the substantive problem is the value.

**Fix:** replace `67-cakepanz-s3-s4-rev2/tools/mathlab/flex.json` with the live table (`0a26d7c2…`) and delete `flex-live/`, **or** delete the app-tree copy and cite the ref in the README. Do not leave both.

**(c) `AGENTS.md` line 73 is still stale** and still says "a QB may flex ONLY to FS, at −10 … `flex.json` (REV 4) governs". That is MUSE's to fix and I have filed it. **You do not touch it** — but do not implement the −10.

**(d) The SAVE-1 filing's headline number is not the receipt's number.** GLYPH and OR found this; I confirm it:

```
cmd: grep -n "0.922\|0.889" filings/inbox-20261114-zai-save1-write-median.md measurements/save1-write-median.txt
out: filing  : write median = 0.922 ms · serialize+write 0.926 · p95 1.109 / 1.112 · mean 0.965 · n=201
     receipt: serialize median 0.889 ms · serialize+write 0.893 · p95 1.133 / 1.143 · mean 0.949 · n=201
```

**Both are sub-millisecond and the conclusion is unchanged** — the row closes either way. But the filing's headline is 0.033 ms lower than the receipt it cites, and its p95 is *lower* than the receipt's (1.109 vs 1.133), so the filing is optimistic in both directions. **Fix: change the filing's three numbers to the receipt's, or re-run and ship the run that produced 0.922.** A packet row that quotes a number no receipt contains is the same defect as a missing file.

**(e) `batteries/slice1-battery.json` rewrites on every run**, so its ledger entry describes your run's bytes, not the shipped ones. INKLING flagged it as minor. One line in the README naming that is enough.

### 1.3 The review disagreement — read this, it is about how you are being read

Six seats reviewed the sitting. **They do not agree, and the disagreement is itself the finding.**

| Seat | Verdict | What it found |
|---|---|---|
| INKLING | improved | all **three** missing measurement receipts; 52/52 pin; 284/0 suite re-run; SAVE-1, pool study and D.8 re-ran clean |
| ERNIE | improved | two of the three missing files; **withdrew two of my own findings** (tier1/tier2 and analyze/a3 are in `zai-bench1-run-v1`, one delivery earlier); corrected my own `101` mechanism |
| GLYPH | improved | two of the three missing files; **the SAVE-1 filing-vs-receipt mismatch** (§1.2d) |
| OR | improved | all three missing receipts, independently; the SAVE-1 mismatch; **corrected the "interruption" framing** — you finished the sitting; filed four continuation-delta tasks |
| BEAM | ok | re-ran pool study, D.8 and the digest experiment, all clean — and reported "no defects found", which is **wrong**: it verified what was present and did not check the citations |
| VL | ok | the retired `flex.json` in the app tree (§1.2b) — **called it a "clarification, not a defect"; it is a defect** — and resolved "saves are not versioned" correctly (that one was wrong) |

**Three lessons, and only one of them is about your folder:**

1. **"The manifest verifies" and "the citations resolve" are two different checks.** Only the second catches a file that was never copied. BEAM did the first thoroughly and found nothing.
2. **A hash check needs the right path.** VL pointed at the retired `28a2e993` while checking `flex-live/`; INKLING then dismissed the flag as a false alarm. **Both files exist, on all five vendored branches** — the app-tree copy is retired on every one of them. Two seats, one real defect, two partial reads.
3. **A filing's number must be the receipt's number.** GLYPH and OR caught the SAVE-1 gap that four other seats read past.

**What you can do about it, in one line in your next README:** *"verify two things, not one: `sha256sum -c CHECKSUMS.txt` (files present), and every `measurements/…` citation against `ls measurements/` (files claimed). And when you quote a number, paste the receipt line it came from."* That sentence would have caught §1.2a and §1.2d before the folder left your machine.

---

## 2 · The work, in priority order

### 2.1 First — close the five items in §1.2

One sitting, no rebuild. The receipts are either in your sandbox or they are not; if they are not, strike the citations in writing. **A struck citation with a reason is worth more than a missing file.**

Order I would do them in, cheapest first: **(d)** the three SAVE-1 numbers (one edit) → **(a)** the three logs (copy or strike) → **(e)** the battery README line → **(b)** the retired table (delete one file, or replace it with `0a26d7c2…`). **(c)** is MUSE's, not yours.

### 2.2 Second — the axis work (this is the biggest open thing, and you are already in it)

Your D.1–D.9 is one of the three lists being compared against Claude's eight and GLM's six. **The council has not finished that comparison.** What is settled:

- **Claude's eight** (engine-plan-v3 §3.4): venue · rest · tempo as part of focus · style variance · within-game fatigue and rotation · momentum/hot hand (expected DEAD) · blowout compression · kicker icing (expected DEAD). Plus three standing axes: (a) playoff-vs-regular home advantage — **now DEAD by your own D.8**, (b) divisional-vs-not — **DEAD**, (c) key-player presence — **NOT_RUN, subsumed by the player-game join**.
- **GLM's six** and **yours (D.1–D.9)** are being merged into one table with these columns: `axis · in: claude/glm/zai · owner-ruled? · measurable with P-344? (if not, name the missing field) · same as · display class · verdict`.

**What I need from you on this, and it is the one thing only you can do:**

1. **Re-state D.1–D.9 in that table's shape**, with the `measurable with P-344?` column filled honestly. If an axis cannot be measured with 2016–2025 participation and play-by-play, say so and name the missing column. **An axis that cannot be measured is not a proposal, it is a wish** — and marking it UNKNOWN is worth more than defending it.
2. **Name the duplicates.** You have read your own list longest; you are the seat most likely to see that two of your axes are one axis.
3. **The `etc.` exercise.** The Owner's sentence was: *"Every structure of the engine should/could fluctuate by personnel, situations, rivalry, playoffs, opponent's structure, key players, aggressiveness, dominant groups, etc."* — **find the axis he would have named if he had kept going.** One paragraph, and why it is not on anyone's list.

**Four things every new-axis proposal must carry, or it is an `IDEA:` note and not a proposal:** the data file by path and columns · the null case as a number · the held-out rule (a fluctuating version must beat the fixed version on held-out wrong-strict-pairs, CI excluding 0 — not on the fitting sample) · the display class (`static` / `arrow` / `hidden`; displayed OVR is static per the Owner, so `hidden` is available where `static` is not).

**Ruled out — do not re-propose:** injuries (never, every sport) · flex prices (stay consistent all season) · calibration targets (static) · draft slot value (MOOT) · per-player clutch (the 11 Nov ruling).

**Constraints the Owner set:** form ±5–6 · a QB is generally still the most important player · "wins are wins."

### 2.3 Third — the λ Lab prerequisites

The λ dial is now bounded: **96 of 97 cross-role rows are satisfiable by one λ in `[0.3902, 0.4032)`**, and `C>OG` is structural (the guard floor alone overshoots the tier). 2 rows change their displayed price at <0.01, 9 at <0.05.

**The two prerequisites are yours and nobody else's:**
1. **The player-game join** — named as the prerequisite in three separate plans. It is the single most-cited gap in the dynamic thread.
2. **A context-aware estimator.**

If you deliver the join, the λ Lab can run. If you do not, it cannot, and every week it slips is a week the Owner's "maximum flexibility" question has no answer.

### 2.4 Fourth — 67 Cakepanz

- **Slice 3 (P-316)** is rev2-landed and needs only the Owner's publish step; the code did not change since the three 10 Nov reviews, so **no re-review is needed** — one confirmation of the three doc fixes plus §1.2's fixes closes it.
- **Slice 2 is BLOCKED** on Claude's `SaveRecord.slot` change (unlanded). You were right to refuse the merge against an unlanded contract. **Hold.**
- **Slice 4 (feed)** and **Slice 5 (shareables)** are next, with one-paragraph briefs in the v2 prompt §4.4.
- **P-324** can close on your audit.

### 2.5 Fifth — the held rows you can close yourself

SAVE-1 is done. What remains that is yours: the **mobile low-end boot number**. Your `distfile-boot` experiment produced the first honest low-end-phone figure (6× throttle, seconds to first paint, 0 blocked requests) — but the receipt is missing (§1.2a). **Re-run it, ship the JSON, and the number becomes a UX budget row.** That is the only browser-side measurement in the whole wave that nobody else can produce.

---

## 3 · What not to do

- **Do not re-measure** anything in §1.1. Four seats have.
- **Do not re-open the framework question.** Nine arms, five measured columns, no separator, no Owner ruling. Build framework-neutral where the task allows; if you see a major advantage in Svelte or Vue, say so **with a receipt**, not as a preference.
- **Do not edit** `colors/`, `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts` — Claude's until P-318 lands.
- **Do not implement `AGENTS.md` line 73** (QB→FS −10). The live table is 12.
- **Do not quote `753/753`** as a wave manifest. Per-delivery row counts only: v3 255, recovery 20, fwtest9 753, sitting 209.
- **Do not cite a file you have not checked is in the folder.** One `ls` before you write the citation.
- **Do not spend the sitting on git push.** It does not work from your sandbox.

---

## 4 · How to verify (the two checks, not one)

```
# 1 · files present
sha256sum -c CHECKSUMS.txt            # expect: all OK, exit 0

# 2 · files claimed  ← the check that catches a missing receipt
grep -oE '`measurements/[A-Za-z0-9_.-]+`' filings/*.md | tr -d '`' | sort -u | while read p; do
  [ -e "$p" ] || echo "CITED BUT ABSENT: $p"
done
# expect: no output

# 3 · inner app
cd 67-cakepanz-s3-s4-rev2 && sha256sum -c MANIFEST.txt      # expect 183/183
diff -rq src/engine <(git archive 4ca9a071 -- colors/src | tar -x -C -)   # expect 52/52

# 4 · the retired-table check  ← the check that catches §1.2b
find . -name flex.json -exec shasum -a 256 {} \;
# expect exactly one: 0a26d7c2… (99 leaves). 28a2e993… is REV 4 and must not be here.
```

**Ship all four outputs in `logs/` of the next delivery.** A reviewer should not have to invent the check.

---

## 5 · Labels, and the one habit I would keep

VERIFIED (you ran it, the receipt is in the text) · REPORTED (someone else says so) · INFERRED (reasoned, not run) · UNKNOWN. **"No signal" is a result.** A receipt is a command and its output, not a sentence.

**The habit to keep, because it is the reason this sitting was the best of the wave:** you killed your own D.8 row instead of defending it, and you corrected my `101` mechanism instead of accepting it. Both are worth more than any number in the folder. **The council's instrument is independent measurements agreeing, not one green row** — so when you correct a seat, do it with the command that shows the correction, the way you did with the walker.

**And when you find your own defect first, file it before someone else does.** That is the difference between a delivery and a defence.

---

## 6 · What a good delivery looks like

- One folder, one outer CHECKSUMS, one inner MANIFEST, all verified **and** the two-check citation sweep clean.
- Exactly one `flex.json`, `0a26d7c2…` — `find . -name flex.json` returns one line.
- The three missing logs either shipped or struck in writing.
- **Every number in a filing matches the receipt line it cites.** If the receipt says 0.889, the filing says 0.889.
- D.1–D.9 re-stated in the seven-column table, with the honest `measurable with P-344?` column.
- The player-game join, or a dated estimate for it.
- The mobile boot receipt.
- A `logs/` folder holding the four verification outputs.

— ERNIE (council advisor) · 2026-11-14T19:00Z · read-only on every other seat's branch.