# PROPOSAL: Pickle Merge Manifest Addendum (P12/P14 pending)

**Author:** Ultra (nemotron-3-ultra-free)  
**Date:** 2026-10-20  
**Status:** PROPOSAL — awaiting Owner approval (R5)  
**Source:** Pickle's M-13/M-31/M-31 merge manifest addendum  
**Reference Build:** v20 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` (649,032 bytes)  
**Donor:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes)

---

## Purpose

Document the merge manifest addendum from Pickle's M-13/M-31 reviews. This captures the three real deltas (D-a, D-b, D-c), the protected-function hash gate, and the malformed v20 wrapper fix.

---

## 1. The Math Gate (Critical)

### Verified Byte-Identical Functions (8/8)

| Function | v20 Hash (12-char) | Donor Hash (12-char) | Status |
|----------|-------------------|---------------------|--------|
| `slotWins` | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |
| `slotWinsPerOvr` | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |
| `modelWeights` | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |
| `effOvr` | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |
| `optimalLineup` | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |
| `matchupModel` | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |
| `simulateGame` | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |
| `teamRatings` | `dc54e4210ce1` | `dc54e4210ce1` | ✅ Identical |

**Shared Hash:** `dc54e4210ce1` (12-char prefix of sha256)

### Protected Constants (6/6 Identical)

| Constant | v20 | Donor | Status |
|----------|-----|-------|--------|
| `DEFAULT_WEIGHTS` | ✅ Identical | ✅ Identical | ✅ |
| `FLEX` | ✅ Identical | ✅ Identical | ✅ |
| `NATURAL_SLOT_MAP` | ✅ Identical | ✅ Identical | ✅ |
| `MC` | ✅ Identical | ✅ Identical | ✅ |
| `PLAN_K` | ✅ Identical | ✅ Identical | ✅ |
| `RATING_SPECS` | ✅ Identical | ✅ Identical | ✅ |

---

## 2. The Three Real Deltas (D-a, D-b, D-c)

| Delta | Direction | Content | Size |
|-------|-----------|---------|------|
| **D-a** | donor → v20 | `cpuPick` round-order floors + bounded miss — **keep v20's version** | ~18 lines |
| **D-b** | v20 → donor | the Season-first engine surface (state machine, weekly sim, playoffs, box scores, recaps, awards) — the donor's contribution and the bulk | whole feature layer |
| **D-c** | neither has it | persistence: `localStorage` = **0 in both files**. If "remember my season" is expected after the merge, it is new work, not a merge of existing work | one subsystem |

### D-a: cpuPick (Donor Wins)

| Aspect | v20 (`fa6d752969e4`) | Donor (`a2b8190e98f8`) |
|--------|---------------------|------------------------|
| Round floors | ❌ None | ✅ `curRound`/`topAvail`/`ovrFloor` |
| First-sight gate | ❌ None | ✅ `posBest` (gates rounds ≤3) |
| Bounded miss | ❌ Up to 92 deep | ✅ `reach=3+min(9,floor(|randNormal()|*4))` |
| `seen>16` guard | ✅ Yes | ❌ No |

**Decision:** Keep DONOR's `cpuPick` (credible-GM machinery).

### D-b: Season Engine Surface (Donor Wins)

| Function | v20 | Donor | Decision |
|----------|-----|-------|----------|
| `seasonToast` | ❌ | ✅ | Donor |
| `goSeason` | ❌ | ✅ | Donor |
| `meetingInfo` | ❌ | ✅ | Donor |
| `meetingTagText` | ❌ | ✅ | Donor |

**Decision:** Donor's Season engine surface (whole feature layer).

### D-c: Persistence (Absent Both)

| Build | `localStorage` | `sessionStorage` | `IndexedDB` |
|-------|----------------|------------------|-------------|
| v20 | 0 | 0 | 0 |
| Donor | 0 | 0 | 0 |

**Decision:** Persistence is new work (U-21), not a merge delta.

---

## 3. The Math Gate (Critical Acceptance Test)

Add to merge acceptance test:

```bash
merged="<merged candidate>.html"; ref="NFL Draft Simulator v20 Claude.html"
for f in slotWins slotWinsPerOvr modelWeights effOvr optimalLineup matchupModel simulateGame teamRatings; do
  a=$(awk -v fn="$f" 'index($0,"function "fn"(")==1{p=1} p{print} p&&/^}/{exit}' "$merged" | shasum | cut -c1-12)
  b=$(awk -v fn="$f" 'index($0,"function "fn"(")==1{p=1} p{print} p&&/^}/{exit}' "$ref" | shasum | cut -c1-12)
  [ "$a" = "$b" ] || { echo "MATH DRIFT in $f ($a vs $b)"; exit 1; }
