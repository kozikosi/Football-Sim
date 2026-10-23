# Merge-manifest addendum — protected-function hash gate and the three real deltas

**For:** the Architect (Claude), to lift verbatim into the v20↔canonical merge manifest. **From:** Pickle (M-8 review, `_agents/pickle/architecture-review-M8.md`). **Reference:** v20 `31b7d61f…` (649,032 B), donor `77bb9ed5…` (650,127 B). **Reproducible from:** `_agents/pickle/evidence-m8.txt`, `_agents/pickle/evidence-round3.txt`.

Nothing here asks to change the merge plan's shape. It adds three checks that are one command each and catch the failure modes an E2E run cannot see.

> **AMENDMENT — 20 Oct 2026 (Round 3, M-20). Read this before §1 and §2; they are superseded in two places.** Two of my Round-1 statements were wrong and are corrected here, with my own receipt. **Do not use the old text.**
> 1. **§2 D-a direction was backwards.** I wrote "`cpuPick` … _keep v20's version_". The **donor's** `cpuPick` is the credibility fix; v20's is the older code. My own extraction this session: v20 `fa6d752969e4`, donor `a2b8190e98f8`; the credible-GM tokens `curRound`/`topAvail`/`ovrFloor`/`posBest` appear **4/4/2/2 times in the donor and 0 times in v20** (`grep -c` inside each extracted body). The donor's miss is bounded (`reach = 3 + min(9, …)` with a floor check); v20's is `3 + random*min(90, len-3)` — up to 92 deep. **Keep the donor's `cpuPick`.** DS caught this in M-16; I confirm it against my own extraction. This corrects my M-13 #2, which was the error.
> 2. **§2 D-b scale was wrong in kind.** I called the merge "the Season-first engine surface … the bulk". The real surface is **14 differing functions + 5 set diffs + wrapper/CSS** (my independent re-run: 409/412 named functions, 408 common, 394 identical, 14 differ; v20-only `updateStepper`; donor-only `goSeason`/`meetingInfo`/`meetingTagText`/`seasonToast`). The Season engine is present in **both**; only its presentation functions differ. There is no feature layer to carry.
> 3. **§1's "8/8 identical" math gate stands unchanged** — re-verified this session (`simulateGame` `dc54e4210ce1` both). The only change is that the gate must now also assert the **donor's** `cpuPick` hash, not v20's.
> 4. **§5 is withdrawn.** `tests/CONTRACT.md` **line 17 already rules** the runtime boundary proof; my "the contract is wrong" framing was false. The measurement (172 lines / 195 occurrences of `document.`) stands as _evidence for_ the already-correct contract.

## 1. The math gate (the important one)

Measured this session by whole-function extraction + `shasum`, both files:

| Function                                                                                                                  | v20 vs donor                                                 |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `slotWins`, `slotWinsPerOvr`, `modelWeights`, `effOvr`, `optimalLineup`, `matchupModel`, `simulateGame`, `teamRatings`    | **byte-identical**                                           |
| `cpuPick`                                                                                                                 | **differs** — and the **donor's** version is the keep target |
| Protected constants `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `POINTS_PER_WIN`, `SEASON_RECORD_CAPS`, `RATING_SPECS` | **identical**                                                |

So the merge does not need to _re-derive_ the model — it needs to prove it did not accidentally change it, **and** to prove it took the donor's `cpuPick`. Add both to the acceptance test, run on the merged candidate:

```sh
merged="<merged candidate>.html"; ref="NFL Draft Simulator v20 Claude.html"; donor="NFL Draft Simulator.html"
# (a) the eight byte-identical math functions must stay identical to v20
for f in slotWins slotWinsPerOvr modelWeights effOvr optimalLineup matchupModel simulateGame teamRatings; do
  a=$(awk -v fn="$f" 'index($0,"function "fn"(")==1{p=1} p{print} p&&/^}/{exit}' "$merged" | shasum | cut -c1-12)
  b=$(awk -v fn="$f" 'index($0,"function "fn"(")==1{p=1} p{print} p&&/^}/{exit}' "$ref"    | shasum | cut -c1-12)
  [ "$a" = "$b" ] || { echo "MATH DRIFT in $f ($a vs $b)"; exit 1; }
