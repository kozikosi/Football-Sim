SPEAKER: INKLING | ROLE: seat (MUSE delegation) | TASK: A11 — the C′1 tie semantics and the H6 ring target, measured at the shipped bytes | DATE: 2026-11-19T07:02Z

Anchor + source-verification this window, in the scratch verify copy at the shipped bytes.

## 1 · The code path (exact lines, shipped `cakepanz-4`)

`src/lib/components/DraftBoard.svelte:39-45`:
```
  const suggestIds = $derived.by(() => {
    const rows = shown;
    const val = (x: BoardRowVM) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0;
    const ids: string[] = [];
    const base = Math.min(3, rows.length);
    …
    if (base === 3) {
      const third = val(rows[2]);
      for (let i = 3; i < rows.length && val(rows[i]) === third; i++) ids.push(rows[i].id);
```
It re-derives the number from the FORMATTED string (`r.wins` — `signed(showDecimal('wins', w))`, one decimal), so any two teams whose wins coincide at the one-decimal display tie and extend the ring past three. My battery run: **pick 1 → 4 ids · pick 13 → 31 ids · pick 27 → 60 ids** (expected values, ids exact). z.ai's receipts: **3 / 38 / 60** (h9, final shipped; the prepared overlay shows the same 3/38/60). The difference is RNG noise (the live draft is unseeded — `App.svelte:109`); the law (ids exact vs the VM at sampling time) passes both runs.

`src/engine/sports/nfl/view/draftBoard.ts:47-52` (THE ENGINE'S VIEW — read-only here, no engine edits):
```
      wins: signed(showDecimal('wins', w)), priority: signed(showDecimal('priority', pr)), gone: goneDisplay(g) + '%', alsoFits,
      tone: …, _w: w, _p: pr,
```
**The RAW values already exist on every board row — `_w` (raw wins float) and `_p` (raw priority float).** The shell's tie check parses the display string *instead of reading `_w`*, which is the entire mechanism of ERNIE's "Option B needs a seam change" framing, and it is wrong: **reading `x._w` / `x._p` anywhere is a two-line change in one Svelte file — no engine edit, no VM edit, no seam migration, and raw-grid ties are essentially nonexistent** (wins live on the engine's 1e-9 grid; raw equality is a near-empty set — the shell's own comment at DraftBoard.svelte:36-37 says ties compare exactly on that grid). Exactly-three in late rounds is therefore cheap: `val = (x) => x._w ?? Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, ''));` — and same for priority.

## 2 · H6 — the ring's actual target (the expand control, not the draft chip)

`src/lib/components/BoardRow.svelte:23, :33, :82`:
```
23: <div class="cp-row cp-{r.tone}" class:cp-suggest={suggest} data-id={r.id}>
24:   <button class="cp-main" onclick={() => (open = !open)} …>
33:     <span class="cp-gonetip" role="tooltip">{method(oddsMeta)}</span>
82:   .cp-suggest .cp-main { box-shadow: inset 0 0 0 1px var(--gold2); animation: cp-suggest-shimmer 2.4s ease-in-out infinite; }
```
`.cp-suggest` rides the row; the ring's visible effect styles `.cp-main` — the **expand/collapse toggle**, not any "Draft at X" chip (there is no per-row draft chip; the pick path is expand → chip → confirm). The ring therefore marks the suggestion as "this row leads to the pick" — correct semantic for a speedrunner ("these three are your speedrun targets"). **No change required for the ring's target unless the Owner wants it on a different control** (there is no elsebound control to move it to) — the movable defects are the two below.

### The two measured defects the ring ships with today
1. **Display-rounded ties** (above) — 4/31/60 highlights on this machine; 3/38/60 in the delivery's own receipts. The Owner's word is owed regardless of mechanism: exactly-three (switch `val` to `_w`) or data-true breadth (accept the display ties).
2. **The ring's animation is infinite** — `cp-suggest-shimmer 2.4s ease-in-out infinite` on every highlighted row (BoardRow.svelte:82, :84–89 honoured correctly under reduced-motion). Infinite loops on 60 rows are unchanged from this sitting's frame economy; reduced-motion disables it (battery asserts this). No action required unless the Owner wants finite washes.

## 3 · What the Owner needs to rule (one word, no ambiguity)
**Option A (display-rounded):** the ring shows ties as the user can SEE them — broad, intuitive, matches the wins display; late rounds can ring 30–60 rows (harmless but noisy).
**Option B (raw `_w`):** `val = (x) => x._w ?? …` — exactly three in virtually every pick; needs no engine, VM, or data change; a two-line Svelte edit; the ring "physically disappears" where the display is flat. This is what the Owner's "at least three" reads most naturally as — but it IS his call; the Owner's 2026-11-19 words were "as long as at least three players' draft buttons highlighted" — the ruling must name which wins values the highlight uses.

— INKLING, 2026-11-19T07:02Z; anchors read this window at the shipped bytes; L13 numbers cited from my battery re-run + the delivery h9 (both trees print 3/38/60 at the shipped final bytes in the receipts; mine printed 4/31/60 — unseeded draw variance, law passing both ways).
