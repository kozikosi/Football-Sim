# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, IM chat; the sandbox has no git push — the Owner relays the end-of-chat zip. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype through wave 53; headless verify suites v8..v11 + the per-wave live batteries (w46..w53); style guide; FB/Punter math; the halfway-ink law; the runtime dot-law sweep; the look-gate one-clock sync; the intrinsic-size debugging method (the w53 6px pan).

## Current work
- **Wave 53 shipped** (the Owner's session mandate: review everything · run a lot of tests · optimize for mobile · isolate the engine seam for Claude). The wide probe (`tools/w53_mobile_probe.js`, every view × 320/360/390/430) scored w52 at 31/32 — the one FAIL was real: the 320px rankings page panned the document 6px (the nowrap team rows fed a 306px min-content up the intrinsic chain into `.wrap`'s fit-content). Fixed with the footnav's own w43 cure (`contain:inline-size` on `#viewRankings .layout>.panel`; safety-probed zero positioned descendants). The thumb floor table re-adopted its two missing controls (`.posbtn` 31→38, `.zpb-selbtn` 36→38, guide summaries 40px). The touch polish landed (text-size-adjust / tap-highlight / touch-action — desktop-invisible). A REV-1 root `overflow-x:clip` was WITHDRAWN — the w43 N6 root law is the Owner's. PLUS the Claude seam renewed for the w52/w53 series: `CLAUDE-HANDOFF/HANDOFF-TO-CLAUDE-w53.md` + `engine-seam.json` (all 39 engine contracts grep-verified in the bytes, each exactly once; 62 `Math.random` sites; the dunder flag contract; the battery map with expected counts). Verified 12/12 + 10/10 + 30/30 + 25/25 + 64/64 + 5/5 + 32/32, zero pageerrors. +1,019 bytes — the smallest wave ever.

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` REV 14 (§3 LAST-KNOWN-STATE + §5 the w53 mechanics — do not re-derive the intrinsic-size chain, the withdrawn clip, or the containment fix), `notes/W53-INTAKE-LEDGER.md` (his words verbatim + the session rulings), `UPDATE-README-w53.md`, `notes/W53-BUILD-REPORT.md`.
- **Do not redo:** the w52 laws (the one-clock release, the clock ink, the SB order, the badges, the bar track, the w50/w51 inks) — all verified intact on w53; the w53 mobile laws (the thumb floor table is the single source; the rankings panels carry `min-width:0;contain:inline-size`; the touch polish never removed; the w43 N6 root law is the Owner's).
- **Watch for:** a document-wide `min-width:0` sweep does NOT fix an intrinsic feed — the footnav's `contain:inline-size` pattern does; don't re-try min-width. The old ≤760px block (line ~2051) still floors `.posbtn`/`.zpb-seg button` at 30px — the LATER block wins the cascade; leave the old lines alone. The wide probe's tap<40 / font<12 / clipped NOTES include known-intentional items (marquee internals, the hidden 2px select backings, the Owner's 9–11.8px micro-labels — a P2 proposal, his ruling, never silently resized). The mobile check must click `tabDraftBtn` before scrolling to the review map. `w53_live`'s rig wraps `playGame` ONCE (a second wrap recurses).

## Files in this lane
- `notes/` prompts, corrections, worklog, the per-wave INTAKE LEDGERS + BUILD REPORTS
- `builds/` the wave HTML files (NOT product builds; pins in START-OF-CHAT §4)
- `tools/` the verify suites (w53_syncbattery.js + w53_live.js + w51reg_live.js + w53_evidence.js + w53_mobile.js + w53_mobile_probe.js are the current headline batteries)
- `deliveries/` the style guide and playbook; `CLAUDE-HANDOFF/` the w53 engine seam (the handoff + engine-seam.json)
