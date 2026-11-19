SPEAKER: INKLING | ROLE: seat (MUSE delegation) | TASK: A9 — the expected prints for z.ai's acceptance-run composite, per step (the canonical receipt for whoever re-verifies) | DATE: 2026-11-19T06:45Z

Source: the prepared composite's raw log `receipts/partH-c9/k2-acceptance-run-prepared.log` (29,498 B; `COMPOSITE EXIT CODE: 0`;
`== ACCEPTANCE RUN COMPLETE — every step exit 0; the full outputs are this file ==`; 18 × `EXIT_CODE=0`). Step shapes below are the
script's own section banners (`scripts/acceptance-run.sh`), byte-verified against that log. Expected values are from MY OWN runs
(2026-11-19T01:45–04:30Z, node v26.13.0, playwright chromium-1200, fresh `npm ci`) — they re-verify everywhere the machine class matches.
The shipped tree differs from prepared ONLY in step 2 (engine 394/394 vs 406/406 prepared) — all other prints are identical between trees.

## Per-step expected prints (shipped tree — k1's target)

| # | step (script banner) | expected print |
|---|---|---|
| 1 | `== 1. npm ci (clean lock — no --legacy-peer-deps) ==` | `added 41 packages … found 0 vulnerabilities` (esbuild allowScripts warning is expected, not a failure) |
| 2 | `== 2. npm run test:engine … ==` | `ℹ tests 394 / pass 394 / fail 0`, `duration_ms ≈ 45–55 s` |
| 2b | `== 2b. npm run precompile ==` | precompiled engine copy regenerated; exit 0 |
| 3 | `== 3. the node battery … ==` | `ℹ pass 33 / fail 0` |
| 4 | `== 4. npm run build ==` | `✓ built in … s`; dist assets listed |
| 5 | `== 5. npm run distfile ==` | `dist/single.html … 511.x KB`; **`670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1`** at the final bytes |
| 6 | `== 6. vite preview serves dist/ ==` | no failure banner (blank page = assets missing → fail) |
| 7 | `== 7. npm run battery ==` | `== SLICE 1 BATTERY · 29 pass · 0 fail · 10 skip (loud, with reasons) · 3 deferred to cutover ==` |
| 8 | `== 8. the shell battery S1a–S31 + L12 ==` | `== SHELL BATTERY · 48 pass · 0 fail ==` |
| 8b | `== 8b. the uniform-board battery ==` | `== BOARD BATTERY (uniform) · 6 pass · 0 fail ==` |
| 9 | `== 9. boot probes ==` | file:// legs PASS (S26/S27/S28 rode inside the shell battery; probe banner with PASS lines) |
| — | `== the Owner-flagged contrast questions ==` | `1.51:1 … FAIL — light gold2 #e6c67d on pale rose #fdf2f6` and `1.65:1 … FAIL` (two FAILs — **expected, unchanged**, the Owner-gated pair) + `5.27 / 14.94 / 11.30 PASS` |
| 10 | `== 10. the P-369 node-count probe ==` | P-369 PASS block (rows baseline 60 per screen at both viewports) |
| 11 | `== 11. the reduced-motion screenshot pairs ==` | pairs + sha block, exit 0 |
| 12 | `== 12. the receipt falsifiers F0–F12 ==` | `F0–F12 ALL DIED, exit 0` (per h11 at shipped bytes) |
| 13 | `== 13. the shell falsifiers FA/FB/FC ==` | `FA/FB/FC ALL DIED, exit 0` (per h12) |
| 13b | `== 13b. the uniform-board falsifier ==` | `F0-board 6/6 … F0-shell 48/0 … F15-board/F17/F18/F19/F20/F21/F22 ALL DIED, exit 0` (per h13 AND my own re-run — both print this) |
| 14 | `== 14. node scripts/regen-manifest.mjs ==` | `regen: 314 entries` exit 0 |
| 15 | `== 15. node scripts/gate-manifest.mjs ==` | `gate-manifest: PASS (314 entries verified, dist/ covered, converse clean)` exit 0 — **only after the one dotfile is placed** (`.gitignore`, sha `f27658cc…`); at the 2026-11-19 delivered bytes it prints `MANIFEST FAIL (missing): .gitignore` and exit 1 — that failure is the KNOWN delivery gap, not a script bug |
| 16 | `== 16. … gate-numerals … CLEAN (1st pass) ==` | `gate-numerals: CLEAN ×2 (old pin named only in correction context; no unfilled markers)` exit 0 |
| 17 | `== 17. … CLEAN (2nd pass) ==` | same, exit 0 |
| verdict | `== ACCEPTANCE RUN COMPLETE — … ==` | exact tail line; `COMPOSITE EXIT CODE: 0` as the outer echo |

Exit-codes contract: **18 × `EXIT_CODE=0`** (17 steps + the verdict), zero `EXIT_CODE=1`.

## Differences when the Owner's fixed ZIP arrives
- The re-zipped package may differ only in the Class-1/2/3 doc lines A1 enumerates + the placed `.gitignore` (byte `f27658cc…`).
- The prepared tree repeats the table with step 2 = **406/406**.
- Any other byte drift = A1's table, fix it there first; do NOT accept a renum-run as "the composite passed" if any single step differs from this table.

— INKLING, 2026-11-19T06:45Z; every expected value above re-measured this window except where labelled REPORTED (H12/h11 falsifiers — internal-consistent logs, not re-executed here beyond my h13 re-run).
