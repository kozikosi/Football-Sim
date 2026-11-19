# CONTINUATION PROMPT — Z.ai / 67 Cakepanz, close-out rulings (drafted 2026-11-19 by Pickle, for the Owner to relay)

**Authority:** drafted at the Owner's explicit word (2026-11-19, verbatim in
`_agents/owner-notes/2026-11-19-three-rulings-verbatim.txt`) by Pickle, a council adviser. **KG sends
this — do not send it yourself.** It is an addendum that rides on the close-out sitting's own rules
(`zai-item6-and-closeout-2026-11-19` on `origin/council/inkling` and `origin/council/orcaink`) and on
your close-out report (`zai-w89-colors-tools-framework-report-2026-11-19.md`). Nothing here reopens
the framework (Svelte 5 + Vite 8 is final), re-cuts the shipped artifact, or touches the engine.

**Zero context assumed.** Every anchor, path and number below is from the cited filings; if any does
not match the bytes you see, STOP and say so — do not improvise. English only. VERIFIED = run by the
named seat with output quoted · REPORTED = another seat's receipt · INFERRED = reasoned · UNKNOWN.

## The three Owner rulings (verbatim, final)

1. **Part 0 — posed to you, not struck.** Owner: *"again i think we will pose the problem to him and
   let him fix it himself with his own intuition. you will be drafting a prompt to z.ai shortly to
   continue work."* You are not handed a keep/strike order. You are handed the **problem** and asked
   to fix it with your own intuition.
2. **C′1 — w89 is the target.** Owner: *"again i think we need to get as close to w89 as possible.
   the ring looks worse than the glowing button in w89."* Visual/UX direction: match w89, and the
   current suggestion ring is judged worse than w89's glowing draft button.
3. **Tabs — settled.** Owner: *"w89 titles but all caps."*

---

## Task 1 — Part 0: the problem, posed (you choose the fix)

**The four live defects** (DS filed them at the shipped bytes in
`council/ds:inbox/20261119-0455-ds-c81-addendum-c9.md`; you re-verified every anchor in §0 of your
close-out report; RE-VERIFY them at the bytes you ship before touching anything):

- **D1 — second-refresh data loss:** the player-facing file loses the draft/season on a second
  refresh. Anchors you confirmed: `src/App.svelte:177` `void clearAutosaveWeek();` at end of
  `loadDraft`; `src/App.svelte:199` `loadDraft(r.draft.record, r.draft.lineage)` before `r.week`.
  Your S29b law receipt (`receipts/partH-c9/zai-closeout-s29b-two-reload-law.log`) showed boot1/2/3
  `hub=1`, week key present ×3, zero errors on the patched tree.
- **D2 — gone% tooltip eats chip taps at 390 px:** `.cp-gonetip { width: 200px; }` at
  `BoardRow.svelte:54` inside `@media (max-width: 430px)` is dead by CSS order (base `width: 240px`
  at `:65`, later, equal specificity → rendered 262 px); the tooltip sits inside the row `<button>`
  (`:33`) and intercepts taps. Your L7b receipt
  (`receipts/partH-c9/zai-closeout-l7b-390-tooltip-law.log`) showed tip w=0, 12/12 chip hits.
- **D3 — method text inside the row's accessible name:** the `role="tooltip"` span is in the row
  button, so the method sentence is read as part of the name. Target: `aria-hidden="true"`, method
  in-flow via `.cp-gonehow` rendering the engine's own `method()` string, keyboard focus not raising
  the tooltip (your `zai-closeout-part0-rendered-state.log`).
- **D5.3 — two product names in the header:** `.cp-brand` "76 P**a**ncakes" + `.cp-track` "67
  Cakepanz · the shell" (`App.svelte:327-328`, CSS-uppercased). Target: one brand, "76 Pancakes";
  `.cp-track` null.

**What you already did (do not re-derive, build on it):** in the close-out sitting you patched all
four at the *working* bytes (pinpoint, apply-asserted, fence-checked), rebuilt dist
`76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964` (527,162 B), and the composite
re-ran green (18 × EXIT_CODE=0). The **delivered** artifact `670d4c08…` (527,177 B) is unchanged and
stays shipped. §0.4 fence you kept: only `src/App.svelte`, `src/lib/components/BoardRow.svelte`,
`src/lib/assets/shell.css`, `batteries/node.battery.mjs` (+ docs and `.gitignore`) moved; no engine
bytes, no pins, no λ, no `settings`, no re-pins, no gh-pages, no new user-facing sentences.

**The problem to solve with your own intuition:** the Owner declined to pick "strike Part 0" or
"bless it as-is." He wants *you* to decide how these four defects should be resolved and to carry
the fix through — using your judgment on the right shape, not a dictated patch. Keep the laws
falsifiable: every fix must have a probe written against the engine's own view-model, a receipt at
the final bytes, and a falsifier that dies when the defect is reintroduced. Respect the §0.4 fence.
If your judgment is "the close-out patches were right," keep them and say why with the receipts; if
you see a better shape, implement it and show the before/after. Either is acceptable — what is not
acceptable is re-delivering a player-facing file that loses the season on a second refresh or a
phone board that loses taps under a tooltip.

