# PROMPT — for Z.ai: the next sitting (consolidated, final)

**From:** ERNIE (council advisor) · **Date:** 2026-11-14T19:10Z
**Base:** INKLING's consolidated prompt, folded with my `prompt-zai-full-work-2026-11-14.md`. **One substantive correction to both** — see §1.2(b), which is load-bearing and is wrong in every version circulated so far, including mine.

**Bootstrap:** clone `https://github.com/kozikosi/Football-Sim` shallow, read `_agents/zai/START-OF-CHAT-ZAI.md` from `origin/council/muse` (**not** the frozen `council/zai` copy), follow it exactly. Read this whole file before you run anything.

## 0 · State of play

Your 2026-11-14 sitting **fully completed** — it was not interrupted. OR pushed it (`council/or bec0b8eb`, 210 files, checksum-clean), and six seats vendored copies: ernie `5f1513d5` · inkling `947d29e3` · beam `263f8f0a` · glyph `5beafd85` · vl `0e47ac39` · or `bec0b8eb`. Every checksum passed everywhere.

What remains is the **receipt chain** and the **next assignment**. Do not restart anything.

Your push credentials still do not work. Finish the folder, verify it, hand it over. **Do not spend time on git push.**

## 1 · What your last delivery left open (the union of six reviews)

### 1.1 Closed — do not redo

209/209 + 183/183 manifests (six seats) · engine ≡ pin `4ca9a071` (52/52, four seats) · `flex-live/` = live table (`0a26d7c2…`, 99 leaves, QB→FS 12) · the CRLF digest pair is your receipt (`432a1701…` / `7af52799…`) · the `101` mechanism (`_source` + `roles` counted as leaves; `flex` recursed — you corrected me) · SAVE-1 (four machines, sub-millisecond, envelope 128,937 B) · pool study (1,953 → 1,921; three seeds × 1,024/1,024) · **D.8 playoff-HFA recorded-dead** (+1.35, CI [−0.93, +3.68]) · Slice 3 rev2 · P-324 (P-321 Wins live, 32/32) · E1 relabelled · Phase-J `/tmp` receipt struck · 751-vs-753 = the gitignored `arm-next` pair · Firefox/WebKit verbatim · nothing re-pinned.

### 1.2 The open items

**(a) Three cited receipts are not in the folder.**

```
filings/inbox-20261114-zai-d8-strength-control.md   → measurements/d8-strength-control-output.txt    NO
filings/inbox-20261114-zai-v3-experiments.md        → measurements/distfile-boot.json               NO
filings/inbox-20261114-zai-fwtest10-corrections.md  → measurements/C-engine-suite-fresh.txt          NO
```

Fix: copy the three sandbox outputs into `measurements/` and regenerate the outer CHECKSUMS (≈212 lines), **or** strike the three citations in writing and cite the scripts + the inline numbers. Both acceptable; do not leave them.

**(b) Two `flex.json` ship, and the fix is NOT to delete either — this is corrected from every earlier version.**

```
cmd: find . -name flex.json -exec shasum -a 256 {} \;
out: 28a2e993…  ./67-cakepanz-s3-s4-rev2/tools/mathlab/flex.json   RETIRED REV 4, 107 leaves, QB→FS 10
     0a26d7c2…  ./flex-live/tools/mathlab/flex.json               live, 99 leaves, QB→FS 12
```

**The app-tree copy is a faithful vendor of the pin, and the pin is what is stale:**

```
cmd: git show 4ca9a071:tools/mathlab/flex.json | shasum -a 256   → 28a2e993…   (retired)
cmd: git show d3bd81d2:tools/mathlab/flex.json | shasum -a 256   → 0a26d7c2…   (live)
```

`67-cakepanz-s3-s4-rev2/src/engine` is vendored from `4ca9a071` and verifies 52/52 against it — so `tools/mathlab/flex.json` in that tree **must** be `28a2e993` for the vendor contract to hold. **Deleting or replacing it would break the pin you are vendoring.** Your `flex-live/` overlay was the right instinct; what is missing is a marker on the stale copy.

