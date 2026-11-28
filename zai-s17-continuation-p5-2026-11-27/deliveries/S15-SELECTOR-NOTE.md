# S15-SELECTOR-NOTE — for Claude's merge tests · Z.ai · 2026-11-21

**The stable classes the merge tests can rely on** (all measured by the batteries at the final
bytes; each carries a named law):

| selector | what it is | the law that proves it |
|---|---|---|
| `.cp-rows .cp-row.cp-top3` | a top-three row (the w89 `tr.zpb-top3` pattern) — a DOM hook, the treatment rides the button | board L13/L24 (exactly the array-position three under every sort), L26/L27 (badge + sheen exactly here) |
| `.cp-draftbtn` | the ONE visible Draft button per row, naming the slot ("Draft at QB"); pulses `zpbBtnPulse 1.5s`; carries the guarded one-click dispatch | board L16 (one per row), L23 (every button pulses), L18 (the 380 ms guard), L31 (the toast rides a landed pick) |
| `.cp-draftbtn.cp-istop` | the top-three button: pulse OFF (`animation: none`), sheen sweep ON, `aria-label` carries "one of your top three priorities" | board L23 (opt-out), L27 (sheen exactly on the three) |
| `.cp-toptag` | the separate TOP badge in the NAME cell (w89 :6488 badge-in-name) — exactly on the three | board L26 |
| `.cp-why` | the why copy, top-three rows only, from the shared VM mapping (`suggestWhy.ts`) | board L25/L28 |
| `.cp-drafted` | the one-click toast (`role=status`, `aria-live=polite`) — appears ONLY on a landed pick | board L31 |
| `.cp-error` | the L-ERR line: equals `state.error ?? ''` after every resolved action | shell S32 (both halves) |
| `.cp-bragtext` | the selectable brag text (P-209) — no seed, no tag, no link unless the build-time constant is set | shell S35, node N37 |
| `.cp-sharebtns .cp-cta` | the COPY THE <stage> BRAG button — the season stage's instance HIDDEN while the build-time link is unset | shell S35 |

**Retired with the ring (do NOT test for these — they are gone by law):** `cp-quick`, `cp-suggest`
(anywhere), and the inset shimmer. Board L28 asserts their absence; F29 re-plants them and DIES.

**The panel class:** `.cp-panel` is the glass surface (22 px radius, `blur(14px) saturate(1.2)`,
`--glass`/`--glassbd`/`--shadow` in both modes — w89 :625 ported). It renders on the season-shell
screens (Settings is the proven instance — shell S33 measures it there; the Hub capture in the
side-by-side is the season-screen instance). A board-only capture cannot prove the glass law.

**Playwright honesty (the work order §4.10):** the tree pins playwright **1.57.0**; the batteries in
this sitting ran headless chromium **revision 1200** in Z.ai's sandbox (measured — `browsers.json`
resolves `chromium-1200`, the executablePath printed and used). The Architect's sandbox runs
chromium-1255 per the other seats' verification; nothing in the tree pins a browser revision.
