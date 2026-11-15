SPEAKER: ERNIE | ROLE: advisor (seat ernie) | TASK: review — Z.ai fresh-start sitting (final test, Rev 6), hosted by me at `_agents/ernie/deliveries/zai-fresh-start-2026-11-15/` on `council/ernie` (commit `9d6ee1b6`) | DATE: 2026-11-15T20:55Z
FOR: framework comparison (Owner ruling R-13; no queue row)

# Review — Z.ai's fresh-start sitting (Rev 6), the final test

**VERDICT: improved.** This is the strongest delivery in the whole comparison, it overturns Z.ai's own Rev 5
verdict in the direction two independent runs already pointed, and I reproduced nearly all of it. Three
correction-level defects, none of which touches the conclusion.

**Hosting:** 641 files / 15 MB, pushed verbatim at `9d6ee1b6`. I excluded `node_modules` (2,806 manifest
entries, regenerable) and the two nested `.git` directories; **the remaining 635/635 files verify against
Z.ai's own `MANIFEST.txt`** (sha256), so the copy is intact.

## What I re-ran (all VERIFIED, Mac/Darwin 24.6.0 arm64, node v26.13.0)

| claim | how I checked | result |
|---|---|---|
| Svelte arm type-check 0/0 | `npm ci && npm run check` | **exit 0, 0 errors 0 warnings** ✓ |
| Svelte arm builds | `npm run build` | **exit 0** — singlefile postbuild → **433,899 B `dist/index.html`, 0 external refs** ✓ |
| battery 24/24 Svelte | `node probes/probe-battery.mjs svelte` | **`PASS · checks 24/24 · console errors 0 · blocked 0`** ✓ |
| Vue arm type-check 0 | `npm ci && npm run type-check` | **exit 0** ✓ |
| Vue arm builds | `npm run build-only` (clean path) | **exit 0** → **465,658 B single-file** ✓ |
| battery 24/24 Vue | `node probes/probe-battery.mjs vue` | **`PASS · checks 24/24 · console errors 0 · blocked 0`** ✓ |
| F1 fixed, both checkers re-run | installed the addendum arms, ran both checkers | **`savesService.ts:58` now `(env as unknown as {…}).payload`, byte-identical both arms; `vue-tsc --noEmit` exit 0; `svelte-check` 0 errors** ✓ |
| engine vendored at d3bd81d2, byte-identical | `diff -rq` both engines | **57 files each, trees identical** ✓ |
| tokens byte-identical both repos | `shasum -a 256` ×3 | **`e2535987…` on all three** (vue, svelte, top-level) ✓ |
| Season Book under the 400 KB falsifier | `gzip -9` | **44,861 B = 43.8 KB** (65,642 B raw) ✓ — 9× under |
| Svelte framework-owned lines 880 | my own `wc -l` | **880** ✓ |
| fidelity pin equal per screen | read both battery JSONs | **6/6 EQUAL** (470/871/125/39/457/221) ✓ |
| canon purity | `grep .weight\|WEIGHT` | **0** ✓ |
| week battery 11/11 | included in the 24/24 run | ✓ |

## The headline: Z.ai overturned their own verdict, and two independent runs agree

Rev 5 said **Vue 3 + Vite, narrow, 62%**. This sitting says **NO CUTOVER — tie with a Svelte lean, ~55%**,
and it says plainly that Rev 5's only DECIDES row was (a) evidenced on four-slice numbers, (b) overstated
per export, and (c) measured trivial in Part B.

That is exactly where the two independent fresh-start runs landed this afternoon:

| | Rev 5 (Z.ai) | Rev 6 (Z.ai) | Ernie (my run) | Inkling (their run) |
|---|---|---|---|---|
| pick | Vue 62% | **tie, Svelte lean 55%** | **Svelte** | **Svelte** |
| row 9 delta | +15 (module-level) | **weakened; facade = choice** | **+2** (class) | **+2** (class) |
| store row survives? | yes, load-bearing | **no** | **no** | **no** |

**Three agents, three independent measurements, one direction.** The only agent who has ever measured Vue
ahead on authoring is the one agent, and Rev 6 is that agent withdrawing the claim. That is the most
important fact in this delivery and it should be the first line the Owner reads.

Their Part B is also the cleanest thing in it: the week-stepper is the store-heavy surface I argued was
needed, and it **measures the facade rather than asserting it** — 1 module-level `$state.raw` + 1 facade
object, `svelte-check` 0 diagnostics, migration cost measured in call sites. My own store-heavy test
independently got the same shape (class, 0 facades) and the same conclusion.

## Corrections

**C1 — the narrative's fidelity pin is 867; the receipts say 871.** `DELIVERY-NOTE.md`,
`RECEIPT.md` line 10 and `verified-as-of.json` all quote **cards 867**; both battery JSONs say
**`cards nodeCount = 871`**. The claim that matters (ALL EQUAL per screen) is true either way — both arms
are 871 — so the conclusion is untouched. But three documents repeat a number the receipts contradict, in
a delivery whose centrepiece is a machine-readable anti-staleness file. `evidence: RECEIPT.md:10 vs
probes/battery-vue.json`.

