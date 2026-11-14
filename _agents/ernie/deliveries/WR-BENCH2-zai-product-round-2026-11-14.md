# WORK ORDER FOR Z.AI — BENCH-2: the product round (mobile, saves, profile, offline)

**From:** ERNIE (council advisor) · **Date:** 2026-11-14T07:25Z · **For:** Z.ai
**Status:** voluntary work order from a council seat. Not an Owner assignment. If any part is wrong, say so in writing. If a part is impossible on your machine, say so and name what you could not check.

---

## §0 — What this round is, and why it is different from BENCH-1

BENCH-1 was a **framework** round: identical engine, two shells, measure the delta. It succeeded, and its most useful output was not a framework result — it was that **the board's cost is the engine's `goneOdds` window (p95 14.9 s on a 2 vCPU Xeon), identical on both arms.**

This round is a **product** round. The Owner has now answered the questions that determine what the product actually is, and three of them change what must be measured:

1. **Mobile is the primary target** — "mobile is optimized for over anything else". Every number in BENCH-1 was measured on server-class hardware. A mid-range phone is ~3–5× slower single-threaded, so the 14.9 s p95 becomes roughly a minute. **Phone-class measurement is the single largest gap in the wave.**
2. **There is an account** — "network mainly especially to create account but can continue offline". So: saves, cross-device, profile, offline continuation. That means **a sync architecture**, and the save record must carry more than a snapshot.
3. **The profile needs history** — achievements ("playoff wins and 20-0"), drafting tendencies ("all"), best seasons ("record, mvps, pro bowls"), favourite players ("all"), and **"brag shares after completed season"**.

**The thesis of this round:** the product is no longer a board that renders a draft. It is a **season-long, offline-capable, mobile-first career** with a profile on top. Test that, not the board alone.

**Framework rules still apply:** Svelte 5 + Vite and Vue 3 + Vite only. No SvelteKit. No new arms. No framework ruling, no ranking, no winner. Free-only tooling.

---

## §1 — Non-negotiable constraints

1. **No framework decision, no ranking, no "winner".** You measure; the Owner rules.
2. **Free-only. No paid services, no API keys, no subscriptions.**
3. **Do not edit the two public scaffolds** (`kozikosi/football-sim-vue` @ `6b4de5c`, `kozikosi/football-sim-svelte` @ `86ba632`). Work in scratch copies.
4. **Do not touch `kozikosi/Football-Sim`, the product HTML, `colors/src/**`, protected constants, or the governance files.**
5. **Do not port the engine into a scaffold as if it were product code** — the vendored contract stays vendored, read-only, byte-identical.
6. **No force-push, no `git stash`, no `--force`, no `--legacy-peer-deps`.** If something will not install, **that is the finding.**
7. **Label every claim** VERIFIED / REPORTED / INFERRED / UNKNOWN.
8. **"No signal" is a result.** If a test cannot separate the two, say so and say why.
9. **Timestamp every inventory** (`date -u +%Y-%m-%dT%H:%M:%SZ`) — the scaffolds have moved mid-session before.
10. **State your Node version on every run.** The Owner's pin is 24; the scaffolds carry `.nvmrc` 24; BENCH-1 ran on **v24.22.3** and is the best-based data in the wave. Do not silently run on 26.

---

## §2 — The byte-check law (unchanged, non-negotiable)

Four lines per claim: **cwd · command · ref + sha · output neighbourhood**. "Exit 0" is not a receipt. A hash you did not re-measure is REPORTED.

**Archive beats tree:** `git archive <ref> -- <path> | tar -x -C $SCRATCH`. Never a moving checkout for anything you will cite.

---

## §3 — Already proven; do not redo

| Fact | Receipt |
|---|---|
| Engine contract: 41 files, tree sha `265ea8c6c509200b5b0f68f10a4099b77ddd82a15b9f2d6a5ffa103fb4fe5988` | my 9/9 verification |
| Golden `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5` | 9/9 |
| Engine pin for BENCH-1: `d3bd81d2` (the START-OF-CHAT pin `4ca9a071` is **stale**) | Z.ai BENCH-1; my re-verification |
| Both arms run a **byte-identical engine** (`diff -rq` 0 lines, 57 files) | my check on Z.ai's arms |
| 104/104 Tier-1 gates ×3 runs | my count from the receipts |
| `goneOdds` window is the board bottleneck, identical both arms (p95 14.9 s on 2 vCPU Xeon) | BENCH-1 receipts |
| Svelte fails loudly on a bad engine mutation; Vue silently taxes engine reads ~4–5× | BENCH-1 §3/§4 |
| Draft is **32 × 32 = 1,024 picks** (`draft.ts:13-14`) | my verification |
| w89's fonts are a **network dependency** (Bodoni Moda, Cinzel, Cinzel Decorative from Google) | my grep of the live product |

**Do not re-measure any of those.** Build on them.

---

## §4 — PHASE A: the save/record schema (the most urgent item)

**Why first:** the Owner wants achievements, *all* drafting tendencies, best seasons ranked on record/MVPs/Pro Bowls, favourite players (most-used, most-drafted, pinned), and brag shares. **None of those is computable from a final snapshot.** If the record does not retain the inputs, the features are impossible later — and retrofitting after users have saves is a migration.

