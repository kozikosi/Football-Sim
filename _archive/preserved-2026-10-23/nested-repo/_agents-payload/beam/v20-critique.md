# Beam — v20 critique (advisory, no edits)

Build measured: `NFL Draft Simulator v20 Claude.html`, sha256 `31b7d61f…`, 649,032 B, 6,438 lines. Single `<script>` at line 448; data block inside it.

## Verified facts (commands run this session)

- `grep -ic "doctype"` → 2 — v20 is **double-wrapped** (line 1 `<!doctype html>` lowercase + line 2 `<!DOCTYPE html>` uppercase), matching Pickle M-13's correction of DS P2; stray tail `</body></html>` also present after `</script>` (14 B). The 544-byte delta is NOT explained by the tail alone; fix is remove the duplicate wrapper + duplicate close, keep the donor's structured header, and the Architect decides which `color-scheme` wins.
- `grep -c -F "localStorage"` → 0 — no persistence in either lineage (Pickle Q-PICKLE-2).
- `grep -o -F "Math.random" | wc -l` → 58 — no seeded RNG (Pickle Q-PICKLE-4).
- `grep -c -F "SIM-CORE"` → 0 — S-202 still pending.
- `@media` breakpoints: 860px, 760px only; 760px block reflows draft table into 12-column grid cards (Nemo Ultra's L1). 390px inherits the 760px rules; no 390-specific breakpoint.
- Mobile: `body{overflow-x:hidden}` + `.wrap{padding:10px}` + `table{overflow-x:auto}`. Draft table uses `data-nostack` opt-out (custom grid). Standings/leaders use `.mstack` (label/value flex rows).

## Critique (opinion, labelled)

1. **No persistence** in either build — "remember my season" is absent; reads as a regression to a user who expects save. Decide merge vs. round-2 (Q-BEAM-4).
2. **No seeded RNG** — every numeric claim un-reproducible; harness-only `rng()` indirection (Pickle Q-PICKLE-4) is cheap and changes no product behaviour.
3. **SIM-CORE markers absent** — S-202 must land on the merged hash, not alongside it (Nemo Super M-9 point 1).
4. **Mobile tables split into two patterns** (mstack vs. 12-column grid) — consistency question for the Architect (Nemo Ultra Q-NEMOULTRA-2/5); at 390px the grid-card pattern is denser but the mstack pattern is more uniform.
5. **Wrapper malformed** (stray tail) — 544-byte delta; relocate the 372-byte `<style>` block first, then delete (DS Q-DS-4).

## What I did NOT verify (no browser available)

- Full draft completion, season sim, playoffs, Super Bowl, box scores, awards — code-level only; no E2E run. `pw4.js`/`validate.js`/`phone.js` do not exist yet.
- 390px overflow on real device — inferred from CSS rules; needs `phone.js` harness.
- Console errors — not checked.

## Additional mobile-overflow candidates (inferred from CSS, unverified on device)

Fixed inline widths present in v20: 420px, 320px, 300px, 260px, 230px, 160px. The 760px block overrides grid templates and panels but not arbitrary `width:420px`/`width:320px` inline styles; at 390px these can overflow unless a parent constrains them. Candidate for the `phone.js` harness (does not exist yet) to check `scrollWidth > clientWidth` at 390px. Not a confirmed bug — flagged for measurement.

## Beam's must-not-lose list (for the Architect's merge)

1. **The wrapper is double-wrapped, not stray-prefixed** (Pickle M-13) — removing only the "stray prefix" silently drops a theme declaration; the Architect must decide which `color-scheme` wins (`light` vs `light dark`). Do not treat as hygiene.
2. **Persistence is absent from both lineages** — declare out of scope for the merge (Pickle Q-PICKLE-2) so the absence isn't read as a regression.
3. **SIM-CORE markers must be built on the merged hash**, not alongside it (Nemo Super M-9 point 1) — building them during the merge risks re-basing twice.
4. **The protected-function hash gate** (Pickle Q-PICKLE-1) — `tests/math-baseline.json` + one loop; the merge's math is byte-identical, so the gate is the real protection.
5. **Mobile table pattern consistency** — two patterns (mstack vs 12-col grid) coexist; pick one as the standard before the merge freezes CSS (Nemo Ultra Q-NEMOULTRA-2/5), or document both as intentional.

## Round-3 adversarial verification (M-19) - command output

Rules read (one line): I operate from the same read - R1-R5 (_agents/ds/notes/Owner-Rulings-19-Oct.md) + bulletin M-1 + M-7 + house rules 1-10.

Self-audit (R5): files edited/posted since Round 1 - COUNCIL-BULLETIN.md (availability line, M-17, M-18), CHRONICLE.md (arrival + correction lines), QUESTIONS-FOR-THE-ARCHITECT.md (Q-BEAM block only), _agents/beam/notes/* and _agents/beam/reviews/* (own files only). Never touched product files, AGENTS.md, STATUS.md, GOVERNANCE-ROUNDTABLE.md, SUBMISSIONS.md, INDEX.md, or any other session's file.

Funcdiff (naive grep, honest): v20 429 named functions, donor 432 (overcount vs DS's precise 409/412; naive regex catches function keywords in comments/strings). Set diffs match DS/Pickle exactly: v20-only = {updateStepper}; donor-only = {goSeason, meetingInfo, meetingTagText, seasonToast}. Common/identical/differ counts deferred to DS's verified extractor (408/394/14) - my naive count (428 common) overcounts and is not authoritative.

cpuPick direction (verified): grep -o curRound/topAvail/ovrFloor/posBest = 0/0/0/0 in v20, 6/6/3/2 in donor. v20 code (lines 1368-1396): `seen[pos] > 16` skip + deep miss `cands[3 + Math.floor(Math.random()*Math.min(90, cands.length-3))]`. Donor code (lines 1342-1387): curRound/topAvail/ovrFloor/posBest credible-GM round-order floors; miss bounded (`reach = 3 + min(9, ...)`). CONCLUSION: keep the DONOR's cpuPick (credible-GM machinery). The "keep v20's cpuPick" note in Pickle M-13 #2 was backwards; DS caught it (M-16), I confirm against my own command output.

## Must-not-lose v3 (deltas from v2)

1. Wrapper is double-wrapped, not stray-prefixed (Pickle M-13) - unchanged.
2. cpuPick: keep the DONOR's credible-GM round-order floors (curRound/topAvail/posBest/ovrFloor); v20's 16-cap + deep 90-miss is the less credible behaviour. NEW (corrected from earlier "keep v20's").
3. Persistence absent from both lineages - declare out of scope for the merge - unchanged.
4. SIM-CORE markers must be built on the merged hash - unchanged.
5. Protected-function hash gate (tests/math-baseline.json) - unchanged.
6. Merge surface = 14 changed functions + 5 set diffs + wrapper/CSS, NOT a feature layer - NEW.
7. Mobile table pattern consistency - unchanged.

Ambiguities in rules (with proposed fixes): rule 3 "next in sequence" vs rule 9 "next free after reading the tail" (Pickle P-6) - I agree, propose rule 3 -> "the next free number after reading the tail (rule 9)". Rule 6 "best the full sha256 line" makes evidence optional - agree, propose a stated minimum. "canonical" means two things (canonical documents at root vs canonical build = v20 per R2) - agree, propose INDEX.md line 5 say both.

## Round-4 deltas (M-26)

(1) House-rules v2 acknowledged in one line: I operate from the same read - R1-R5 + bulletin M-1 + M-7 + house rules 1-10; rule 11 R-f (INDEX.md line 5 both meanings of "canonical") adopted.

(2) Architecture fill-ins with receipts:
[F1] glue/phone synthesis - diff donor 6458-6488 vs v20 6409-6432: v20 has `dataset.msChecked` memo (line 6418-6419) that skips re-stacking after viewport change -> 7,208 overflowing elements measured (MiniMax M-22). Donor dropped the memo and re-applies labels each pass (missing check on firstRow). MERGED BLOCK: take donor 6458-6488 verbatim (no msChecked memo, re-apply labels on missing), keep v20 6433 `setActiveTab('viewDraft','tabDraftBtn')`. Receipts: sed -n 6409,6432 (v20) and 6458,6488 (donor).
[F2] two <style> blocks per build: style #0 = `:root{color-scheme:...}` (v20: `light`; donor: `light dark`) + box-sizing/padding/font/img/hidden rules; style #1 = main CSS (lines 13-~250, draft-board mobile grid, mstack, hero, stepper, etc.). Only difference in style #0 is color-scheme - ARCHITECT decision. Receipts: grep -n "<style" both builds.
[F3] render100 direction CONFIRMED: grep -o 'rWeights' = v20 1 (line 6018, `${rWeights.toFixed(2)}`, never declared) / donor 0. 100-season report crashes on v20; donor's render100 is drop-in fix. Matches MiniMax M-22 + DS M-23.
[F4] Draft-board CSS synthesis: v20 contributes hero/stepper shell, 12-col mobile draft-board grid (#style0/1), CSS vars (--glow, --gold), data-nostack opt-out, mstack phone pass. Donor contributes Season CSS (standings, bracket, matchup cards, league leaders, mstack base). Merged CSS = v20 style #0 with donor's color-scheme (Architect's call) + union of style #1 rules (v20 draft-board + donor Season), dedup by selector.

(3) Three lists v4 - DELTAS ONLY (cumulative; no re-catalogs):
Critiques (delta): C-10 NEW - merge-debt style strings shared by both builds ("steal a ${wS}-${lS} win" v20:3082/donor:3101, "the ${opp}'s answer" v20:5433/donor:5483, "expected scoring" v20:4832/donor:4882) - both builds share this debt; not v20-only.
Now-improvements (delta): L7 filed Round-4 M-26 with receipts [F1]-[F4]; L8 updated v20-critique.md and architecture-review-m8.md with deltas-only lists.
Permission-list (delta): P5 NEW - INDEX.md line-5 "canonical" disambiguation (adopted M-26, R-f); P6 NEW - tests/math-baseline.json extraction rule (DS P-9, adopted).
Must-not-lose v4 (up to 5): (1) cpuPick donor full-body 94b878605b73; (2) 8 math identical + donor cpuPick = 9; (3) surface = 17 real functions + #glue/#markup/#style0-1/seasonState; render100 donor; (4) persistence absent both, SIM-CORE on merged hash; (5) CSS blocks are a synthesize, not a pick.

(4) Self-audit (files touched since Round 3): _agents/beam/notes/v20-critique.md (appended), _agents/beam/reviews/architecture-review-m8.md (appended), COUNCIL-BULLETIN.md (M-26). Never touched product files, AGENTS.md, STATUS.md, GOVERNANCE-ROUNDTABLE.md, SUBMISSIONS.md, INDEX.md (R5), or any other session's file.
