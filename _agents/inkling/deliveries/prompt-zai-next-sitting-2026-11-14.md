# PROMPT — for Z.ai: the next sitting (consolidated)
**From:** INKLING (council seat) · **Date:** 2026-11-14 · **For:** Z.ai (Executor) — relayed by the Owner
**Base:** ERNIE's `prompt-zai-full-work-2026-11-14.md` (`council/ernie` `d50e752b`), **as corrected at `fbd76b1f`** (SAVE-1 alignment added, `flex.json` value 10 named, the "interruption" frame withdrawn, the receipt-vs-filing rule added to §6). Folded with the findings of the other five reviewers. Where my draft differed, ERNIE's wins on the work order; this file adds what he could not see (the six-copy push, OR's interruption correction now folded into both). ERNIE's §1.2b is the load-bearing correction; my earlier summary's "VL's README flag is a false alarm" was wrong — VL pointed at the app-tree file, I verified only `flex-live/`. Two partial reads, one defect. Track who found what — it matters.

**Bootstrap:** clone `https://github.com/kozikosi/Football-Sim` shallow, read `_agents/zai/START-OF-CHAT-ZAI.md` from `origin/council/muse` (**not** the frozen `council/zai` copy), follow it exactly. Read this whole file before you run anything.

---

## 0 · State of play, corrected

Your 2026-11-14 sitting **fully completed** — it was not interrupted (OR pushed it: `council/or` `bec0b8eb`, 210 files, checksum-clean). Six seats vendored copies (ernie `5f1513d5` · inkling `947d29e3` · beam `263f8f0a` · glyph `5beafd85` · vl `0e47ac39` · or `bec0b8eb`); every checksum passed everywhere. **The sitting is complete; what remains is the receipt chain and the next assignment — below.** Any memory that you stopped mid-stream belongs to the earlier attempt at this relay, not to the folder you already shipped.

Your push credentials still do not work. The courier pattern stands: finish the folder, verify it, hand it over — do not spend time on git push. No reviewer expects the folder from you twice.

## 1 · What this sitting left open (the union of six reviews)

### 1.1 Closed — do not redo
`209/209` outer + `183/183` inner manifests (six seats) · engine ≡ pin `4ca9a071` (52/52, four seats) · `flex-live/` = live table (`0a26d7c2…`, 99 leaves, QB→FS 12) · CRLF digest pair is your receipt (`432a1701…`/`7af52799…`) · the `101` mechanism (you corrected ERNIE; yours: `_source` + `roles` counted as leaves, `flex` recursed) · SAVE-1 — measured by four machines, all sub-millisecond, envelope 128,937 B (receipt filing mismatch aside; §1.2e) · pool study (1,953→1,921, three seeds × 1,024/1,024, no position runs dry) · **D.8 playoff-HFA recorded-dead** (+1.35, CI [−0.93, +3.68], reproduced by inkling; concur inkling/beam/ernie) · Slice 3 rev2 (three doc fixes, battery 61/0/10/3, pin 52/52) · P-324 (P-321 Wins in w88/w89, 32/32) · E1 relabelled · Phase-J `/tmp` receipt struck · 751-vs-753 = `arm-next` gitignored pair · Firefox/WebKit recorded verbatim · nothing re-pinned.

### 1.2 The open items — all in the same folder, all small

**(a) Three cited receipts are not in the folder.** (INKLING found all three; ERNIE two; BEAM none; OR three; GLYPH two.)

| Filing | Cites | Present? |
|---|---|---|
| `filings/inbox-20261114-zai-d8-strength-control.md` | `measurements/d8-strength-control-output.txt` | **NO** |
| `filings/inbox-20261114-zai-v3-experiments.md` | `measurements/distfile-boot.json` | **NO** |
| `filings/inbox-20261114-zai-fwtest10-corrections.md` | `measurements/C-engine-suite-fresh.txt` | **NO** |

Fix: copy the three sandbox outputs into `measurements/` and regenerate the outer CHECKSUMS (≈212 lines), **or** strike the three citations in writing and cite the scripts + inline numbers. Both are acceptable; the D.8 conclusion is already supported by the re-runs.

**(b) TWO `flex.json` ship in the folder, and one is the retired REV 4.** (ERNIE named it, with its value; VL flagged the second file without reading it; I verified only `flex-live/`; BEAM and the other four saw one or the other or neither.)

```
cmd: find . -name flex.json -exec shasum -a 256 {} \;
out: 28a2e993…  ./67-cakepanz-s3-s4-rev2/tools/mathlab/flex.json   ← RETIRED REV 4, 107 leaves
     0a26d7c2…  ./flex-live/tools/mathlab/flex.json               ← live, 99 leaves, QB→FS 12
cmd: python3 -c "json.load(open('…/67-cakepanz-s3-s4-rev2/tools/mathlab/flex.json'))['flex']['QB']"
out: {'FS': 10}
```

Three different numbers circulate for QB→FS: **−10** (the `_source` prose + AGENTS.md l.73), **10** (the retired table's own value), **12** (live). A reviewer reading the app tree gets 10 — and the README's `flex-live/` hash is correct about the live file and **silent about the app-tree copy**, which is why every checksum passed.
**One question needs your answer before the fix lands** (it decides (b)'s shape — nothing any seat checked answers it): **is the app-tree copy a build input** (the slice trains on the pin's REV-4 table by construction — then it is documented `pin 4ca9a071 vendor; live table is 0a26d7c2… elsewhere` and left alone) **or a stale vendored file** (the app never reads it — then it is replaced with the live table, or deleted and cited from the README)? Say which, with the `grep` that proves it, and do the matching fix. Either way: one `flex.json`, or two with the one-line note naming which file is which.

**(c) `AGENTS.md` line 73 is still stale.** MUSE owns governance; you do not touch it. Do not implement −10 (or 10).

**(d) `batteries/slice1-battery.json` rewrites each run** — its ledger entry describes your run's bytes, not the shipped ones. One README line says so; done.

**(e) SAVE-1 filing vs receipt mismatch.** Your filing prose quotes 0.922 ms / p95 1.109 (+0.926 / 1.112); your shipped receipt says **0.889 / 1.133 / 0.949** (+0.893). Two runs happened; the filing records the later, the receipt the earlier. **Receipt wins.** Re-run once, then align either the filing's quoted numbers to the receipt, or the receipt to the filing — one change, never both stale (OR found it; GLYPH noted the variance; nobody disputes it).

**(f) README "seven inbox-format filings" — the folder holds nine** (GLYPH). One word.

**(g) One line in the ledger header about the battery JSON** (INKLING's §2) — fold into (d).

**Repair cost, honestly:** one sitting of minutes; nothing rebuilds; the numbers in the D.8 result do not move.

### 1.3 The review disagreement — read it, it is about how you are being read

| Seat | Verdict | Found |
|---|---|---|
| BEAM | ok | nothing |
| INKLING | improved | the three missing files |
| VL | ok | the retired `flex.json` in the app tree (flag raised, value unread) |
| ERNIE | improved | 2 of 3 missing files; the app-tree flex.json with its value; retired-table three-number spread; withdrew his own findings twice |
| GLYPH | improved | safety scan; 2 of 3 missing files; SAVE-1 filing-vs-receipt mismatch; README count |
| OR | improved | pushed a fifth/sixth copy; **all three missing files**; the SAVE-1 mismatch; corrected the "interruption" frame |

**No seat failed; the checks were different.** Only the second check (`every measurement citation resolves`) catches (a); only the `find . -name flex.json` catches (b). Your next README gets **two** verification lines, not one.

## 2 · The work, in priority order

**2.1 First — close 1.2 (a)–(g).** One sitting. No rebuild. If any receipt is genuinely gone, strike it in writing with the reason.

**2.2 Second — the axis work (the biggest open thing, and you are in it).** The council's three lists (Claude's 8 · GLM's 6 · your D.1–D.9) are still unmerged. Your job:
1. **Re-state D.1–D.9** in the seven-column shape (`axis · in: claude/glm/zai · owner-ruled? · measurable with P-344? (name the missing field if not) · same as · display class · verdict`). An axis that cannot be measured is not a proposal, it is a wish; mark it UNKNOWN and say that.
2. **Name the duplicates** — you read your list longest; you are the seat most likely to see that two of your axes are one.
3. **The `etc.` exercise.** The Owner said "…dominant groups, etc." — one paragraph: the axis he would have named if he had kept going, and why nobody proposed it.
4. Every new-axis proposal carries **four things** or it is an `IDEA:` note and not a proposal: the data file + columns · the null case as a number · the held-out rule (must beat fixed on held-out wrong-strict-pairs, CI excluding 0) · the display class (`static`/`arrow`/`hidden`; displayed OVR is static).
5. Ruled out, do not re-propose: injuries (never) · flex prices (consistent all season) · calibration targets (static) · draft slot value (MOOT) · per-player clutch. Form ±5–6. QB generally still the most important. "Wins are wins."

**2.3 Third — the λ Lab prerequisites.** 96/97 cross-role rows satisfiable by one λ in `[0.3902, 0.4032)`; `C>OG` is structural. The two prerequisites are yours and nobody else's: **the player-game join** (named three plans over; it unblocks axis (c) and Claude's L1 and the Lab's run itself) and **a context-aware estimator**. Build the join; the estimator follows from it or it doesn't — deliver data first, fit later.

**2.4 Fourth — 67 Cakepanz.** Slice 3 is rev2-landed; publish is the Owner's; no re-review needed. Slice 2 stays BLOCKED on Claude's `SaveRecord` slot — do not touch it. Slice 4 (feed) and Slice 5 (shareables) are next with one-paragraph briefs in v2 §4.4 — do Slice 3's confirmation, Slice 4's brief **only if 2.1–2.3 land inside the sitting**.

**2.5 Fifth — the mobile low-end boot receipt.** Your `distfile-boot` experiment produced the first honest low-end-phone figure (6× throttle; seconds to first paint; 0 blocked) — and its receipt is missing (1.2a). **Re-run it, ship the JSON, and the number becomes a UX budget row.**

## 3 · What not to do
- Do not re-measure anything in §1.1.
- Do not re-open the framework question. Build framework-neutral where possible; if you see a major advantage in Svelte or Vue, say so **with a receipt**, never with a preference.
- Do not edit `colors/`, `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts` — Claude's until P-318 lands.
- Do not implement `AGENTS.md` l.73 (−10) or its retired-table cousin (10). Live table: 12.
- Do not quote `753/753` as a wave manifest (255 + 20 + 753-fwtest9 + 209-sitting; per-delivery counts only).
- Do not cite a file you have not `ls`-checked in the folder.
- Do not spend time on git push.
- Do not name new axes without the four parts; do not build anything rated on faith.

## 4 · How to verify (three checks, not one)
```
# 1 · files present
sha256sum -c CHECKSUMS.txt                        # expect: all OK, exit 0
# 2 · files claimed   ← catches (a)
grep -oE '`measurements/[A-Za-z0-9_.-]+`' filings/*.md | tr -d '`' | sort -u | while read p; do
  [ -e "$p" ] || echo "CITED BUT ABSENT: $p"
done                                              # expect: no output
# 3 · the retired-table check   ← catches (b)
find . -name flex.json -exec shasum -a 256 {} \;  # the RETIRED copy (28a2e993…) must not ship unlabelled — see §1.2b; citable number is 0a26d7c2…
# 4 · inner app
cd 67-cakepanz-s3-s4-rev2 && sha256sum -c MANIFEST.txt    # expect 183/183
diff -rq src/engine <(git archive 4ca9a071 -- colors/src | tar -x -C "$SCRATCH")   # expect 52/52; one line naming the path mapping (src/engine/core ↔ colors/src/core, …platform ↔ …platform, …sports/nfl/engine ↔ …engine) closes OR's unlink for reviewers
```
Ship all four outputs in `logs/` of the next delivery.

## 5 · Labels, and the one habit to keep
VERIFIED (you ran it; receipt in text) · REPORTED · INFERRED · UNKNOWN. "No signal" is a result.
**Keep: you killed your D.8 row instead of defending it, and you corrected my `101` mechanism instead of accepting it.** A receipt is a command and its output; that is the whole skill this wave ran on.

## 6 · A good delivery looks like
- One folder; outer CHECKSUMS + inner MANIFEST; all four verification outputs in `logs/`.
- Exactly one `flex.json` — or two, with the one-line note naming which file is which and `flex-live/`'s `0a26d7c2…` the only citable one.
- The three missing logs shipped — or struck in writing with one line each.
- D.1–D.9 re-stated in the seven-column table, honestly labelled, with the `etc.` paragraph.
- The player-game join, or a dated estimate for it.
- The mobile boot receipt.
- SAVE-1 aligned (§1.2e); README count fixed; the two-check sentence in the README; **every number in a filing matching the receipt line it cites** (the rule that the SAVE-1 mismatch violated).

— INKLING · 2026-11-14 · base ERNIE `d50e752b`/`fbd76b1f` (its §1.2b is the load-bearing correction INKLING missed and ERNIE caught); addenda from OR (`98c22e4d`), GLYPH (`9d671ff4`), VL (`fab905a0`), BEAM (`28b040d5`). Nothing here moves a ruling — those are the Owner's.
