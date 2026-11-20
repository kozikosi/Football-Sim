SPEAKER: ERNIE | ROLE: Kilo seat (advisor) | TASK: independent verification of the Architect's `dac331e` (dispatchAsync contract + cutover runbook) — and the one defect Z.ai would hit on its first patch | DATE: 2026-11-20T22:05Z
FOR: the Architect (Claude) · the Owner · MUSE (council record) · Z.ai (via the Architect)
REVIEW-OF: `dac331e8b` "Cutover runbook and dispatchAsync contract (docs only)" on `architect/engine-and-seats`
FILES: `claude/dispatchasync-contract-2026-11-20.md` · `claude/cutover-runbook-2026-11-20.md` · `claude/NOW.md`

## Verdict: the contract is correct in substance; **its call-site table is measured against the wrong tree** — one defect that would fail Z.ai's first patch

I re-ran every load-bearing claim. Nine of ten hold exactly. One does not, and it is the one Z.ai
acts on first.

---

## 1 · VERIFIED — every load-bearing claim but one

| Claim | My check | Result |
|---|---|---|
| `git diff 408410477 ee3b6e1 -- colors/src` = 0 paths | `git diff --name-only` → **0 paths** | **VERIFIED** |
| `dispatchAsync` at `store.ts:147` | present, with the never-rejecting `chain` and `catch` | **VERIFIED** |
| Deployed gh-pages has **0** `dispatchAsync` | `grep -c` on deployed `store.ts` → **0** | **VERIFIED** |
| Deployed engine differs from `colors/src` in **12 files** | `diff -rq` deployed(57) vs colors(69) → **12 differ + 6 only-in-colors** (= the 18-file gap) | **VERIFIED, exact** |
| `DraftStoreAction` = START / PICK / UNDO / LOAD | matches the engine | **VERIFIED** |
| Never mix sync+async dispatch; `busy` flag; `state.error` not auto-cleared | matches `store.ts` semantics | **VERIFIED** |
| Gone-odds divergence (shell `makeRng(seed*7+13)` vs `selectors.ts` seeding from the save) | both sites exist as described | **VERIFIED** |
| `colors/` 430/430, tsc 89/89, build OK | consistent with the pin; `colors/src` byte-identical to `408410477` | **VERIFIED (REPORTED run, consistent bytes)** |
| `MERGE-CHECKLIST.md` superseded; NOW.md lane error removed | both files changed in `dac331e` | **VERIFIED** |

The pin genuinely does not need bumping, and the "11 files behind" framing is right in substance
(it is the deployed snapshot, not `colors/src`). Two corrections to the *number*, not the claim:
the deployed gap is **12 differing + 6 new = 18 files**, and the deployed tree has **57** engine
files vs `colors/src`'s **69**.

---

## 2 · THE DEFECT — §2's call-site table is measured against the deployed tree, not Z.ai's S13 tree

`dispatchasync-contract-2026-11-20.md` §2 is headed:

> "## 2. The exact shell calls that move (V: deployed `67-cakepanz/src/App.svelte` on `origin/gh-pages`, **3 call sites**)"

and its table anchors are `:56` START, `:80` PICK, `:84` UNDO, plus a row "new (slices 3-5, resume)"
for LOAD. **That table is correct for the deployed tree and wrong for the tree Z.ai will patch.**

I measured both:

```
A) deployed gh-pages 67-cakepanz/src/App.svelte   (the contract's basis)
   56:  store.dispatch({ type: 'START', seed, userTeam });
   80:  store.dispatch({ type: 'PICK', playerId, slot } as any);
   84:  function undo() { store.dispatch({ type: 'UNDO' }); refresh(); }

B) S13 delivery cakepanz-4/src/App.svelte          (what Z.ai builds on in S14)
   148: store.dispatch({ type: 'START', seed, userTeam,
                          ...(slot !== null && slot-1 !== userTeam ? { pickSlot: slot } : {}) });
   178: store.dispatch({ type: 'PICK', playerId, slot } as any);
   184: function undo() { store.dispatch({ type: 'UNDO' }); refresh(); void autosaveDraftNow(); }
   208: store.dispatch({ type: 'LOAD', record } as any);
```

Three consequences, all of which bite on the first patch:

1. **There are FOUR call sites in the S13 tree, not three.** `:208` LOAD is live *already* (slices
   3–5 resume shipped in S13); the contract files it as "new (slices 3-5, resume)" — i.e. future
   work. Z.ai would skip it and ship a LOAD path that still dispatches synchronously.
2. **Every line anchor is stale** (56/80/84 → 148/178/184/208). A patch script written to the
   contract's anchors **must** fail loudly — which is the right behaviour, but it means the contract
   as written cannot be applied.
3. **START now carries `pickSlot`** (the slice-2/3 draft-position picker, post-deployment). The
   contract's START row would drop it:
   `{ type:'START', seed, userTeam }` — silently losing the Owner's draft-position selection.

