# Adversarial re-verification of MiniMax's merge gates — claims A–E

**Seat:** S-1900–1999 subagent (adversarial check) · **Date:** 2026-10-21T00:20–00:45Z
**Mode:** read-only on the project. The only write inside the project is this file.
**Artifacts written by this session (all outside the repo):** `/tmp/adversarial-*.json`,
`/tmp/adversarial-fixtures/variant-{D,E,F}-*.html`, `/tmp/adversarial-*.mjs`, `/tmp/adversarial-runs*.log`.

**No product file, no instrument, no shared document (COUNCIL-BULLETIN / CHRONICLE /
SUBMISSIONS / QUESTIONS-FOR-THE-ARCHITECT) was modified. No commit, branch, tag, push or checkout.**

---

## 0 · Environment and instrument versions used

| item | value |
|---|---|
| canonical merged candidate | `NFL Draft Simulator merged.html` · sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` · 657,486 B |
| `/tmp/merged-candidate.html` | sha256 `40233d6b…795fd` — **byte-identical to the canonical copy** (verified) |
| v20 reference build | `NFL Draft Simulator v20 Claude.html` · sha256 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` · 649,032 B |
| static oracle | `_agents/minimax/tools/candidate-lint.mjs` · sha256 `81ab5d94d9ebd6fecc9886f69c8a7957b631c1c6fccb28e9435615a8c4887039` |
| dynamic gate | `_agents/minimax/tools/post-merge-smoke.mjs` — **changed under me during this session, see §1.3** |
| id census | `SIM-PLATFORM/tools/id-census.mjs` · sha256 `b9f75c7867851a85b3c6f1d5db50e64ae9939554901668a5c494f18e41a87e69` |
| browser | Brave (Chromium family) `--headless=new --remote-debugging-port=9333 --user-data-dir=/tmp/adversarial-profile2` · `Chrome/151.0.7922.137` |

A second Brave instance (`/tmp/minimax-profile-v2`) was already on port 9222 from another
session; I used port 9333 and my own profile directory so as not to interfere with it.

---

## 1 · Claim-by-claim verdicts

### 1.1 Claim A — "the merged candidate passes both gates: static oracle exit 0 and dynamic gate exit 0" → **VERIFIED**

**Static oracle**

```
$ node _agents/minimax/tools/candidate-lint.mjs /tmp/merged-candidate.html
  sha256 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd · 657486 bytes
  44 pass · 1 warn · 0 fail
  [WARN] fn:setActiveTab   f4cee081e124 = synthesized body (not v20 ae1a1425186e nor donor d3a34f7c930b)
  exit 0 — candidate satisfies every static check
LINT_EXIT=0
```

**Dynamic gate** (run twice, under two different check-sets of the instrument — both PASS)

```
$ node _agents/minimax/tools/post-merge-smoke.mjs /tmp/merged-candidate.html --port 9333
verdict PASS
checks {"A_reportRendered":true,"D_seasonAndPlayoffsComplete":true,"B_noViewportOverflow":true,
        "C_noPageErrors":true,"E_viewportUsable":true,"F_visibleGameCount":true,"G_week1Visible":true}
draftPicks 832/832 · offenderCount 0 · pageErrors 0 · gamesPlayedVisible 272 · Week 1 of 17 visible
GATE_EXIT=0
```

Both claims of A reproduce. The one caveat is not about the candidate but about the
instrument: the gate is **not frozen** (see §1.3 and Finding F-4).

**Independent corroboration of the merge itself** (not part of the claim, but it is the
substance behind the claim). I re-derived the protected surface myself rather than trusting
the oracle:

* all **8 protected math functions** (`slotWins, slotWinsPerOvr, modelWeights, effOvr,
  optimalLineup, matchupModel, simulateGame, teamRatings`) are **byte-identical to v20** in the
  merged candidate, and the **6 protected constants** (`DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP,
  POINTS_PER_WIN, SEASON_RECORD_CAPS, RATING_SPECS`) are byte-identical to v20;
* of the merged candidate's **413 top-level functions, 411 are byte-identical to a parent
  build**. The two exceptions are exactly the ones the manifest declares:
  `setActiveTab` (a declared *synthesize* decision — the oracle WARNs, it does not FAIL it) and
  `checkRewards` (the R1 over-read artefact; the **properly bounded** body is byte-identical
  to v20 — I checked with a first-column-0-`}` bound).

---

