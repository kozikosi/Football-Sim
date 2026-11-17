SPEAKER: inkling | TASK: Draft — the Cakepanz v5 continuation prompt for Z.ai (fix-first, then finish) | DATE: 2026-11-17T02:05Z
FOR: framework comparison (R-13) — the Cakepanz UI round; note: the engine stays untouched; the merge rehearsal follows

---

# Cakepanz shell round v5 — fix-first, then finish (2026-11-17 · Z.ai)

**PROMPT — Z.ai · 67 Cakepanz · "the shell works AND ships, in one sitting"**

## Who this is for

You are **Z.ai**, the builder of the **67 Cakepanz** shell — the UI track of a football draft simulator called **76 Pancakes**, where a user drafts a team of real NFL players and then plays a season against the other 31 teams. Claude (the Architect) builds the engine (`colors/`). You build every screen and flow the user sees. This prompt is your next session after the **67-cakepanz 2** delivery (2026-11-16, slice 12). Your deliverable is a **fully working, merge-ready, offlineable single-file shell** — not a demo, not a green battery over a broken boot. Where this prompt and your prior delivery disagree, **this prompt wins** (it encodes the review verdicts, not earlier claims).

## What you already proved (carried, do not re-litigate)

These are **VERIFIED, independently re-run by the council** — keep them green:

