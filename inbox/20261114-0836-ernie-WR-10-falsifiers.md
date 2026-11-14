SPEAKER: ernie | ROLE: advisor · measurement | TASK: WR-10 (falsifiers per contender) | DATE: 2026-11-14T08:36Z
INTAKE: WR-10 · ERNIE · 2026-11-14T08:36Z
FOR: WR-10 (`council-work-request-fwtest-v3-support-2026-11-14.md` §3) · the memo's §(c) · the Owner's framework decision

# WR-10 — the falsifiers, per contender, and which of them the v3 set can actually run

**One page, as the WR asks. No ranking, no verdict, no elimination — those are the Owner's and the Architect's. Every claim is labelled; the receipts are named, not re-run.**

---

## 0 · What counts as a "contender", and why there are two

The council has been using the word two ways, and the memo has to say which one it means:

- **The nine-arm wave's contenders** — the individual arms (`arm-svelte`, `arm-vue`, `arm-react`, `arm-solid`, `arm-lit`, `arm-sveltekit`, `arm-next`, `arm-nuxt`, `arm-solidstart`). These are *stack* measurements, and §1 below is about them.
- **The decision's contenders** — what the Owner actually chooses between: **Vue 3 + Vite** and **Svelte 5 + Vite**. The Architect's recommendation (`d3bd81d2`, LOW confidence) and my own filed position both narrow it to these two, and §2 is about them.

Both are needed, because the falsifiers that matter for the decision are mostly **not in the v3 set at all** — which is itself the finding.

---

## 1 · The nine arms: what would move each one, and whether the v3 set can measure it

**A note on direction before the table.** The v3 set measures *capability at fixture scale*: spec pass, build, typecheck, render, offline, leakage, drift, LOC. It does **not** measure maintainability, agent defect rate, or product-scale performance (I filed that at `inbox/20261114-0336-…` §E, and it is still true). So a falsifier that lives outside those columns is a **finding about the test**, not about the arm — and there are several.

| arm | would move it **up** | would move it **down** | in the v3 set? |
|---|---|---|---|
| **arm-svelte** | a single-file build that runs from `file://` with zero console errors (**done**: WR-2, 5/5, 69 testids, 74.33 kB — but as a *scratch repair*, not as shipped) | an arm-owned line count materially above the tie (≈8 lines) for the same feature (**not in the v3 set**: the third specimen is additive, and additive has tied three times) | **partly.** The mechanism exists (WR-2, `vite-plugin-singlefile@2.3.4`); the *as-shipped* bytes still fail, so the column records 0/9 unless the build step is scored separately |
| **arm-vue** | same single-file result (**done**, WR-2, 5/5, 95.34 kB) | same shaped specimen as arm-svelte (**not in the v3 set**) | same as above |
| **arm-react** | single-file (**done**, WR-2, 5/5, 252.09 kB); a third measurement of the modification column (**done**: 1 file / 10 lines / 0 arm-owned) | a shaped specimen (**not in the v3 set**) | partly — offline needs the build step; the modification tie is measured; the container is `#root`, so a harness hard-coded to `#app` reads it as `-1` (**harness defect, not arm property**) |
| **arm-solid** | single-file (**done**, WR-2, 5/5, 47.34 kB); it was the cheapest arm to make offline | a shaped specimen (**not in the v3 set**) | yes |
| **arm-lit** | single-file (**done**, WR-2, 5/5, 47.79 kB) | it is **not one of the Owner's eight stacks** (I filed that at `inbox/20261114-0135-…` §3) — if the set is meant to be the eight, lit's row is scope creep and should be labelled as such | n/a — the question is scope, not measurement |
| **arm-sveltekit** | `bundleStrategy:'inline'` fixed the asset layer (WR-2, 110,299 B, 0 external refs) — the router still fetches `/_app/version.json` | a *second* mechanism (router path rewriting) being required where the other arms need none | **the blocking measurement does not exist.** WR-2 got the asset layer only; nobody has shown the router layer failing *for a framework reason* rather than a config one. `paths.relative` changed nothing (VERIFIED) but that is one attempt |
| **arm-next** | — | `strict:false` in the arm tsconfig with a comment citing the 69 contract errors (VERIFIED, `arm-next/tsconfig.json:11-15`) — that is a real, byte-visible cost the other arms do not pay | **yes, and it is under-reported.** It is a config choice, not a framework failure, but it is the only arm that had to weaken its own type gate |
| **arm-nuxt** | — | `"exclude": [ …, "app/engine-contract" ]` (VERIFIED, `tsconfig.json:3`) — the vendored engine is outside the type gate entirely | same |
| **arm-solidstart** | `ssr:false` → 5/5, 69 testids, 0 console errors (WR-4, VERIFIED) | the SSR path is broken *as shipped* (0/5, `#app` empty, 0 failed requests) and the exact failing line is **still unattributed** (my open question 1) | **partly.** The SPA-mode result exists; the SSR diagnosis names a *mechanism* ("the route's lazy component never resolves") but not a line. A falsifier that asks "does SSR work" is answered; one that asks "is it fixable" is not |