### 1.2 Claim B — "v20 FAILS the dynamic gate: check A false, check B false with exactly 7,208 overflowing elements, check C false with 1 page error, and 832/832 picks" → **VERIFIED (numbers identical)**

```
$ node _agents/minimax/tools/post-merge-smoke.mjs "NFL Draft Simulator v20 Claude.html" --port 9333
verdict FAIL
checks {"A_reportRendered":false,"D_seasonAndPlayoffsComplete":true,"B_noViewportOverflow":false,
        "C_noPageErrors":false,"E_viewportUsable":false,"F_visibleGameCount":true,"G_week1Visible":true}
draftPicks "832/832"
offenderCount 7208   clippedCount 7208   coveredCount 0
pageErrors 1 → ReferenceError: rWeights is not defined
                at render100 (…/NFL Draft Simulator v20 Claude.html:6018:1006)
reportPath ui-button · reportRendered false · reportStalled true
playoffs.complete true · champion "Las Vegas Raiders"   (unseeded — differs per run)
GATE_EXIT=1
```

Every number in claim B reproduces exactly: **A false, B false, 7,208 offenders, C false with
1 page error, 832/832 picks**, exit 1. `E` is also false (7,208 clipped).

**Two exit-code anomalies must be recorded, because they are the "false pass" surface of the gate:**

* **Run 1 of v20 returned `GATE_EXIT=0` with `verdict: FAIL`.** The browser was alive
  immediately afterwards (it served the two next runs), so this is not an "environment died"
  explanation. The same FAIL receipt was printed; only the process status was wrong.
* **A run that aborted (the browser died mid-run) returned `GATE_EXIT=0` and wrote a 0-byte
  receipt file.** The tool has no "the run aborted" path: an aborted run is indistinguishable
  from a successful one by exit code.
* The clean re-run returned `GATE_EXIT=1` (above). So the exit code is *usually* right and
  *demonstrably not always* right. **A wrapper that trusts only the exit code can read PASS
  from a FAIL, or from a run that produced no evidence at all.**

---

### 1.3 The instrument moved under the verification (material, affects claims A and B)

`post-merge-smoke.mjs` was edited **twice inside my verification window**, by another session:

| observed | mtime (UTC) | size | sha256 (12) | checks |
|---|---|---|---|---|
| when I first read it | 2026-10-20 23:45Z | 20,061 B | — | A, D, B, C, **E** (5) |
| version in use for my v20 run #1 | 2026-10-21 00:19:29Z | 21,576 B | `4e8f312ceff6` | + **F_visibleGameCount** (6) |
| version in use for my merged/v20 runs #2 | 2026-10-21 00:28:13Z | 23,462 B | `8616773f5191` | + **G_week1Visible** (7) |

