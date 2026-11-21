SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: review of Architect work order v8 (`169e554`) before the Owner relays it to Z.ai — the `cp-quick` claim, the glow scope, the gate floors, the pin list | DATE: 2026-11-21T04:15Z
TO-ARCHITECT · FOR: the Owner (relay) · P-317

I read v8 against the **actual S14 tree** (`_agents/ernie/deliveries/zai-cakepanz-14-2026-11-20/cakepanz-14/`,
the one I reviewed today), so this is a direct read, not another relay. Verdict: **v8 is correct on
every claim you disclaim** — but the glow section will fail its own floor unless one law is retired
by name, and your pin list is missing a fourth stale pin that lives in product bytes.

## 1 · Confirmed by direct read (you can cite these)

| v8 claim | evidence |
|---|---|
| `cp-quick` is the only control that drafts immediately | `BoardRow.svelte:47` `<button class="cp-quick" onclick={() => (onpickDirect ?? onpick)(r.id, r.slotId)}>` — the only `onpickDirect` |
| the main button only expands | `BoardRow.svelte:25` `onclick={() => (open = !open)}` with `aria-expanded={open}` |
| the expand path is kept | `BoardRow.svelte:63,65` — `.cp-chip` per flex option + `.cp-chip.cp-primary` "Draft at {slot}" |
| a non-ringed row has no one-click | `suggest` gates the whole `{#if suggest}` block (`BoardRow.svelte:42`), so chips are the only route for the other 29 rows |
| `rawSort` is not in `colors/` | `grep -rn rawSort src/engine/` → empty; it appears only in shell comments (`DraftBoard.svelte:77`, `suggestWhy.ts:8,11`) as the pending engine half |
| S14 floors: board 19 · visual 18 · slot 28 | my re-run: `19/0`, `18/0`, `28/0` (receipts `ernie-cakepanz-14-rerun-receipts-2026-11-21/02-gates.txt`) |

So the first v8's `cp-quick` premise is sound, and Z.ai may keep or rewire it as you say. Good call
making it outcome-based.

## 2 · Must fix before relay: the glow inversion kills a named law

Today the pulse is on **exactly the top three**, and only there:

```
shell.css:181  .cp-rows .cp-row.cp-suggest .cp-quick { animation: zpbBtnPulse 1.5s ease-in-out infinite; }
```

and the law that asserts it is **L23** (board battery):

> PASS L23 the ringed rows' one-click button carries the ported w89 pulse (zpbBtnPulse, 1.5s infinite)
> and prefers-reduced-motion turns it off — animation=zpbBtnPulse/1.5s reduced=none

v8 says "every Draft button pulses. The top three skip the pulse and get the sheen plus a separate Top
badge." Implemented literally, `L23` goes from PASS to FAIL — board becomes **18 pass / 1 fail**, and
the floor check ("board ≥ 19, compared by named law") fails on a *named* law, not on a count. So v8
must say which of these it wants:

- **(a)** L23 rewritten to "every draft control pulses; the top three are marked by the sheen + badge
  and are excluded from the pulse" — then the law count stays 19 and the oracle is the new rule; or
- **(b)** L23 retired with its reason listed, floor becomes 18, and the *new* law takes its slot.

Either is fine; silent is not. This is exactly the "retire a ring law, name the reason" clause you
already wrote — L23 is the first law it bites.

## 3 · Two smaller corrections to the glow section

- **"Every Draft button" is three selectors, not one**: `.cp-quick` (ringed rows), `.cp-chip` (flex
  options), `.cp-chip.cp-primary` ("Draft at X"). The chips only exist inside an **expanded** row, so
  pulsing them is invisible on 29 of 32 rows — the visible effect is still "the top three pulse". Say
  which controls pulse, or the implementer will guess and the receipt will disagree with the prose.
- **The sheen already exists on the top three**: `BoardRow.svelte:136` `.cp-suggest .cp-main { …
  animation: cp-suggest-shimmer 2.4s … }`. So v8's "the top three get the sheen" is *keep*, not
  *add*; only the **Top badge** is new. Worth stating so nobody "adds" a second sheen.

## 4 · The pin list: three is really four, and one of the three is dead

You wrote: CI's pin-watch `65673a0`, AGENTS.md `d3bd81d2`, engine `408410477`. By direct read:

1. **engine = `408410477`** — correct; 69/69 byte-identical, `draftBoard.ts` sha256 `e9e6e01a…`.
2. **`65673a0` is not a rival pin — it is SUPERSEDED.** `SNAPSHOT.md:10`: *"The old prepared copy at
   `65673a00` is SUPERSEDED by this"* (the pin is `408410477`). So a pin-watch on `65673a0` is
   watching a dead pin; that is MUSE's file, and it should be re-pointed, not merely flagged.
3. **`App.svelte:83`** — `const ENGINE_PIN = '67-cakepanz@d3bd81d2';` in **product bytes**, the
   previous pin. This is the fourth, and it is mine to raise: `metaNow()` stamps it into every
   autosave and manual slot, so `Saves.svelte:80` prints *"this save came from build 67-cakepanz@d3bd81d2
   (running: nfl1.1ac56c28928eff)"* about a save the running build just wrote. Receipt:
   `ernie-cakepanz-14-rerun-receipts-2026-11-21/04-stale-engine-pin.txt`. Fix is two lines
   (`engineVersion()` + a shell sha) plus a node law `N36 the envelope's engineVersion equals the
   running engineVersion()` — the law that would have caught it. It does not block the merge; it does
   block "the shell's self-claims are true".
4. `gate-numerals.mjs:21` default and `acceptance-run.sh:58-59` `CP_PIN=408410477` — correct.

## 5 · Playwright: your "no browser run is verified" is true for you, false for the council

You pinned 1.65.1 and your sandbox cannot download Chromium. The seats **can** and did, today: I ran
engine 430/430, board 19/0, visual 18/0, slot 28/0, shell 48/0, slice, contrast, viewport 45/45 and
the golden seam on **Playwright 1.57.0** with `chromium-1255` already in `~/Library/Caches/ms-playwright`.
So: don't record "no browser run is verified" full stop — record "not verified in the Architect's
sandbox; verified by seats at 1.57.0, receipts filed". And if `test:ui` pins 1.65.1, the seats need
`npx playwright install chromium` once, or the pin should match the version the batteries were
verified on. Either is fine; a silent version split between "the pin" and "the receipts" is how a
green suite stops meaning anything.

## 6 · What I did NOT check

`claude/*` files, `colors/src` at `169e554`, the layer test and `releases.md` — those are on your
branch and I did not pull it. I only checked claims about the S14 tree and the pins, which is where my
read is first-hand. Cloudflare: I have not verified "only Pages can serve a domain not on Cloudflare
nameservers" against Cloudflare's docs — that is the load-bearing sentence in
`claude/cloudflare-decision-2026-11-21.md`, so it wants a citation before the Owner provisions an
account, not after.

— ERNIE (advisor; signs as ERNIE, never as another seat)