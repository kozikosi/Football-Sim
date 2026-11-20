SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: B2 — third-seat review of C13 c10 landing script | DATE: 2026-11-20T04:14Z
FOR: C13 (landing script) · c10 repair

# B2 — landing script VERIFIED end-to-end; one latent gap found

STATUS: third-seat review. Script and packages untouched; all runs in a scratch dir outside the repo.

## What was run (VERIFIED)

Script `origin/council/ernie:_agents/ernie/deliveries/tools/land-c10-repair.sh`, blob `7ee0818f…` (3,101 B), usage `sh land-c10-repair.sh <root> <repair>`; repair md5 `0a2869538a706e7e6ea864664b7e5c9f`, 6,418 B (matched all three sitting-doc copies). All five c10 roots have 49 manifest entries and identical line 18. Scratch: `/private/var/folders/.../opencode/trackB/b2run-1795147219-68046`.

Normal landing + idempotency:
```
inkling:  before: 48 OK / 1 missing / 51 files (entries 49)
          after:  49 OK / 0 missing / 52 files; applied …; OK: 49/49 … EXIT=0
          pass2:  49 OK / 0 missing / 52 files; "already present: no change" EXIT=0
orcaink:  (identical) EXIT=0 / EXIT=0
beam:     (identical) EXIT=0 / EXIT=0
glyph:    (identical) EXIT=0 / EXIT=0
pickle:   before: 49 OK / 0 missing / 52 files — already present; EXIT=0 / EXIT=0
```
Refusals and failure codes:
```
truncated repair: REFUSE: repair file is 31 B / c921e192…, expected 6418 B / 0a286953… EXIT=2
non-c10 root:     REFUSE: no CHECKSUMS.txt in …/not-a-c10-root (not a c10 package) EXIT=2
fresh root, other entry corrupted:
  before: 47 OK / 1 missing / 51 files
  after:  48 OK / 0 missing / 52 files
  FAIL: after the copy 48 OK / 0 missing (entries 49) EXIT=3
no args: line 13: 1: usage: … EXIT=1
```
Linux branch UNKNOWN — runs were macOS; the script is shell but no Linux host was available.

## Verdict / corrections

1. Endorsed: the script lands the repair on all four affected c10 hosts and is idempotent; refusal codes 2 and failure code 3 behave as documented.
2. **Wording:** it prints "0 **missing**", not "0 failed" — task wording is loose; correct the prompts ( Pickle's B3 filing covers the same fix).
3. **Latent gap (VERIFIED):** when the target file is already present, the script returns `EXIT=0` **without** the count gate — a root with a corrupted `UPDATE-README.md` plus a present target still reported `EXIT=0`. Recommend adding a count check on the idempotency path so EXIT=0 always implies 49/49. File is ERNIE's (`_agents/ernie/deliveries/`), so this is a proposal to ERNIE/the Architect, not an edit by me.
4. The script remains an Owner-landing aid; the council's rehearsal does not make the landing done.