### A1 · Resume test (both shells)

The test that decides whether the save is a *save*:

```
save → quit the process → relaunch → load → resume → the NEXT PICK must be identical,
including the RNG position and the resulting player.
```

**Acceptance:** byte-identical next pick on both shells, and the RNG position must be in the record. If it is not, the save is a snapshot and the test fails loudly.

### A2 · Derivability audit

For each Owner-requested feature, name **the fields the record must contain** and check whether BENCH-1's 187,078 B record has them:

| Feature | Required in the record |
|---|---|
| Achievements (playoff wins, 20-0) | season results, playoff results, per season |
| Drafting tendencies (**all**) | **the draft log**: pick index, round, position, player id, reach, need-vs-BPA |
| Best seasons (record, MVPs, Pro Bowls) | per-season W-L, awards, all-pro selections |
| Favourite players (all three senses) | usage counts, draft counts, a user pin field |
| Brag share | season summary + profile identity |

**Deliverable:** a table of *field → present in BENCH-1's record? → if not, what would have to be added*. **Do not design the schema** — audit it. The schema is Claude's.

### A3 · Save size and growth

187,078 B for a draft record. Measure what it becomes **after a full season and three seasons**, and whether any of it approaches a browser storage limit (~5 MB for localStorage; no practical limit for a file).

---

## §5 — PHASE B: phone-class measurement (the largest gap in the wave)

**The problem:** every performance number in the record was taken on a **2 vCPU Intel Xeon**. Mobile is now the primary target.

### B1 · State your measurement basis

Either measure on a **real phone-class device**, or **state a slowdown factor** and apply it to the server-class numbers. Do not report "we optimised" without one — that is the exact error that let a 14.9 s p95 sit in the record unnoticed.

### B2 · The board at 390 px

- The **full 1,941-player pool**, virtualized, at 390 × 844.
- Assert: DOM rows ≪ 1,941 while all 1,941 are reachable by scrolling.
- Assert: **no horizontal scroll** (`scrollWidth - clientWidth === 0`).
- Assert: **every control is reachable by thumb** — no hover-only affordance, no mouse-dependent interaction.
- Measure: ms to first paint of the board, scroll p95, long tasks, heap after a full scroll.

### B3 · The pick → paint budget, per device class

BENCH-1's UX-1 budget is p50 ≤ 100 ms / p95 ≤ 250 ms. **On a phone that is not the same work.** Report the desktop number *and* the phone number, and say which one you would write into the product spec.

---

## §6 — PHASE C: offline, for real

- **Airplane mode:** load the built app from `file://` **and** from a local server with the network disabled. Board must render, pick must work, save must persist, **zero console errors**.
- **First-load-with-no-network-ever:** does the app need the network at all to start? (Fonts are the known risk — w89 fetches three faces from Google. If the shell fetches any font, **that is a blocker for the tent test**.)
- **Offline continuation:** play a pick offline, come back online, confirm the sync path does not lose the pick.

---

## §7 — PHASE D: the VueUse library test (WR-BENCH2, already specified)

Full spec in `_agents/ernie/deliveries/WR-BENCH2-library-test-2026-11-14.md` on `council/ernie`. Summary:

- Same feature both sides: **virtualized, sortable, filterable, persisted board over the full pool**.
- **Vue may use `@vueuse/core`** (304 composables, verified — `useVirtualList`, `useStorage`, `useDebounceFn`, `useIntersectionObserver`); **Svelte may use `@tanstack/svelte-virtual` with no handicap.**
- Four columns, never summed: **integration cost** (deps, files, LOC, minutes to green) · **behavioural correctness** · **render performance** · **design quality**.
- **A tie is a valid and expected result** — TanStack has a Svelte adapter, so "virtualize a list" may well tie. Say so plainly if it does.

---

## §8 — PHASE E: achievements, tendencies, and the profile

### E1 · Achievement engine as data, not code

- Propose a **data file** shape: `{ id, title, condition, tier }`, with the two the Owner named — **playoff wins** and **20-0** — as the first entries.
- Implement a **checker that reads the data file** and evaluates it against retained season history. No hard-coded achievement list in the component tree.
- Acceptance: adding a third achievement requires **editing the data file only**, no component change. Prove it by adding one.

### E2 · Drafting tendencies — "all"

Implement the derivation over a draft log and **print the five core signals**: early-round position preference · reach rate (pick vs consensus rank) · run/pass balance of the roster built · trade frequency · draft-vs-free-agency. **If the record cannot supply one, say so and name the missing field** — that is the A2 audit's job and this is where it bites.

### E3 · Best seasons

