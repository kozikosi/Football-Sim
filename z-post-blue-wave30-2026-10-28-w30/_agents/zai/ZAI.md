# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat-only via IM (no git push — the sandbox reads GitHub but cannot push; work reaches the repo through the end-of-chat zip, relayed by the Owner or imported by Beam via `tools/import-zip.sh zai <zip>`). · **State:** **High Councillor** (below the Architect Claude, above advisors; Owner, 24 Oct 2026) · Builder of **Z-post-blue**, the single-file football-sim HTML, wave by wave from the Owner's verbatim directives.

## Current work
- **Wave 30 SHIPPED (session 22, 2026-10-28):** `Football-Sim-Z-post-blue-w30.html` · md5 `8d8e1a4bfb0d91849f110071868fc756` · 1,367,386 B · built on my delivered w29 (`7286495b…`) via 61 asserted edits (`_agents/zai/tools/w30_patch*.py`).
- Landed: sage-teal ANCHOR chips; global 85+ bold law; AGI/COD/INJ/AWR removed + narrowed browser; name+OVR never split; **series 7 default**; comparison full team names + right-aligned Team B + menus sized for the longest name; field maps with **CBs over the LOS opposite the WRs, Nickel left of the Mike, Dime stacked at the Nickel**; the key keeps the shapes (DT2 square, ILB2/SAM triangles, backs circles) across Defense + Coaching cards; draft (X.Y) in Cinzel Decorative unbolded; **DIME formatted like every row**; **TE3/WR4/DL5 in every visual menu** (display only — the math is Claude's lane) + DL in the glossary; post-draft cinematic −2 s; quarter cards unconditional (1 s dwell); pbp in team colors with beneficiary-colored boxes; **X [FF] Y** one line (no recoveries live), **X [INT][TD] Y**, **X [SAF] Y** with recorded victims; dark team colors lifted on the game screen; **CAR** for carries; **never SKS**; all dropdown titles caps; **shuffled schedule** (divisional home+away kept); **SIM GAME** button → instant one-game sim → Game Review.
- Verify: `w30_verify.js` 83/83 · `w30_stress.js` 25/25 (272-game season, SIM GAME drive, replay law over 5 games, 709-takeaway defensive-recovery audit) · agent-browser evidence ×13 · zero console errors.
- Zip: `z-post-blue-wave30-2026-10-28-w30.zip`. **8 interpretations await Owner veto** (notes/W30-INTAKE-LEDGER.md §Open).

## What the next session needs
- **Read first:** this file → `START-OF-CHAT-ZAI.md` §3 → the Owner's newest message (always the top directive). Intake-ledger it before building.
- **Baseline:** w30 product (md5 above) — verify whatever the Owner says is latest against §3/§4 before building w31.
- **Open items:** the 8 w30 vetoes; TE3/WR4/DL5 math (Claude's lane — slots render empty until it lands).

## Do not redo
- The w29 field-grid law (`.zpb-fm-row > i` with `--x` per station) — w30 reorders stations on the SAME grid.
- The badge-law chains (gameStatLine / seasonStatLine / leaders headers) — now CAR + SK everywhere; the suites assert them.
- The replay runEvents/describe rewrite (w30) — quarter cards are precomputed per quarter; turnovers are single lines; do not reintroduce event-driven quarter banners.

## Files in this lane
- `notes/` intake ledgers + build reports + evidence (`notes/evidence/`)
- `tools/` patch scripts + verify/stress suites (w30_* this wave)
- The product HTML ships at the zip root; the workflow trio at `_agents/zai/`.

## Rules that changed since w29
- Carries read **CAR** (was C); sacks read **SK in every count** (was SK/SKS) — the Owner reversed both w28 rulings.
- The comparison dropdowns show the **full team name at every width** (was nickname below 1100 px).
- The depth chart carries **TE3/WR4/DL5** (display-only) and the Dime row uses the standard row format.