done
echo "MATH GATE: PASS (8/8 identical)"
```

**Fail = merge silently edited the model.** A plausible E2E run would not catch this; this gate catches it in one second.

---

## 4. The Three Real Deltas — Manifest Rows

| Function | v20 | Donor | Oracle | S-102 Position |
|----------|-----|-------|--------|----------------|
| `setActiveTab` | 832–840 | 776–783 | **synth** | before `startDraft2` |
| `cpuPick` | 1368–1395 | 1342–1384 | **donor** | before `startDraft2` |
| `fitNoteHTML` | 1616–1624 | 1605–1607 | **donor** | after `startDraft2` |
| `renderDraftBoard2` | 1626–1731 | 1609–1713 | **v20** | after `startDraft2` |
| `buildDefenseDetail` | 2501–2575 | 2483–2557 | **donor** | before `startSeason` |
| `dramaticEnding` | 2834–2892 | 2816–2874 | **donor** | before `startSeason` |
| `turnoverParagraph` | 2894–2948 | 2876–2966 | **donor** | before `startSeason` |
| `playByPlay` | 2979–3030 | 2997–3049 | **donor** | before `startSeason` |
| `generateGameSummary` | 3031–3142 | 3050–3162 | **donor** | before `startSeason` |
| `matchupTagHTML` | 3427–3432 | 3477–3482 | **donor** | after `startSeason` |
| `renderPlayoffsView` | 3855–3894 | 3905–3944 | **donor** | between `startSeason`/`runLeague100` |
| `renderGuideHTML` | 4920–4953 | 4970–5003 | **donor** | before `runLeague100` |
| `render100` | 5934–6028 | 5984–6078 | **donor** | after `runLeague100` |
| `renderSeasonTab` | 6038–6042 | 6088–6091 | **synth** | after `runLeague100` |
| `renderSeasonTabInner` | 6043–6059 | 6092–6108 | **donor** | after `runLeague100` |
| `renderSeasonTab` | 6038–6042 | 6088–6091 | **synth** | after `runLeague100` |
| `finishDraft2` | 6076–6085 | 6125–6140 | **donor** + helper | after `runLeague100` |
| `renderDraftResults` | 6124–6174 | 6179–6223 | **donor** | after `runLeague100` |

### 17-Function Oracle: 14 donor / 1 v20 / 2 synthesize

| Category | Functions |
|----------|-----------|
| **Donor (14)** | `cpuPick`, `fitNoteHTML`, `buildDefenseDetail`, `dramaticEnding`, `turnoverParagraph`, `playByPlay`, `generateGameSummary`, `matchupTagHTML`, `renderPlayoffsView`, `renderGuideHTML`, `render100`, `renderSeasonTabInner`, `finishDraft2`, `renderDraftResults` |
| **v20 (1)** | `renderDraftBoard2` |
| **Synthesize (2)** | `setActiveTab`, `renderSeasonTab` |

### Set Diffs (5 total)

| Type | v20-only | Donor-only |
|------|----------|------------|
| Functions | `updateStepper` | `seasonToast`, `goSeason`, `meetingInfo`, `meetingTagText` |

### Non-Function Surface

| Item | v20 | Donor | Decision |
|------|-----|-------|----------|
| `#glue` phone block | 6433 | 6458–6488 | **Keep v20 6433** (M-23) |
| `#markup` (wrapper) | dual doctype + dup close | clean 648,486 B | **Remove duplicate wrapper/close** |
| `#style0/1` | v20 line 1 `color-scheme:light` | donor line 4 `color-scheme:light dark` | **Architect decides** |

---

## 4. File Hygiene Item

v20 is **649,032 B** against donor's 650,127 B, malformed:
- `<!doctype html>` appears **twice** (line 1, line 2)
- Ends `…</body>\n</html>\n\n</body></html>` — stray duplicate close
- 649,032 − 648,486 = **546 B** duplicated wrapper (GLM's clean working copy = 648,486 B)

**Recommendation:** Merged candidate written from clean working copy (one doctype, one close); manifest records byte count.

---

## 5. Sequencing Reminder (Council Consensus)

Build **S-202 markers and three headless entry points on the merged hash**, not alongside the merge (SIM-CORE markers absent from both parents: `grep -c "SIM-CORE-START"` = 0 in each).

---

## 5. Contract Fix Required

**CONTRACT.md C2** requires extracted slice to contain **zero `document.` references**. On v20 the `<script>` block spans lines 448–6435 and contains **172 `document.`** and **10 `window.`** references, with the pure data block at 449–908 in the *same* script tag. A static assertion is unsatisfiable on this file by construction.

**Fix:** Replace with runtime assertion: evaluate the slice in `vm.runInNewContext` with throwing accessors installed on `document`/`window` **before** evaluation; assert the extraction path completes without throwing. Same intent, satisfiable, fails loudly the first time the core calls a UI function. (DS's S-102 concession and implementer's B1.3 arrived at the same design.)

---

## Appendix: Full-Body CPUPICK Pins

| Build | SHA1 (20-char) | SHA256 (12-char) | Full SHA256 |
|-------|----------------|------------------|-------------|
| v20 | `fa6d752969e4` | `3dc9d12f500a` | `fa6d752969e441e55b096e420afe30d7a05859c2` |
| Donor | `a2b8190e98f8` | `94b878605b73` | `a2b8190e98f8736d86f9b7ac3a28bb678c954ef8` |

**Merge Manifest Pin:** `94b878605b73` (donor)

---

## Appendix: Render100 Pins

| Build | SHA1 (20-char) | SHA256 (12-char) | Full SHA256 |
|-------|----------------|------------------|-------------|
| v20 | `1ea6e8414397` | `6ff608342b9a` | `6ff608342b9a3dd260969588f253527f58632e55` |
| Donor | `cc1016eacc78` | `cc1016eacc78` | `cc1016eacc78` |

**Merge Manifest Pin:** `cc1016eacc78` (donor)

---

**Status:** PROPOSAL — awaiting Owner approval (R5)  
**Next Step:** Owner approval → integrate into `tests/merge-manifest.md` and `tests/merge-manifest.sh`