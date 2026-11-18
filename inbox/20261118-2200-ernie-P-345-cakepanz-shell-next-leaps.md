SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: innovation filing — what the cakepanz-8 shell should do next (P-337 follow-through + the R-13 slice) | DATE: 2026-11-18T22:00Z
FOR: P-345 (council innovation round) — also feeds P-337 (late-round seamlessness) and P-342 (Block C / R-13)

IDEA: eleven changes to the 67 Cakepanz shell, ordered by value per line of code. Items 1–4 are repairs to what cakepanz-8 just shipped (evidence in `inbox/20261118-2149-ernie-P-316-cakepanz-8-review.md`); 5–9 are new product surface; 10–11 are measurement and process. Nothing here touches an engine file, a protected constant, or the flex table. EVIDENCE: VERIFIED for every code claim (I read the four files in the c7→c8 diff and ran the batteries); INFERRED for the design proposals.

---

## 1. Make the simple row the detail door, and label the number (repairs F1+F2, ~6 lines)

Today the simple row's main element is a dead button (`BoardRow.svelte`, `onclick={() => (open = !open)}` with `aria-expanded={open}`, while the `cp-fits` panel exists only in the `{:else}` branch) and the row's one number is `r.wins` with no basis, while the row order still comes from `vm.sort` (`wins | priority | ovr`). Two small changes fix both:

```svelte
{#if simple}
<div class="cp-row cp-{r.tone} cp-simplerow">
  <button class="cp-main cp-mainsimple" onclick={() => (open = !open)} aria-expanded={open}
          aria-label={`${r.name}, ${r.pos}, ${r.wins} wins${r.natural ? '' : ', flex'}`}>
    <span class="cp-name">{r.name}</span>
    <span class="cp-pos">{r.pos}</span>
    <span class="cp-num cp-rec">{r.wins}<small>WINS</small></span>
    <span class="cp-gone-wrap">…</span>
  </button>
  {#if open}<div class="cp-fits">… the same chips as the full form …</div>{/if}
  <button class="cp-pickbtn" onclick={() => onpick(r.id, r.slotId)}>DRAFT</button>
</div>
```

Rendering the *same* `cp-fits` block in both branches (hoist it out of `{:else}`) makes "every number is still one click away" true at the row level, gives the button a reason to exist, and keeps the simple form's default (no chips until asked). The `<small>WINS</small>` label costs one line and removes the F2 ambiguity without touching the sort — which matters, because forcing `sort = 'wins'` at the flip would change row order and break L4's frozen-state VM sha.

## 2. One-click pick in the simple form (decision cost, ~2 lines)

The simple form still costs **two** clicks per pick: `DRAFT` sets `picked`, then a confirm paragraph appears, then a second `DRAFT`. The full form needs the confirm (the slot choice matters). The simple form does not — the slot is `r.slotId`, the row says the position, and **Undo already exists** and is already loud in the footer. Make the simple row's button draft immediately and let Undo be the safety net. That halves the late-draft interaction cost, which is the whole point of P-337, and it is the single largest UX win available for the fewest lines.

## 3. A two-way door (repairs F4, ~2 lines)

`simpleOff` is set by FULL BOARD and cleared only by a new draft, so one accidental tap costs the user the simple form for ~22 rounds. Add a `SIMPLE` button in the footer, shown only when `lateMode` is available and `simpleOff` is true, that clears the flag. Presentation-only; L3 keeps asserting "full stays full until asked otherwise" and gains "simple returns when asked".

## 4. Theme-aware Block B surfaces (repairs F3, ~4 declarations)

`.cp-rec`, `.cp-pickbtn` (`BoardRow.svelte`) and `.cp-fullbtn` (`DraftBoard.svelte`) hard-code `#e8c87e` / `#8a5f18` / `rgba(217,169,76,…)`; the tokens are `--gold2: #e6c67d`, `--gold3: #9a6b1f`, `--goldm: #ad7f2e`, `--on-gold`, `--hairline`, `--sub` (`tokens-w89.css:42–57`, re-defined per mode at `:105–111`). Swapping the four declarations onto the tokens costs nothing and means the Owner's two open contrast rulings (light gold2 1.65:1, dark `--text`) apply to the late-draft board too, instead of requiring a second pass.

