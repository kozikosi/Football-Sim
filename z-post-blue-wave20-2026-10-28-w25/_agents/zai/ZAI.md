# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat only: no git push (sandbox reads GitHub via public HTTPS); work reaches GitHub via the Owner, `tools/import-zip.sh zai`, or `tools/seat-save.mjs`. · **State:** High Councillor (below the Architect, above advisors; Owner, 24 Oct 2026)

## Current work
- 2026-10-28 chat (wave 20): **six-point fix round shipped** from the Owner's bug report. Product: `Football-Sim-Z-post-blue.html` md5 at CHECKSUMS.txt (build via `tools/w20_patch.py`, 17 asserted replacements, `node --check` on all script blocks). Verify: `tools/w20_verify.js` — 27 checks ALL PASS, zero console errors.
- Shipped: (1) name-rendering fixes — `@supports` fallback for `background-clip:text` shimmer, `scrollbar-gutter:stable`, contained draft-board scroller (Brave/Chromium classic scrollbars + wider metrics were clipping edge columns); (2) the name-tier law everywhere (90+ shimmer · 85+ vibrant · neutral — all in team color): 4 violating call sites fixed, `zpbRowVars` now emits `--tA2/--tG2/--glow/--tn` per row; (3) preseason/season lineup selector compaction (fits 390 px); (4) position-rankings names sized down + wrapping; (5) zero horizontal page scroll, asserted at 1280/390 across five surfaces; (6) Brave hardening: `visibilitychange` draft resume + gold `SETBACK` chip reporting any boot error in plain text.
- Intake: ledger §G (six items mapped, 4 interpretations await veto: "position rankings page" = Groups tab; neutral tone = pack.txL; SETBACK chip as new UI; 5 px clipped marquee stays).
- Open to council: WZ-1..7 in `WORK-REQUESTS-ZAI-w19.md` (WZ-1 draft audit unaffected — engine untouched this wave; view-layer only).

## What the next session needs
- Read first: `_agents/zai/START-OF-CHAT-ZAI.md` §3; this file; intake ledger §G (veto list).
- If the Owner vetoes any §G interpretation, re-cut via a `w20b` patch script against the current build (house pattern — never hand-edit).
- The verify suite needs `playwright` (node) — rerun `node tools/w20_verify.js` after any UI change.

## Do not redo
- The Brave diagnosis (2026-10-28): the breakage class is ENGINE-level (classic scrollbars 15–17 px vs Safari overlay 0 px + wider font metrics + background timer throttling), not Shields API-blocking — the file has no fetch/XHR/audio/worker/canvas-measure dependencies, and all five localStorage uses are already try/catch-guarded.
- Tier-class call sites now correct: draft zones, draft rows, groups (gname), lineup table + comparison, pcards, key players, depth chart. Do not reintroduce value-blind shimmer (winners) or 85+→shm anywhere.
- Baseline identity, line-3 selector, and the free-tier verification pass (advisory chat) — all pinned in prior lane files.

## Files in this lane
- `deliveries/` documents (handoff §0g, style guide, playbook, reweight brief, governance, wisdom, build report, stack advisory, intake ledger §G)
- `tools/` build + verify (v8..v11 suites, `w20_patch.py`, `w20_verify.js`, CSS/JS parts, logo scripts)
- `builds/` Z-post-blue HTML pins (NOT product builds; pins in `BASELINES.md`)
- `notes/` prompts, corrections, worklog

## Rules that changed
- The name-tier law is now ENFORCED BY TEST: any future surface that renders player names must pass the w20 tier audit (90+ `zpb-shm`, 85+ `zpb-vib`, else neutral — team palette via `zpbRowVars`).
- New standing UI law: zero horizontal page scroll at any viewport; verify suite asserts it.
- New standing UI law: no silent failures — the `SETBACK` chip reports engine errors in plain text.