`run.tool_version` stayed the literal string `"3 (2026-10-20) — restored byte-for-byte from
origin/council-intake after the 12:13 lane deletion, then re-patched with the season-path
enumeration and this run identity"` across all three versions, and the receipt records **no
hash of the tool**. So **two receipts can carry the same `tool_version` and have been produced
by different code with different check sets** — a receipt does not bind the instrument that
produced it. This is Finding F-4 and it is the most serious instrument-trust defect I found,
because it silently invalidates cross-run comparison of receipts (including "the same artifact
gave PASS again").

### 1.4 Claim C — "the static lint's --selftest re-derives every pin from the parent builds and exits 0" → **VERIFIED**

```
$ node _agents/minimax/tools/candidate-lint.mjs --selftest
  ok  v20 math:slotWins = d23c4018c238   … 79 "ok" lines, 0 MISMATCH
  SELF-TEST PASSED: every pin reproduces from the parent builds
SELFTEST_EXIT=0
```

Independently corroborated with **DS's own tool**, not MiniMax's:
`node _agents/ds/tools/funcdiff-full.js "NFL Draft Simulator v20 Claude.html" "NFL Draft Simulator.html" --hashes`
reproduces **all 17 manifest function pins byte-for-byte** (`ALL 17 manifest function pins match
the independent DS tool`), and the two tools agree on the differing-function count (18 by DS,
17 by the manifest, the difference being `checkRewards`, excluded by the documented R3 rule).

**Limits of what the selftest proves** (it is not a correctness proof of the merge):
the selftest proves the *manifest* is faithful to the extraction rule and to the two parent
builds. It cannot prove the manifest's *decisions* (donor vs v20 vs synthesize per function)
are the right ones — that is a council judgement, not a mechanical one. It also pins only
8 math + 6 constants + 2 also-protected + 17 functions = **31 symbols out of the merged
build's 413 functions**; the other ~380 functions are unverified by the oracle.

### 1.5 Claim D — "the receipt carries a receipt_id that is the sha256 (first 12 hex) of the receipt itself, so a hand-edited evidence file is detectable" → **VERIFIED as literally stated, with three caveats**

Empirical test (`/tmp/adversarial-receipt-id-test.mjs`), run against my own receipt **and**
MiniMax's stored receipts:

```
=== /tmp/adversarial-gate-merged.json ===
  stored receipt_id         : 91ea6a44ab12
  recomputed (as documented): 91ea6a44ab12      MATCH: true
  -- after changing ONE byte (run.viewport.desktop "1280x900" -> "1280x90X") --
  recomputed                : 3a088199c65e      DETECTED (mismatch): true
=== /tmp/mm/final-merged.json   === stored e9d9b4a157e5  -> recompute e9d9b4a157e5 (match) -> tamper 1ffc9fbed112 (detected)
=== /tmp/mm/final-varB.json     === stored 020798251d6a  -> recompute 020798251d6a (match) -> tamper 83f7ab96f9a2 (detected)
=== /tmp/mm/final-varC.json     === stored 57622ee5e496  -> recompute 57622ee5e496 (match) -> tamper 93aecb782d30 (detected)
```

The documented recipe reproduces the id on **4/4 receipts**, and a one-byte edit is detected on
4/4. Claim D is **true as written**.

Caveats a reviewer must know (none of them contradict the claim, all of them limit it):

1. **It is a checksum, not a signature.** The recipe is public and involves no secret. I edited
   the same byte *and re-stamped the id*; the file was then self-consistent again
   (`SELF-CONSISTENT AGAIN: true`). A motivated editor defeats a naive verifier.
2. **The id is over the COMPACT JSON, not the file.** The receipt file on disk is pretty-printed
   with indent 2, so: file bytes → `5f10372459d0`, compact JSON minus the two id fields →
   `91ea6a44ab12` (correct), pretty JSON minus the two id fields → `864b4a165571`. The note
   ("sha256 of this receipt (without the two id fields), first 12 hex") does not state the
   serialization, so a verifier who hashes the file — the natural reading — gets a **false
   tamper alarm**.
3. **It does not bind the tool** (see §1.3).

### 1.6 Claim E — "id-census reports exactly 2 referenced-but-absent on the merged candidate
('seasonHost','lineupSeason') and 1 on v20 ('lineupSeason'), with 21 defined-but-unused on
both, with 'lineupSeason' a false positive (assigned at runtime) and 'seasonHost' null-guarded"
→ **VERIFIED (one number in the M-109 table does not reproduce)**

```
$ node SIM-PLATFORM/tools/id-census.mjs /tmp/merged-candidate.html --json
  counts {"referenced":105,"definedStatic":63,"definedInJs":61,"definedTotal":124}
  referencedButAbsent: ["lineupSeason" (line 3996), "seasonHost" (line 847)]
  definedButUnused: 21      duplicateStaticIds: 0
$ node SIM-PLATFORM/tools/id-census.mjs "NFL Draft Simulator v20 Claude.html" --json
  counts {"referenced":100,"definedStatic":63,"definedInJs":57,"definedTotal":120}
  referencedButAbsent: ["lineupSeason" (line 3887)]
  definedButUnused: 21      duplicateStaticIds: 0
```

* **`seasonHost` null-guarded — confirmed.** `merged` line 847:
  `const host = document.getElementById('seasonHost'); if(!host) return;` — the call returns
  harmlessly; the merged build keeps v20's markup and has no `#seasonHost`.
* **`lineupSeason` is a false positive — confirmed, but M-109's stated mechanism is wrong.**
  M-109 says *"`wireLineupEditor(roster,'lineupSeason',…)` → `container.id = …`"*. There is
  **no** `container.id =` assignment for it (the only `.id =` in the build is `cv.id='fxCanvas'`).
  The id is created by a **template interpolation** in `lineupEditorHTML` —
  `return \`<div id="${hostId}">…\`` (line 1291) — and `wireLineupEditor` merely *looks it up*
  (`const host = document.getElementById(hostId); if(!host) return;`). The census cannot see
  `id="${hostId}"`, so it reports the id as absent. **The conclusion (false positive) is right;
  the cited mechanism is not.**
* **One number in M-109's table does not reproduce:** M-109 states *"ids created in JS only"*
  = 61 (merged) / **56** (v20). I measure **61 / 57**. Every other cell of that table
  (referenced 105/100, static 63/63, referenced-but-absent 2/1, defined-but-unused 21/21)
  reproduces exactly. Note also that Beam M-111 and UK M-108 both repeat "20 defined-but-unused";
  the tool says 21 — MiniMax's own number is the correct one.

---

## 2 · Negative and positive controls (the strongest test I could run)

The pre-existing fixtures were still on disk, so the required controls were reproducible.

### 2.1 `variant-C-legacy-raw.html` — must FAIL → **it FAILS** ✓

```
$ node _agents/minimax/tools/post-merge-smoke.mjs /tmp/mm/variant-C-legacy-raw.html --port 9333
verdict FAIL
checks {"A_reportRendered":false,"D_seasonAndPlayoffsComplete":false,"B_noViewportOverflow":true,
        "C_noPageErrors":false,"E_viewportUsable":true,"F_visibleGameCount":false,"G_week1Visible":false}
pageErrors 2 → TypeError: Cannot read properties of undefined (reading 'item')
                at weightedPick (…/variant-C-legacy-raw.html:1928:31)
                at buildDefenseDetail → playGame → simulateCurrentWeek
gamesPlayedVisible 0 (standings show 0 games) vs gamesPlayed 272 → F false
GATE_EXIT=1
```

Matches M-105's record ("exit 1 · A false, D false, C false · crash at weightedPick"), plus the
newer F check is also false. **The negative control is genuine: the gate does catch a build whose
engine crashes.**

### 2.2 `variant-B-legacy-translated.html` — must PASS → **it PASSES** ✓

```
$ node _agents/minimax/tools/post-merge-smoke.mjs /tmp/mm/variant-B-legacy-translated.html --port 9333
verdict PASS
checks {"A_reportRendered":true,"D_seasonAndPlayoffsComplete":true,"B_noViewportOverflow":true,
        "C_noPageErrors":true,"E_viewportUsable":true,"F_visibleGameCount":true,"G_week1Visible":true}
draftPicks 832/832 · offenderCount 0 · pageErrors 0
GATE_EXIT=0
```

### 2.3 The negative control was reproduced against **both** pool fixtures and both gates
(`/tmp/mm/final-varC.json` = FAIL/exit 1, `/tmp/mm/final-varB.json` = PASS/exit 0, MiniMax's
own stored receipts). No contradiction found.

---

## 3 · False-pass risk — what the gates cannot see (measured, not theorised)

I built three additional fixtures (in `/tmp/adversarial-fixtures/`, **not** in the repo) and ran
both gates plus an independent multi-surface 390 px probe of my own
(`/tmp/adversarial-overflow-probe.mjs`, which measures **every** tab, not only the Players tab).

### F-1 · The 390 px check measures **one surface**. A mobile-layout regression elsewhere passes **both** gates. — **DEMONSTRATED**

The gate's `PROBE` runs only after `clickId('tabPlayersBtn')`; `B_noViewportOverflow` and
`E_viewportUsable` therefore describe the **Players tab alone**.

`variant-F-rankings-mobile-overflow.html` = merged candidate + one CSS line
(`@media (max-width:760px){ #resultsTable{width:1400px !important;max-width:none !important;} }`),
which is exactly the class of defect the gate is advertised to catch (v20's own failure was a
mobile-layout failure).

| instrument | result on variant F |
|---|---|
| **dynamic gate** | `verdict PASS`, all 7 checks true, `offenderCount 0`, **exit 0** |
| **static oracle** | `44 pass · 1 warn · 0 fail`, **exit 0** |
| **my independent probe** | **258 overflowing elements** on the Team Rankings tab at 390 px (`#resultsTable` 1400 px wide, `right:1423` on a 390 px screen) |

**A build whose Team Rankings view is unusable on a phone passes both gates.** The v20 defect
is caught only by the accident that it happened to land on the one tab the probe visits.

### F-2 · The static oracle does not see the CSS/markup layer at all. — **DEMONSTRATED**
Same fixture: a pure-CSS change moves no function body, no constant and no text check, so
`candidate-lint.mjs` cannot fail it. A second CSS-only fixture (`variant-D`, the same
injection aimed at `#draftTable2`) also passes the static oracle with exit 0.

### F-3 · The dynamic gate never asserts anything about the draft. — **DEMONSTRATED**
`variant-E-draftboard-empty.html` = merged candidate with one edit so the draft board always
renders "No players match.":

* **dynamic gate: `verdict PASS`, all 7 checks true, exit 0** — the app's headline feature is
  dead and the gate is green, because `draftPicks` is *recorded* (`832/832`) and *never checked*;
* the static oracle does catch it (`[FAIL] fn:renderDraftBoard2 got 8f7b0aa0925c, want v20
  6f77deaf263f`, exit 1) — but only because that function happens to be pinned. The pin set is
  a *merge* list, not a *health* list, so any breakage outside those 31 symbols is invisible to
  the static oracle too.

### F-4 · A receipt does not bind the instrument that produced it. — **DEMONSTRATED** (§1.3)
The gate gained a check at 00:19:29Z and another at 00:28:13Z, in the middle of this
verification, with `tool_version` unchanged. Any receipt comparison ("same artifact, PASS
again", "gate still green after the change") is unsound unless the tool's own sha256 is
recorded in the receipt.

### F-5 · The exit code is not a reliable failure signal. — **OBSERVED TWICE**
`verdict: FAIL` with `exit 0` (browser healthy), and an aborted run with `exit 0` and a
**0-byte receipt**. The tool's own contract (`tests/CONTRACT.md` v2 league: 0 = all checks
pass, 1 = findings) is not enforced on the failure path. Any CI step or council summary that
cites "exit 1" as the evidence of a failure is citing a number the tool does not reliably
produce; the *receipt* is the trustworthy artefact, and it is only trustworthy if it is
non-empty.

### F-6 · The receipt id is a checksum, not a signature, and its recipe is under-documented. — **DEMONSTRATED** (§1.5)
Re-stamping defeats it; hashing the file bytes (the natural reading of the note) produces a
false alarm.

### F-7 · Page-error capture is uncaught-exceptions-only.
`C_noPageErrors` collects `Runtime.exceptionThrown` and `Log.entryAdded`. An error swallowed by
the build's own `try/catch` is invisible to the gate, and a `console.error` is not counted.

### F-8 · Two cosmetic defects in the instruments (no impact on the verdicts)
* `skipped_checks` is computed as `Object.entries(steps).filter(([k,v]) => v === 'unavailable' || v === 'skipped')`
  — but no step ever sets those two values, so the field is **always empty** and can never
  report that something was skipped. It is decorative.
* `id-census.mjs` reports `bytes: html.length` (UTF-16 code units), so v20 is reported as
  "648234 bytes" for a 649,032-byte file. Harmless, but the field is mislabelled.

### F-9 · What the gates *did* catch (for balance)
The negative control is real: a build whose engine crashes (`weightedPick` TypeError) fails the
gate with exit 1, and the merged candidate's v20 defects (rWeights crash, 7,208 overflowing
elements) are caught. The gates are not toothless — they are **narrow**, not weak.

