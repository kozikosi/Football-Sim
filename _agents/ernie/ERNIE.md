# ERNIE — lane file (rewritten each session; never append)

## BOOT — read this first, every session (do not re-derive anything)

You were restarted with the standard prompt (`START-HERE` → follow it exactly). Do this, in order, and you are current:

1. `git fetch -q origin` then the **step 0** checkout from `START-HERE` §1 (four governance docs). If `START-HERE` has no step 0, you are on a stale copy: `git show origin/council/muse:_agents/START-HERE.md` is live.
2. Read this file to the end. It is the handover: what is measured, what is open, what not to redo.
3. Read the two working documents — **they are already in your worktree, you do not need their paths from anyone:**
   - `_agents/ernie/deliveries/council-work-request-fwtest-v3-support-2026-11-14.md` (WR-1…WR-10)
   - `_agents/ernie/deliveries/fwtest-ledger-2026-11-14.md` (append-only; append your row, never edit another seat's)
   One command that lists every handover document in this lane: `ls _agents/ernie/*.md _agents/ernie/deliveries/`
4. If either file is missing you are behind your own branch: `git fetch -q origin && git checkout origin/council/ernie -- _agents/ernie/ && git log --oneline -3 origin/council/ernie`.
5. Then take the first open WR (§Current state) and file it as `inbox/<UTC>-ernie-WR-<n>-<slug>.md` with `INTAKE: WR-<n> · ERNIE · <UTC>`.

Nothing else is needed to resume. Do not ask for a document list; the lane names its own.

## Identity
- **Seat:** ERNIE · **Model / how reached:** ERNIE / API (kilo gateway) · **State:** advisor (admitted by the Owner 2026-11-13)
- **What I am good at (evidence):** taking a claim apart with a command, and *reporting my own refutations*. This session I refuted my own earlier root cause and INKLING's, with receipts, in the same filing.
- **Standing rule I run on:** four lines per claim (cwd · command · ref+sha · output). VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim. "No signal" is a result.

## Current state (2026-11-14T00:30Z)
- **Nothing in progress.** Branch tip `c4294c75`, all pushed to `origin/council/ernie`.
- **WR-1, WR-2, WR-4, WR-5, WR-G2 are DONE.** The ledger now has 9 measured rows (was 7 + 2 empty) and the matrix is no longer "7 arms wearing a 9 name".
- **Still open, mine:** WR-3 (fixture hardening — needs a *shape* change, not another row), WR-7 (where the goldens run), WR-10 (falsifiers).
- **Not mine to close:** the framework decision, the λ objective, P-345.

## What this session established (all pushed, all with receipts)

1. **WR-1 — arm-solid and arm-lit measured** (`inbox/20261113-2320-…`, commit `6a84391e`). Both build (341 / 281 ms), both **5/5**, both offline-blocked, both carry the identical 41-file contract (tree sha `265ea8c6…fe5988`), both read `FOCUSES` live. Both ship **no typecheck script** and a tsconfig that makes `tsc` report 143 contract-wide errors.
   - **Correction to my own earlier record:** the "73 testids / 32 rows / 5 focus buttons" cross-arm figure was measured *after opening the picker*. At rest arm-svelte (control, re-built), arm-solid and arm-lit are all **69 / 32 / 37 / 0 focus**.
2. **WR-2 — offline is a build step, not a framework axis** (`inbox/20261113-2340-…`, commit `30982ac4`). `vite-plugin-singlefile@2.3.4` + `cssCodeSplit:false` + `assetsInlineLimit:100_000_000` → arm-svelte and arm-vue both emit **one 74 kB / 95 kB index.html**, both render and respond from `file://` with 0 console errors, **5/5 each offline**, and a lone `index.html` in an empty directory works. This supersedes my earlier "0 of 7 offline" as a *framework* claim (it stands as a claim about the arms as shipped).
3. **WR-4 / WR-5 — SolidStart: both filed causes refuted** (`inbox/20261114-0005-…`, `inbox/20261114-0010-…`, commit `309990ca`).
   - **Mine, withdrawn:** "the CSS import in `routes/index.tsx` breaks the hydration walk" — moved the import, still 0/5, `#app` still empty.
   - **INKLING's, withdrawn:** "`src/routes/` is not the convention path" — the module is evaluated on both sides, the client calls `Home()`, the manifest carries the route key, `getRequestEvent().routes` = `array:1`.
   - **Measured fault line:** the route's **lazy component never resolves during SSR**; the request event and manifest are both populated.
   - **Working config:** `defineConfig({ ssr: false })` → `#app` 2 children, 69 testids, 32 rows, **5/5 in 1.7 s**, 0 console errors. Costs SSR.
4. **WR-G2 — 8-stack coverage map** (`inbox/20261114-0025-…`, commit `c4294c75`). All 8 of the Owner's stacks are measured; the 9 arms are 8 stacks **plus arm-lit**, which is not one of the 8 and is the only arm whose root is not `#app`.

## What the next session needs
- **Do, in this order:** WR-3 (fixture hardening) → WR-7 (goldens' home) → WR-10 (falsifiers). WR-1/2/4/5 need nothing further from me.
- **Two cheap follow-ups if anyone wants them:** (a) test `ssr:false`-style single-file on the three non-Vite arms (next/nuxt/solidstart) — the only untested offline cases; (b) find the exact line in `@solidjs/start@1.5.1` where the lazy route fails to resolve. I stopped short of patching a dependency.
- **Do NOT redo:** P-207; P-344 nflverse; P-345 λ; the sixth-focus zero-tie; the five-arm spec/build runs; solidstart's blank page; the CHECKSUMS gap; **and now also**: the CSS-import fix (refuted), the routes-path claim (refuted), and any re-measurement of arm-solid / arm-lit / the single-file build. All have receipts.

## Environment notes (so the next session does not rediscover them)
- Worktree `/Users/kosi/Desktop/wt/ernie`, branch `council/ernie`. Never edit the Owner's shared tree; never push anything but `council/ernie`; never force-push; never stash.
- Scratch: `git archive <ref> -- <path> | tar -x -C /var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/<name>`. Node **v26.13.0**, npm 11.20.0, Playwright **1.64.1** (cached chromium). `@playwright/test` is not global: `mkdir pwrun && npm i -D @playwright/test@1.64.1`, then `BASE_URL=… npx playwright test`.
- **Use `background_process start` for servers**, not `nohup … &`. Plain `&` produced an empty log and a server that never listened.
- **`council/beam` is a moving branch.** It went `04cefbf5` → `16cf4629` mid-session (someone pushed). Always cite the sha you extracted at, and re-check `git rev-parse` before quoting a beam ref.
- macOS `shasum -c` mis-parses INKLING's `CHECKSUMS.txt` (reports all entries unreadable). Verify manifests with an explicit Python recompute instead.
- Playwright `serve`-based previews hardcode `-l 4173`; spawn your own port.
- Push gotcha: the shared repo is shallow — a plain push can be rejected with `missing necessary objects`. Fix: `git push --no-thin origin council/<seat>`. Do not `--unshallow`, do not force-push.

## Open questions I could not close (carry them)
1. **The exact `@solidjs/start` line** where the SSR lazy route fails to resolve. Named as far as the bytes allow; not attributed further.
2. **Six stacks' offline behaviour** (sveltekit, react, next, nuxt, solidstart, lit) — untested; only the two Vite arms were single-filed.
3. **Where the goldens run** — 41 vs 43 files; no arm can run them from inside (WR-7).
4. **The modification column** — still a tie at zero; needs a shape change (WR-3).
5. **Typecheck comparability** — no standard config exists across the nine arms.
6. **Whether arm-lit belongs in the set at all.** The Owner named 8 stacks; the wave has 9 arms.

## Role
General advisor. Propose, test, dissent, measure. I never edit the product file, governance docs or the queue; proposals go to `inbox/`, terminal states are proposed with evidence, never moved. I do not review my own work.