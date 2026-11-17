SPEAKER: vl | ROLE: council | TASK: continuation prompt for Z.ai — continue all 67 Cakepanz shell work (FOR: R-13) | DATE: 2026-11-17T19:53:00Z
FOR: R-13

Cakepanz-4 is pushed at council/vl (087018ba delivery, 1ba18b02 review), pinned to engine 5c808472, reviewed by VL:
- Pin byte-identity VERIFIED (67/67 engine files match 5c808472); single-door seam VERIFIED (no engine imports outside src/engine + src/lib/port)
- Engine tests 394/394, node battery 24/24, slice battery 29/0/10/3, shell render battery 46/0 (whole season through UI), gates PASS, falsifiers all died, acceptance run green end-to-end
- Open Owner questions flagged (not fixed): light gold2 contrast 1.51:1 FAIL, dark --text 3.17:1 FAIL normal, awards content, Model Value vs Engine Value label, 3-4 one-liner, P-364 wording (430px built vs 560px queued)
- Open Architect items (§5 filed, not applied): P-317 store slot support, OT clock(), parameter property (still at 5c808472), deviceId?: string, gravity/double-teams, awards grades
- Engine tip has since moved to 65673a00 (pass-class GLM node); council verification round filed (inbox/20261117-1935-vl-glm-passclass-verification.md, FOR: P-342). Do NOT re-pin until the Owner rules.

The full continuation prompt for Z.ai is below — copy-paste ready. Covers P-317 acceptance & blockers, receipt hygiene & falsifiers, shell surfaces & polish, merge handoff, filing rules, VL's next moves, and an open question. Do not edit colors/ or engine bytes; file §5 proposals instead. Do not generate or correct ratings. Do not change the palette.

SPEAKER: zai | ROLE: executor | TASK: continue all 67 Cakepanz shell work | DATE: <UTC>

## Where things stand

Your cakepanz-4 complete shell (323 files, dist excluded) is at _agents/vl/deliveries/zai-pass-through/67-cakepanz-4/ on council/vl (@ 087018ba), reviewed by VL (@ 1ba18b02, inbox/20261117-0737-vl-cakepanz-4-review.md).

Independently verified by VL: pin = 5c808472 (67/67 engine files byte-match); single-door seam holds (no engine imports outside src/engine + src/lib/port); engine tests 394/394 pass; node battery 24/24; slice battery 29/0/10/3; shell render battery 46/0 (S1a-S30, whole season through the UI); manifest gate PASS (305 entries); numerals CLEAN x2; falsifiers all died; M3 swap test both directions at d3bd81d2 — FAIL BY DESIGN; acceptance run green end-to-end.

Open Owner questions (flagged, NOT fixed): light gold2 contrast 1.51:1 FAIL; dark --text 3.17:1 FAIL normal; awards content (MVP only); "Model Value" label ships; 3-4 one-liner not shipped; P-364 wording (430px built vs 560px queued).

Open Architect items (§5 filed, not applied): P-317 store slot support; OT clock(); parameter property still at platform/localstorage.ts at 5c808472; deviceId?: string reserved; gravity/double-teams measurement STAND-IN on stats screen; awards grades no grade field.

Engine tip moved to 65673a00 (pass-class GLM node). Council verification round filed (FOR: P-342). Do NOT re-pin until the Owner rules.

## What to continue

### Sitting 1 — P-317 acceptance & blockers
- Team Select UI done and receipted (team AND slot, same screen; orderWith() builds full 1,024-pick sequence). Confirm S1b/S2/S26 still green.
- File §5 proposal for store slot support: START/LOAD carrying order?: number[], DraftPayload/WeekEnvelope carrying slot stamp, restoreDraft using rec.order ?? snakeOrder(). Exact old→new + how to check. Do NOT apply it yourself.
- Hold pin at 5c808472. Do not move to 65673a00 until Owner rules.

### Sitting 2 — Receipt hygiene & falsifiers
- Shell render battery fresh re-run: npm ci && npm run build && npm run battery, zero edits outside src/engine/, paste full stdout + exit code. Name any failing law; do not edit laws.
- F2/F3 falsifier re-receipt: mutate one input byte in throwaway copy, show command fails.
- States sweep: loading/empty/no-save/corrupt-save/newer-build/reduced-motion/offline/file:// receipted for every screen.

### Sitting 3 — Shell surfaces & polish
- Feed slice: OT workaround stands; confirm beat-in receipts.
- Shareables: extend to season brag, bracket brag, awards brag; provenance + clean export; offline self-contained file.
- Awards: confirm winners from played season; 90+ shimmer has nothing to key on (§5 filed).
- Guide: numerals gate CLEAN x2; reduced-motion respected; no "expected scoring"/"before kickoff".
- Player cards: your format decision (Owner deferred). Wins/Priority/OVR/form arrow (GREEN/RED, no emojis, no HOT/cold labels, OVR ±5-6).
- Settings form: persistence-across-reload verified from a screen.

### Sitting 4 — Merge handoff (when Owner rules)
- SNAPSHOT.md current: pin, per-file hashes (CHECKSUMS.txt), exact command, three re-pin paths, swap-test habit, Node-24 battery note.
- MERGE-GUIDE.md: integration contract for Claude — seam module (seam.ts), adapter interface & shapes, hydration/save schema, screen→data dependencies, event/command flows, file map (TS core vs bindings vs assets), exact steps to swap fixture adapter → real engine.
- SHELL-STATUS.md: slice-by-slice done/partial/blocked; framework-coupled seams list; open Owner decisions; assumptions labeled UNKNOWN/INFERRED.

## Filing rules
- One file per piece: inbox/<UTC>-zai-CAKEPANZ-SHELL-<slug>.md
- First line: SPEAKER: zai | ROLE: executor | TASK: <task> | DATE: <UTC>
- Then FOR: <ID> (R-13 shell neutrality/seam; P-317 Team Select slot; P-333 formation gap if touched)
- Tag: CAKEPANZ-SHELL in filename slug
- Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN
- Push after every finished file
- Do not edit colors/ or engine bytes; file §5 proposals instead
- Do not generate or correct ratings; do not change palette

## VL's next moves
VL reviews your filings as they land (3 seats confirming = REVIEWED). VL independently verifies Claude's engine work (GLM node filed; earlier work on poolnode conformance, cosine, CI gate, flex/pack/priorities done).

## Open question (not a directive)
Does the shell render battery still pass on a clean checkout at 5c808472? Answer with commands and receipts, not prose.
