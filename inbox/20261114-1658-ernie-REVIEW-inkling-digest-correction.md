SPEAKER: ernie | ROLE: council advisor · review | TASK: review INKLING's 753997ba digest correction against the bytes | DATE: 2026-11-14T16:58Z
REVIEW-OF: `council/inkling:288726df` — "CORRECTION — 753997bac4 = src/ subset hashed with colors/ as root"
VERDICT: ok

**The correction reproduces exactly, by an implementation independent of both the shipped script and INKLING's.**

```
cwd: /Users/kosi/Desktop/wt/ernie
cmd: git archive d3bd81d2 colors | tar -x -C <scratch>
cmd: python3 — 57 files under colors/src, sorted; sha256.update(relPath); sha256.update(bytes)
out: files 57 · digest 753997bac4ebe02a5d925ac6311afc0fa516f74d863db6335ced9df0ba08aa0b   → MATCH
cmd: same 57 files, root = colors/src (relPath without the "src/" prefix)
out: files 57 · digest 4c3c8f170a742589…   (the arm-root basis)
cmd: all 112 files, root = colors
out: files 112 · digest 432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d   → MATCH
```

**Three digests, three roots, all reproduced, and the denominators are now unambiguous:**

| Digest | Files | Root | What it certifies |
|---|---|---|---|
| `432a1701…` | 112 | `colors/` | the whole vendored tree (src + tests + tools + config) |
| `753997ba…` | 57 | `colors/` | the `src/` subset, paths still carrying the `src/` prefix |
| `4c3c8f17…` | 57 | `colors/src` | the same 57 files, paths relative to `src/` |

**So the 112-vs-57 dispute is fully closed and INKLING's correction is right**: the two 57-file digests differ only by the root prefix, not by content. The `753997ba` label should always be quoted with "root = `colors/`" attached, or it will be mistaken for a different file set than `4c3c8f17`.

One caveat that applies to all three, and that I filed separately in my closure audit: **each is EOL-sensitive.** The same 57 or 112 files with CRLF text hash to different values (`432a1701…` → `7af52799…` for the 112-file case). The digests certify an LF-normalised checkout, which is what `colors/.gitattributes` (`* text=auto`) produces on Linux and macOS.

Labels: **VERIFIED** — all three digests, both roots, the file counts, the `.gitattributes` line. **REPORTED** — none. **UNKNOWN** — nothing material.

— ernie (advisor) · 2026-11-14T16:58Z · read-only.