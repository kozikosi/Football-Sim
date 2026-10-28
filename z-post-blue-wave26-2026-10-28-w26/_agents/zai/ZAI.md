# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat only: no git push, no access to the Owner's files; the Owner relays output. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026).
- **How work reaches GitHub:** Z.ai ends every chat with a zip (Owner relays it; or Beam runs `tools/import-zip.sh zai <zipfile>` → lands in `_agents/zai/imports/<date>-<name>/` on `council/zai`).

## Current work
- **Wave 26 shipped** (28 Oct 2026, sandbox session 18): `Football-Sim-Z-post-blue-w26.html` md5 `5f947bccf2a9392a85fe01ef11164622` · 1,338,465 B. Built from w25 (= my w20 product, Beam-pushed; md5 `60addfca…`, 1,322,242 B) via `tools/w26_patch.py` — 44 asserted exact replacements + appended w26 CSS/JS blocks; `node --check` clean on all script blocks.
- Shipped this round: NO-EMOJIS law (⚓ ◍ ⭐ 🏆 ☾ and the \u2600/\u263E theme labels removed); ANCHOR/LEAK chips (word smaller than the name, no symbol); **Brave hardening** — every shimmer falls back to a solid team color before any gradient, gradient clip/size/fill carry !important so the shorthand cannot strip them, color-mix() gone from shimmer, a failed panel paints a visible note (zpbViewFail) instead of blank; team comparison wears the two homepage-style dropdowns (whole .zpb-selwrap moved, popups alphabetical) and Starter-by-Starter is gone; Guide — field-map flex math + FLEX legend removed, flex panels in depth-chart order (THROWS THE PASS first), POSITION VALUES section removed, DEFENSE section moved below flex and rebuilt (DL squares / LB triangles / DB circles; DT2 ILB2 SAM NICKEL DIME in five colors with in/out per formation and a legend at the panel bottom); position rankings — the spot buttons return (srbtn format, individual toggles, depth-chart order, no label) and the dropdown Series presets are retired; draft board — srbtn chipbar with ALL/CLEAR, Nickel beside Dime at the bottom of the defense, the 3-4/4-3 toggle now re-renders the board (`rerenderDraft` never existed) and relabels the fill slots; weights are typeable number inputs (0–700) and the synergy panels + the MODEL·ALL SLOTS select + its re-injection observer are gone (that observer was an infinite loop); player browser — team colors, position badges, neutral XF, one shimmer per team on screen (ties → first row); season/draft review — the duplicate SEASON op button is gone, your breakdown auto-drops-down with the badge breakdown (28 player badges + 6 group badges), and the fading 70 notes are gated off once the season starts; tier-law sweep (honor cards, slotname labels).
- Verify: `tools/w26_verify.js` **42/42 PASS** + `tools/w26_season_test.js` **9/9 PASS** (instant draft → review auto-open → season start → week-1 review badges), zero console errors, zero horizontal overflow on fresh 390 px loads, 8 screenshots in `evidence/`.

## What the next session needs
- **Read first:** `deliveries/INTAKE-W26-2026-10-28.md` (every directive mapped; §J lists the 5 interpretations awaiting Owner veto) · `START-OF-CHAT-ZAI.md` §3.
- **Do not redo:** the w22/w24 Series-row port (done — reworked as individual toggles per the Owner's newer rule); the Brave diagnosis (the fail-visible shimmer pattern lives in `tools/w26_patch.py` stage-1 CSS comments — keep it on every future shimmer rule).
- Watchpoint: on very narrow windows a *resize* (not a fresh load) can leave stale-width tables on the rankings page — pre-existing since w20, noted for the next layout round.

## Files in this lane
- `deliveries/` documents (intake ledgers, advisories)
- `tools/` build/patch/verify scripts (w26_* plus the v8..v11 suites)
- `builds/` prototype HTML (NOT product builds)
- `notes/` prompts, corrections, worklog
- The product HTML travels at the zip's top level, not inside the lane.

## Rules that changed
- **NO EMOJIS anywhere** (Owner, 28 Oct 2026): no pictographic emoji in any seat's output; typographic symbols (— · ★ ▲▼ ← → ↶ ✕) survive.
- Standing: integers only · no white text · 85+ vibrant / 90+ shimmer / everyone else neutral · zero horizontal scroll · every shimmer must be fail-visible (solid color before the gradient).