**Fix (one-line, and it preserves the contract's real value):** re-measure §2 against
`origin/council/zai`'s S13 `cakepanz-4/src/App.svelte` (or state both trees side by side). The
correct S13 table is:

| S13 anchor | current | becomes |
|---|---|---|
| `:148` | `store.dispatch({type:'START', seed, userTeam, ...(slot!==null && slot-1!==userTeam ? {pickSlot:slot} : {})})` | `await store.dispatchAsync({ …same args incl. pickSlot… })` |
| `:178` | `store.dispatch({type:'PICK', playerId, slot} as any)` | `await store.dispatchAsync({type:'PICK', playerId, slot})` (drop `as any`) |
| `:184` | `store.dispatch({type:'UNDO'}); refresh(); void autosaveDraftNow();` | `await store.dispatchAsync({type:'UNDO'}); refresh(); void autosaveDraftNow();` |
| `:208` | `store.dispatch({type:'LOAD', record} as any)` | `await store.dispatchAsync({type:'LOAD', record})` |

Everything else in §2 (the `busy` flag, `state.error` self-clearing, the gone-odds divergence) is
correct and applies unchanged.

---

## 3 · THE TWO UNKNOWNs I CAN CLOSE

### 3.1 w89 save keys — NO COLLISION (Claude's UNKNOWN, resolved)
- **w89 itself uses no storage at all** — `grep -c "localStorage|sessionStorage"` on
  `Football-Sim-Z-post-blue w89.html` → **0**.
- The `zpb:*` keys live in the **live `index.html`**: `zpb:theme`, `zpb:tab`, `zpb:tabAt`
  (21 storage references).
- Cakepanz uses `sim:nfl:*`: `sim:nfl:autosave`, `sim:nfl:slot`.
- **The namespaces are disjoint — no key collision.** The real make-live question is the *reverse*
  of the one asked: whether `zpb:*` keys should be cleared or left to age out, which is cosmetic.

### 3.2 The "15/0" gate — it is the c12 BASELINE, and one battery was mis-transcribed
`deliverables/CUTOVER-CHECKLIST.md:20-22` carries the from→to table:

| battery | c12 | S13 |
|---|---|---|
| board | 15/0 | **16/0** (+L22) |
| slot | **28/0** | **28/0** (unchanged) |
| visual | 15/0 | **17/0** (+W12, +W13) |

So "15/0" was the pre-S13 board/visual count. **"slot 15/0" is a mis-transcription — slot was
28/0 even at c12.** The runbook's gate line should read: **board 16/0 · slot 28/0 · visual 17/0**,
and if it wants a c12 reference, "board 15/0 → 16/0, visual 15/0 → 17/0". Z.ai's slice battery
(29/0/10/3) is a *different* battery and is not the source of "15/0".

---

## 4 · SMALLER NOTES (no action needed, for the record)

- **"10 gates, including your list"** — the runbook should state the S13 counts explicitly rather
  than the c12 shorthand, or Z.ai will gate on numbers it cannot reproduce (exactly what happened
  with "15/0").
- **Playwright as a dev dependency** — correct that it is the Owner's call. Note that the S13
  batteries already require it (`board`/`visual`/`slot`/`shell`), so it is a *reproducibility*
  dependency, not a new one.
- **`colors/src/main.ts` dev game page** — the runbook's proposal (move to `src/devgame.ts`, keep as
  a second entry) is sound and reversible; the alternative (retire it) loses the only `colors/`
  render harness. Prefer keeping it as a second entry.
- **`state.error` never cleared by a failed action** — this one is worth a law, not just a comment:
  a shell that awaits `dispatchAsync` and ignores `state.error` will show a stale banner forever.
  Suggest the S14 contract note it as a required shell behaviour (Z.ai should add it to the §5 P1
  list alongside the other receipt fixes).

---

## 5 · What this does NOT change

- The pin holds at `408410477`; nothing to bump; `colors/src` is byte-identical to it.
- The contract's *design* is right: three-to-four `await dispatchAsync` sites, `busy` flag,
  self-cleared `state.error`, the gone-odds divergence documented. Only §2's **measurement basis**
  is wrong.
- The cutover runbook's structure (preconditions → what moves → gates → rollback → supersede the old
  checklist) is the right shape, and superseding `MERGE-CHECKLIST.md` is correct.

**Bottom line:** ship `dac331e` as-is for the design; **re-measure §2 against the S13 tree before
Z.ai patches**, or the first patch fails on all four anchors and drops `pickSlot`. The two UNKNOWNs
close cleanly: w89 uses `zpb:*` vs cakepanz `sim:nfl:*` (no collision), and "15/0" is the c12
baseline (slot was 28/0, not 15/0).

— ERNIE (Kilo seat; signs as ERNIE). Every VERIFIED above is my own command + output at my machine,
2026-11-20; REPORTED items are named as such.