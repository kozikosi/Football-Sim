SPEAKER: Groq | ROLE: advisor | TASK: P-284 | DATE: 2026-11-06T11:56:00Z

FOR: P-284 (P1) — Finalize ONE weights table

RELAYED BY: Owner via MUSE (High Councillor). Groq is a chat-only seat and cannot write to the repo; this filing is Groq's P-284 table as relayed by the Owner in chat. All claims are REPORTED (Groq did not run the sweep; the data was supplied in the web prompt).

---

**REPORTED** (all impact numbers, ranks, gaps, DEFAULT_WEIGHTS, Colors values, and the bulk of the median salaries are taken directly from the data supplied in the prompt; I did not run the sweep. Salary tiers for IDL/DT, S, RT/OT2, and P are from the Over The Cap 2024 "Players 11 to 20 / 21 to 32" table published in the Contract Growth in 2024 post; CB3 has no clean tier so is marked judgment. Unmeasured slots use Colors as the explicit starting point plus judgment.)

### Approach and closest table
Primary driver is the **revealed impact** (slotWinsPerOvr) because it is the measured wins effect. Secondary adjustments: (1) keep depth/role realism (SAM barely plays; K and P are special teams), (2) pull toward median market where the gap is extreme and the role is not pure starter, and (3) keep the WR2/WR1 ratio near the verified 0.544.

On secondary (CB2/CB3/SS/FS) I **follow the engine/revealed impact over the market**. The measured wins are clear and large; the market under-pays the positions relative to those wins.

The resulting integers sit **closest to the Colors slots.ts table** (new engine) but are shifted toward the revealed-impact order: WR1 and the secondary are raised relative to DEFAULT, interior OL / DT2 / SAM / RB1 are lowered relative to both DEFAULT and (in places) Colors, and K is raised from DEFAULT but kept below pure proportional impact because of its special-teams nature and low market pay. Unmeasured slots stay near Colors.

All recommended weights are integers on a **QB = 1000** scale. Full 32-slot table below.

### Full recommended table (P-284)

| Slot | (a) Revealed impact | (b) Impact rank | (c) DEFAULT weight rank (approx) | (d) Gap (impact rank – weight rank) | Flag? | (e) Median / starter-tier salary (source & tier) | (f) **Recommended weight (QB=1000)** |
|------|---------------------|------------------|----------------------------------|-------------------------------------|-------|--------------------------------------------------|——————————————————|
| QB | 0.12707 | 1 | ~3–4 (tied with DT1 after DE1/CB1) | –3.5 | Near | $28.28M (OTC 11–20) | **1000** |
| CB1 | 0.07215 | 2 | 1–2 | –0.5 | No | $10.88M (OTC CB 11–20) | **570** |
| DE1 | 0.06505 | 3 | 1–2 | +1 | No | $18.00M (OTC EDGE 11–20) | **510** |
| CB2 | 0.05887 | 4 | ~9–11 | –5.5 | Yes (under) | $6.67M (OTC CB 21–32) | **460** |
| WR1 | 0.05517 | 5 | ~18–20 | –15 | Yes (under) | $19.18M (OTC WR 11–20) | **440** |
| DE2 | 0.05504 | 6 | ~12–14 (implied) | +4 | Yes (over) | $11.91M (OTC EDGE 21–32) | **430** |
| OT1 | 0.05179 | 7 | ~6–11 | –2 | No | $8.59M (OTC LT 11–20) | **410** |
| OT2 | 0.05179 | 8 | ~6–11 | –1 | No | $9.14M (OTC RT 11–20) | **400** |
| DT1 | 0.04729 | 9 | ~3–5 | +4.5 | Yes (over) | $16.43M (OTC IDL 11–20) | **370** |
| CB3 | 0.04700 | 10 | ~15–17 | –7 | Yes (under) | ~$4–6M (judgment; no clean OTC CB3 tier) | **365** |
| SS | 0.04422 | 11 | ~15–17 | –6 | Yes (under) | $8.13M (OTC S 11–20) | **350** |
| MIKE | 0.04315 | 12 | ~12–14 | –1 | No | $7.89M (OTC LB 11–20) | **340** |
| FS | 0.04271 | 13 | ~18–20 | –7 | Yes (under) | $8.13M (OTC S 11–20) | **335** |
| OG1 | 0.04262 | 14 | ~6–11 | +5.5 | Yes (over) | $11.07M (OTC OG 11–20) | **330** |
| OG2 | 0.04262 | 15 | ~6–11 | +5.5 | Yes (over) | $11.07M (OTC OG 11–20) | **325** |
| C | 0.04262 | 16 | ~6–11 | +5.5 | Yes (over) | $3.73M (OTC C 11–20) | **320** |
| WILL | 0.04014 | 17 | ~12–14 | +3 | No | $7.89M (OTC LB 11–20) | **315** |
| TE1 | 0.03999 | 18 | ~15–17 | +1 | No | $8.33M (OTC TE 11–20) | **310** |
| DT2 | 0.03796 | 19 | ~5–6 | +13 | Yes (over) | $10.96M (OTC IDL 21–32) | **300** |
| K | 0.03609 | 20 | 25 | –9.5 | Yes (under) | $3.90M (OTC K 11–20) | **280** |
| RB1 | 0.03327 | 21 | ~12–14 | +7 | Yes (over) | $5.46M (OTC RB 11–20) | **260** |
| WR2 | 0.03003 | 22 | ~21–22 | 0 | No | $10.74M (OTC WR 21–32) | **240** |
| WR3 | 0.01915 | 23 | ~23–24 | –1 | No | ~$4–6M (judgment / lower WR tier) | **150** |
| RB2 | 0.01099 | 24 | ~21–22 | +2 | No | $3.34M (OTC RB 21–32) | **90** |
| TE2 | 0.00719 | 25 | ~23–24 | +1 | No | $4.14M (OTC TE 21–32) | **60** |
| SAM | 0.00370 | 26 | ~18–20 | +6 | Yes (over) | ~$4–6M (LB depth) | **40** |
| DL5 | — (unmeasured) | — | — | — | — | ~$8–11M (IDL depth judgment) | **140** (Colors start + judgment) |
| P | — (unmeasured) | — | — | — | — | $2.15M (OTC P 11–20) | **100** (Colors) |
| DIME | — (unmeasured) | — | — | — | — | low (nickel/depth) | **40** (Colors) |
| FB | — (unmeasured) | — | — | — | — | low | **30** (Colors) |
| WR4 | — (unmeasured) | — | — | — | — | low | **15** (Colors + slight up) |
| TE3 | — (unmeasured) | — | — | — | — | low | **10** (Colors) |

**Notes on the six unmeasured slots (explicit):** Started from the Colors values (DL5 145, P 100, DIME 40, FB 30, WR4 10, TE3 10) and applied light judgment only for ranking consistency with the measured depth roles; no impact numbers exist, so these remain the weakest part of the table.

**WR2/WR1 ratio in this table:** 240/440 ≈ 0.545 (matches the verified revealed 0.544).

**Secondary statement (required):** Engine/revealed wins over market. CB2/CB3/SS/FS produce substantial measured wins; the median salaries understate that contribution, so the weights stay elevated relative to salary share.

This is a pure recommendation. Tables remain protected constants; any adoption requires Owner approval and the MERGE-MANIFEST re-pin under P-013.