## 5. "Why this one" — one sentence per recommendation (new, ~10 lines, engine already has it)

The engine computes lineup advice (`adviseLineup`, `planWhy`) and the full form shows it as a panel. In the simple form that panel is gone, so the recommendation is a bare number. Add one short clause to the simple row from data the VM already carries — e.g. *"best available · fills FS · 0.3 wins over the next QB"* — and the late draft reads as advice rather than arithmetic. This is the highest-value new surface in the list: it directly serves the Owner's Q6 sentence ("not have to do complex math or planning to make a decent roster") by making the decision *feel* made for them.

## 6. Say the count in the user's terms (new, ~3 lines)

The footer prints `filled/total` for the whole board (32 × 32 = 1024). A user in round 14 does not think in 1024. Print *"your pick 12 of 32"* beside the form line. Same data (`myPicks`, already derived in `App.svelte`), different denominator, and it is the number that answers "how much is left".

## 7. Warn before the flip, not at it (new, ~2 lines)

The mode changes at pick 11 with an explanatory line *at* pick 11 — which is the first moment the user notices something moved. A one-line heads-up at pick 9 ("the board simplifies after your 10th pick — one click back any time") makes the same change read as designed instead of as a rendering bug. Cheap, and it removes the only moment in the draft where the shell currently surprises the user.

## 8. Measure the decision, not the DOM (new law, ~25 lines — the one I would most want)

L1–L6 prove the simple form *exists* and moves no engine number. They do not prove it is *easier*, which is the actual claim. Add **L7**: drive N picks in each form from the same frozen store state and assert

- clicks-to-pick(simple) ≤ clicks-to-pick(full), and
- median wall-clock to confirm a pick in the simple form is not higher than in the full form.

Both are readable from the real UI (a click counter on the page, `performance.now()` around the confirm). This turns P-337 from "the board looks simpler" into "the board is measurably simpler", and it is the law that would have caught item 2's two-click cost. It also gives the Owner a number to judge the feature by, which the current receipt set does not.

## 9. Extend the principle to the season hub (new, design only — flag, do not build)

The Owner's sentence is about the draft, but the same arithmetic-avoidance argument applies to the weekly hub: one "recommended move" line ("start X over Y — 0.2 wins"), one "play next week" button, everything else one click away. This is a *product* call, not a layout one, so it belongs to the Owner — but the simple-board work is the proof that the pattern lands, and the hub is where a user spends the other 17 weeks.

## 10. Keep `data-*` as the battery contract (process, ~0 lines)

`DraftBoard.svelte` now carries `data-form={lateMode ? 'simple' : 'full'}` and `data-count` on the rows, and L1–L3 assert from those instead of from class names. That is why the Block B laws survived the implementation details. Make it explicit in `inbox/README.md`-style guidance for the shell: **every new mode/law gets a `data-*` hook in the same commit**. It is the difference between a battery that tests the product and one that tests the CSS.

## 11. For R-13 (Block C): make the sealed slice the *late-draft* board, not the full one

The framework round needs one sealed slice, ported against the unchanged TS core, run twice in reverse order. The cakepanz-8 late-draft board is the best candidate in the app for that job, and better than the full Draft Board:

- it exercises the three things the counterbalance is actually about — **conditional rendering**, **props threaded two levels**, and a **state store** — without the 60-row table's weight;
- it is **render-only by construction** (L4 proves the VM sha is identical across the flip), so any difference the two arms show is framework, not port;
- it is small enough to port twice by hand in one sitting, which the reverse-order requirement effectively demands.

Report the same lines the order names (render-layer lines, bundle bytes and gzip, boot-to-first-paint median of 5, battery pass count, empty TS-core diff) for the *simple* form, and note in the report that the full form was not ported. If the Owner wants the full board instead, the late-draft numbers still transfer as the cheaper control.

---

## What I am explicitly not proposing

No engine change, no new flex price, no re-pin, no change to the mode weights or `minClassPool`. No new jargon on any screen. No auto-draft: the Owner's Q6 asks for *simple decisions*, not *no decisions*, and an auto-pick would remove the thing the feature exists to protect. And nothing above should be built before the Owner rules on the two open contrast questions, because items 1 and 4 both touch the surfaces those rulings will re-touch.