**C2 — "the wrapper-per-export variant ALSO compiles clean" rests on the wrong instrument.** 
`weekStore-wrappers.svelte.ts` says so itself: *"NOT imported anywhere — compiled and checked only."*
I confirmed it: **0 references anywhere in `src/`**, so the bundler never compiles it and `vite build`
proves nothing about it. The claim rests on `svelte-check` alone — the same instrument that, as I filed
two hours ago, **misses `state_invalid_export` entirely** (that error is raised by the *build*, not the
checker). The claim happens to be **true** — the wrapper variant uses getter objects, not exported
reassignable bindings, so it would build — but the evidence chain is the one I just showed is unsafe.
Fix: import it from a throwaway route (or a test) and re-run `npm run build`.

**C3 — the 37 L vs 29 L facade comparison is confounded.** `weekStore.svelte.ts` (37 L) holds **five
getters *and* four methods** (`ensure/go/next/prev`); `weekStore-wrappers.svelte.ts` (29 L) holds five
getters with the methods kept outside. So the facade is not "more expensive" — the two files measure
different things, and the *smaller* one is the facade-only slice of the other. The conclusion
("one facade, paid once") is right; the line comparison does not support it and should be restated as
"one facade object costs ~12 lines including its methods; five separate wrappers plus three free functions
cost ~12 lines" — i.e. a wash, which is a stronger claim for their argument, not a weaker one.

**C4 — the Vue framework-owned line count (985) is not reproducible and has no stated method.**
Svelte's 880 reproduces exactly. My count for Vue, excluding `src/engine`, is **1,608** — because
`RECEIPT.md` says only "(wc -l, in-tree)" without the include/exclude list, so the 985 is not checkable.
This is D2 in Z.ai's own framing (a number without a method) applied to their own receipt.
`evidence: my `find … | xargs wc -l` = 1608; their RECEIPT.md gives no command`.

**C5 — the Vue build is not hermetic, and that is an environment finding, not a delivery defect.** On
this machine the Vue arm fails `npm run build` with **21 errors, all `Tsconfig not found $app/tsconfig`**.
Cause: a **stray `/Users/kosi/tsconfig.json` in the home directory** whose first line is
`"extends": "$app/tsconfig"`. The build's tsconfig resolution walks up the tree, finds it, and dies. In a
clean path (`/tmp`) the same bytes build fine. **This is a robustness finding worth keeping**: the
scaffold's build is sensitive to files outside the repo, so a receipt that says "builds green" is only true
on a machine without a stray ancestor config — which is precisely the sort of thing `verified-as-of.json`
should be able to catch, and cannot, because it records claims rather than machine state.
`evidence: cat /Users/kosi/tsconfig.json; the same tree builds exit 0 at /tmp/zvue2`.

**C6 — a dead scaffold file still carries non-token hexes.** `football-sim-vue/src/assets/base.css` is
**not imported anywhere** (grep across `src/**` returns nothing) and holds 7 hexes outside `tokens.css`.
The palette gate ("0 hex outside tokens") is true of what actually ships; the file is stale tree weight
that should be deleted.

## What is genuinely excellent here

- **The singlefile postbuild solves the offline problem I filed this morning.** I reported that both
  fresh-start repos fail vanilla `file://` because `dist/index.html` requests absolute `/assets/…`.
  Their `strip-crossorigin.mjs` + `singlefile.mjs` inline everything — **433,899 B, 0 external refs, and
  24/24 battery checks pass on vanilla `file://`**. That is a real fix to a real defect I found, and it
  makes the Owner's offline law satisfiable on the fresh-start path.
- **`verified-as-of.json` is the right shape** (claim → command → result), and this review is the argument
  for it: every stale number above is a claim that a command would have falsified.
- **The probe-first, node-side-truth battery is the strongest design in the programme.** It caught a
  planted bug in both arms, it caught the half-drafted-league defect (store's 20 picks vs the fixture's
  1,024), and it pins fidelity numerically. Keep it verbatim.
- **Honesty about the instrument.** "Wall-clock cannot measure agent generation" and "the second arm won
  every pair = order artifact" is the correct reading of their own data, and it is the same reading I filed
  at 20:07Z. They killed their own primary metric rather than quoting it.

## What I did not check

- Did not run the E3 interactive devtools session (they flag it as not completed; the script ships).
- Did not verify the E2 "planted bug caught in both arms" narrative (design claim, would need a re-run of
  their plant).
- Did not rebuild the Svelte arm's vapor mode or the addendum arms' dists (installed and type-checked only).
- Did not verify the C4 Flip Bench harness's arithmetic beyond reading `run-receipt.json`.
- Did not inspect the dist screenshots (no image input); a human eyeball pass on the battery `screens` is
  still worth doing before the Owner signs anything visual.

PRIORITY+: P1 · Owner-facing: Rev 5's Vue-62% is now overturned by its own author and by two independent fresh-start runs (Ernie +6/10 Svelte, Inkling +0.3/5 Svelte) — the honest state is "tie, Svelte lean, ~55%, no cutover" · owner: do not sign a framework commitment on the 62% figure; it has been withdrawn by the agent who produced it · deliverable: this review · evidence: `_agents/ernie/deliveries/zai-fresh-start-2026-11-15/` (RECEIPT.md, probes/battery-*.json, season-book/, REV-5.1-addendum/) + `inbox/20261115-2007-ernie-zai-authoring-review.md` + `inbox/20261115-2018-ernie-inkling-freshstart-review.md`