# Z.ai sitting delivery — 2026-11-14 · 67 Cakepanz Slice 3 (P-316) re-verified re-delivery + the held rows + the corrections + the receipt-chain closure (next sitting, same day)

**Seat:** Z.ai (Executor of Z-post-blue and 67 Cakepanz) · **Engine pin used:** `4ca9a071` (byte-identical, re-verified before AND after the build — and re-verified AGAIN this sitting by diff, 52/52) · **Framework:** unchanged from the reviewed delivery (Svelte 5 + Vite, the thing three reviews already covered) — no new framework choice was made this sitting; the ruling stays the Owner's.

**What this sitting added (the six-seat review union, all closed):** the three cited-but-absent measurement receipts re-run and shipped (`measurements/`, numbers reproduced exactly); the app-tree `flex.json` labelled as the pin vendor it is (NOT deleted — see `67-cakepanz-s3-s4-rev2/tools/mathlab/flex.json.VENDOR-NOTE.txt` and the escalation filing); the pin escalation filed to Claude/MUSE; SAVE-1 filing numbers aligned to its receipt (receipt stands); the README count fixed (nine, not seven); the battery-JSON line; the D.1–D.9 axis table + the etc. paragraph; the player-game join (the λ Lab prerequisite); a fresh mobile low-end boot receipt.

## What is in this folder

| path | what |
|---|---|
| `67-cakepanz-s3-s4-rev2/` | the full corrected slices 3+4 tree (183 files + MANIFEST.txt): the three review-required doc fixes applied (slice3 README law count 12→17, CHECKSUMS regenerated on final bytes 22/22, index.html title slices 1-4), `batteries/slice1-battery.json` from THIS sandbox's live run. **Note: `batteries/slice1-battery.json` rewrites itself on every battery run — its MANIFEST/CHECKSUMS entries describe the shipped run's bytes, not what a future run on your machine will produce.** |
| `filings/` | NINE inbox-format filings from the sitting (fwtest10 corrections, closure items, Slice 3 re-delivery, SAVE-1, D.8, pool study, P-324 audit, Slice 2 spec, v3 experiments) PLUS the next-sitting filings (flex-pin escalation, P-345 axis table, player-game join, Slice 3 confirmation) — the full list is `ls filings/` |
| `measurements/` | raw outputs, all seven receipts now present: d8 strength control (`d8-strength-control-output.txt`), SAVE-1 write median (`save1-write-median.txt`), pool study (`pool-study.txt`), flex leaf counter (`flex-leaf-counter.txt`), CRLF digest experiment (`digest-crlf-experiment.txt`), fresh 323-test engine-suite log (`C-engine-suite-fresh.txt`), dist-file boot JSON (`distfile-boot.json`), plus the new player-game join receipt (`player-game-join-receipt.txt`) |
| `logs/` | W1 re-derivation from bench1 primary sources · Firefox/WebKit verbatim failures · the four verification outputs of this sitting (`verification-*.txt`) · fresh boot run log (`distfile-boot-fresh.txt`) |
| `data/player-game/` | the player-game join (the λ Lab prerequisite): `player_game_2016-2025.csv.gz` (253,107 rows, one per player-game) + `sample-2016-head25.csv` — receipt in `measurements/player-game-join-receipt.txt`, script in `scripts/player-game-join.py` |
| `flex-live/tools/mathlab/flex.json` | the LIVE flex table (sha256 `0a26d7c2…`, 99 leaves, QB→FS 12), shipped + labelled per v3 §8.3. **This is the only citable flex table; a reader must use this one.** The app-tree copy (below) is the pin vendor and is NOT the live table. |
| `67-cakepanz-s3-s4-rev2/tools/mathlab/flex.json` | byte-identical to pin `4ca9a071` (`28a2e993…`, retired REV 4, QB→FS 10) — kept as-is on purpose: `src/engine` is vendored from that pin (52/52 verified), so this file must equal the pin for the vendor contract to hold. Read `flex.json.VENDOR-NOTE.txt` beside it. The pin itself is stale; escalation filed. |
| `START-OF-CHAT-ZAI.md` | §2 rewritten to this sitting's state |
| `CHECKSUMS.txt` | sha256 of every file in this folder except itself and `logs/verification-1-checksums.txt` (that log is the receipt OF this check and cannot checksum itself — both exclusions stated in the log; verify: `sha256sum -c CHECKSUMS.txt`, expect all OK, exit 0) |

## How to verify (four checks, per ERNIE v-final §4 — outputs shipped in `logs/`)

1. **files present:** `sha256sum -c CHECKSUMS.txt` at this folder's root (expect all OK, exit 0) → `logs/verification-1-checksums.txt`.
2. **files claimed (catches citing files that do not exist):** `grep -oE '\`measurements/[A-Za-z0-9_.-]+\`' filings/*.md | tr -d '\`' | sort -u | while read p; do [ -e "$p" ] || echo "CITED BUT ABSENT: $p"; done` (expect no output) → `logs/verification-2-citations.txt`.
3. **the flex check (two files is EXPECTED; the app-tree one must equal the pin):** `find . -name flex.json -exec sha256sum {} \;` — `28a2e993…` = pin `4ca9a071` (KEEP — vendor contract; see the VENDOR-NOTE beside it), `0a26d7c2…` = live (USE THIS one; `flex-live/`) → `logs/verification-3-flex.txt`.
4. **inner app:** inside `67-cakepanz-s3-s4-rev2/`: `sha256sum -c MANIFEST.txt` (183/183) and `diff -rq src/engine <(git archive 4ca9a071 -- colors/src | tar -x -C "$SCRATCH")` (52/52, exit 0) → `logs/verification-4-inner-app.txt`. Path mapping: `src/engine/core` ↔ `colors/src/core` · `src/engine/platform` ↔ `colors/src/platform` · `src/engine/sports/nfl/{app,engine,view}` ↔ `colors/src/sports/nfl/{app,engine,view}`.
Functional: `npm install && npm run test:engine` (284/0) and with `npx vite preview --port 4179` running, `node batteries/slice1.battery.mjs` (61/0/10 loud/3 defer; the battery JSON rewrites itself each run — its checksums describe THIS folder's shipped bytes).

## One-line note for the Owner

Push fails in this sandbox (no credentials — START §5.8); this folder + MANIFEST + the zip is the handoff, ready for a credentialed seat to vendor byte-exactly.
