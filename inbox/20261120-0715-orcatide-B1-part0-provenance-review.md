SPEAKER: orcatide | ROLE: council advisor | TASK: B1 — review of the C24 Part 0 provenance + the wording fix (third seat) | DATE: 2026-11-20T07:15Z

REVIEW-OF: inbox/20261120-0435-orcatide-part0-provenance.md
VERDICT: improved

WHAT I RAN (receipts — commands + output):
- The absence of a verbatim Owner note:
  - `git grep -liE 'Part 0|part-?0' origin/council/muse -- _agents/owner-notes/ 2>/dev/null | head -3; echo notes-done` — VERIFIED (no output — nothing in `_agents/owner-notes/` (on council/muse) mentions Part 0/Part-0/part-0).
  - `git show origin/architect/engine-and-seats:claude/NOW.md 2>/dev/null | grep -cniE 'Part 0|part-?0'; echo now-md-count` — VERIFIED (`0` — no Part-0 match in the Architect's NOW.md).
- The two dist hashes (the sitting's B1):
  - `git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/dist/single.html 2>/dev/null | sha256sum | cut -c1-16` → `76de565836beebc6`; `git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/dist/single.html 2>/dev/null | wc -c` → `527162` — VERIFIED — the c10 package's cakepanz-4 dist: `76de5658…`/527,162 B — matches the standing (FIX-NOTES §1: the working dist — `76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964` | 527,162 B).
  - `git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4-prepared/dist/single.html 2>/dev/null | sha256sum | cut -c1-16` → `e3b0c44298fc1c14`; `... | wc -c` → `0` — the c10 package's `cakepanz-4-prepared` dist is EMPTY — a nit for the Architect (the standing's two dists are the working `76de5658`/527,162 and the delivered `670d4c08`/527,177).
  - `git show origin/council/inkling:_agents/inkling/67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/dist/single.html 2>/dev/null | sha256sum | cut -c1-16` → `76de565836beebc6`, `wc -c` → `527162` — VERIFIED — inkling's c10 package — same bytes.
  - `git show origin/council/orcaink:_agents/orcaink/67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/dist/single.html 2>/dev/null | sha256sum | cut -c1-16` → `76de565836beebc6`, `wc -c` → `527162` — VERIFIED — orcaink's c10 package — same bytes.
  - `git show origin/council/inkling:_agents/inkling/67-cakepanz-9-2026-11-19/cakepanz-4/dist/single.html 2>/dev/null | sha256sum | cut -c1-16` → `670d4c08f2ab9293`, `wc -c` → `527177` — VERIFIED — the c9 hosting (inkling) — the delivered artifact — matches the standing.
  - `git show origin/council/orcaink:_agents/orcaink/67-cakepanz-9-2026-11-19/cakepanz-4/dist/single.html 2>/dev/null | sha256sum | cut -c1-16` → `670d4c08f2ab9293`, `wc -c` → `527177` — VERIFIED — the c9 hosting (orcaink) — the delivered artifact — matches the standing.
- The sitting v4 B1 item + the wording suggestion; my C24 file read (the standing file — read at 04:35 — in context).

FINDINGS (labelled):
- The absence: VERIFIED — no verbatim Owner note anywhere searched (owner-notes — grep 0; NOW.md — grep 0). The relay exists only as the sitting report's statement + the Owner's owes — consistent with C24's "relay only".
- The dist hashes: VERIFIED — the c10 dists (pickle/inkling/orcaink) = `76de5658…`/527,162; the c9 hosting dists (inkling/orcaink) = `670d4c08…`/527,177. One finding, corrected (2026-11-20T07:20Z — from MUSE): the c10 package's `cakepanz-4-prepared/` copy is missing its entire `dist/` subtree — the tree lists only `.gitignore, CHECKSUMS, MANIFEST, SHELL-STATUS, START-OF-CHAT, VERIFY` (no `dist/`) — while its `CHECKSUMS.txt` still lists `dist/single.html` — the D1-class gap, stronger than the "empty" reading I first wrote (my receipt: `git show ... 2>/dev/null | sha256sum` hashed empty input for a missing path — the `e3b0c442…` is the empty hash). VERIFIED by `git ls-tree -r --name-only origin/council/pickle -- _agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4-prepared/` — receipt above. The Architect should restore the prepared `dist/single.html` from the c9 delivered bytes (md5 `670d4c08…`/527,177 B) as part of the landing.
- The wording (the B1 improvement — the sitting: "Endorse or improve the wording fix: 'as relayed 2026-11-19 (REPORTED…), not 'Owner-accepted release candidate' (C24's words)"): improved — suggested replacement for the C24 verdict line: "**Part 0 is REPORTED, not accepted** — as relayed by the council (the Owner's 21:45 ruling relayed — FIX-NOTES §1 of the v3 sitting; the original wording: 'the Owner-accepted release candidate (Part 0 ACCEPTED — REPORTED, the Owner's 21:45 ruling relayed by the council)'), not 'Owner-accepted release candidate'; the Owner owes 'confirm Part 0's word' (sitting v3 :71)."

ENDORSED: C24's verdict — relay only — with the improved wording above.

WHAT I DID NOT CHECK: the app-level behaviour of the dists (the standing — Pickle's four gates — not re-run — the standing says so).
