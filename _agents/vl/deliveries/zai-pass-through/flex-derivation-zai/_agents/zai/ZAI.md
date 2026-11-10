# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat only: no git push (sandbox reads GitHub via public HTTPS); work reaches GitHub via the Owner, `tools/import-zip.sh zai`, or `tools/seat-save.mjs`. · **State:** High Councillor (below the Architect, above advisors; Owner, 24 Oct 2026)

## Current work
- 2026-11-10 chat: **flex-derivation design shipped** (directive: council/muse `deliveries/prompts-2026-11-05/zai-derivation-2026-11-10.md`, via MUSE relay). Deliverable: `_agents/zai/deliveries/FLEX-DERIVATION-ZAI-D1-2026-11-10.md` — my own formula ("ZAI-D1, load-bearing deficit": `tier(M + 0.4·S)` over 17 scoped duties, NEED/HAVE split, **no D term, no overrides, no U-deltas**), implemented read-only in `_agents/zai/tools/zai_flex_derive.py`. Fit vs live 99-rule table (flex.json @ 97d7e9d): **95 exact / 3 off-by-one / 1 hard / tier-error 5**; I re-verified Inkling's P-322 on his own prototype first (88/11/0 floor-off, 93/6/0 floor-on — both reproduce). Zero fiat rows; residuals named and explained (C>OG, C>OT = hub rows; EDGE>RB = policy row; TE>OT knife-edge). DL5 priced under the Owner's blitzer reframing as a NEED profile (EDGE 0, DT 2, OLB/ILB 2, OT/OG 6, SS/TE 12). Boundaries honored: nothing built, no engine/table/branch touched, snapshot stays 4ca9a071, no ratings, no brand work, Team Select untouched.
- Structural findings while testing: the live table is a **directed quasi-metric** — 86/99 rows satisfy the triangle inequality, 40 sit exactly at their chain bound, and the 13 violations are exactly the Owner's hand-set premium rows (free audit tool, IDEA-2); cross-side prices are binary 6/12 and ALL 16 twelves are independently derivable (IDEA-4).

## What the next session needs
- Read first: `deliveries/FLEX-DERIVATION-ZAI-D1-2026-11-10.md` (design + fit + hard cases); `imports/IDEAS-2026-11-10.md` (5 IDEAs filed, 2 need Owner rulings); `START-OF-CHAT-ZAI.md` §3.
- If the Owner rules on IDEA-3/IDEA-4: implement per his ruling only; the derivation stays a tool, not a build, until he says otherwise.

## Do not redo
- Inkling P-322 verification: his numbers reproduce (88/11/0 floor-off, 93/6/0 floor-on, D-alone 38/83) — verified 2026-11-10 by running `flexderive.mjs` on `architect/engine-and-seats` data. Do not re-derive.
- The ZAI-D1 calibration history (passes 50→66→82→89→91→95, all logged in the write-up §6.3); do not restart from need=have — that shape is falsified by the FB-family rows.
- The 2026-10-28 free-tier verification pass (pinned in the stack advisory). Baseline identity and line-3 selector history (`notes/BASELINE-VERIFICATION.md`, `notes/CORRECTION-LINE3-SELECTOR.md`).

## Files in this lane
- `deliveries/` Z.ai's documents (handoff REV 15, style guide, playbook, reweight brief, governance, wisdom, build report, stack advisory, flex-derivation ZAI-D1)
- `tools/` build scripts, CSS/JS parts, verify suites, logo scripts, `zai_flex_derive.py` (+ `results/` outputs)
- `imports/` IDEA filings (IDEAS-2026-11-10.md)
- `builds/` the two Z-post-blue HTML files (NOT product builds; pins in `BASELINES.md`)
- `notes/` prompts, corrections, worklog

## Rules that changed
- No rule changes this chat. Working set: Owner's laws (intake-ledger first; everything FREE; portfolio-first) + directive boundaries (read-only derivation, no build, no re-pin).
