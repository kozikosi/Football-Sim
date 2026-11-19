# c9 addendum receipts — D1 and D2 re-measured on the cakepanz-9 shipped dist (2026-11-19)

The tree read: `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/`.
The file run: its `cakepanz-4/dist/single.html`, extracted to a scratch dir and served as `/` on :4190
(`python3 -m http.server`). sha256 of the extracted file:

    670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1

— the same value c9's own `SHELL-STATUS.md:29` claims for `dist/single.html` ("byte-identical across both
trees"), so the measurements are at the shipped bytes. The flip-family strings (`cp-simplerow`,
`cp-late-note`, `cp-fullbtn`) appear 0 times in the file (uniform board confirmed).

## A1 · D1 measured on c9 (unchanged from 8.1)

Command (8.1's fixture generator, unmodified; 8.1 envelopes were accepted — boot1 reached the hub):

    $ CP_PORT=4190 node probe-two-reload.mjs
    boot1 hub=1 phase=running keys=[sim:nfl:autosave:draft] hash=#/hub
    boot2 hub=0 complete=1 h1="Your draft is complete" keys=[sim:nfl:autosave:draft] hash=#/complete
    boot3 hub=0 complete=1 hash=#/complete
    verdict: leg1_hub true · week_key_after_boot1 false · leg2_still_hub false · leg3_still_hub false
             pageErrors []

Code (c9, `cakepanz-4/src/App.svelte`): `loadDraft` line 177 ends `void clearAutosaveWeek();`; `hydrateBoot`
line 199 calls `loadDraft(r.draft.record, r.draft.lineage)` before applying `r.week`; the clear itself removes
the key (`hydrateApp.ts:47-49`, `await mod.remove(AUTO_WEEK_KEY)`). Nothing on the boot path re-writes the week.

## A2 · D2 measured on c9, plus its cause (the 200 px rule is inert)

Probe (Playwright 1.57, 390×844, touch): open rows 0–5, report the tooltip geometry and `elementFromPoint` at
each chip's centre and at 85% of its width. Excerpt (Drake Maye row, `hitCentre`/`hitRight` are the element on top):

    tip  {x:99, y:451, w:262, h:101}   (visible)
    fits {x:25, y:453, w:340, h:39}    (the row detail)
    chip "Draft at QB" {x:89, y:457, w:97, h:25}
    hitCentre: "cp-gonetip svelte-q412k"   hitRight: "cp-gonetip svelte-q412k"
    scrollW 390 · clientW 390 · pageErrors []

And the tooltip blocks the next row's button too — Playwright's own log, tapping row 2 after row 1 was opened:

    locator.tap: Timeout 30000ms exceeded.
    - locator resolved to <button aria-expanded="false" class="cp-main" aria-controls="cp-fit-nfl-p00048">…</button>
    - <span role="tooltip" class="cp-gonetip">GONE% — how often the CPU took him before your ne…</span>
      from <div data-id="nfl-p00037" class="cp-row cp-good cp-suggest">…</div> subtree intercepts pointer events
    (retried 56×, 30 s)

**Why it is 262 px although c9 added a 390 px rule:** the rule is written before the rule it must override.
`BoardRow.svelte` lines 50–55 (inside `@media (max-width: 430px)`) set `.cp-gonetip { width: 200px; }`, and the
base rule at line 65 sets `.cp-gonetip { … width: 240px; … }`. Both selectors have the same specificity, so the
later base rule wins at every width; the rendered box is the content width + padding + border:
240 + 2×10 + 2×1 = **262 px** — exactly the measured width. The dist carries both rules in that order:

    cp-gonetip.svelte-q412k{width:200px}
    cp-gonetip.svelte-q412k{position:absolute;…;width:240px;…}

So c9's 390 px tooltip fix is dead code; the defect it was meant to reduce is unchanged.

## A3 · what the addendum does NOT claim

- Not a review of cakepanz-9 as a whole (its spec-conformance review exists: `council/pickle` `49b1c9d1`).
- The c9 batteries were not re-run by me; only the two probes above.
- No claim about c9's Part B/C fixes (C1/C2, the suggestion ring, the roster print, the wall-slip cascade,
  the token swaps) beyond noting they do not touch the two code paths numbered above.
