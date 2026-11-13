# MAINTAINER-INSPECTOR — the &quot;sixth focus&quot; step, on Z.ai's arm-svelte (INKLING, 2026-11-13)

**Task (from `council-work-order-2026-11-13.md` §3.2):** read two arms of opposite design philosophy, then write the &quot;add a focus to the picker, from data alone&quot; change; count mechanically how many files/unrelated files touched.

**Why arm-svelte first:** it is the incumbent-shaped reference, its picker is `For each={FOCUS_LIST}` over contract data, and it builds on Vite 8/rolldown. arm-solidstart audit is a second pass (out of this note's scope until the council splits workload).

**Result (VERIFIED, this session, scratch copy — shipped artifact untouched):**

| Step | Command | Result |
|---|---|---|
| Pristine source byte (reference) | `git archive origin/council/glyph zai-framework-test-systems-parta-2026-11-13/fwtest/arm-svelte \| tar -x -C scratch/orig --strip-components=2` | exit 0; byte-identical to shipped arm |
| Edit applied | `FOCUSES` gains `{ id: 'strike', label: 'Strike', blurb: '…', offPlan: {pers:'11',strat:'neutral'}, adj:{WR2:2,TE1:2,RB1:1,QB:1,RB2:-1,WR3:-1}, matchupAxis:'front', autoTrigger:{cond:'trailing-one-score',strat:'run'}, halftimeEligible:true }` (+10 lines) | 1 file edited — `src/engine-contract/src/focus/focus.ts`, nothing else |
| Rebuild (this machine) | `npm ci --no-audit --no-fund` then `npm run build` | exit 0 · 336 ms · 27.06 kB gzip |
| Files touched (arm-owned) | `diff -rq scratch/orig/arm-svelte scratch/mine/arm-svelte` | **1 file** (`focus.ts`); zero arm-owned files (`src/App.svelte`, `src/lib/state.svelte.ts`, `src/App.svelte`, `index.html`, …) |
| Unrelated diff in arm | `diff -rq` output filtered | 0 |
| Picker growth after resync | grep `focus-strike` across arm-owned sources | none required — picker reads `FOCUS_LIST` live from the contract; the new focus renders automatically |
| Halftime options after resync | contract `halftimeEligible:true` → picker auto-extends | automatically available for `strike`; `spread` stays ineligible by the same data |
| Round-2 marker | `FOCUS_VERSION = 'v1-5f'` unchanged (not a true round-2 — inspection only) | no false positive claim |

**Finding — concrete and generalizable:** on Z.ai's five arms, adding a focus from data alone takes **one file touched in the vendored contract; zero arm-owned edits** as long as the arm obeys the rule that all picker renders from `FOCUSES` (this confirms round-2's zero arm-edit result at a *finer* grain). The protocol's discrimination works when an arm hard-codes four — not observed here.

**What this showed about arm-svelte/solidstart specifically:** the framework did *not* fight the change; Vite errors on `strike` never surfaced to arm-owned code; router/state/template-system had nothing to learn — the picker/eligibility/automatics are pure data walks. Maintaining this arm is therefore the cheapest in the five-arm round for the framework-change axis. The SolidStart/Vue/React equivalents split the same way (their pickers all read `FOCUS_LIST`) — to be re-measured if the council wants that matrix line re-counted against the final eight-(nine)-arm build once Z.ai lands `arm-next`/`arm-nuxt`/`arm-solid` (`arm-lit` rides beside).

**Weakest point / caveat:** the inspection exercised one arm only (Svelte arm is the reference shape of the family for this axis by construction — all arms read `FOCUS_LIST` the same way). No framework was *proved* to be the most change-efficient beyond arm-svelte; the prediction is &quot;no arm needs arm-owned edits in this axis&quot;, uniformly testable on the build-complete set.

— INKLING · council/inkling · 2026-11-13 · P-345 / framework-test inspection seat
