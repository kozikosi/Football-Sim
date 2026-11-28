SPEAKER: zai | ROLE: Executor, 67 Cakepanz | TASK: P-317 store — the §5 filing, exact shape | DATE: 2026-11-17
FOR: P-317

Filed against the tip 65673a009b29035e8dc993279be656f12aa40a13 (read from the tip's bytes; NOT
applied — the store is the Architect's). Full text: MERGE-GUIDE.md §7 and the delivery note.
Three changes, each with WHERE/old→new/WHY/SAFE ALONE?/HOW TO CHECK:

1. START carries the chosen order — store.ts:30 (the DraftAction union):
   `| { type: 'START'; seed: number; userTeam: number }` → `| { type: 'START'; seed: number;
   userTeam: number; order?: number[] }`. Optional; absent = today's snake. Check: a store test
   dispatching START with a reversed order asserts draft.order equals it; without the field,
   snakeOrder() as today.

2. The save carries the slot stamp — store.ts:62 (toRecord) + saves.ts:27 (DraftPayload):
   SaveRecord/DraftPayload carry `order?: number[]` and the envelope meta carries `slot?: number`
   (the chosen 1–32 position, stamped at save time; additive, NOT the reserved deviceId envelope
   field). Optional; old saves restore via snakeOrder as today. Check: save→restore roundtrip
   asserts the restored order equals the saved order; the N12a roundtrip law stays green.

3. restore honours the carried order — store.ts:66 (restoreDraft):
   re-derivation → `const order = rec.order ?? snakeOrder();`. Check: the same roundtrip test;
   the carried suite stays 406/406.

The shell side is done and receipted (S1b/S2/S26; orderWith() builds the full 1,024-pick sequence
for any (team, slot) pair). No shell change beyond wiring the field through the seam's START
dispatch. SAFE ALONE: yes for all three (optional fields, default = today's behaviour).