---

## 4 · Instrument-trust assessment (one paragraph)

The two gates are a **sound, narrow smoke test and a faithful, incomplete static oracle** — and
they should be cited as exactly that. The static oracle (`candidate-lint.mjs`) is unusually
well-behaved: every one of its pins re-derives from the parent builds, its 17 function pins are
independently reproduced by DS's own `funcdiff-full.js`, and I independently confirmed that the
merged candidate's 8 protected math functions and 6 protected constants are byte-identical to
v20 and that 411 of its 413 functions match a parent exactly; it certifies *the merge did not
move a protected symbol and did not corrupt the 17 functions the council ruled on* — nothing
about the other ~380 functions, nothing about CSS or markup, and nothing about whether the
decisions encoded in its own manifest are the right ones. The dynamic gate
(`post-merge-smoke.mjs`) certifies a real and useful thing: **this build boots, drafts 832/832
picks, simulates 272 games, reaches a champion, renders the 100-season report without a single
uncaught error, and the Players view is clean at 390 px** — a genuine regression detector for
the class of defect v20 actually had, proven by a negative control that fails and a positive
control that passes. It cannot be cited as evidence of season balance, champion realism, win
correlation, mobile fitness *outside the one tab it visits*, or of the draft board's own
correctness; it is unseeded (58 `Math.random` sites — I saw three different champions for the
same artifact: Buffalo Bills, Houston Texans, Las Vegas Raiders), it is not a frozen instrument
(it gained two checks inside one verification window, with an unchanged `tool_version` and no
tool hash in the receipt), and its **process exit code is demonstrably unreliable** (FAIL with
exit 0, and an aborted run with exit 0 and an empty receipt). The `receipt_id` is a useful
tripwire against accidental edits, and I verified it works exactly as documented — but it is an
unkeyed checksum over the *compact* JSON, so it detects carelessness, not forgery, and a
verifier who hashes the file bytes will get a false alarm. **Net: the merge is safe to promote
on the strength of these gates — every claim I could attack reproduced, and the candidate is
demonstrably cleaner than v20 on every axis the gates measure — but the council must not cite
"gate exit 0" as a certification of the build, and must not compare two receipts without
checking the tool's own hash.**

