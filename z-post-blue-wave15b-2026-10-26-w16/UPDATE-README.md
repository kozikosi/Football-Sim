# UPDATE-README — z-post-blue-wave15b-2026-10-26

## What this package is
Wave **15B** of Z-post-blue: the round-9 fix round. Base = the prior session's wave-15 build
(`efbe8c53…`, the file named "Football-Sim-Z-post-blue w14.html" that the Owner opened locally).

## The one thing to test first
**The draft.** Open the HTML, draft — the board fills, the CPU pick feed runs the moment
DRAFT fades off the cinematic. If anything ever stalls again, the built-in watchdog now
kicks the draft itself within ~3 seconds. Sim to End, undo, team-filter clicks and re-drafts
are all re-verified.

## Changelog (this chat — wave 15B)
1. **P0 — the draft cannot die**: wave-14 cinematic gate restored (CPU fires exactly at the DRAFT fade); 1.5 s watchdog + stuck-overlay force-close; surfaced/retried kickoff errors; per-panel render guards with a minimal fallback board; per-tick draft-loop resilience.
2. Draft screen: **ALL / NONE** chips now sit inline right after the **KICKER** chip, same font and color as the other chips, left-aligned flow.
3. Draft banner: the **team name in shimmering text** next to your logo (just the name).
4. **VS. ACTUAL NFL TEAMS** tab: visible only on the post-draft page before the season starts; gone everywhere else once the season begins.
5. Your Roster tab order: **Lineup & flex → Your Full Depth Chart → Overall Grade + draft-ranking table**.
6. Lineup player panels: menus read `Name · POS · flexed-OVR`, with `(−4)`-style suffix only when flexing; the right-hand number is the **flex-adjusted OVR** (Wins removed from this page).
7. **KR / PR** rows: same row shape, select size and coloring as K, P and everyone else; the "How is the returner chosen?" dropdown removed.
8. Group scores: caption "(flex penalties included)" removed; a group dragged down by a flexed player tints its number wine.
9. Texts: "0 wins" badge gone; flex-penalty explainer trimmed; **"How bold are you…"**; boldness explainer sentence removed; "Can you go " renders smaller in the flashing reminders.

## Verify (all against md5 `d053d4fe…`)
- v15 suite: **35/35 PASS** · hardening suite: **7/7 PASS** (watchdog revival, filter lifecycle, full 26-round draft)
- Legacy v14 suite (cinematic law): **ALL PASS** · v13 suite: single diff is pre-existing on the base build
- Math invariants intact: QB 1.396 / FB 0.034 / P 0.208 · 28 slots · QB-series delta 2.541 · zero console errors end-to-end

## Contents
```
Football-Sim-Z-post-blue.html                     <- the product (wave 15B)
CHECKSUMS.txt
_agents/zai/START-OF-CHAT-ZAI.md                  <- §3 rewritten for 15B
_agents/zai/END-OF-CHAT-ZAI.md                    <- workflow trio (unchanged)
_agents/zai/ZAI.md                                <- lane file rewritten
_agents/zai/deliveries/OWNER-ROUND-8-INTAKE.md    <- §H appended (round-9 ledger)
_agents/zai/tools/zpb_v15.py                      <- asserted build module
_agents/zai/tools/v15_verify.js                   <- 35-check suite
_agents/zai/tools/v15_hardening.js                <- watchdog/filter/full-draft suite
_agents/zai/evidence/v15-*.png                    <- board, roster tab, KR/PR
```
Extract over a repo working copy and the `_agents/zai/` paths land where import-zip expects them.

## Changelog history (older chats)
- wave 15 (prior session): QB series → Position Rankings only; WHERE THEY LINE UP field map; Gold→wine flex cascade; resilience try/catches; clearable team-filter pill. (md5 `efbe8c53…`)
- wave 14: pre-draft cinematic stacked trio rebuilt; CPU kickoff gated on the DRAFT fade. (md5 `413c2d8e…`)
- wave 13: rankings series, 3-4/4-3 personnel swap, weights 3-state gating, replay narration, Giveaway tier. (md5 `0cef8bf7…`)
