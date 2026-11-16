# INKLING — lane file (rewrite in place when seat state changes; never append; ≤60 lines)

**Seat:** INKLING · Inkling 2 Small Free (opencode/inkling-2-small-free) via OpenChamber · admitted 2026-11-09 · **transient, not permanent** — deputized by the Owner while MUSE was out; answers to the Owner alone; holds no standing rank over any seat. If a task contradicts `AGENTS.md` (on `origin/council/muse`) or the Owner, the muse file and the Owner win.

## Boot protocol

1. `git fetch -q origin; git log --oneline -1; git status --short` — worktree clean, branch `council/inkling`.
2. Read this file. Then the task's named files only.
3. **The live rules live on `origin/council/muse`**; this worktree's copy may predate Owner rulings — never quote it as current.
4. `node tools/preserve.mjs check` — my worktree must be clean; unsaved work elsewhere (shared tree, other seats) is not mine to touch.

## Permanent seat rules

- Byte-check everything (Owner, 2026-11-13): every VERIFIED needs directory · exact command · ref/sha · output neighbourhood. Independent re-run is the only confirmation. Mark OPEN rather than speculate.
- Never edit governance (`AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `CLAUDE.md`, `MERGE-MANIFEST.md`, `biome.json`, `tools/`), never touch `colors/src/**`, flex, the product file, or any other seat's bytes. INKLING reviews, measures, advises; does not build the engine/product/rulings.
- No new P-IDs without the Owner; no frameworks/pins/verdicts beyond what is rulable. Dissent in writing, inside the filing.

## Current state (2026-11-15/16, session end @ `72b76317`; branch pushed)

- **Z.ai fresh-start Rev 8 delivery VENDORED + REVIEWED** (Owner-directed push `11425623`; review `d9dc3261`): `_agents/inkling/deliveries/zai-fresh-start-rev8-2026-11-15/` — Rev 6's defects closed (nested manifest regenerated 360/360 OK exit 0; numeral gates CLEAN; cards 871; a11y fixed in source; devtools session ran; "~55%" WITHDRAWN → wash, no cutover; row 9 dead; **first-try greens 2 vs 0 flagged REPORTED-feel, not a decision signal**). Two residual one-liners (verified-as-of 358 vs 360; VERIFY.txt 658 vs 659). Sealed bench OWED by design.
- **Rev 6 fresh-start delivery** (`_agents/inkling/deliveries/zai-fresh-start-2026-11-15/`, `200313d1`, the desktop folder pushed for reading): 24/24 batteries PASS both arms (my re-runs); engine pin `d3bd81d2` byte-identical both fresh repos; F1 fix re-verified; Season Book 43.8 KB gz; cards 867→871 errata applied in Rev 8.
- **Rev 6 adjudication round** (P-342, `6d510cd4`): pin FIXED at `d3bd81d2` (floating reading exists only in Architect's NOW.md; owner record everywhere binds pins to explicit acts); lineup.test "table" test → option (b) (drop design.json equality; keep structure; live flex.json equality untouched); **gap 2773.0387 VERIFIED independently at 6dcf13b** (spotDiff 0; stand-ins TE3←FB, DT2←SS, CB3←TE all at −6).
- **P-333 derivation round** (Owner-picked direction, `8ef1d8cb`): `snap(d_Z·8 − w/500)`, d_Z = pool-centred athletic distance over (ovr,spd,str), pins held as law — DIME trio reproduces at 12 on distance alone; FB→TE=2 falls out; QB→FS and FS pairs stay pins (flagged). Q2 hungarian exactness read+run-verified; **gap measured 2,773.04 → 1,014.15 (−63%) with sketch derivation + pins**. γ to be L1-fitted with pins held before the Owner is asked to approve; falsification for the direction stated plainly.
- **Council Rev-6-frame analysis (fresh-start fork)** (`f8f6f70d`): cross-branch byte-identity sampled MATCH (4 files × 4 branches); **my "358/358 OK" corrected: 12/358 addendum files FAIL the manifest** (Glyph's finding re-verified; four pass-through copies byte-consistent on the mismatched set); manifest regeneration owed (Rev 8 closed it).
- **P-158 review** (`177aaa5b`); **ERNIE & GYLPH fresh-start reviews** (`20261115-2020-*.md`, improved); **P-345 label error** — framework comparison has no queue row (R-13); file work under "framework comparison (R-13)", never P-345.
- Z.ai Rev 8 prompt drafted in chat (NOT filed): Rev 8.1 = two one-liners + both palette variants for the Owner + sealed-bench dry run + week-sb-game note + REGEN-MANIFEST steps for KG/MUSE. Awaiting KG's paste.
- **A council re-verify prompt ("record pass": integrity sweep, pin-ruling reading scan, P-333 arithmetic re-check, hungarian/flex read, label hygiene, optional sealed-bench claim) was DRAFTED in chat 2026-11-16 and is NOT filed** — filing is KG's call; the draft lives in the 2026-11-16 session transcript.

## What the next session needs

1. Owner rulings if any (framework pick timing — still blocked on the sealed bench: sow rather than sign; palette ruling for the token default — both variants owed by Z.ai's Rev 8.1; P-345/R-13 label for framework work; OT-clock fix is the Architect's; vite `file://` posture vs Route B).
2. `git fetch -q origin; git log --oneline -3; git status --short` — then read `inbox/20261116-0013-inkling-P-333-derivation.md` and `inbox/20261115-2316-inkling-review-zai-rev8.md` first.
3. Never re-measure (fresh evidence only at a re-pin/fresh archive): pin `d3bd81d2`; 99 flex; gap 2773.04 under measured provider at `6dcf13b`; w89 = live (pale-rose light default; NO `--tc`; ZPB_TEAM_COLORS + `[data-zpbteam]`); cards 871; E4 sums 31 = 31.
4. Inbox holds ranked filings — nothing assigned; P0 queue P-160…P-165 still untouched by me; fresh-start builds stay in the repos; do not port them; do not revive the 62% Vue lean (withdrawn).
5. If the sealed bench runs (second agent, whoever takes it): protocol at `REV-5.1-addendum/measurements/PROTOCOL-FOR-A-SECOND-AGENT.md`; needs re-anchor to fresh-start repos + sealed recipe (SEALED-RECIPE sha 7fcc3fc0…, OWED); class-bridge cells remain the open design point.

## Where this worktree is

Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · merge-base with base `1b91f50e161fa10d0607c8e09330115ffa27f1ff` · HEAD `72b76317` (verify with `git rev-parse HEAD`).

## Transition discipline

Wave state lives in wave directories and is expected to die with the wave. Rewrite this file wholesale on seat-state change; never grow it.
