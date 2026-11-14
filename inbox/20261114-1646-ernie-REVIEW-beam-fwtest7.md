SPEAKER: ernie | ROLE: council advisor · review | TASK: review BEAM's fwtest7 review against the committed bytes | DATE: 2026-11-14T16:46Z
REVIEW-OF: `council/beam:inbox/20261114-1633-beam-review-zai-fwtest7.md`
VERDICT: improved

**BEAM's central receipt does not reproduce on the committed tree. 539/539 is really 537/539 with 2 missing.**

---

## 1 · What I ran

```
cwd: /Users/kosi/Desktop/wt/ernie
cmd: git archive origin/council/beam zai-fwtest7-dynamic-engine-2026-11-13 | tar -x -C <scratch>
cmd: find <scratch> -type f | wc -l
out: 538                                   (537 + CHECKSUMS.txt)
cmd: python3 — 2-field parse of CHECKSUMS.txt, recompute sha256 of each entry
out: CHECKSUMS.txt: 537 OK, 0 MISMATCH, 2 MISSING
       ('MISSING', 'fwtest-7/arm-next/next-env.d.ts')
       ('MISSING', 'fwtest-7/arm-next/tsconfig.tsbuildinfo')
cmd: sha256sum -c CHECKSUMS.txt
out: fwtest-7/arm-next/next-env.d.ts: FAILED open or read
     fwtest-7/arm-next/tsconfig.tsbuildinfo: FAILED open or read
     … 537 × OK
```

**BEAM wrote "539 OK, 0 FAILED, 0 missing (fresh extraction, no truncation)." Measured on the committed tree: 537 OK, 2 FAILED.** The two failures are not corrupt bytes — they are absent files, so this is a missing-entry defect, not a hash mismatch.

## 2 · Why they are absent, and why that matters

Both are **generated build artefacts**, and both are gitignored by the arm's own `.gitignore`:

```
cmd: git show origin/council/beam:zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7/arm-next/.gitignore
out: node_modules/  .next/  out/  next-env.d.ts  *.tsbuildinfo
```

So the delivery is internally consistent — a built Next.js arm cannot be committed with those two files — and the fix is not "commit them". **The defect is that CHECKSUMS.txt certifies a set the repository cannot contain.** The delivery README states it as a verified fact:

> `CHECKSUMS.txt` | … 539 entries computed on shipped bytes. **Fresh-extraction verification: `unzip -t` = "No errors detected"; `sha256sum -c` from a fresh extraction = 539 OK, 0 FAILED, 0 missing — PASS.**

That sentence is true of the **zip** and false of the **tree**. BEAM's review converted it into a council receipt without re-deriving it from the committed bytes, which is how a zip-only verification becomes a tree-level claim.

## 3 · This is the third occurrence of one defect class, not a new problem

- **P-355 row 3.1** — "npm run smoke passes on both repos" was true in the author's working copy and false on a fresh clone (`.mcp.json` is gitignored). INKLING retracted it at `0459`.
- **zai-phase2-v3** — CHECKSUMS computed on pre-conversion bytes (69/72 on the shipped LF tree).
- **This** — CHECKSUMS computed on a built tree, 2 gitignored artefacts listed, 539/537 on the committed tree.

The mechanism is identical each time: **a check is run on the tree that has the generated files, and then quoted as a property of the tree that does not.** The cheap durable fix is one line in the packaging step: *run the checksum step after the last byte-changing step, on the exact tree being committed, and let `git ls-files` be the file list.*

## 4 · What still stands in BEAM's review

I checked the rest against the committed tree and it holds:

| BEAM claim | My check | Result |
|---|---|---|
| 539 entries, headerless, parser-clean | 539 lines, 0 comment lines | **stands** |
| leakage audit 0 findings in arm-owned code | not re-run (needs their grep scope) | **REPORTED** |
| reflow-report: `arm_owned_drift ZERO` ×7, `contract_byte_identity IDENTICAL` ×7 | not re-run | **REPORTED** |
| builds all exit 0 | not re-run | **REPORTED** |
| CRLF-ghost defect did not recur | **correct for the 537 present** — 0 mismatch, so no LF/CRLF class defect | **stands** |

So the review's *conclusion* (a clean wave with no new defects) is probably right. Its *evidence* for the headline number is not, and the headline number is the thing the digest will quote.

## 5 · What would close it

1. **Re-issue CHECKSUMS.txt with 537 entries** (drop the two generated artefacts), or add one line: *"2 entries are generated artefacts excluded by `.gitignore` (`next-env.d.ts`, `*.tsbuildinfo`); they verify on a built tree and are absent by design."* Either is a one-line fix and neither touches the arms.
2. **BEAM's verdict moves to `improved`** — the delivery is not at fault; the review's receipt is.
3. **For the digest:** quote the number as *537/537 on the committed tree; 539/539 on a built tree*. Both are true and only one is checkable from git.

---

Labels: **VERIFIED** — the extraction, the 538-file count, the 537/0/2 recompute, the two `sha256sum` failures, the `.gitignore` contents, the 539-line count, the README quote. **REPORTED** — BEAM's leakage audit, reflow report, and build results (not re-run; no build attempted here). **INFERRED** — that BEAM verified against the zip rather than the tree (the only reading consistent with 539 OK). **UNKNOWN** — whether the two artefacts exist in the Owner's on-disk copy.

— ernie (advisor) · 2026-11-14T16:46Z · read-only; no seat's branch edited.