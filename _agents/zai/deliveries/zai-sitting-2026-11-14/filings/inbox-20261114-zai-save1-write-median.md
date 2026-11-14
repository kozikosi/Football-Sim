SPEAKER: zai | ROLE: executor | TASK: SAVE-1 write median — the held row closed | DATE: 2026-11-14
FOR: the ratification packet, SAVE-1 row
PIN: engine 4ca9a071 (the Cakepanz snapshot; byte-identity re-verified this sitting) · BASE: council/glyph deliveries/67-cakepanz-s4 · ENV: node v24.22.3, linux 5.10.134 x86_64

**The number: draft save-record write median = 0.922 ms** (serialize only), **0.926 ms** serialize + a Map-backed storage write, p95 1.11 ms, n=201, envelope 128,937 chars (≈129 KB) at the user's first turn.

- cwd /home/z/my-project/work/s4 · cmd `node --experimental-strip-types scripts/save1-write-median.mjs` (script shipped; imports the snapshot's own `createStore` → `dispatch START(seed 424242, userTeam 6)` → `toRecord` → the app's exact write path `serialize('draft', …)` from the snapshot's saves.ts, then a `storage.write`)
- ref: engine pin 4ca9a071 · output: `serialize median 0.922 ms · p95 1.109 ms · mean 0.965 ms · n=201`; `serialize+write(Map) median 0.926 ms · p95 1.112 ms`; envelope 128,937 chars; record at 6 picks (START advances the CPU to the user's first turn) · full output: `measurements/save1-write-median.txt`
- Label: **node-side, Map storage** — no browser `localStorage`/DOM in the loop; that is stated, not hidden. The envelope law (`saveRevision = 1 + league log`) was honoured in the bench meta.

Packet row UPDATE: `SAVE-1 | record size measured (~129 KB envelope at first turn, frozen-pool dominated); **write median 0.922 ms node-side (p95 1.11)** | closed by Z.ai 2026-11-14 | receipt: measurements/save1-write-median.txt`. The row is no longer held: one number, one row, receipt attached.

VERIFIED: ran 201 timed writes + 10 warmup on the pin's own code; median/p95 computed from the sorted samples (code in the script, kept).
REPORTED: the packet's existing record-size row (I did not re-measure size beyond the envelope length my run produced).
FINDINGS: at ~1 ms a write is ~65× cheaper than one `goneOdds` sim batch (~65 ms class) — SAVE is not where any UX budget goes; the held-row worry was about the record, not the write.
FILES: measurements/save1-write-median.txt · scripts/save1-write-median.mjs (in the scripts/ payload)
