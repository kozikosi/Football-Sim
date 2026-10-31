# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **How its work reaches GitHub:** Z.ai produces a zip and hands it to the Owner; Beam (or any seat with git) runs `tools/import-zip.sh zai <zipfile>`, which puts the contents under `_agents/zai/imports/<date>-<name>/` on this branch (`council/zai`).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype (12 waves; headless verify suites v8..v11 in `tools/`); FB/Punter math (`deliveries/REWEIGHT-BRIEF.md` section 7b); style guide and Owner playbook; waves 33–43 shipped through the courier pipeline.

## Current work
- **Wave 43 SHIPPED (2026-10-31).** The round-43 directives, all thirteen: the Madden rankings cards keep `#31` on one line (the two-line rank was the growth); the player browser's PLAYER names wear the tinted ink (N2); the light-mode ink `txM` — the deep team tone lifted to L 0.52 — across dropdown/browser/rankings/comparison/board/standings/honors while DARK keeps `txd` untouched (N3/N5/N13); the 90+ name shimmer is the CONSTANT deep gold everywhere (`--zshim` law; the Series' rows had no vars at all and a deep-sheet `tA2` gradient out-cascaded the patches — both root causes fixed; N4); small windows (≤1024px) scroll sideways at the viewport with the footer reachable, wide windows keep no-pan (N6); the game preview uniform on every team (N7); the during-game header scores and the game review's scores/stats/key-players all wear their own teams (N8/N9 — the "everything user red" came from `[data-zpbteam]`'s `--text` remap); the SB cinematic computes OPAQUE at mount — the wrapper's fade WAS the flash (N10); the SB champions shimmer in THEIR colors on the banner and in the cinematic (`--zshimL/D`, never the user's color — N11); the bracket reads `#X` seeds, per-team score colors, no hint line (N12). Product: `Football-Sim-Z-post-blue-w43.html`, md5 `53ce9def9db948991e8974c76824e0f6`, 1,509,529 B.
- Waiting on: nothing (the four w43 interpretations sit in the ledger awaiting his veto).

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` §3 (the state pin); `notes/W43-INTAKE-LEDGER.md` (his words + the interpretations he may veto); `notes/W43-BUILD-REPORT.md` (the proof).
- **Do not redo:** the ink law now lives as `txM`/`txd` in `zpbPackFor` (txM computed INLINE — packs build before `zpbLift` is assigned; do not call zpbLift there), the row builders, and the dropdown builder's `--zaL/--zaD`; the shimmer law lives in `:root{--zshim:var(--gold3)}` (the `zpb-w43-css` block at the end of the body) + every `.zpb-shm` gradient/solid reading `--zshim` first — the deep-sheet `.zpb-shm` at ~129k (the 40%/70% sweep) and the reduced-motion solid at ~125k MUST keep their `--zshim` prefixes (they out-cascade); the w33 B4 `html,body{overflow-x:hidden}` is scoped ≥1025px — do not un-scope it. There are THREE `renderKeyPlayersHTML` definitions (1065k decl, 810k + 1384k reassignments) — the LAST one wins; patch the active copy. Same for `zpbGameReplay` (two copies, the 742k one is active) and `starsFaceoffHTML`.
- **Verify harnesses:** `tools/w43_stress.js` (44, jsdom, full season drive), `tools/w43_live.js` (41, Chromium, both themes + small windows), `tools/zpb_v43.py` (the build chain, 41 asserted replacements). jsdom + playwright-core resolve from the wave workspace's node_modules. The site BOOTS DARK — light drills need explicit `data-theme="light"`; computed colors come back as `rgb(...)` while pack inks are hex — normalize before comparing. A stale `.zpb-replay-ov` will answer for a new game — remove overlays before opening a fresh replay in probes.
- The w42 suite scores 50/52 against the w43 bytes — the two fails are the audits asserting the OLD one-ink light law (superseded by N13 by design).

## Files in this lane
- `START-OF-CHAT-ZAI.md` REV 6 · `notes/W43-INTAKE-LEDGER.md` · `notes/W43-BUILD-REPORT.md` · `notes/evidence/` (the wave-43 screenshots) · `tools/w43_*.js` + `tools/zpb_v43.py` (suites + chain) · `CLAUDE-HANDOFF/CLAUDE-UPDATE-since-w33.md` (rounds 34–41 for the Architect — rounds 42–43 deltas live in this package's UPDATE-README)
- `deliveries/` the standing documents (style guide, playbook, reweight brief, governance, wisdom, build report, start-here)
- `builds/` the two Z-post-blue HTML pins (NOT product builds; pins in `BASELINES.md`)
- `notes/` prompts, corrections, worklog

## Rules that changed since REV 5
- The 90+ shimmer is the constant gold (`--zshim`); the per-team name shimmer is RETIRED except the two champion surfaces and the decorative stars.
- Light-mode text inks read `txM` (L 0.52 over the deep tone); the w42 "light reads txd" white-on-white experiment is retired by the Owner's own round-43 review.
- Sideways scroll: allowed ≤1024px, forbidden ≥1025px (the w20/w33 absolute bans are scoped, not deleted).
