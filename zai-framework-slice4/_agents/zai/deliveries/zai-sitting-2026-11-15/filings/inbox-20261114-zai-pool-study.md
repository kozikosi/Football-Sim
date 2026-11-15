SPEAKER: zai | ROLE: executor | TASK: the 1,921 pool study — position groups per draft + the dry question | DATE: 2026-11-14
FOR: ERNIE v3 §7.3
PIN: engine 4ca9a071 · data: the snapshot's own CSVs (madden27-ratings + free-agents-old-ratings + player-ids) · ENV: node v24.22.3

**Draft format (confirmed from the app, not UNKNOWN):** Cakepanz drafts with the engine's default — `newDraft(players, rng, DEFAULT_CONFIG, snakeOrder())`: **32 teams × 32 rounds = 1,024 picks, snake order, every team fills all 32 slots** (App.svelte `startDraft` → store `START` → draft.ts; `draft.ts:13-14` TEAMS_N=32, ROUNDS=SLOT_IDS.length=32). If the Owner's pick budget differs from 1,024, that is the one line I need from him — everything below scales with it.

**Pool:** 1,953 rows raw (1,941 ratings + 12 free agents); `newDraft` filters `role !== 'LS'` itself (`draft.ts:53`) → **1,921 draftable** (32 long snappers out). Supply by role: WR 212, CB 201, DT 199, EDGE 186, OG 140, TE 139, OT 134, RB 126, QB 92, OLB 94, FS 84, SS 83, ILB 79, C 68, K 35, P 33, FB 16.

**Per-draft contribution (three seeded full-CPU drafts, picks by role):**

| role | seed 1101 | seed 20261114 | seed 777 | supply | left |
|---|---|---|---|---|---|
| QB | 32 | 32 | 32 | 92 | 60 |
| EDGE | 106 | 105 | 105 | 186 | ~81 |
| CB | 107 | 108 | 111 | 201 | ~93 |
| DT | 85 | 89 | 86 | 199 | ~112 |
| WR | 132 | 128 | 131 | 212 | ~81 |
| TE | 71 | 74 | 71 | 139 | ~67 |
| RB | 85 | 87 | 83 | 126 | ~41 |
| OT | 74 | 71 | 71 | 134 | ~62 |
| OG | 67 | 67 | 68 | 140 | ~73 |
| SS | 50 | 48 | 50 | 83 | ~33 |
| FS | 41 | 42 | 41 | 84 | ~43 |
| ILB | 41 | 40 | 40 | 79 | ~39 |
| OLB | 38 | 38 | 40 | 94 | ~55 |
| K | 34 | 35 | 35 | 35 | **1–0** |
| P | 30 | 29 | 29 | 33 | **3–4** |
| C | 23 | 24 | 23 | 68 | ~45 |
| FB | 8 | 7 | 8 | 16 | 8–9 |

All three drafts completed **1,024/1,024 picks (DONE)** — no pick failure, no silent short-fill; flex/covered-destination uses 246–261 per draft.

**Can the draft run dry at any position? One line: NO — every destination's demand (slots × 32) is covered by the natural supply of the roles that can legally fill it, except FB (demand 32 vs 16 natural — covered by RB→FB free, per the live flex table) and the covered dests (DL5, NICKEL, DIME — covered by DT/EDGE, CB, and the DBs); the tightest positions are K (35 supply, 34–35 drafted), P (33 supply, 3–4 left) and FB (16 supply, 8 left, half the FB slots flex-filled by RBs). QB is the most rigid: exactly 32 of 92 every draft (one per team).**

- cwd /home/z/my-project/work/s4 · cmd `node --experimental-strip-types scripts/pool-study.mjs` (script shipped) · ref: engine pin 4ca9a071 (imports the snapshot's own buildPool/newDraft/cpuChoose/fit/SLOTS) · output: `measurements/pool-study.txt`

VERIFIED: three seeded drafts run to completion through the engine's own cpuChoose/applyPick; the demand table computed with the engine's own `fit()` legality (natural + flex), not a hand list.
REPORTED: the Owner's pick budget if it differs from the app's 1,024 (asked in one line in my reply).
FINDINGS: (1) K/P/FB are the scarcity spine — a future "draft runs dry" story lives there, nowhere else; (2) the 12 free agents ride in the 1,953 → 1,921 path (FA flag carried, LS filtered once in newDraft); (3) if P-317 ever passes a custom order, none of this changes — order permutes who picks when, not how many each position needs.
FILES: measurements/pool-study.txt · scripts/pool-study.mjs (in the scripts/ payload)