---

## 5 · Reproducibility — every command, in order

```bash
# environment
shasum -a 256 "NFL Draft Simulator merged.html" "NFL Draft Simulator v20 Claude.html" /tmp/merged-candidate.html
"/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" --headless=new \
  --remote-debugging-port=9333 --user-data-dir=/tmp/adversarial-profile2 --no-first-run about:blank &

# C  (static selftest)
node _agents/minimax/tools/candidate-lint.mjs --selftest                      # exit 0
# A  (static oracle on the candidate)
node _agents/minimax/tools/candidate-lint.mjs /tmp/merged-candidate.html       # exit 0
# A + B  (dynamic gate)
node _agents/minimax/tools/post-merge-smoke.mjs /tmp/merged-candidate.html --port 9333   # exit 0, PASS
node _agents/minimax/tools/post-merge-smoke.mjs "NFL Draft Simulator v20 Claude.html" --port 9333  # exit 1, FAIL
# controls
node _agents/minimax/tools/post-merge-smoke.mjs /tmp/mm/variant-C-legacy-raw.html --port 9333       # exit 1, FAIL
node _agents/minimax/tools/post-merge-smoke.mjs /tmp/mm/variant-B-legacy-translated.html --port 9333 # exit 0, PASS
# E  (census)
node SIM-PLATFORM/tools/id-census.mjs /tmp/merged-candidate.html --json
node SIM-PLATFORM/tools/id-census.mjs "NFL Draft Simulator v20 Claude.html" --json
# D  (receipt id)
node /tmp/adversarial-receipt-id-test.mjs /tmp/adversarial-gate-merged.json /tmp/mm/final-merged.json \
     /tmp/mm/final-varB.json /tmp/mm/final-varC.json
# false-pass fixtures
node _agents/minimax/tools/candidate-lint.mjs /tmp/adversarial-fixtures/variant-F-rankings-mobile-overflow.html  # exit 0
node _agents/minimax/tools/post-merge-smoke.mjs /tmp/adversarial-fixtures/variant-F-rankings-mobile-overflow.html --port 9333  # exit 0, PASS
node /tmp/adversarial-overflow-probe.mjs /tmp/adversarial-fixtures/variant-F-rankings-mobile-overflow.html --port 9333      # 258 offenders
```

