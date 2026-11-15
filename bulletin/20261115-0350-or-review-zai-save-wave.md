SPEAKER: or | ROLE: council | TASK: review Z.ai save wave 2026-11-14 (second sitting, desktop folder "zai save wave") | DATE: 2026-11-15

## Push receipt
- Pushed to origin/council/or @ 277760f2 (verified via git ls-remote)
- 24 files changed, 1,345 insertions, 234 deletions over prior sitting

## Verification results (all on pushed bytes)

### F-1: three previously-missing receipts — CLOSED
All three now present and checksum-verified:
- `measurements/C-engine-suite-fresh.txt` (34,946 B)
- `measurements/distfile-boot.json` (193 B)
- `measurements/d8-strength-control-output.txt` (2,037 B)

### F-2: SAVE-1 write median numbers — CLOSED (alignment confirmed)
Filing `inbox-20261114-zai-save1-write-median.md` now quotes the **receipt's** numbers (receipt-wins rule honored):
- Serialize: median 0.889 ms · p95 1.133 ms · mean 0.949 ms (n=201)
- Serialize+write(Map): median 0.893 ms · p95 1.143 ms · mean 0.954 ms (n=201)
- Earlier filing had quoted a later run (0.922/1.109/0.965); receipt stands, filing aligned, mismatch documented in filing's ALIGNMENT NOTE.

### F-3: pin byte-identity 52/52 path-mapping — CLOSED (independently confirmed)
- Inner MANIFEST 183/183 OK
- `diff -rq src/engine <(git archive 4ca9a071 -- colors/src | tar -x)` → exit 0, 52 files each side, 0 differing
- Path mapping named: `src/engine/core ↔ colors/src/core`, `src/engine/platform ↔ colors/src/platform`, `src/engine/sports/nfl/{app,engine,view} ↔ colors/src/sports/nfl/{app,engine,view}`
- Receipt in `logs/verification-4-inner-app.txt`

### Flex pin escalation — VERIFIED and ESCALATED
Two tables confirmed by hash:
- Retired REV 4 (pin 4ca9a071): `28a2e993…` (107 leaves, QB→FS 10)
- Live table (architect/muse): `0a26d7c2…` (99 leaves, QB→FS 12)
- App-tree copy kept byte-identical to pin (vendor contract), labelled with `.VENDOR-NOTE.txt` beside it, escalation filed to Architect/MUSE in `inbox-20261114-zai-flex-pin-escalation.md`
- Shipped app reads neither — engine inline table is the pin's REV-4 value; live table is the citable one

### Player-game join — VERIFIED (new major delivery)
- `data/player-game/player_game_2016-2025.csv.gz` — 253,107 rows, 2,761 games, 99.9% identity coverage
- Built from P-344 manifest-verified parquets + players.parquet crosswalk
- Receipt: `measurements/player-game-join-receipt.txt`
- Unblocks axis (c) key-player presence, Claude's L1 variance components, D.3 form real-data anchor

## Checksums
- Root CHECKSUMS.txt: 225/225 OK (exit 0)
- Inner 67-cakepanz-s3-s4-rev2/MANIFEST.txt: 183/183 OK

## State
Save wave review complete. All three OR findings from first sitting resolved on pushed bytes. Awaiting Owner rulings on D2 arms, CI/purity harness, React removal, P-354 v3 correction.