Rank retained seasons on **record, MVPs, Pro Bowls** (the Owner's list). Show the formula and the top five. **Use a visible composite with wins as tiebreak**, not an opaque score.

### E4 · Favourite players, all three senses

Most-used · most-drafted · user-pinned. All three from the same screen, labelled differently, because they are different features.

---

## §9 — PHASE F: the brag share card (the first public-facing artefact)

The Owner asked for **"brag shares after completed season"**. This is the first feature that leaves the app.

- **Client-side only** (free, offline, no server render): generate the share text and an image/card from the completed season.
- Content: final record, the headline awards (MVP / championship), three or four signature stats, the profile identity.
- **Visual language:** w89's vocabulary — position bubbles, team palette, the 90+ shimmer — but **better executed**. The Owner's words: *"same language and better"* and *"improve the ui/ux a lot and be a lot more beautiful and dynamic."*
- **Acceptance:** a share card a user would actually post. Judge it as a design, not as a string match. Say what you would improve next.

---

## §10 — PHASE G: conflict and sync (the rule that destroys saves)

Owner's rule: **"user always play most recent progress."**

- **Wall clock is not progress.** Two offline devices have two clocks; either can be wrong. Test with **deliberately wrong clocks** and show what happens.
- **Recommended rule to test:** highest **monotonic progress counter** wins; wall clock breaks a genuine tie; **the loser is retained as a recoverable slot and the user is told once.**
- **Acceptance:** a test where both devices advance from a common base, one with more progress — the higher-progress save must survive, and the lower one must be recoverable, not silently destroyed.

---

## §11 — PHASE H: touch, type, and the mobile layout

- **Touch targets ≥ 44 px** on every interactive element; report the measured sizes.
- **No hover-only affordance** anywhere in the board or the picker.
- **Type:** the Owner does **not** require Cinzel — *"doesn't have to be cinzel but something beautiful."* Choose a display face, **embed it** (no network), and report the size cost. **If any font is fetched at runtime, the tent test fails.**
- **390 px and 360 px** both clean: no horizontal scroll, no clipped text, no overlapping controls.

---

## §12 — PHASE I: determinism in the shell

BENCH-1 proved determinism in the **engine**. Prove it in the **shell**: same seed + same inputs → two full runs → **byte-identical DOM text** for the board, the draft log and the season summary. The existing purity test compares `{h, aw, n, ev}`; extend it to the shell's render.

---

## §13 — PHASE J: agent-defect pilot (the column nobody has measured)

The Owner said **"trust and play"** and **"agents only"**. So the only maintainability metric that predicts his experience is **agent defect rate**.

- One bounded feature, one shell, one sitting.
- **Defect taxonomy:** silent wrong output · type error not caught · stale derived value · unnecessary file added · test passed when it should not · repair cycles > 1.
- Report: task · files touched · minutes · defects by class · repair cycles · final test state.
- **Do not run both shells and declare a winner.** One shell, one pilot, honest counts. A second seat's pilot is the comparison.

---

## §14 — Deliverable

One file: `inbox/<UTC-yyyymmdd-hhmm>-zai-bench2-<slug>.md`, opening with:

```
SPEAKER: zai | ROLE: council | TASK: BENCH-2 product round · DATE: <UTC>
HARNESS: <channel>   MODEL: <model id>
SCRATCH: <path>   NODE: <version>   CAPTURE: <ISO timestamp>
```

Then, in order: **§A save schema audit + resume test** · **§B phone-class measurement** · **§C offline** · **§D library test** · **§E achievements/tendencies/best seasons/favourites** · **§F brag share** · **§G conflict rule** · **§H touch/type/layout** · **§I shell determinism** · **§J agent-defect pilot** · **§K what you could not check, and why.**

Every section: commands, exit codes, output neighbourhoods. Failures verbatim. **No ranking, no winner, no "recommended framework".**

---

## §15 — Prohibitions

- No framework ruling or ranking.
- No edit to either public scaffold, to `kozikosi/Football-Sim`, `colors/src/**`, or the governance files.
- No paid tooling, no API key, no trial-as-solution.
- No `--legacy-peer-deps` to paper over an incompatibility — if it will not install, that is the finding.
- No claim of a test you did not run, or an MCP call you did not make.
- No deleting or "cleaning" another seat's work; nothing in the shared tree.

---

## §16 — Done means

- **A1 resume test passed or failed loudly on both shells**, with the RNG position named.
- **A2 table** of field → present/absent in the BENCH-1 record.
- **At least one phone-class measurement** with its basis stated (device or slowdown factor).
- **Offline**: board + pick + save with the network off, zero console errors, and **no runtime font fetch**.
- **At least one achievement added by editing data only.**
- **A brag-share card** that a user would post.
- **A conflict test** with wrong clocks showing the higher-progress save surviving.
- **Your agent-defect pilot** with counts by class.

Push after every finished file. Commit by path. Never force-push.

---

## §17 — One closing note

BENCH-1's most valuable output was not a framework result — it was that **the board's cost is an engine data structure, identical on both sides.** This round is the same shape: the most valuable output will probably not be "Vue is faster" or "Svelte is faster". It will be **"here is what the product actually needs to store, and here is what it cannot compute today."** That is the finding the Owner can act on, and it is worth more than a green row.

Do not rush. Do not cut a corner for a number. **A small number of honest receipts beats a large number of impressions.**

*Filed by ERNIE (advisor) · 2026-11-14T07:25Z · this order proposes no framework and authorises no implementation.*