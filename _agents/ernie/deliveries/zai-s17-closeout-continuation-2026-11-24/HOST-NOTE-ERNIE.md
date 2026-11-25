# HOST-NOTE — ernie hosts Z.ai's S17 closeout continuation (2026-11-24)

**SPEAKER: ERNIE | ROLE: advisor / host | TASK: host + review zai-s17-closeout-continuation-2026-11-24 | DATE: 2026-11-25**

## What this is
A read-only host of the Owner-supplied folder `zai-s17-closeout-continuation-2026-11-24`
(from the Owner's `~/Desktop/Football Sim/`), placed on `council/ernie` so any seat can read it
without the zip relay. Z.ai (the author) is a chat-only sandbox and cannot push; this is the
same hosting pattern I used for `zai-s15-closeout-2026-11-21` and `zai-s17-closeout-2026-11-23`.

## Fidelity (VERIFIED)
- Source: `/Users/kosi/Desktop/Football Sim/zai-s17-closeout-continuation-2026-11-24`
- Copy: `rsync -a --exclude=node_modules` → this directory.
- **779 / 779 non-node_modules files match the artifact's own `CHECKSUMS.txt` (md5), 0 FAILED, 0 MISSING.**
  Command: `while read -r h p; do ... /sbin/md5 -q "$p" ... done < <(grep -v node_modules CHECKSUMS.txt)`
  → `OK=779 FAILED=0 MISSING=0`.

## What is NOT here, and why
- **`node_modules/` (2008 files, ~88 MB) is excluded.** It is third-party, reconstructible with
  `npm ci` from the included `package-lock.json`, and would bloat the branch for no reading value.
  The artifact's `CHECKSUMS.txt` still lists node_modules lines; those 2008 lines are the only ones
  not verifiable here. Everything a reader needs (source, dist, docs, receipts, scripts, batteries,
  shots, data) is present and byte-identical.
- The complete 2787-file / 40 MB delivery zip remains the Owner's artifact of record
  (`zai-s17-closeout-continuation-2026-11-24.zip`, sha256 `16eca1fe…`, per Z.ai's session-end).

## Layout
- `CHECKSUMS.txt`, `UPDATE-README.md` — top-level package manifest + the one-page update note.
- `_agents/zai/` — Z.ai's lane files (END-OF-CHAT-ZAI.md, START-OF-CHAT-ZAI.md, ZAI.md).
- `zai-s17-closeout-2026-11-23/` — the artifact of record (the S15-closeout-continuation tree):
  docs (README, VERIFY, FIXLOG, SHELL-STATUS, SNAPSHOT, ACCEPTANCE-RECEIPTS, claims.json),
  `src/` (Svelte shell + frozen engine snapshot), `dist/`, `scripts/`, `batteries/`, `tools/`,
  `test/`, `data/`, `shots/`, `deliveries/receipts/partH-s15/`.

## Review
My independent review is filed separately at
`inbox/20261125-0030-ernie-zai-s17-closeout-continuation-review.md` (on `council/ernie`).