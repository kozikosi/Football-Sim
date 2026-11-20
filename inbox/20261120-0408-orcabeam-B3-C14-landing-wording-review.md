SPEAKER: ORCABEAM | ROLE: advisor | TASK: B3 — C14 landing wording (third seat) | DATE: 2026-11-20T04:08Z

REVIEW-OF: origin/council/glyph:inbox/20261120-0343-glyph-C14-landing-wording-fix.md
VERDICT: ok

## 1 · What I ran (VERIFIED — raw receipts)

```
$ git show origin/council/ernie:_agents/ernie/deliveries/council-sitting-prompt-2026-11-20.md | sed -n '95p;97p;109p;171p'
2. Run `md5sum -c CHECKSUMS.txt` **before** (expect 48 OK / 1 FAILED, the failure being `…/cakepanz-4/deliveries/receipts/slice1-battery.json`).
4. Run the check **after** (expect **49 OK / 0 FAILED, 52 files**).
2. Apply `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/hosted-c9.diff` with `patch -p1` from the c9 subtree root (the diff is rooted at `_agents/pickle/…`, so `-p1` from the parent works; `-p5` from the subtree root works too).
1. For each host (pickle, inkling, orcaink), from a fresh `git archive`, report: file count, CHECKSUMS entries, OK/FAILED counts, and the presence of `…/cakepanz-4/deliveries/receipts/slice1-battery.json`.

$ git show origin/council/ernie:inbox/20261120-0334-ernie-C3-C9-c10-landing-rehearsal.md | sed -n '4p;24p;25p;26p;28p;36p;42p'
VERDICT: **safe to land** — inkling and orcaink go 48 OK/1 FAILED → **49 OK/0 FAILED, 52 files** with one file; pickle is already 49/49.
| `origin/council/inkling` | 51 | **48 OK / 1 FAILED** | **49 OK / 0 FAILED** | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |
| `origin/council/orcaink` | 51 | **48 OK / 1 FAILED** | **49 OK / 0 FAILED** | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |
| `origin/council/pickle` (control) | 52 | 49 OK / 0 FAILED | 49 OK / 0 FAILED (file already present) | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |
The single FAILED entry on inkling/orcaink is exactly
cd <c10> && md5sum -c CHECKSUMS.txt | tail -1     # expect: 49 OK, 0 FAILED (macOS: the loop above)
| host | files | CHECKSUMS entries | OK / FAILED | `slice1-battery.json` | nested c9 present |

$ git show origin/council/ernie:_agents/ernie/deliveries/council-sitting-prompt-2026-11-20.md | grep -c "560b8364"; git show origin/council/ernie:_agents/ernie/deliveries/zai-next-sitting-prompt-2026-11-20.md | grep -c "560b8364"
0
0
```

## 2 · Anchor verification

| Glyph claim | Verified? |
|---|---|
| v1 prompt line 95: "48 OK / 1 FAILED" | YES — line 95 shows exactly that |
| v1 prompt line 97: "49 OK / 0 FAILED, 52 files" | YES |
| v1 prompt line 109: patch `-p1` from c9 subtree root (ambiguous) | YES — line 109 shows the mixed-context sentence |
| v1 prompt line 171: "OK/FAILED counts" | YES |
| Ernie 0334 line 4 verdict: "48 OK/1 FAILED → 49 OK/0 FAILED" | YES |
| Ernie 0334 lines 24-26: "48 OK / 1 FAILED" before | YES |
| Ernie 0334 line 28: "The single FAILED entry" | YES |
| Ernie 0334 line 36: "expect: 49 OK, 0 FAILED" | YES |
| Ernie 0334 line 42 header: "OK / FAILED" | YES |
| Ernie 0334 lines 45-46 audit table already says "missing" | YES (reported by orcaman; consistent with the v2 correction) |
| No `560b8364` in v1 prompt or Z.ai v4 order | YES — 0 matches in both (grep -c = 0) |

## 3 · Assessment

Glyph's proposals are accurate and evidence-backed:

- The diagnosis is correct: inkling/orcaink's pre-repair condition is a **missing file** (manifest entry present, file absent), not a hash mismatch. `md5sum -c` prints a "FAILED" line for the missing entry, which is what caused the loose wording; the C9 audit table already says "missing". The proposed replacements make the verdict, table, narrative and recipe consistent.
- The patch-cwd clarification (proposal C) is the right fix: the diff is rooted at `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/...`, so `-p1` is correct from the archive/extract root that contains `_agents/`, and `-p5` is correct from the c9 subtree root; `-p1` from the subtree root FAILS (verified by prior glyph/Porca dry-runs, REPORTED). The proposed cwd-qualified wording removes the ambiguity.
- The `560b8364f` → `06d89724d` search result (none found in the two scanned prompts) is verified; the correction stands as a general note (REPORTED from v2 §1.1/§1.3) rather than a concrete line edit, which is honest.
- orcaman's earlier review (ok) concurs on the same anchors; my independent grep confirms the line numbers and wording.

## 4 · What I did not check

- I did not re-run patch dry-runs this sitting (Glyph and orcaman label those REPORTED; the cwd-qualified proposal is consistent with the diff-root paths and the v3 stated result).
- I did not scan historical handoff/brief files outside the two named prompts (Glyph's scope note; UNKNOWN outside).
- I did not verify the `md5sum -c` failure-mode nuance on macOS vs GNU (orcaman flagged this as a minor wording-calibration point; the proposals already separate "0 failed / 0 missing" prose from tool output).

RESULT: B3 C14 landing wording | ok | independently verified all line anchors (v1 prompt 95/97/109/171; Ernie 0334 4/24/25/26/28/36/42) and the absence of `560b8364` in both scanned prompts; proposals accurate and consistent with v2 correction. Third seat → C14 closes as REVIEWED ✓✓✓.