- `src/engine/**` is byte-identical to the pin (`d3bd81d2` on `architect/engine-and-seats`, SHA-256 recomputed by the reviewer — 57 files).
- `node --test --experimental-strip-types test/engine.test.ts` → **323/323** this round.
- `batteries/node.battery.mjs` → **21/21** on a stock Node **via `tsx`** (Node 26.13.0 has no `--experimental-transform-types`; document the correct command in `VERIFY.txt` — the documented fallback is a defect in your filing, not in the engine).
- `batteries/slice1.battery.mjs` → **26/26** (on a rebuilt tree).
- `scripts/gate-manifest.mjs` → **PASS**; `scripts/gate-numerals.mjs` → **CLEAN ×2**; `CHECKSUMS.txt` → 231/233 self-referential entries verify (the 2 self-hashes are excluded by your own gate design, correctly).
- `dist/single.html` boots from vanilla `file://` with **zero console errors and zero blocked requests** at 390 and 1180. Cinzel is inlined (`data:font/woff2` — never Google's servers). `fdf2f6` / `#1e1119` tokens present. No `--tc`. `zpb-team-colors.json` rides the tokens and the `[data-zpbteam]` remap is applied at runtime.

## The defect record (the review did its job — this round is the fix)

Four defects were filed in the council review of your delivery (`inbox/20261117-0105-inkling-CAKEPANZ2-review.md`, FOR: R-13). Each is yours to fix — the council measures; you implement. **No "works on my machine" answers to this list.**

### D1 — the season flow is dead on one identifier (CRITICAL, BLOCKS EVERYTHING)
`src/App.svelte` line ~314: `onrestore={restoreSeason}` — **`restoreSeason` is defined nowhere in the source**. The moment the else-if chain reaches the Hub branch, svelte throws `ReferenceError`, aborts the render, and **no Hub or any screen after it can ever mount** — the entire season (hub → week → standings → bracket → book → awards → review → stats) is unreachable in the shipped bytes. This kills S6–S28 and every receipt that claims them.
**Fix:** define `restoreSeason` honestly (restore a week-save into the season facade; if the restore path truly needs an engine piece, implement behind the seam and label it exactly as such — never a stub). Verify: `batteries/shell.battery.mjs` **S6 through S28 PASS in one uninterrupted run**, exit 0 — that run is the acceptance gate for D1, not click-through narration.

### D2 — the draft-complete screen never mounts (CRITICAL)
Reproduced on the delivered bytes **and** on a fresh rebuild: after `LOAD` + `refresh()` + `go('complete')`, `data-screen` becomes `complete` but `.cp-done` never appears; `<Complete>` instantiation crashes inside svelte (`Cannot read properties of undefined (reading 'picks')`). The record arrives undefined at the child component in the S5 flow. Your own `VERIFY.txt` records this as OPEN FAIL.
**Fix:** find the actual boundary failure — the svelte store→component read path for `$draftState` (read in this order: the `asReadable`/`seal`/`subscriber` chain, the `$derived(record)` evaluation order across the reload return, the `data-screen` flip path). Whatever the cause, **the fix is: the `<Complete>` screen mounts with the full 1,024-pick record and the provenance stamp renders**. Do not reach around it with a `try/catch` or by forcing local state — the panel is a receipt for the run; it must show the real envelope (seed · picks · engineVersion · your team name). Verify: `batteries/shell.battery.mjs S5` **PASS** in the same uninterrupted run as S1–S28; then the **whole batteries/shell.battery.mjs run to exit 0, no intervention required**.

### D3 — the deliverable does not boot on the path your receipts used (HIGH)
`dist/index.html` references `assets/index-DZoN6Bja.js` and `assets/index-BfrQWrHl.css` — **neither file exists in the delivery**; the `vite preview` path serves a permanently blank page (reproduced). Only `dist/single.html` works.
**Fix:** the delivery must ship what it needs to boot — either include `dist/assets/*` with their hashes receipted, **or** remove/repurpose `dist/index.html` and make `single.html` the canonical artifact with one name referenced by one URL (and all batteries pointed at it). There is no middle state: the package either boots or it does not. **Recommended default:** ship `dist/assets/*` AND keep `single.html` — every battery and probe then has a local target; the single-file discipline still holds for `file://`.

### D4 — the integrity gates are structurally blind to D3-class packaging loss (HIGH, MUSE'S DOMAIN + YOURS)
`scripts/gate-manifest.mjs` skips `dist/` entirely (it walks nothing under it in either direction of the converse check). The gate verified 233 source hashes while the package it Certified could not boot. Post-fix:
- The gate must either **(a) include `dist/**`** (everything under it hashed + listed), **or** **(b) assert the boot target** — parse every `<script src=…>` / `<link rel=stylesheet href=…>` in `dist/index.html` and assert existence + sha256 in the manifest. Either satisfies the law.
- `CHECKSUMS.txt` must cover the full `dist/` tree. `MANIFEST.txt` the same.
- The re-run after your fix: `node scripts/regen-manifest.mjs && node scripts/gate-manifest.mjs` → **PASS**; `node scripts/gate-numerals.mjs` → **CLEAN ×2**.

### D5 — the tab title names a superseded slice state (LOW, one line)
The delivered `index.html` (source and both shipped dist files) claims `76 Pancakes — Draft Board (67 Cakepanz slices 1-2)`. The product is 76 Pancakes and the current state of the build is the complete shell. Fix to the honest product line; do not invent a new tagline; if you disagree with any wording, **flag it, don't ship it**.

## The four lines you open with

Begin your response with these four lines, before any code or prose:

```
READ : this prompt · the review inbox file 20261117-0105-inkling-CAKEPANZ2-review.md · VERIFY.txt · latest receipts
STATE: pin d3bd81d2 · defects D1–D5 open/closed · batteries blocked at S5/S6 · merge-readiness self-assessment
PLAN : <your fix order + the acceptance battery in one line>
RISKS: <what could bite next, in one line>
```

Every one of those lines forces an assumption into the open before a single line of code changes. If your STATE line doesn't name the current pin and the current failing battery step, you didn't read the review.

## Step order (do in order; do not skip)

**Step 0 — Lock the truth.** Fetch `origin/architect/engine-and-seats`; verify the pin is still `d3bd81d2` (or report the new pin verbatim from `git log -1`). Verify `src/engine` still hashes clean against it. Read the review filing — it is the specification. No work begins until §Step-0 receipts exist in your delivery note.

**Step 1 — D1 + D2.** These two defects share the season-entry path. Fix D1 first (define `restoreSeason`, exercise the Hub), then D2 (`<Complete>` mounts; record binding). Do not fix D3 by hand-editing `dist/` — fix the packaging and let the build produce the artifacts.

**Step 2 — D3 + D4.** Re-run the build, ship `dist/assets/*`, gate covers it, `MERGE-*.md` documents updated to describe the ACTUAL post-fix state (no stale claims anywhere — MERGE-README's "S6..S28 PASS" line is currently unverifiable and must become TRUE, not aspirational).

**Step 3 — D5.** One-line title fix, `npm run distfile` re-run, base64/woff2 untouched.

**Step 4 — the full acceptance run (the one receipt that closes the round).** After fixes land, ONE uninterrupted, scripted run prints:

1. `npm ci` (clean lock or regenerated as needed — never `--legacy-peer-deps`)
2. `npm run test:engine` → **323/323**, exit 0
3. `node --experimental-strip-types batteries/node.battery.mjs` or tsx-equivalent → **21/21**, exit 0
4. `npm run battery` (http build against preview server) → **26/26 · 0 FAIL**, exit 0
5. `node --experimental-strip-types batteries/shell.battery.mjs` → **S1a..S28 all PASS**, exit 0 (D1+D2 prove this works — if it doesn't, you're not done)
6. `npm run distfile` → single-file `dist/single.html` → **boots from vanilla file:// with 0 console errors and 0 blocked requests** (the exact probe class that caught your current gap — run the same probe at 390 and 1180)
7. `node scripts/regen-manifest.mjs && node scripts/gate-manifest.mjs` → **PASS**; `node scripts/gate-numerals.mjs` → **CLEAN ×2**
8. Both modes: every screen's reduced-motion variant accepted by the motion off; `prefers-reduced-motion` kills every beat animation (screenshot × reduced × normal for at least one screen per slice).
9. Every receipt line above carries its **command, its full stdout tail, its exit code, and a one-byte falsifier where the receipt could be faked** — e.g., mutate one input byte in a throwaway copy and show the run failing. A battery that has never been red is not a battery.

**Step 5 — anything else you find.** If the fix pass uncovers more defects, list them in `deliveries/FEEL-JOURNAL-<date>.md` with exact repro, do not silently patch scope; if a defect is small and adjacent to D1–D5, fix it and say so; if it isn't, file it for the next round.

**Step 6 — the Owner stays in the loop on exactly these four calls (do not decide them):**
1. The palette rulings (light-mode gold2-on-pale-rose AA fail; the dark `--text` carries from the light block; the 90+ shimmer source law).
2. The award line content: "MVP only" as currently implemented, or expand.
3. The Engine Value label: you shipped "Model Value" (valuation.ts); the current v4 ground truth names it "Engine Value" — one-string wording call, Yours to flag, the Owner's to rule. **Do not ship a new guess.**
4. Whether `.ub` / `[data-zpbteam]` coverage is complete everywhere you claimed it — verify by receipt, flag gaps; the ruling on the law itself is the Owner's (some believe it's already implemented; verify, don't assume).

**Step 7 — the delivery.** One zip (not a repo push) + inbox notes under `_agents_zai_inbox/` + updated `SNAPSHOT.md` `SHELL-STATUS.md` `VERIFY.txt` + `MERGE-README.md` asserting the post-fix truth +CHECKSUMS regenerate. The Owner is the acceptor; your receipt conventions (`VERIFIED` / `REPORTED` / `INFERRED` / `UNKNOWN`) must label every number in the delivered tree.

## What you may not do

- **No `colors/**`, `flex.json`, `flex.ts`, `slots.ts`, ratings, product HTML, or the engine** — §5 filings only, exactly as before.
- **Do not weaken any test to green** — a failing law names a moved thing; fix code, not the law.
- **Do not silently change the pin**, do not re-pin on your own initiative, never edit another seat's bytes, governance docs, or the queue.
- **No new scope**: basketball, basketball waves, cross-engine ports, prize bundles — none of that this round. The shell either works or it doesn't; that is this round.
- **No file:// shortcuts**: `dist/index.html` may not become a one-off demo that works for you and not for the Owner — both entry points must boot, or only `single.html` survives, named once and referenced consistently everywhere in the docs.
- **No claim survives without a command** — “I believe it builds” is not a receipt; paste stdout and exit codes for every claim of the acceptance run.
- **The v4 file discipline**: one zip; no stray pushes to other-branches; `CHECKSUMS.txt` and `MANIFEST.txt` regenerated for every changed file — if a receipt says PASS without both of those, the receipt is a wish.

## Innovation (expected, within bounds)

If a fix can be cleaner than the obvious one, build the cleaner thing and say why. If a screen can be made better with no scope cut — make it better. But the shell as it stands is judged on correctness, not on beauty this round; the Owner has already seen beautiful versions of broken builds. A fix pass that ships a new claim or rewrites a working screen is a failed round.

## The final receipts this round must land

1. The uninterrupted full acceptance run — all of Step 4, exit codes pasted.
2. `SHELL-STATUS.md` rewritten with S5 as the gate — done/partial/blocked with receipts; the OPEN-FAIL labeling from the prior round removed only because the underlying thing is actually done.
3. `MERGE-README.md` truthful about the post-fix state — nothing false where it says PASS; if you keep an artifact list of the four defects, remove them because they're closed (with receipts).
4. `FEEL-JOURNAL-<date>.md` — what fought you, what was easy, what you'd change, and **(feedback loop) which of the four defects you'd have shipped blind if the review hadn't named them** — the council wrote these notes for you to read, not for themselves to admire.
5. Deliver the zip; stop. The Owner will rule on palette, labels and shimmer as they see fit; anything else about this round blocking merge is a blocker to document, not to route around.
