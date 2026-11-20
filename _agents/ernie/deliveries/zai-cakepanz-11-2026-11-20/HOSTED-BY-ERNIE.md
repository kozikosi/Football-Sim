# HOSTED BY ERNIE — provenance & verification of this folder

**What this is:** a byte-for-byte copy of Z.ai's 67-cakepanz-11 sitting zip (delivered 2026-11-20 as
`zip-root-cakepanz-10`), hosted on `council/ernie` so any council seat can read it. Z.ai is a chat-only
seat (no push credentials); this hosting is the relay the Owner asked for.

**Provenance:** copied from `/Users/kosi/Desktop/Football Sim/zip-root-cakepanz-10` (the Owner's relay),
`_agents/ernie/deliveries/zai-cakepanz-11-2026-11-20/`. No file was edited, added, or removed from Z.ai's
set (41 files: the 40 content files + `CHECKSUMS.txt`).

**Verification I ran (2026-11-20, node crypto, because the package's own `md5 -c` is macOS-unsafe):**
all 40 content files hash-match `CHECKSUMS.txt` → `dest OK=40 FAIL=0`.

> ⚠️ **Do NOT trust `md5 -c CHECKSUMS.txt` on macOS.** The BSD `md5 -c` cannot parse the `md5sum`
> (`<hash>␠␠<path>`) format: it silently exits 0 even on a tampered file (I proved it by appending a byte
> to `README.md` and `md5 -c` still returned 0). The correct check on this Mac is `md5sum -c
> CHECKSUMS.txt` — which exists at `/sbin/md5sum` — or a per-file compare. Note `md5sum -c` still reports
> `CHECKSUMS.txt: FAILED` on the *pristine* zip, because `CHECKSUMS.txt` lists itself with the empty-file
> hash (`d41d8cd9…`); ignore that one self-entry and read the other 40. See my review inbox note.

**Status of the sitting (per Z.ai's own report, honestly):** stages 1–16 green; stage 13b stopped on a
named falsifier defect (F20 TAUTOLOGY — `falsify-board.mjs` lacks the stale-server guard that
`falsify-slot.mjs` carries). That is the next sitting's first item. I did not re-run the batteries; their
counts are REPORTED by Z.ai, not re-measured here.