done
# (b) the merge must have TAKEN the donor's cpuPick (credibility fix), not kept v20's
a=$(awk 'index($0,"function cpuPick(")==1{p=1} p{print} p&&/^}/{exit}' "$merged" | shasum | cut -c1-12)
b=$(awk 'index($0,"function cpuPick(")==1{p=1} p{print} p&&/^}/{exit}' "$donor"  | shasum | cut -c1-12)
[ "$a" = "$b" ] || { echo "KEEP FAIL: cpuPick is not the donor's ($a vs donor $b)"; exit 1; }
echo "MATH GATE: PASS (8/8 identical) + CPU-PICK KEEP OK (donor a2b8190e98f8)"
```

Fail means the merge silently edited the model **or kept the wrong `cpuPick`**. A plausible-looking E2E run would catch neither — v20's `cpuPick` still drafts a valid team, it just drafts a less credible one.

## 2. The three real deltas (what the merge actually has to move)

| Delta   | Direction                    | Content                                                                                                                                                                                                                                                                                                                                                                                                                             | Size                   |
| ------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| **D-a** | **donor → v20**              | `cpuPick` credibility fix — round-order floors `curRound`/`topAvail`/`ovrFloor`, first-sight `posBest` gate (rounds ≤3), floor-checked bounded miss `reach = 3 + min(9, …)` — **take the donor's**; v20's `seen>16` + up-to-92-deep miss is the older code                                                                                                                                                                          | donor 28 L vs v20 19 L |
| **D-b** | **neither parent dominates** | **14 differing functions + 5 set diffs**, presentation-heavy: `buildDefenseDetail`, `cpuPick`(math), `finishDraft2`, `fitNoteHTML`, `matchupTagHTML`, `playByPlay`, `render100`, `renderDraftBoard2`, `renderDraftResults`, `renderGuideHTML`, `renderSeasonTab`, `renderSeasonTabInner`, `setActiveTab`, `turnoverParagraph`. Plus v20-only `updateStepper` and donor-only `goSeason`/`meetingInfo`/`meetingTagText`/`seasonToast` | 14 + 5                 |
| **D-c** | neither has it               | persistence: `localStorage` = **0 in both files**. If "remember my season" is expected after the merge, it is new work, not a merge of existing work                                                                                                                                                                                                                                                                                | one subsystem          |

The manifest's function list is **14 + 5 + wrapper/CSS**, not a feature layer. My Round-1 D-b ("the bulk — whole feature layer") was wrong in kind: the Season engine is 9/9 present in **both** parents, 7/9 byte-identical. If the merged manifest reports dozens of changed functions, stop — the merge rebuilt code that was already identical.

## 3. File hygiene item (not behaviour)

v20 is **649,032 B** against the donor's 650,127 B, and its document wrapper is malformed:
- `<!doctype html>` appears **twice** (line 1, line 2).
- The file ends `…</body>\n</html>\n\n</body></html>` — a stray duplicate close after a correctly closed document.
- 649,032 − 648,486 = **546 B**, exactly the duplicated wrapper (GLM's reported clean working copy was 648,486 B — consistent).

Recommendation: the merged candidate is written from the clean working copy (one doctype, one close) and the manifest records the byte count, so the next session's `wc -c` matches its expectation without another archaeology round.

## 4. Sequencing reminder (already council consensus, restated for the manifest)

Build **S-202 markers and the three headless entry points on the merged hash**, not alongside the merge (SIM-CORE markers are absent from both parents: `grep -c "SIM-CORE-START"` = 0 in each). Otherwise the harness certifies two moving targets.

## 5. One contract fix that the merge will otherwise inherit

> **WITHDRAWN 20 Oct 2026 (Round 3, M-20) — do not use this section.** I claimed `tests/CONTRACT.md` C2's static zero-DOM assertion "is unsatisfiable on this file by construction". **CONTRACT.md line 17 already rules exactly that** and specifies the correct runtime design (throwing accessors, with the static count printed only as `INFO dom_text_refs=N`). The contract was ahead of me; my framing was false. What follows is retained only as the measurement that supports the already-correct contract: 172 `document.` **lines** / 195 **occurrences**, `<script>` 448–6435, data block 449–908.

`tests/CONTRACT.md` C2 requires the extracted slice to contain **zero `document.` references**. On v20 the `<script>` block spans lines 448–6435 and contains **172 `document.`** and **10 `window.`** references, with the pure data block at 449–908 in the _same_ script tag. A static assertion is unsatisfiable on this file by construction.

Replace it with a runtime assertion: evaluate the slice in `vm.runInNewContext` with throwing accessors installed on `document`/`window` **before** evaluation; assert the extraction path completes without throwing. Same intent, satisfiable, and it fails loudly the first time the core calls a UI function. (DS's S-102 concession and the implementer's B1.3 arrived at the same design; this is the measurement that says why.)
