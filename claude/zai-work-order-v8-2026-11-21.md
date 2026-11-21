# Work order v8 for Z.ai (Architect, 21 Nov 2026)

Supersedes any earlier "remove the top-three signal" reading (it was wrong and is withdrawn). Build on the c12/S14 tree against engine pin **408410477**. **Zero engine bytes change.** Protected constants (`FLEX`, `RATING_SPECS`, `SLOTS`) are untouched. Labels: V verified, R reported by another seat, I inferred.

## 1. Owner rulings this order carries (R: pickle, filed on council/pickle, 622b70a and the 22:46Z file)
- The ring visual is removed. The top-three **meaning** stays.
- Top-three highlight lives in the button, w89-style: the Draft button **glows** on top-3 rows, and a **separate "Top" badge** (a badge, not a ring) sits on the row.
- Keep the small "why" copy (the reason to pick that player), scoped to the top 3.
- Panels are too boxy and not as colorful as w89: restyle toward w89.
- Deploy is Cloudflare, by the Architect and the Owner. You hand over a Cloudflare-ready static build, not a deploy.

## 2. Work
1. **Top-3 row** (R: `BoardRow.svelte:42-53`, `{#if suggest}`, `cp-quick` at `:47`, `cp-why` at `:52`; re-locate by text). Glowing Draft button + new `.cp-top` badge class in `shell.css` (none exists today). Keep `cp-why`. Update the stale "gold ring" comments (`:8`, `:132`). Keep the ring-independent copy: `.cp-gonetip`, `.cp-sr`, `.cp-fitlbl` ("Fills ..."), `.cp-gonehow`.
2. **`cp-quick` is removed (Architect decision).** The glowing Draft button on a top-3 row is the one-click path, as in w89. Two pick controls on one row doubles the double-click surface that the `busy` flag exists to contain, and the Owner asked for the highlight in the button, not beside it. If you disagree, say so in the hand-over with the w89 line that shows otherwise; do not keep both silently.
3. **dispatchAsync** per `claude/dispatchasync-contract-2026-11-20.md`: all four sites (START with `pickSlot`, PICK, UNDO, LOAD) move together; `busy` flag; no sync/async mixing; law **L-ERR** (`error = st.error ?? ''`).
4. **Battery:** every `__cp.store.dispatch` becomes `await __cp.store.dispatchAsync`, including the two LOAD calls in `shell.battery.mjs` (`:61`/`:170` in S13, `:66`/`:175` in S14). `window.__cp` keeps its six keys: `store, refresh, valuation, seasonFacade, go, vmStore`. Add assertions: top-3 rows have the glowing button and the badge; non-top-3 rows have neither; the why copy shows only on top-3; no `cp-quick`; no ring class.
5. **Panel restyle toward w89:** assert the glass tokens `--glass`, `--glassbd`, `--shadow` equal w89's values, 22 px radii on the large panels, `.panel` per w89 (`:625`), contrast battery 2/0, no horizontal scroll at 390 px, DESC-1 green.

## 3. Hand-over (all required)
- Commit hash, path, and `git diff --name-only 408410477 <tip> -- colors/src` (must be empty).
- Battery counts at or above the S13 baselines (R): board 15→16/0, slot 28/0, visual 15→17/0; swap test 29/0/10/3 (the "26 pass" line is stale).
- Built `dist/` plus its sha256, and the zip sha256.
- A filed side-by-side against live w89 at 390×844 and 1180×950: Team Select, board with a top-3 row, pick confirm, finished draft. "Directionally similar" fails.
- Directory + command + result for every claim. No receipt, not claimed.

## 4. Not yours
Deploying, gh-pages, the make-live decision, rollback, engine files, dependency or lockfile changes in `colors/` (Playwright is mine to add at the merge).