**The pattern worth putting in the memo, stated plainly:** every arm that fails a column fails it for a **build-mode or config** reason, not a language reason. Five arms (svelte, vue, react, solid, lit) go from "blank" to "5/5 offline" with one plugin and no code change. That is why I filed WR-2's conclusion as *"offline is a build step, not a framework axis"* — and it is the single most decision-relevant thing the nine-arm set produced. **A falsifier that would change the verdict by re-measuring offline has already been run and came back a tie; that is a result, not an absence.**

---

## 2 · The decision's contenders: the four falsifiers, and what exists

The Architect named his own falsifier in `d3bd81d2`, and I named mine in the same thread (`inbox/20261114-0410-…` §6). They are the same two, plus two the wave has never measured. Here they are as *measurements*, with the state of each.

### F1 — "Vue's 1,000-row board misses its UX budget with `shallowRef` discipline applied" (Architect's, `d3bd81d2`)

- **What it would settle:** whether Vue's reactivity model imposes a real cost at product scale.
- **In the v3 set?** **No.** The nine-arm fixture is 32 slots and 5 focuses; the largest list any arm rendered is 32 rows. The 1,000/1,200/1,941-row workload exists only in my BENCH-1/BENCH-2 specifications (`_agents/ernie/deliveries/WR-BENCH2-library-test-2026-11-14.md`, `WR-BENCH2-zai-product-round-2026-11-14.md`), which are **specified but not run**.
- **Finding about the test:** the wave cannot produce this falsifier. Only a BENCH-2 run can, and it is specified on both sides with the same engine and the same columns.
- **Label: INFERRED** that this is the right falsifier (I agree with the Architect's choice of it); **UNKNOWN** as to outcome.

### F2 — "evidence that agents maintain the Svelte 5 shell with fewer defects" (Architect's, `d3bd81d2`)

- **What it would settle:** the criterion the Owner actually cares about — he maintains this with AI assistance.
- **In the v3 set?** **No.** No arm was built or repaired by an agent under measurement. The closest thing in existence is the **agent-defect pilot** I specified for BENCH-2 (`WR-BENCH2-zai-product-round-2026-11-14.md` §13): one bounded feature, one shell, one sitting, a six-class defect taxonomy, no cross-shell winner declared.
- **Partial evidence that exists (and cuts against leaning on this falsifier too hard):** my MCP exercise today showed the **Svelte MCP autofixer** catching a deliberate `$state` syntax error with a correct explanation, and **no Vue equivalent exists** (`inbox/20261114-0410-…` §4). That is *tooling* evidence, not *defect-rate* evidence — it says the failure mode is **visible** for one side and not the other. It does not say which side produces fewer defects.
- **Finding about the test:** the wave has one tooling measurement and zero defect measurements. The memo should not present "Svelte is riskier for agents" as established (the Architect's own recommendation already labels it INFERRED), and should not present the autofixer as a counter-score either.
- **Label: VERIFIED** (the autofixer payload and the absence of a Vue equivalent — I ran them); **UNKNOWN** (defect rates on either side).

### F3 — offline, as a *product* requirement (mine; from `AGENTS.md` §3, "offline is a hard requirement")

- **What it would settle:** whether either shell can ship as one file with no network, which is a **product gate**, not a preference.
- **In the v3 set?** **Partly, and the answer is already measured: 5 of 9 arms pass from `file://` with one plugin and no code change (svelte, vue, react, solid, lit — 5/5 spec, 0 console errors); sveltekit is blocked at a router layer; next/nuxt/solidstart untested.**
- **So the falsifier's answer is: neither contender is excluded by offline — both pass with a documented build step.** Caveat, measured and mine: the five single-file passes are **Vite-plugin** passes (svelte, vue, react, solid, lit). For a non-Vite contender the plugin does not apply, and sveltekit needed its own two-layer mechanism — so "one documented build step" is a per-framework claim, not a universal one. That is a *result*, and the memo should say it as one rather than leaving the column blank.
- **Finding about the test:** the v3 set measures offline as an **arm property**, but it is a **build-mode property**. Any memo table that shows "0 of 9 offline" without the "5 of 9 with a single-file build" beside it will mislead the Owner. I filed that correction in the ledger (2026-11-14) precisely so the digest reads it as one sentence.
- **Label: VERIFIED** (WR-2, `inbox/20261113-2340-…`, and the six-arm extension `inbox/20261114-0205-…`).

### F4 — the modification / change-amplification column (mine; the column that would rank "maintainability")

- **What it would settle:** whether either framework's idiom resists the *kind* of change the product will actually need.
- **In the v3 set?** **Yes, and it returns a tie at zero — three times.** An additive field: 2 files / 8 lines / 0 arm-owned on svelte *and* lit (`inbox/20261114-0225-…`). An additive axis: 1 file / 10 lines on react (my WR-1). The column has never separated anything.
- **The falsifier that would fix it is known and not yet run:** a **control-flow or reactivity** specimen — WR-3 option (b): halftime eligibility computed from per-focus data the UI must re-render on. That is the only shape change that makes a framework's reactivity model visible in the diff.
- **Finding about the test:** **a column that ties at zero is not a measurement**, and the memo must not present it as one. This is the clearest "the test, not the arm" finding in the set.
- **Label: VERIFIED** (three independent measurements, two seats, two specimens); the next specimen's outcome is **UNKNOWN**.

---

## 3 · The two falsifiers the memo owes the Owner and the set cannot supply

Stated as falsifiers, with what would have to be built:

1. **"A 1,941-row board, virtualized, at 390 px, with persistence, on both contenders"** — this is the BENCH-2 library test. It would move either contender **up or down** on the three columns that actually predict the Owner's experience: integration cost, behavioural correctness at scale, and style fidelity to w89. **Not in the v3 set.** Specified, not run.
2. **"An agent builds one bounded feature in each shell, and we count defects by class"** — the agent-defect pilot. It is the only measurement of the criterion the Owner named ("trust and play", "agents only"). **Not in the v3 set.** Specified, not run.

**Both are in `_agents/ernie/deliveries/` on my branch, specified to receipt shape, with controls named so a tie is a valid result.** Neither needs a new idea; both need a builder with the harness (Z.ai holds the arms and the Playwright setup).

---

## 4 · What I am not doing here

- **Not ranking.** The nine-arm table is not ordered by quality; it is ordered by the set's own arm ids. No "winner", no score, no elimination.
- **Not re-measuring.** Every number above is quoted from a receipt already filed in `council/ernie` (named inline); I re-ran none of them for this page. WR-7 was re-run today and is filed separately at `inbox/20261114-0833-…`.
- **Not moving the modification column.** It stays **no signal** until a shaped specimen exists; the recommendation is that the memo say so in those words.

## 5 · Receipts for the claims that are mine

```
cwd: /Users/kosi/Desktop/wt/ernie  (branch council/ernie @ 8560e2ff at the time of filing)
offline 5/9 with a single-file build : inbox/20261113-2340-ernie-WR-2-offline-single-file-feasible.md (30982ac4)
                                      + inbox/20261114-0205-ernie-WR-2-offline-six-arms.md (51f4cadc)
solidstart SSR cause + ssr:false fix : inbox/20261114-0005-… (309990ca), inbox/20261114-0010-…
additive specimen ties (3x)          : inbox/20261113-2135-ernie-fwtest9-i-ran-it-results.md §3,
                                      inbox/20261114-0225-ernie-WR-3-fixture-hardening-additive-ties.md (313ed16e),
                                      WR-1 row (inbox/20261113-2320-…)
contract 41 vs 43 / ratchet hole     : inbox/20261114-0833-ernie-WR-7-goldens-home.md (today)
BENCH-1 / BENCH-2 specifications     : _agents/ernie/deliveries/WR-BENCH2-*.md (not run)
Architect's recommendation           : architect/engine-and-seats @ d3bd81d2 (read, not edited)
```

**VERDICT: delivered as a measurement page.** The falsifiers exist for both contenders; **four of the six are unanswerable from the v3 set**, and the two that are answerable (offline; the modification column) both come back as **no signal / build-step**, which is why the memo must not present the v3 set as a ranking instrument. Terminal state is proposed with evidence; I move nothing.

Labels: **VERIFIED** — every count, hash, path, arm id and config line quoted, all from receipts named inline (WR-2 and WR-7 re-run in this session or the one before it; the rest as filed). **INFERRED** — that F1 and F2 are the right falsifiers (I agree with the Architect); that the next WR-3 specimen will separate the arms. **REPORTED** — none. **UNKNOWN** — every outcome of F1, F2 and the shaped specimen; the exact `@solidjs/start` line.

— ernie (advisor) · 2026-11-14T08:36Z