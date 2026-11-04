# W53 INTAKE LEDGER — the Owner's words, verbatim, item by item

Wave 53 · received 2026-11-02 · one open-ended directive (no numbered round — a session mandate).

> "Prompt to Z.ai  You are Z.ai, High Councillor of Z-post-blue. Bootstrap yourself: clone
> https://github.com/kozikosi/Football-Sim shallow and read _agents/zai/START-OF-CHAT-ZAI.md
> from origin/council/zai (fallback: origin/main:z-core/_agents/zai/…), follow it exactly."
>
> "I don't have any specific tasks for you. Please just review everything, take your time, run
> a lot of tests, and try to optimize for mobile. Please try to maybe isolate more code or
> instructions for Claude to use in fitting in his engine with your w52/w53 series."

## Reading (his law, split into the moves it names)

1. **W1 · REVIEW EVERYTHING.** The full lane bootstrap ran exactly (§1): the w52 package on
   `council/zai` carried REV 13; its §3 LAST-KNOWN-STATE, the W52-INTAKE-LEDGER, the W52-BUILD
   REPORT, UPDATE-README-w52 and the style guide were read before any work. The §4 anchors were
   re-verified by hash: w52 `40613b81…` (1,585,036 B) ✓ · w51 `e40732a2…` (1,571,506 B) ✓.
2. **W2 · RUN A LOT OF TESTS.** Every standing battery was run against the untouched w52 bytes
   FIRST (the baseline), then again against the w53 build (the regression). Baseline:
   nodecheck 12/12 · syncbattery 10/10 · w52_live 30/30 · w51reg 25/25 · mobile 5/5 · evidence
   64/64 · zero pageerrors everywhere. Then a NEW wide probe was written for this wave
   (`tools/w53_mobile_probe.js`): every view × 320/360/390/430 px, measuring document
   overflow, tap-target sizes, sub-12px fonts and clipped elements — 32 assertions.
3. **W3 · OPTIMIZE FOR MOBILE.** The wide probe found one real defect (the 320px rankings page
   panned the document 6px sideways) and a floor-table drift (two controls left at the retired
   600px-era 30px/36px heights). Both fixed in the w53 bytes (see the build report: WM1/WM2/WM4).
4. **W4 · ISOLATE CODE + INSTRUCTIONS FOR CLAUDE (the w52/w53 engine seam).** The handoff to
   the Architect is renewed for the w52/w53 series: every §3 seam contract re-verified against
   the actual w53 bytes (all 39 engine functions still present, each exactly once), the new
   dunder-flag contract table, the look-gate law, the battery map, and the machine-readable
   `engine-seam.json`. Lives at `CLAUDE-HANDOFF/HANDOFF-TO-CLAUDE-w53.md` in this package.

## Session rulings (self-vetoes, recorded so they hold)

- **The REV-1 root clip is WITHDRAWN.** A first cut added `html{overflow-x:clip}` — but the
  w43 (N6, Owner) law already governs the root: wide windows clip, SMALL windows the viewport
  may pan sideways so the whole footer stays reachable. The Owner set that law; a later rule
  wins the cascade and the clip would re-legislate it. Withdrawn; the 6px was killed at its
  true source instead (WM4).
- **min-width:0 alone does NOT fix an intrinsic feed.** Verified by a document-wide
  `min-width:0` sweep (zero effect on the 326px floor). The footnav's w43 cure
  (`contain:inline-size`) is the house pattern and is what actually cuts the feed. Recorded
  in the build report so nobody re-tries the min-width-only fix.
- **The 9–11.8px micro-labels (ANCHOR/LEAK 9px, poschips 9.9px, lu-c 10.2px) are NOT touched.**
  They are the Owner's approved design. Flagged in the build report as a P2 proposal (a
  +0.5–1px phone-only lift) for his ruling — never silently resized.
- **The tap floor is the project's OWN 38px table, not a new number.** The w43-era floor table
  (footlink 44 · tabbtn 40 · seg/srbtn 38 · csbtn 36) simply re-adopted its two missing
  controls. No new design law invented.