## 6 · Receipts produced by this session (all in `/tmp`, none in the repo)

| file | content |
|---|---|
| `/tmp/adversarial-gate-merged.json` | merged candidate, 5-check instrument version — PASS, exit 0 |
| `/tmp/adversarial-merged-b2.json` | merged candidate, 7-check instrument version — PASS, exit 0 |
| `/tmp/adversarial-gate-v20.json` | v20, 6-check version — verdict FAIL, **exit 0 (anomaly)** |
| `/tmp/adversarial-v20-b2.json` | v20, 7-check version — verdict FAIL, exit 1, 7,208 offenders, 1 page error |
| `/tmp/adversarial-varC-legacy-raw.json` | variant C — FAIL, exit 1, 2 × `weightedPick` TypeError |
| `/tmp/adversarial-varB-legacy-translated.json` | variant B — PASS, exit 0 |
| `/tmp/adversarial-varD-falsepass.json`, `/tmp/adversarial-varE-falsepass.json`, `/tmp/adversarial-varF-falsepass.json` | the three false-pass fixtures — all PASS, exit 0 |
| `/tmp/adversarial-census-merged.json`, `/tmp/adversarial-census-v20.json` | census output, both builds |
| `/tmp/adversarial-probe-{merged,v20,varD,varF}.txt` | independent 390 px multi-surface probes |
| `/tmp/adversarial-runs{,2,3}.log`, `/tmp/adversarial-*.exit` | run timeline and exit codes |

**SPEAKER: MiniMax subagent (adversarial-check) | ROLE: council subagent | TASK: adversarial re-verification | DATE: 2026-10-21T00:47:00Z**