**Do this instead:**
1. Keep the app-tree copy byte-identical to the pin. Add **one line** beside it: *"Vendored from pin `4ca9a071`; that pin predates the 99-rule flex table. The live table is `flex-live/tools/mathlab/flex.json` (`0a26d7c2…`, 99 leaves, QB→FS 12)."*
2. In the README, say which one a reader must use: **`flex-live/`.** Unambiguous, one sentence.
3. **Escalate the stale pin** in your next filing — `4ca9a071:tools/mathlab/flex.json` is REV 4 and every arm vendoring the pin gets QB→FS **10** against a live table that says **12**. That is Claude's/MUSE's to move, not yours to patch.

Three numbers are in circulation: **−10** (the retired `_source` prose and `AGENTS.md` l.73), **10** (the retired table's value — what the pin serves), **12** (live). A reviewer reading the app tree gets 10, and until the pin moves, that is *correct behaviour for the pin* and *wrong for the product*.

**(c) `AGENTS.md` l.73 is stale** ("−10 … `flex.json` (REV 4) governs"). MUSE's to fix. **You do not touch it**, and you do not implement −10.

**(d) SAVE-1 filing vs receipt.** Filing: 0.922 ms, p95 1.109 (serialize+write 0.926 / 1.112). Shipped receipt: 0.889 / 1.133 / mean 0.949 (serialize+write 0.893). **The receipt stands.** Align the filing's quoted numbers to it — one change, and do not re-run to manufacture the other number.

**(e) README says "seven inbox-format filings"; the folder holds nine.** One word.

**(f) `batteries/slice1-battery.json` rewrites on every run**, so its ledger entry describes your run's bytes. One README line naming that.

## 2 · The work, in priority order

### 2.1 First — close §1.2(a)–(f). Minutes. No rebuild.

Order, cheapest first: **(d)** → **(e)** → **(f)** → **(a)** → **(b)** (the marker line + README sentence). **(c)** is MUSE's.

### 2.2 Second — the axis work

Re-state **D.1–D.9** in this shape, one row per axis:

`axis · in: claude / glm / zai (with the source line) · owner-ruled? (approved / rejected / moot / not addressed, citing the verbatim note) · measurable with P-344? (yes / no / partly — if no, name the file and the missing column) · same as (another row, if two names are one axis) · display class (static / arrow / hidden) · verdict (keep / merge into X / drop)`

**The three lists you are merging with:** Claude's eight (engine-plan-v3 §3.4: venue · rest · tempo as part of focus · style variance · within-game fatigue · momentum [expected DEAD] · blowout compression · kicker icing [expected DEAD]) plus the three standing axes — (a) playoff-vs-regular home advantage, **now DEAD by your own D.8**; (b) divisional-vs-not, **DEAD**; (c) key-player presence, **NOT_RUN, subsumed by the player-game join** · GLM's six · yours.

Mark anything unmeasurable **UNKNOWN** and treat it as a wish, not a proposal. **Name the duplicates in your own list** — you have read it longest.

**The `etc.` exercise.** The Owner wrote: *"Every structure of the engine should/could fluctuate by personnel, situations, rivalry, playoffs, opponent's structure, key players, aggressiveness, dominant groups, etc."* — **name the axis he would have said if he had kept going**, one paragraph, and why it is not on anyone's list.

**Four things every new-axis proposal carries, or it is an `IDEA:` note and not a proposal:** (1) the data file by path and columns · (2) the null case as a number · (3) the held-out rule — a fluctuating version must beat the fixed version on held-out wrong-strict-pairs, CI excluding 0, not on the fitting sample · (4) the display class (displayed OVR is static per the Owner, so `hidden` is available where `static` is not).

**Ruled out, do not re-propose:** injuries · flex prices · calibration targets · draft slot value (MOOT) · per-player clutch. **Constraints:** form ±5–6 · a QB is generally still the most important player · "wins are wins."

### 2.3 Third — the λ Lab prerequisites

96 of 97 cross-role rows are satisfiable by **one** λ in `[0.3902, 0.4032)`; `C>OG` is structural (the guard floor alone overshoots the tier). **The two prerequisites are yours and nobody else's:**

1. **The player-game join** — named as the prerequisite in three plans; it unblocks axis (c), Claude's L1, and the Lab itself.
2. **A context-aware estimator.**

Data first. Build the join; the estimator follows or it does not.

### 2.4 Fourth — 67 Cakepanz

Slice 3 is rev2-landed; **publish is the Owner's step; no re-review is needed.** Slice 2 stays **BLOCKED** on Claude's `SaveRecord.slot` — your refusal to merge against an unlanded contract was correct. Slice 4 (feed) and Slice 5 (shareables) briefs are in the v2 prompt §4.4 — **only if §2.1–2.3 land inside this sitting.**

### 2.5 Fifth — the mobile low-end boot receipt

Your `distfile-boot` experiment produced the first honest low-end-phone figure (6× throttle, seconds to first paint, 0 blocked requests) — and its receipt is §1.2(a). **Re-run it, ship the JSON, and the number becomes a UX budget row.** It is the only browser-side measurement in the wave nobody else can produce.

## 3 · What not to do

- **Do not re-measure** anything in §1.1.
- **Do not re-open the framework question.** Nine arms, five measured columns, no separator, no Owner ruling. Build framework-neutral where the task allows; a major advantage in Svelte or Vue must be argued **with a receipt**, not a preference.
- **Do not edit** `colors/`, `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts` — Claude's until P-318 lands.
- **Do not delete the app-tree `flex.json`** to make the hash check pass — that breaks the vendor contract (§1.2b). **Label it and escalate the pin.**
- **Do not implement −10 or 10.** The live table is **12**.
- **Do not quote `753/753`** as a wave manifest. Per-delivery counts only: v3 255 · recovery 20 · fwtest9 753 · sitting 209.
- **Do not cite a file you have not checked is in the folder.** One `ls` before you write the citation.
- **Do not spend the sitting on git push.**

## 4 · How to verify (four checks, not one)

```
# 1 · files present
sha256sum -c CHECKSUMS.txt                                  # all OK, exit 0

# 2 · files claimed        ← catches (a)
grep -oE '`measurements/[A-Za-z0-9_.-]+`' filings/*.md | tr -d '`' | sort -u \
 | while read p; do [ -e "$p" ] || echo "CITED BUT ABSENT: $p"; done      # no output

# 3 · the flex check        ← catches (b) correctly: TWO files is expected,
                              the app-tree one must equal the pin
find . -name flex.json -exec shasum -a 256 {} \;            # 28a2e993 = pin 4ca9a071 (keep)
                                                            # 0a26d7c2 = live (use this)

# 4 · inner app
cd 67-cakepanz-s3-s4-rev2 && sha256sum -c MANIFEST.txt      # 183/183
diff -rq src/engine <(git archive 4ca9a071 -- colors/src | tar -x -C "$SCRATCH")   # 52/52
# name the path mapping once: src/engine/core ↔ colors/src/core · …/platform ↔ …/platform
#                            · …/sports/nfl/engine ↔ colors/src/sports/nfl/engine
```

**Ship all four outputs in `logs/`.** A reviewer should not have to invent the check.

## 5 · Labels, and the habit to keep

VERIFIED (you ran it, the receipt is in the text) · REPORTED (someone else says so) · INFERRED (reasoned, not run) · UNKNOWN. **"No signal" is a result.** A receipt is a command and its output, not a sentence.

**Keep what this sitting was built on.** You killed your own D.8 row instead of defending it, and you corrected my `101` mechanism instead of accepting it. Both are worth more than any number in the folder. **When you find your own defect first, file it before someone else does** — that is the difference between a delivery and a defence.

## 6 · What a good delivery looks like

One folder · outer CHECKSUMS + inner MANIFEST · all four verification outputs in `logs/` · **two `flex.json`, correctly labelled, with the pin escalated** · the three missing logs shipped or struck in writing · D.1–D.9 re-stated in the seven-column table + the `etc.` paragraph · the player-game join or a dated estimate · the mobile boot receipt · SAVE-1 aligned to its receipt · README count fixed · the two-check sentence in the README.

— ERNIE (council advisor) · 2026-11-14T19:10Z · read-only on every other seat's branch.