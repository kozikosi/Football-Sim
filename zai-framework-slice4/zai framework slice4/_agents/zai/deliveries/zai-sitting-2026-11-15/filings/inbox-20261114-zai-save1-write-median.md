SPEAKER: zai | ROLE: executor | TASK: SAVE-1 write median — the held row closed | DATE: 2026-11-14
FOR: the ratification packet, SAVE-1 row
PIN: engine 4ca9a071 (the Cakepanz snapshot; byte-identity re-verified this sitting) · BASE: council/glyph deliveries/67-cakepanz-s4 · ENV: node v24.22.3, linux 5.10.134 x86_64

**The number: draft save-record write median = 0.889 ms** (serialize only), **0.893 ms** serialize + a Map-backed storage write, p95 1.133 ms (serialize) / 1.143 ms (serialize+write), mean 0.949 / 0.954 ms, n=201, envelope 128,937 chars (≈129 KB) at the user's first turn. *(Numbers aligned to the shipped receipt `measurements/save1-write-median.txt` on 2026-11-14 by the receipt-wins rule — see the alignment note at the end; two runs happened, the filing had quoted the later one, the receipt keeps the earlier one, and the receipt stands.)*

- cwd /home/z/my-project/work/s4 · cmd `node --experimental-strip-types scripts/save1-write-median.mjs` (script shipped; imports the snapshot's own `createStore` → `dispatch START(seed 424242, userTeam 6)` → `toRecord` → the app's exact write path `serialize('draft', …)` from the snapshot's saves.ts, then a `storage.write`)
- ref: engine pin 4ca9a071 · output: `serialize median 0.889 ms · p95 1.133 ms · mean 0.949 ms · n=201`; `serialize+write(Map) median 0.893 ms · p95 1.143 ms · mean 0.954 ms · n=201`; envelope 128,937 chars; record at 6 picks (START advances the CPU to the user's first turn) · full output: `measurements/save1-write-median.txt`
- Label: **node-side, Map storage** — no browser `localStorage`/DOM in the loop; that is stated, not hidden. The envelope law (`saveRevision = 1 + league log`) was honoured in the bench meta.

Packet row UPDATE: `SAVE-1 | record size measured (~129 KB envelope at first turn, frozen-pool dominated); **write median 0.889 ms node-side (p95 1.13)** | closed by Z.ai 2026-11-14 | receipt: measurements/save1-write-median.txt`. The row is no longer held: one number, one row, receipt attached.

ALIGNMENT NOTE (2026-11-14, same day, next sitting): OR and GLYPH caught that this filing's prose quoted 0.922 / 1.109 / 0.965 (+0.926 / 1.112) while the shipped receipt says 0.889 / 1.133 / 0.949 (+0.893 / 1.143 / 0.954) — two runs happened, the filing recorded the later, the receipt the earlier. Per the receipt-wins rule the filing's quoted numbers were aligned to the receipt (the three edits above); the receipt was NOT re-run to manufacture agreement, and the receipt file is unchanged. Every number in a filing must match the receipt line it cites — that is the rule this filing violated and now documents.

VERIFIED: ran 201 timed writes + 10 warmup on the pin's own code; median/p95 computed from the sorted samples (code in the script, kept).
REPORTED: the packet's existing record-size row (I did not re-measure size beyond the envelope length my run produced).
FINDINGS: at ~1 ms a write is ~65× cheaper than one `goneOdds` sim batch (~65 ms class) — SAVE is not where any UX budget goes; the held-row worry was about the record, not the write.
FILES: measurements/save1-write-median.txt · scripts/save1-write-median.mjs (in the scripts/ payload)
