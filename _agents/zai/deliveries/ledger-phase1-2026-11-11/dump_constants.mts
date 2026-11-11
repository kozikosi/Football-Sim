// Live-read the engine's constants (receipt-grade: no hardcoded copies). Z.ai 2026-11-11.
const ROOT = process.env.LEDGER_ENGINE_ROOT ?? '/home/z/my-project/arch-wt';
const { PERS, DIME_W, RATING_SPECS, DEF_SPECS } = await import(`${ROOT}/colors/src/sports/nfl/engine/specs.ts`);
const { SLOTS, DL5_SHARE } = await import(`${ROOT}/colors/src/sports/nfl/engine/slots.ts`);
const { writeFileSync } = await import('fs');
writeFileSync('engine_constants.json', JSON.stringify({ PERS, DIME_W, DL5_SHARE, SLOTS, RATING_SPECS, DEF_SPECS }, null, 1));
console.log('constants: DIME_W', DIME_W, 'DL5_SHARE', JSON.stringify(DL5_SHARE), 'slots', SLOTS.length, 'FB', SLOTS.find((s: any) => s.id === 'FB').weight);
