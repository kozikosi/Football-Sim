SPEAKER: vlORCA | ROLE: council advisor | TASK: C31 | DATE: 2026-11-20T03:50Z

VERDICT: ok (errata collected; each labelled VERIFIED or REPORTED)

WHAT I RAN:
- `git show origin/architect/engine-and-seats:claude/assessments/2026-11-13-master-assessment.md | sed -n '130,155p'` — to read D18 verbatim
- `git show origin/architect/engine-and-seats:06d89724d | head -5` — to check if 06d89724d resolves as an object in the architect branch (returned empty)
- `git log origin/architect/engine-and-seats --oneline -1 06d89724d` — returned `408410477 Multisport engine plan M` (the branch tip; inconclusive as a distinct pickSlot-introduction commit)
- `git log origin/architect/engine-and-seats --oneline -1 560b8364f` — also returned `408410477` (consistent with "560b8364f is a re-root artifact": not a distinct pickSlot introduction)
- `git show origin/council/ernie:_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/FIX-NOTES.md | sed -n '80,200p'` — FIX-NOTES §5 (apply) and §6 (manifest consequence, three md5 after-values)
- `git show origin/council/ernie:_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/FIX-NOTES.md | sed -n '1,80p'` — FIX-NOTES §1–§4 (the two builds, four Part-0 fixes, replacement wording)

WHAT I FOUND (errata for Z.ai's order `deliveries/zai-next-sitting-prompt-2026-11-20.md`):

ERRATUM 1 — pickSlot hash.
- The order references `560b8364f` as the pickSlot introduction. Correction: it is `06d89724d`; `560b8364f` is a re-root artifact (empty parent → every line looks added).
- Label: REPORTED (Pickle, verified per v2 order §1.3 correction 3: "The pickSlot introduction is 06d89724d, not 560b8364f. The latter is a re-root artifact."). My own local lookup was inconclusive: `git show origin/architect/engine-and-seats:06d89724d` returned empty; `git log ... -1 06d89724d` and `git log ... -1 560b8364f` both returned the branch tip `408410477` (Multisport engine plan M), so neither resolves as a distinct commit in that branch tip — 06d89724d may live on a different ref or be a non-commit object. Do not re-run Pickle's check; cite his verified result.
- Owner owes: name `06d89724d` in Z.ai's order and note the re-root.

ERRATUM 2 — patch prefix note (-p5).
- The order's patch note should state: `patch -p1` from the archive root works; `patch -p5` from the c9 subtree root works; `patch -p1` from the c9 root FAILS.
- Label: VERIFIED (C4 SETTLED per v2 order §1.1: ERNIE, Beam, Porca, Glyph all ran patch dry-runs; "patch -p1 from the archive root works, -p5 from the c9 subtree root works, -p1 from the c9 root FAILS").
- FIX-NOTES §5 confirms the diff headers are already relative to `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/` (the c9 subtree root), so `-p5` strips the leading four path components to reach `cakepanz-4/…`.

ERRATUM 3 — "ruling 4" → D18.
- "Owner ruling 4" is ambiguous: the 13 Nov batch's own item 4 is "Measure first, replace second" (item 14 "Football and basketball first"); the no-DSL defer is D18.
- Label: VERIFIED for D18's content: `D18 | Platform concept | Defer | Owner ruling 4: football only until football ships. Keep SportModule as a seam; build no DSL.` (read verbatim from `claude/assessments/2026-11-13-master-assessment.md` at the D18 row, ~line 142).
- Label: REPORTED for the disambiguation guidance (v2 order §1.3 correction 1: "cite D18, not the number").
- Owner owes: cite `D18` (not "ruling 4") wherever the no-DSL defer is referenced.

ERRATUM 4 — missing vs failed wording.
- inkling/orcaink are MISSING a file, not failing a hash: correct wording "48 OK / 1 missing, exit 1", not "48 OK / 1 FAILED".
- Label: VERIFIED (v2 SETTLED: inkling/orcaink 48 OK / 1 missing / 51 files → 49 OK / 0 missing / 52 files; pickle 49/49 control unchanged).
- Owner owes: update every doc that says "FAILED" for inkling/orcaink to "missing".

ERRATUM 5 — c10 repair destination path.
- The c10 repair file lands at `cakepanz-4/deliveries/receipts/slice1-battery.json`, NOT `batteries/`.
- Label: VERIFIED (v3 order corrections: "The c10 repair destination is cakepanz-4/deliveries/receipts/, NOT batteries/."; Z.ai's v3 sitting report §3 names the artifact `deliverables/repair/slice1-battery.json`, 6,418 B, md5 `0a2869538a706e7e6ea864664b7e5c9f`, sha256 `3e6476deb5ba58f91dada6276de1e60db88bc2745bf9f1cf4ce515200142faf3`).
- Owner owes: name the correct destination path in the landing instructions.

ERRATUM 6 — three replacement md5 lines (FIX-NOTES §6).
- The three after-values to write into c10 `CHECKSUMS.txt` (and two MANIFEST.txt sha lines for hosted-c9 SHELL-STATUS copies), in the same action as the doc edits:
  - `08f30249faeae37eb2198a1668c10db6` (hosted-c9 `cakepanz-4/SHELL-STATUS.md`, before `222372b8…`)
  - `aba2f58ae13f0d0fa08a41feababb3de` (hosted-c9 `cakepanz-4-prepared/SHELL-STATUS.md`, before `29cecad3…`)
  - `ad1e0a967dda4ddc1a53cf8497cc6131` (hosted-c9 `ledger/build-report-zai-cakepanz-9-2026-11-19.md`, before `4d723c41…`)
- Label: VERIFIED (read verbatim from FIX-NOTES §4 after-md5 column and §6 manifest consequence; C4 SETTLED per v2: "the three md5s match FIX-NOTES §6 (08f30249…, aba2f58a…, ad1e0a96…)").
- The c10-package after-values are `5d877d57f1b6556c8c987edb059b19c6`, `e8137dc3e61e086977f4cc06e087ae8b`, `75c69dbd8f63692ae457eefaf662859e` (FIX-NOTES §4).

WHAT I WOULD CHANGE: N/A — C31 is an errata list, not a product edit. No lines are proposed to product files. The file below is the proposed correction list for the Owner to relay to Z.ai as a one-line correction to his order.

WHAT I DID NOT CHECK:
- Whether `06d89724d` exists as a commit on any ref other than `architect/engine-and-seats` (my lookup was scoped to that branch tip; inconclusive). Pickle's verified result stands.
- The full text of Z.ai's current order `deliveries/zai-next-sitting-prompt-2026-11-20.md` to locate each erratum's exact line — I have not read that file; the erratum descriptions identify what to correct, and Z.ai/the Owner can locate the lines.
