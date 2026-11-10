# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat only; sandbox can read GitHub (public HTTPS) but **cannot push** — work reaches the branch via the Owner (or Beam: `tools/import-zip.sh zai <zip>` → `_agents/zai/imports/…`) or `tools/seat-save.mjs`. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** Z-post-blue builder (w1–w89 headless-verified waves); style guide + Owner playbook; FB/Punter math (REWEIGHT-BRIEF §7b); the w74 type-checker contract (colors/tsconfig.json, 4a).

## Current work
- **w89 SHIPPED (R2, 2026-11-10, session 18):** the Owner's 26 verbatim asks + his **R2 round of 4 more** (intake `INTAKE-W89.md` §8, items 27–30) — he rejected the first w89 delivery ("A lot of things i don't like with this version so i'm not pushing it") without pushing it; the superseded first build was md5 `4fc6b760…`. Base w88 (`2f7a4654…`, 1,904,952 B) → `Football-Sim-Z-post-blue-w89.html` (1,922,769 B · md5 `8efa9099ae508532d5392a7c82436b05`), unpushed (sandbox) — ships in `z-post-blue-docs-update-2026-11-10.zip`.
- The R2 asks, all landed: the guide's Wins caption retired (the draft board's twin caption stays — not named); the autosave bubble is ONE quiet pill (RETURN TO YOUR SEASON — the words and the Not-now button retired; the restore door itself stays, `zpbRestoreSeason` rides only it); the little "Style" word above the aggressiveness dropdown retired (law 20's div form untouched); SIM GAME / SIM SEASON / SIM PLAYOFFS visible at the TOP of the season page (`#zpbTopSimStrip`, right-aligned, first thing under the view tabs, mirroring the dock's doors; the dock keeps its copies; the preseason page never mounts it — 1. LINEUP stays first; the champions page mounts none).
- Found while wiring the top doors, fixed: the dock SIM GAME button gained a new click listener on every re-render (pre-existing since w65) — a stacked click re-fired `zpbGameReplay` (one click, two replays). One guarded wiring now; regression-proved live (R2d).
- Verification: 44/44 static laws (A19 rewritten for the Style-word law; B4 runs the r2 block), 35/35 live battery (Playwright, 0 errors), 9/9 victory probe, parse gate (31 script blocks parse; the one style-brace complaint remains the pre-existing benign w88 W63 artifact).

## What the next session needs
- **Read first:** `_agents/zai/deliveries/ZAI-w89-build-and-verification-2026-11-10.md` (recovery findings + build + verification + §5 the R2 redelivery); `_agents/zai/INTAKE-W89.md` (all 30 asks, verbatim mapping, §8 = R2).
- **Build chain:** w89 is the newest product; patch via asserted exact replacements (`tools/build_w89.py` — one pristine base, md5 asserted in the header, 62 patches), verify with `tools/verify_w89.mjs` (44 checks) + `tools/w89_live.js` (35-check Playwright battery) + `tools/w89_victory_probe.js`; parse gate `tools/parse_w89.mjs`; `tools/w89_aggr_shot.js` captures the aggressiveness panel.
- **Dock law:** the season tab cluster lives in the runtime-created `#zpbSeasonDock` (sibling of `#draftFinalResults`); host ids `zpbDraftOps` / `zpbSimTabsHost` / `zpbBtsHost` are unique — never re-create them elsewhere; on phones it must stay ONE side-scrolling row (the dock-scoped CSS overrides in the w89 block beat the W61-3 column-reverse — do not remove them).
- **Top-doors law:** the top strip `#zpbTopSimStrip` mirrors the dock's doors via the unique `Head` ids (`simGameBtnHead` / `simSeasonBtnHead` / `simPlayoffsBtnHead`) — never reuse the dock ids for a top door (the dock's creation logic checks `getElementById` and a collision suppresses the bottom copies). The A9 SIM SEASON question and the W65-D SIM PLAYOFFS warning adopt the Head ids — top doors ask first like the bottom ones. It never mounts on the preseason page (1. LINEUP law) or the champions page.
- **Autosave-pill law:** the pill is the ONLY restore door — do not remove `#zpb-savebud` entirely without giving `zpbRestoreSeason` a new home.

## Do not redo
- The w89 asks (all 30 landed and verified — see the report §2 and §5); the w88 Wins display law and its verified tables; the w87/w88 measurement work.
- Never seed a build from a `w88-check.html`-style intermediate — one base, pristine, md5 in the patch header.

## Files in this lane
- `deliveries/ZAI-w89-build-and-verification-2026-11-10.md` — the recovery + build + verification report (§5 = the R2 redelivery)
- `INTAKE-W89.md` — the Owner's 30 verbatim asks → build items (§8 = R2)
- `tools/` — build_w89.py (asserted patcher, 62 patches), verify_w89.mjs (44-law suite), w89_live.js (35-check battery), w89_victory_probe.js (9-check probe), parse_w89.mjs (parse gate), w89_probe_dock.js (dock DOM probe), w89_aggr_shot.js (aggressiveness-panel capture); carried: verify_w88.mjs, build_w88.py, verify_wins.mjs, precolors_check.mjs, cb4_check.mjs
- `evidence/` — w89-*.png (splash, guide-rank, dock, preseason cine/page, aggr-nostyle, topstrip, phone, box score, review, champions, autosave-pill, victory ×2)

## Rules that changed
- None this chat. Standing: never `git push` (§5 rule 8); every chat ends with the zip; intake-ledger first when the Owner directs; one pristine base per wave; a rejected delivery is redelivered under the SAME wave number (w89 stays w89 until the Owner pushes or renumbers).
