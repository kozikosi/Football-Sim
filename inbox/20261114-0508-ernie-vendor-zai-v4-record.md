SPEAKER: ernie | ROLE: council | TASK: vendor Z.ai's v4 filing onto a remote (Owner instruction "push it") | DATE: 2026-11-14T05:08Z

**Done. Z.ai's v4 filing is now on a remote for the first time.** Commit **`ed0ec4df`** on `council/ernie`.

## Why it was needed

Z.ai's push to `council/zai` failed (exit 128, no credentials). His filing existed only as: (a) a local commit `a43621a` in his sandbox, and (b) a folder on the Owner's Desktop. Neither is readable by another seat via git — the council's record is its branches, and a desktop folder is not part of it.

## What is now on the remote

```
path:   _agents/ernie/deliveries/zai-fwtest10-2026-11-14/
files:  45   ·  248 KB
```

| File | sha256 |
|---|---|
| `MANIFEST.txt` | `8a469b37564bfc7f516916a5e3052820160262a65275a5b0227ab32c598a3e80` |
| `inbox_20261114-0406-zai-framework-eval.md` (39,314 B) | `a9f5d71fbd24e8715df70437e30d3022af7fed35a591d5652b1308a4b2fe2401` |
| `START-OF-CHAT-ZAI-updated-2026-11-14.md` | 11,074 B |
| `eval-logs/` | 42 files |

## Verification after copying (VERIFIED)

```
cwd:     /Users/kosi/Desktop/wt/ernie/_agents/ernie/deliveries/zai-fwtest10-2026-11-14
command: python3 recompute of every sha256 line in MANIFEST.txt against the files in the copied tree
output:  OK=44  MISMATCH=0  MISSING=0
```

**The copy is byte-identical to what Z.ai shipped:** the filing's hash matches his manifest's own entry (`a9f5d71f…fe2401`) after the copy, so nothing was re-encoded or truncated in transit.

## What this does and does not do

- **Does:** the filing is now citable by `ref@sha + path`, survives his sandbox, and any seat can `git show origin/council/ernie:_agents/ernie/deliveries/zai-fwtest10-2026-11-14/inbox_20261114-0406-zai-framework-eval.md`.
- **Does not:** make it part of `council/zai`. **That branch is still at `25e3b2f`, and `a43621a` is still absent from it** — I have not touched another seat's branch and will not. If Z.ai later gets credentials, he should push `council/zai` normally; my vendored copy is a reading copy, not a substitute for his branch.

## Standing note for the digest

If any document cites Z.ai's v4 filing, **cite the vendored path at `council/ernie` `ed0ec4df`**, not "his zip" or "his branch". His zip does not exist on this machine (there is no `download/` directory anywhere under `/Users/kosi`), and `download/zai-framework-eval-2026-11-14.zip` (sha256 `31df79e2…`) therefore cannot be checked — the 45 files that do exist all verify.

Labels: **VERIFIED** — the copy, both hashes, the 44/44 manifest recompute, and the pushed ref `ed0ec4dfc3532bc971bbeee675bbfeef603c89d8` on `origin/council/ernie`. **UNKNOWN** — the zip's `31df79e2…` hash (no zip present).

*Filed by ERNIE (advisor) · 2026-11-14T05:08Z · I modified none of Z.ai's files; the vendor is a byte-for-byte copy.*

**PRIORITY+:** Z.ai v4 vendored | P1 | now on a remote at `council/ernie` `ed0ec4df` (45 files, MANIFEST 44/44, filing sha a9f5d71f…); council/zai still 25e3b2f and untouched | ERNIE this file.