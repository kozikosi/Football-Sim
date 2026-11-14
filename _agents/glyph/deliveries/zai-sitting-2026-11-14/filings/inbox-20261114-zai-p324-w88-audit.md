SPEAKER: zai | ROLE: executor | TASK: P-324 — w88 Wins audit (the wave is already landed; this is the verification the queue asks for) | DATE: 2026-11-14
FOR: P-324
PIN: published w88 (origin/gh-pages Football-Sim-Z-post-blue-w88.html, 1,904,952 B) + live w89 (1,922,769 B, md5 8efa9099ae508532d5392a7c82436b05) · TABLE: muse `zai-w88-wins-2026-11-09.md` (a5ecc25e) · ENV: node v24.22.3, Playwright 1.65.1

**Finding: P-324's build is already on the site.** The published w88 introduced `window.ZPB_SLOTS_WINS` (the NEW P-321 table) + `window.zpbSlotWinsLocal` + `ZPB_SLOT_UI_ORDER` (the new ranking order), and every w88 display call site was rewired to it ("w88 (Owner): the column wears the NEW local Wins" ×3 sites); w89 carries the bytes unchanged. The w87 weight table `ZPB_SLOTS_W` survives only as a module-internal reference (not on `window`) — exactly the P-318 "internal reference" rule.

Receipts (all from bytes/runtime this sitting):

1. **Table vs the muse table, all 32 slots**: extracted `window.ZPB_SLOTS_WINS` from w88 and w89 (byte-identical to each other) and rounded each to one decimal → **32/32 match** the muse NEW table, including every corrected slot: QB 2.4706→2.5, DE1 1.7097→1.7, WR1 1.6071→1.6, DT1 1.3158→1.3, **OT1 1.2497→1.2** (the rounding-boundary slot), **WR2 1.1487→1.1**, CB1 1.0557→1.1, OG1 1.0001→1.0, MIKE 0.7934→0.8 … **TE2 0.2661→0.3**, CB3/NICKEL 0.2610→0.3, WR3 0.2470→0.2, CB4/DIME 0.1310→0.1, **SAM 0.1279→0.1**, K 0.1271→0.1, P 0.1182→0.1, WR4 0.1019→0.1, **RB2 0.0971→0.1**, TE3 0.0805→0.1, FB 0.0626→0.1.
2. **Ranking order**: `ZPB_SLOT_UI_ORDER` = QB, DE1, WR1, DT1, OT1, **WR2 6th above CB1**, … TE2, CB3, WR3, CB4, **SAM 26th**, K, P, WR4, **RB2 30th**, TE3, FB — the muse order exactly (CB3/CB4 render as NICKEL/DIME per the label law).
3. **Runtime audit (headless chromium, file:// load of w89)**: guide tab opened → **all 32 NEW wins values present in the guide text (32/32 distinct)**; the meaning wording is visible in tooltips and the guide tier line — "extra wins per season … 20-OVR upgrade at the position's local rate" (9× "wins per season" in source); weight sweep over all visible page text found **one hit: "Pick 25"** — a pick number, not a position value (the muse rule: a number that is something else stays).
4. **The score-panel group toggles** ("1000 weight in use :: QB1000" etc.) are a DIFFERENT, older, explicitly-labelled group-weight table (QB 1000 / RB 375 / WR 1200 / TE 450 / OT 800 / OG 650 / C 150 / EDGE 1100) — pre-existing team-score toggles, not a w86→w87 change and not a position value display; recorded, not touched.
5. Console: 0 page errors; the only console error in the session is the blocked `fonts.googleapis` fetch caused by my own network block (the w-series shell's known webfont fetch, recorded).

No stray w87 weight number remains anywhere a position value is shown. P-324's queue criterion ("guide and rankings buttons show the NEW Wins numbers and the new ranking order, no stray weight numbers, headless clean") is met by the bytes already on gh-pages — this filing is the review-side confirmation the queue asked for, from a fresh environment.

VERIFIED: table diff 32/32 · order match · runtime guide audit 32/32 · weight sweep 1 benign hit · md5s recorded.
REPORTED: the muse table's provenance (MUSE computed it on the Colors engine; `winsWithBase` ≡ slotWins20 at base 80, per the muse prompt).
FINDINGS: (1) the live w89's `zpbSlotWins70to90` fallback (weights × 0.00254 = the OLD secant values) is dead code on every audited path — all w88 call sites prefer `zpbSlotWinsLocal`; (2) OT1's exact value 1.2497 sits one rounding step below 1.25 — if the engine's P-321 landing ever nudges it, the display flips to 1.3; worth remembering, nothing to do.
FILES: scripts/w88-p324-audit.mjs (in the scripts/ payload) · this filing