**Distribution is settled — do not re-zip:** the two GitHub folders are the artifact paths until
cutover; the delivered zip lacks `.gitignore` and stays as-is. No v2 re-zip.

---

## Task 2 — C′1: match w89, replace the ring

**Owner direction:** *"we need to get as close to w89 as possible. the ring looks worse than the
glowing button in w89."* w89 is the visual reference (live build at
`https://kozikosi.github.io/Football-Sim/`; read-only bytes at `origin/gh-pages:index.html`).

**The defect as reviewed (Pickle P-316 H5/H6, VERIFIED at c9 bytes, re-verify at yours):**
- **H5 — ties from rounded display text, not engine rank.** `DraftBoard.svelte:40` parses
  `Number(String(x[vm.sort]).replace(/[^0-9.\-]/g,'')) || 0` and extends ties at `:45-46` by those
  parsed values. The engine ranks on raw `_w`/`_p` (`src/engine/.../view/draftBoard.ts:50`, sorts
  `:53-54`) and **strips them at `:61`** before handing the VM to the UI; `display.ts:22-25` rounds
  with `toFixed(1)`. Two distinct raw values that render the same string (e.g. +0.64 and +0.56 →
  both "+0.6") are treated as an exact tie and both get highlighted, though the engine ordered
  them. The battery (`batteries/board.battery.mjs:50-53,93-98`) computes its `expected` with the
  same regex parse, so it is self-referential on tie semantics.
- **H6 — the highlight is on the row toggle, not a draft button.** `.cp-suggest .cp-main` in
  `BoardRow.svelte:82` puts the ring/box-shadow on the row-header button (`onclick={() => (open =
  !open)}` at `:24`), while the actual "Draft at …" chip is `.cp-chip.cp-primary` at `:41` inside
  `.cp-fits` (`hidden={!open}` at `:36`).

**The problem to solve with your own intuition:** the Owner finds the current ring aesthetically
worse than w89's glowing draft button. Bring this surface as close to w89 as you can — visual
treatment and interaction — and replace the ring with the w89-style treatment. Do not invent a
per-row draft chip if the close-out order's H6 rule still stands for your tree (it said the ring's
home is the toggle and not to build/search for a chip); check that rule against the bytes you hold
and say which way you went. Keep F20's falsifier pointed at whatever control you highlight, and fix
the tie semantics so the highlight matches the engine's own ordering — not a reparse of display
text — whether that comes from a VM change in your tree or a documented display-round rule. **If
matching w89 or fixing the tie requires an engine-view export change (`raw: { wins, priority }` on
`BoardRowVM`) or a re-pin, STOP and name it as a need from the Architect** — that is outside your
fence; do not touch `colors/src/**` or any pin.

---

## Task 3 — the four tab labels: settled, apply verbatim

Use the w89 wording, rendered in ALL CAPS (Owner: *"w89 titles but all caps"*):

| # | Label |
|---|---|
| 1 | `SEASON STATS` |
| 2 | `PLAYOFF STATS` |
| 3 | `YOUR PLAYERS` |
| 4 | `LEAGUE LEADERS` |

w89 ships the same four as "Season stats / Playoff stats / Your Players / League Leaders" (VERIFIED
in `origin/gh-pages:index.html` this session). This closes GPT's copy gate. Apply it to the four
stats tabs in the Cakepanz shell, keep the change within your fence, and include a rendered-state
receipt (the four visible labels, exact strings) in the sit-rep. No council or product file is
edited by Pickle.

---

## Deliverable, fences, receipt law (unchanged from the close-out order)

One markdown sit-rep, relay path unchanged (you have no push access; KG relays). For each of the
three tasks: the status in one line, the exact bytes/hashes/exit codes, and any residual open item.
Tag every claim VERIFIED / REPORTED / INFERRED / UNKNOWN with the command and output; names and
hashes only from the final bytes.

**Do NOT cross:** no engine files, no pins/re-pins, no λ change, no gh-pages or w89 deploy, no
framework change or verdict, no builds outside the pinpoint class, no store change, no assignment
to other seats, no re-running item-5, no opening/interpreting item-6 numbers, no re-zip, nothing
shipped. The five fence paths stay untouched (`colors/src/core/**`,
`colors/src/sports/nfl/engine/**`, `**/saves.ts`, `**/appstate.ts`, `**/hydrate.ts`, `**/versions.ts`,
`**/envelope.ts`, `data/**`, `tools/mathlab/**`).

— DRAFT by Pickle for the Owner to review and relay. Not sent. No branch pushed.
