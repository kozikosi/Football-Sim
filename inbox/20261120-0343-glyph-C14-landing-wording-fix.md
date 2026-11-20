SPEAKER: glyph | ROLE: council seat (infra/docs) | TASK: C14 — fix landing docs' wording (missing vs failed, -p5, 06d89724d) | DATE: 2026-11-20T03:43:37Z

VERDICT: improved (proposals only; no other seat's file edited)

## WHAT I RAN

```bash
# timestamps
date -u "+%Y%m%d-%H%M"     # 20261120-0343
date -u "+%Y-%m-%dT%H:%M:%SZ"  # 2026-11-20T03:43:37Z

# locate targets named by C14
git fetch -q origin
git ls-tree -r --name-only origin/council/ernie | /usr/bin/grep -E 'sitting-prompt-2026-11-20\.md$|0334-ernie-C3'

# receipts: "FAILED"/"missing" wording in v1 prompt
git show origin/council/ernie:_agents/ernie/deliveries/council-sitting-prompt-2026-11-20.md \
  | /usr/bin/grep -n "FAILED\|patch -p1 from the c9 subtree root\|OK/FAILED counts"

# receipts: Ernie 0334
git show origin/council/ernie:inbox/20261120-0334-ernie-C3-C9-c10-landing-rehearsal.md \
  | /usr/bin/grep -n "FAILED\|OK / FAILED"

# receipts: glyph C3 (own file; proposal included for completeness)
grep -n "FAILED/missing\|FAILED=0" inbox/20261120-0326-glyph-c3-c10-repair-rehearsal.md

# search for 560b8364 / 06d89724 and -p5 in named prompts/orders
git show origin/council/ernie:_agents/ernie/deliveries/council-sitting-prompt-2026-11-20.md \
  | /usr/bin/grep -n "560b8364\|06d89724\|-p5" || echo NONE_FOUND
git show origin/council/ernie:_agents/ernie/deliveries/zai-next-sitting-prompt-2026-11-20.md \
  | /usr/bin/grep -n "560b8364\|06d89724\|-p5\|patch -p" || echo NONE_FOUND

# handoff/brief search (broad, excluding zai-fresh-start/zai-sitting-2026-11-15-authoring dirs)
git ls-tree -r --name-only origin/council/ernie origin/council/pickle origin/council/muse \
  | /usr/bin/grep -i handoff \
  | /usr/bin/grep -v 'zai-fresh-start\|zai-sitting-2026-11-15-authoring' | /usr/bin/head -20
```

## WHAT I FOUND

### Evidence (raw excerpts / line receipts)

**v1 sitting prompt** (`origin/council/ernie:_agents/ernie/deliveries/council-sitting-prompt-2026-11-20.md`) — grep output:
```
95:2. Run `md5sum -c CHECKSUMS.txt` **before** (expect 48 OK / 1 FAILED, the failure being `…/cakepanz-4/deliveries/receipts/slice1-battery.json`).
97:4. Run the check **after** (expect **49 OK / 0 FAILED, 52 files**).
109:2. Apply `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/hosted-c9.diff` with `patch -p1` from the c9 subtree root (the diff is rooted at `_agents/pickle/…`, so `-p1` from the parent works; `-p5` from the subtree root works too).
171:1. For each host (pickle, inkling, orcaink), from a fresh `git archive`, report: file count, CHECKSUMS entries, OK/FAILED counts, and the presence of `…/cakepanz-4/deliveries/receipts/slice1-battery.json`.
```
(VERIFIED: command output above.) C3 step 2/4 and C9 step 1 label the inkling/orcaink condition as FAILED/counts; line 109 already mentions `-p5` from subtree root as an alternative but leads with `patch -p1` from the c9 subtree root. Per v2 correction and prior glyph/Porca rehearsal reports (REPORTED), the missing manifest entry is **missing**, not a hash mismatch, and patch-strip context matters by cwd.

**Ernie 0334** (`origin/council/ernie:inbox/20261120-0334-ernie-C3-C9-c10-landing-rehearsal.md`) — grep output:
```
4:VERDICT: **safe to land** — inkling and orcaink go 48 OK/1 FAILED → **49 OK/0 FAILED, 52 files** with one file; pickle is already 49/49.
24:| `origin/council/inkling` | 51 | **48 OK / 1 FAILED** | **49 OK / 0 FAILED** | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |
25:| `origin/council/orcaink` | 51 | **48 OK / 1 FAILED** | **49 OK / 0 FAILED** | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |
26:| `origin/council/pickle` (control) | 52 | 49 OK / 0 FAILED | 49 OK / 0 FAILED (file already present) | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |
28:The single FAILED entry on inkling/orcaink is exactly
36:cd <c10> && md5sum -c CHECKSUMS.txt | tail -1     # expect: 49 OK, 0 FAILED (macOS: the loop above)
42:| host | files | CHECKSUMS entries | OK / FAILED | `slice1-battery.json` | nested c9 present |
```
(VERIFIED.) Note: lines 45-46 of the same file (not shown in grep subset) already state `48 / 1 | **missing**` for inkling/orcaink in the C9 audit table (VERIFIED by full-file read earlier: `git show origin/council/ernie:inbox/20261120-0334-ernie-C3-C9-c10-landing-rehearsal.md | sed -n '45,46p'` -> `| inkling | 51 | 49 | 48 / 1 | **missing** | yes |` / `| orcaink | 51 | 49 | 48 / 1 | **missing** | yes |`), so the diagnosis is mixed: audit rows are correct, but verdict/C3 table/narrative/recipe still say FAILED. C14 should make them consistent.

**Glyph C3** (`inbox/20261120-0326-glyph-c3-c10-repair-rehearsal.md`, glyph-owned) — grep output:
```
69:Summary: files=51, CHECKSUMS entries=49, OK=48, FAILED/missing=1 (path above). Missing parent dir confirmed in rehearsal copy: `ls .../cakepanz-4/deliveries` -> "No such file or directory".
93:Summary: files=52, OK=49, FAILED=0.
108:Summary: files=51, CHECKSUMS entries=49, OK=48, FAILED/missing=1 (same manifest path). Missing parent dir confirmed.
132:Summary: files=52, OK=49, FAILED=0.
144:Summary: files=52, OK=49, FAILED=0.
153:Summary: files=52, OK=49, FAILED=0.
```
(VERIFIED.) Glyph's summaries are partly careful ("FAILED/missing=1" + missing-dir note) but still ambiguous; "FAILED=0" after repair could be stated as "0 failed/missing checks" for md5sum output parity, but clearer to separate manifest-check result from diagnosis.

**560b8364f / 06d89724d in named prompts/orders:**
- `origin/council/ernie:_agents/ernie/deliveries/council-sitting-prompt-2026-11-20.md`: grep for `560b8364|06d89724` -> `NONE_FOUND` (VERIFIED).
- `origin/council/ernie:_agents/ernie/deliveries/zai-next-sitting-prompt-2026-11-20.md`: grep for `560b8364|06d89724` -> `NONE_FOUND` (VERIFIED). Grep for `patch -p|-p5` -> `NONE_FOUND` (VERIFIED). Grep for `ruling|Ruling|D18` -> only line 245 `## 7 · The Owner's rulings that bind this sitting` and line 181 `5. **No per-game historical tuning.** The Owner's 18 Nov ruling...` (context-specific ruling text, not "ruling 4"/D18 citation) (VERIFIED from earlier search output).
- v2 states pickSlot introduction correction `560b8364f`→`06d89724d` is needed (REPORTED in v2 §1.1/§1.3). I did not find the literal wrong hash in the v1 prompt or Z.ai v4 order text scanned above (VERIFIED for scanned files). If the wrong hash appears in any other handoff brief or external note, I did not locate it here (UNKNOWN outside scanned refs).

**`patch -p5` / cwd note:**
- v1 prompt line 109: `"patch -p1 from the c9 subtree root ... so -p1 from the parent works; -p5 from the subtree root works too"` — mixes contexts and risks reader applying wrong `-p1` from subtree root. (VERIFIED.)
- Z.ai v4 order contains no `patch -p` instructions (VERIFIED: grep `patch -p` -> NONE_FOUND in scanned text; section headings/commands in §9 show general commands only in other docs, not in zai order body checked).
- Prior glyph dry-runs (REPORTED, not re-run in this file): from hosted-c9 extract root `patch -p1 --dry-run` exit 0; from c9 subtree root `patch -p5 --dry-run` exit 0 and `patch -p1 --dry-run` exit 1. C14 should propose explicit cwd-qualified wording.

**Handoff/brief search:**
```text
(no matching handoff files found in scanned refs outside zai-fresh-start/zai-sitting-2026-11-15-authoring; owner-notes/council-brief historical files exist but none named as current "landing handoff brief" for this c10/doc-fix landing)
```
(VERIFIED: search command/output above.) No active handoff brief requiring the specific missing-vs-failed / -p5 / 06d89724d edits was found in scanned council refs (UNKNOWN outside scanned refs).

## WHAT I WOULD CHANGE (exact proposals; I did not edit other seats' files)

### A. `origin/council/ernie:_agents/ernie/deliveries/council-sitting-prompt-2026-11-20.md` (v1, C3 § step 2)
- File: `_agents/ernie/deliveries/council-sitting-prompt-2026-11-20.md`
- Old (line 95):
  `2. Run `md5sum -c CHECKSUMS.txt` **before** (expect 48 OK / 1 FAILED, the failure being `…/cakepanz-4/deliveries/receipts/slice1-battery.json`).`
- New:
  `2. Run `md5sum -c CHECKSUMS.txt` **before** (expect 48 OK / 1 missing entry: `…/cakepanz-4/deliveries/receipts/slice1-battery.json` is absent, so `md5sum -c` reports a failure/missing line and non-zero exit; this is not a hash mismatch).`

### B. v1 C3 § step 4 (after-state wording)
- Old (line 97):
  `4. Run the check **after** (expect **49 OK / 0 FAILED, 52 files**).`
- New:
  `4. Run the check **after** (expect **49 OK / 0 failed / 0 missing, 52 files**).`

### C. v1 C4 § step 2 (patch cwd/-p clarity)
- Old (line 109):
  `2. Apply `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/hosted-c9.diff` with `patch -p1` from the c9 subtree root (the diff is rooted at `_agents/pickle/…`, so `-p1` from the parent works; `-p5` from the subtree root works too).`
- New:
  `2. Apply `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/hosted-c9.diff`. Diff paths are rooted at `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/...`: use `patch -p1 --dry-run < <diff>` (then without `--dry-run`) from the archive/extract root that contains `_agents/`, **or** `patch -p5 --dry-run < <diff>` from the c9 subtree root `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19`. Do **not** use `-p1` from the c9 subtree root.`

### D. v1 C9 § step 1 (audit wording)
- Old (line 171):
  `1. For each host (pickle, inkling, orcaink), from a fresh `git archive`, report: file count, CHECKSUMS entries, OK/FAILED counts, and the presence of `…/cakepanz-4/deliveries/receipts/slice1-battery.json`.`
- New:
  `1. For each host (pickle, inkling, orcaink), from a fresh `git archive`, report: file count, CHECKSUMS entries, OK / missing / failed-hash counts (and `md5sum -c` exit), and the presence of `…/cakepanz-4/deliveries/receipts/slice1-battery.json`.`

### E. `origin/council/ernie:inbox/20261120-0334-ernie-C3-C9-c10-landing-rehearsal.md` (Ernie-owned; proposals)
- Old (line 4 verdict):
  `VERDICT: **safe to land** — inkling and orcaink go 48 OK/1 FAILED → **49 OK/0 FAILED, 52 files** with one file; pickle is already 49/49.`
- New:
  `VERDICT: **safe to land** — inkling and orcaink go 48 OK / 1 missing (CHECKSUMS entry present but file absent) → **49 OK / 0 failed / 0 missing, 52 files** with one file; pickle is already 49/49.`

- Old (line 24): `| `origin/council/inkling` | 51 | **48 OK / 1 FAILED** | **49 OK / 0 FAILED** | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |`
- New (line 24): `| `origin/council/inkling` | 51 | **48 OK / 1 missing** | **49 OK / 0 failed / 0 missing** | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |`

- Old (line 25): `| `origin/council/orcaink` | 51 | **48 OK / 1 FAILED** | **49 OK / 0 FAILED** | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |`
- New (line 25): `| `origin/council/orcaink` | 51 | **48 OK / 1 missing** | **49 OK / 0 failed / 0 missing** | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |`

- Old (line 26): `| `origin/council/pickle` (control) | 52 | 49 OK / 0 FAILED | 49 OK / 0 FAILED (file already present) | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |`
- New (line 26): `| `origin/council/pickle` (control) | 52 | 49 OK / 0 failed / 0 missing | 49 OK / 0 failed / 0 missing (file already present) | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |`

- Old (line 28): `The single FAILED entry on inkling/orcaink is exactly`
- New (line 28): `The single missing entry on inkling/orcaink (CHECKSUMS line present, file absent) is exactly`

- Old (line 36): `cd <c10> && md5sum -c CHECKSUMS.txt | tail -1     # expect: 49 OK, 0 FAILED (macOS: the loop above)`
- New (line 36): `cd <c10> && md5sum -c CHECKSUMS.txt | tail -1     # expect: 49 OK, 0 failed/missing checks (macOS: the loop above)`

- Old (line 42 header): `| host | files | CHECKSUMS entries | OK / FAILED | `slice1-battery.json` | nested c9 present |`
- New (line 42 header): `| host | files | CHECKSUMS entries | OK / missing / failed-hash | `slice1-battery.json` | nested c9 present |`
  (and align body rows accordingly: pickle `49 / 0 / 0`, inkling/orcaink `48 / 1 / 0`, consistent with existing "missing" cells)

### F. Glyph-owned follow-up (proposal; I can apply on `council/glyph` only if requested)
- File: `inbox/20261120-0326-glyph-c3-c10-repair-rehearsal.md` (glyph)
- Propose replacing `FAILED/missing=1` with `1 missing (file absent; md5sum -c non-zero)` and `FAILED=0` with `0 failed/missing` in summary lines 69,93,108,132,144,153 for consistency with Porca/v2 correction. (Not applied in this C14 commit to keep scope to C14 deliverable.)

### G. pickSlot hash `560b8364f` → `06d89724d`
- Scanned targets (v1 prompt, Z.ai v4 order): **no literal `560b8364` found** (VERIFIED). v2 states correction needed (REPORTED). Proposal: if `560b8364f` appears in any landing/handoff text for this sitting, replace with `06d89724d` and note `560b8364f` is a re-root artifact (REPORTED in v2 §1.1/§1.3; Pickle correction). No concrete replacement line available from scanned files.

## WHAT I DID NOT CHECK

- I did not edit `origin/council/ernie` files or any other seat's branch/file (by rule). All changes above are proposals.
- I did not re-run patch dry-runs in this turn; prior dry-run results are REPORTED from earlier glyph session state, not re-receipted here. The cwd-qualified patch proposal (C above) is therefore INFERRED as the safe/explicit form consistent with diff-root paths and v2 instruction; a landing seat should keep `--dry-run` receipts.
- I did not scan every historical handoff/brief on every council branch; searched ernie/pickle/muse refs excluding obvious historical zai-fresh-start directories (VERIFIED scope). Other handoff briefs may exist (UNKNOWN).
- I did not verify the semantic mapping of every `md5sum -c` failure mode on the target platform beyond the manifest-entry-missing case rehearsed in C3 (REPORTED/partly VERIFIED by rehearsal: absent path produced non-zero/failed line in tool output but diagnosis is missing file).

