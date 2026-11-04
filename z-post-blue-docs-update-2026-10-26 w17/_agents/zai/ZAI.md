# ZAI.md — lane file, seat ZAI · High Councillor

## Identity
Z.ai — architect/builder of **Z-post-blue** (`Football-Sim-Z-post-blue.html`, single-file football sim, wave-built from the Owner's verbatim directives). Chat-only sandbox: **no git push**; work reaches GitHub via the Owner (`tools/import-zip.sh zai <zip>` or `tools/seat-save.mjs`).

## Current work
**Wave 17 shipped** — build md5 `ddb9af524604d136e95d2f97eab6421e`, 1,267,349 B (base: wave 16 `c0b449de…` ← wave 15B `d053d4fe…`).
The Guide's flex section is now the Owner's **position board**: 8 categories (Defends the Pass · Pressures the QB · Stops the Run · Moves the Offense · Runs the Ball · Catches Passes · Protects the Passer · The Kicking Game), 18 position cards incl. **Nickel / Dime**, flex chips on every card (chart v3 verbatim: RB −6 TE, Nickel/Dime added, DE −4 MIKE ILB FB, Punter −2 K), job sentences on hover/focus only. **Dime is visual everywhere, display-only**: Dime rows in Your Full Depth Chart, Roster-as-drafted, the draft sidebar and both Starter-by-Starter comparisons (real teams show their CB4; drafted rosters show the 4th-best CB + PKG tag), DIME station + legend on the field map, Dime in the Glossary. **Engine untouched** (ROSTER_SLOTS 28, DEPTH_CHART_GROUPS unchanged, slot-wins/flex byte-pinned, grade table 28) — full Dime integration waits for Claude's math engine.

## What the next session needs
1. **Owner test feedback + §J vetoes** (5 interpretation notes: Nickel/Dime inbound chips; 4th-CB derivation; lineup/grade exclusion; my 5 category names; the hover-hint line).
2. **Engine import when Claude's math engine lands**: chart v3 = the target spec — expected engine deltas: RB→TE −6, WR/TE→Nickel/Dime per card, SS/FS→Nickel/Dime free, P→K −2, plus Dime as a real 29th slot (lineup, grade, snap-share ~10%, awards naturally unlikely). The byte-pins in `tools/v17_flex.js` then invert into reconciliation checks.
3. Standing faults if the Owner still sees them: **Team Comparison not rendering** (older report; current headless runs render fine — re-test on his machine), **Madden Rankings blank**.

## Do not redo
- P0 draft-alive pack (wave-14 cine gate, watchdog, surfaced/retried kickoff, panel guards, fallback board) — v15–v17 suites green.
- Round-9 directives (ALL/NONE inline, shimmer team name, VS-NFL gating, roster tab order, X·pos·OVR(−beta) menus, OVR replaces Wins, KR/PR unification, text removals, flex tint) — shipped, suite-checked.
- The wave-16 chart transcription slip (DE −4 tier lost FB) — found and fixed in wave 17; cards are now assert-verified verbatim.

## Files in this lane
`deliveries/OWNER-ROUND-8-INTAKE.md` (§A–§J) · `deliveries/HANDOFF-FOR-CLAUDE.md` · `tools/zpb_v13.py`…`zpb_v17.py` · `tools/v15…v17 verify + hardening suites` · `evidence/` · `START-OF-CHAT-ZAI.md` + `END-OF-CHAT-ZAI.md` (the workflow trio).

## Rules that changed
None this chat. New standing rule from the Owner: the Dime stays **purely visual** until the math engine lands — do not wire it into slot-wins, the lineup selector or CPU needs before then.
