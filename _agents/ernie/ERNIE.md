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

## Current state (2026-11-14T02:35Z)
- **Nothing in progress.** Branch tip `cca94d8f`, all pushed to `origin/council/ernie`.
- **DONE:** WR-1, WR-2 (+ six-arm extension), WR-3, WR-4, WR-5, WR-6 (review), WR-G2, Phase 1, Phase 5, directives 21/24/26, Phase 8.2.
- **Still open, mine:** WR-7 (goldens' home — 41 vs 43 files, no arm can run them), WR-10 (falsifiers).
- **Not mine to close:** the framework decision, λ, P-345, MUSE's doc corrections, the P0 October reviews (deliberately not started — see below).

## Session 2 additions (2026-11-14, tip `cca94d8f`)

10. **WR-2 extended — offline is 5 of 9, not 0 of 9 and not 2 of 2** (`inbox/20261114-0205-…`, `51f4cadc`). Added arm-react (252 kB), arm-solid (47 kB), arm-lit (48 kB) — all single-file, all **5/5 from `file://`**, 0 console errors. **arm-sveltekit is a structural exception with two layers:** `viteSingleFile()` is a **no-op** on SvelteKit (its adapter writes the HTML, so the plugin never sees it), but SvelteKit's own `kit.output.bundleStrategy='inline'` fixes the asset layer (110 kB, 0 external refs). The **router** still fails: `Not found: /var/…/index.html` and `Fetch API cannot load file:///_app/version.json`. `paths.relative: true` changes nothing. **Not fixable by config as far as I got.** next/nuxt/solidstart untested (non-Vite).
11. **Container is not uniform** (same filing): `#app` ×5, **`#root` (arm-react)**, **`<framework-arm>` (arm-lit)**. `#app.children.length` returns `-1` (absent) for two arms — never read `-1` as "rendered nothing". My own §2 receipt shape is corrected to "root container children — name the container".
12. **WR-3 — the additive specimen ties** (`inbox/20261114-0225-…`, `313ed16e`). Added a **required** `risk: 'low'|'med'|'high'` axis to `FocusDef` + all 5 focuses, rendered in the picker. arm-svelte and arm-lit both: **2 files, 8 lines, 0 unrelated files, 0 new type errors** (svelte-check 0/0 both ways; lit tsc 73 → 73), both **5/5 spec still green**, risk renders 5/5 with 3 distinct values. **Third tie at zero for the modification column** → it has no discriminating power. **Next specimen must use control flow or reactivity (WR-3 option b: halftime eligibility computed from per-focus data and re-rendered live) — not another additive field.**
13. **Deliberately not started:** the P0 October reviews (P-141…P-151). Half-running a review chain is worse than not starting it; they remain open to any seat per the queue's rules.

## What the next session needs
- **Do, in this order:** WR-7 (goldens' home) → WR-10 (falsifiers). Both are one-sitting jobs.
- **Then, if budget allows:** the WR-3 reactivity specimen on 3+ arms (it is the only thing that can rescue the modification column), and offline on next/nuxt/solidstart (needs a per-framework mechanism, not a Vite plugin).
- **Do NOT redo:** anything in the list above with a receipt — especially: the additive WR-3 specimen (provably non-discriminating), the six-arm offline run, the solidstart causes, the A3 script run, the w89 hashes.
- **Standing:** no framework pick, no ranking, no elimination; the modification column stays **no signal** until a shaped specimen exists; `file://` is my lane, not a framework score.

## What this session established (all pushed, all with receipts)

1. **WR-1 — arm-solid and arm-lit measured** (`inbox/20261113-2320-…`, `6a84391e`). Both 5/5, both offline-blocked, identical 41-file contract (`265ea8c6…`), `FOCUSES` read live. Neither ships a typecheck; both `tsc` runs report 143 contract-wide errors from config, not code.
2. **WR-2 — offline is a build step, not a framework axis** (`inbox/20261113-2340-…`, `30982ac4`). `vite-plugin-singlefile@2.3.4` + `cssCodeSplit:false` + `assetsInlineLimit:100_000_000` → arm-svelte and arm-vue emit **one** HTML file (74 / 95 kB), render from `file://` with 0 console errors, **5/5 each**, and a lone `index.html` in an empty directory works.
3. **WR-4 / WR-5 — SolidStart: both filed causes refuted** (`inbox/20261114-0005-…`, `-0010-…`, `309990ca`). My CSS-import cause **withdrawn by my own test**; INKLING's routes-path cause refuted (module loads both sides, client calls `Home()`, manifest carries the route, `getRequestEvent().routes` = 1). **Measured: the route's lazy component never resolves during SSR.** `ssr:false` → 5/5, 69 testids, 32 rows (costs SSR).
4. **WR-G2 — 8-stack coverage map** (`inbox/20261114-0025-…`, `c4294c75`). All 8 Owner stacks measured; the 9 arms are 8 stacks **plus arm-lit**, the only arm whose root is not `#app`.
5. **Phase 1 — corrections + byte-check** (`inbox/20261114-0110-…`, `6e2a2426`). My 14 filings re-run: no `.svelte` claim, no RNG claim. Measured: `.svelte` = **15 on gh-pages, 0 in `colors/` (111 files, all TS), 6 on council/muse, 10 unreproducible**. RNG: pin `4ca9a071` = mulberry32 in `rng.ts`, **no `keyedrng.ts`**; tip `bebe8e0b` = `keyedrng.ts` with 7 Philox hits. **Tautology `|| true` located at line 75 on three refs**, replacement snippet filed (not applied — `colors/` is the Architect's). F3 quote verified exact.
6. **A3/A4 notes to everyone** (`inbox/20261114-0115-…`, `6e2a2426`). A3's checker **runs green: exit 0, all 11 rows** (C>OG 5.13→6, OLB>FS 11.74→12, FB>TE 4.74→6). A4's corrected sentence is self-consistent and **the kill survives** (`beats_both: []`). Two questions to the Owner; nothing applied.
7. **Phase 5 — cross-side design note** (`inbox/20261114-0130-…`, `ed7ebe1a`). Price from `FLEX` (no new constant); **flagged ambiguity: "−6 or less" excludes a QB at −10, contradicting the blessed QB→FS flex**; must use the keyed RNG; must be an **event, not state** (no save migration).
8. **Directives 21/24/26 audit** (`inbox/20261114-0135-…`, `ed7ebe1a`). Lit is 1 of the Owner's 10 names; 6 frameworks + 3 test runners have **no bytes**; **11 of 12 fluctuation items are bench-side** and cannot be advanced by the framework fixture; **`.nvmrc` absent everywhere and no `engines` block — every run this wave was Node 26, not the Owner's 24**.
9. **Phase 8.2 — w89 investigation** (`inbox/20261114-0145-…`, `abd7130b`). Live `index.html` md5 `8efa9099…` (1,922,769 B, title `20-0`) **matches no archived build** (w44/49/51/56/57, `w85 (2)`, `pre-w85` all differ) → "live = w85" is not byte-verifiable. **0 localStorage keys on a fresh visit.** **One Draft click = 8,808 `Math.random` calls, 2 `Date.now`** → unseeded; sizes `T-20261022-claude-2` and forbids w89 before/after claims. 0 `data-testid`, no tests.

## What the next session needs
- **Do, in this order:** WR-3 (fixture hardening — a *shape* change: a second axis, a sub-heading, or halftime eligibility computed from data) → WR-7 (goldens' home; 41 vs 43 files) → WR-10 (falsifiers per contender).
- **Two cheap follow-ups if anyone wants them:** (a) single-file the **six** untested stacks (sveltekit, react, next, nuxt, solidstart, lit) — the only offline cases left; (b) find the exact `@solidjs/start@1.5.1` line where the lazy route fails to resolve (needs a dependency patch in scratch).
- **Do NOT redo:** P-207; P-344 nflverse; P-345 λ; the sixth-focus zero-tie; the five-arm spec/build runs; solidstart's blank page; the CHECKSUMS gap; the CSS-import fix (refuted); the routes-path claim (refuted); any re-measurement of arm-solid / arm-lit / the single-file build; the A3 script run; the w89 hashes. All have receipts.

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