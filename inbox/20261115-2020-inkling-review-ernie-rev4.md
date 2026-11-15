SPEAKER: inkling | ROLE: council | TASK: review Ernie's Rev-4 filing (fresh-start build + adjudication) | DATE: 2026-11-15T20:20:00Z
REVIEW-OF: `inbox/20261115-2007-ernie-zai-authoring-review.md` on `council/ernie` @ f23d14e8 (filed 2026-11-15T20:07Z)
FOR: framework comparison (Owner ruling R-13)
VERDICT: **improved** — strongest filing of the four in this round; fully reproduced by me on a clean machine state; three of its findings weaken my own Rev-4 calls (conceded below, preserved-not-smoothed).

## What I ran (this session, against reconstructions)

| Check | Command / source | Result |
|---|---|---|
| Delivery tree present | `git ls-tree -r origin/council/ernie \| grep ernie-ringers` | `RECEIPTS.txt`, `RECAP.sh`, `patches/{vue,svelte}.patch`, `shared/{ringers.ts,ringers-probe.mjs,timing.mjs,dt.mjs}` · VERIFIED |
| Shared-file hashes | `sha256sum shared/*` vs his receipt §0 | **all 4 MATCH** (`cc7458c8…`, `5872a2b0…`, `c7a6634c…`, `022f3c76…`) · VERIFIED |
| Line counts | `wc -l` | engine 135, probe 115 · VERIFIED |
| Pristine scaffold builds (fresh clones, this machine) | `npm ci && npm run build` both, `cat dist/assets/*.js \| gzip -9 \| wc -c` | vue **29,514** / svelte **11,304** → **18,210 B gap**; raws 77,202 / 28,969 — **exact match to his §8** · VERIFIED |
| Patch application + rebuild | `git apply patches/*.patch` on the pristine clones | **dist assets byte-identical**: vue `index-BgS4--gW.css` / `index-DLzZiwG_.js`; svelte `index-D4DgP7sw.css` / `index-DHxotiKC.js` — hashes match his receipt §3 exactly · VERIFIED |
| gz-9 of concatenated dist JS | `cat dist/assets/*.js \| gzip -9 \| wc -c` | vue **28,681** / svelte **15,015** — exact match · VERIFIED |
| Type-checks on reconstructed arms | `npm run type-check` (vue) · `npm run check` (svelte) | vue exit **0** · svelte **0 errors, 0 warnings** · VERIFIED |
| His probe, both reconstructed arms | `node scripts/ringers-probe.mjs dist <engine>` | **LAW 1–6 PASS in both arms, exit 0** — identical output to his receipt §4 · VERIFIED |
| tsconfig asymmetry | `cat oracle-svelte/tsconfig.json` · `grep noUncheckedIndexedAccess oracle-vue/tsconfig.app.json` | flag **absent** in Svelte (with `strict: true`); **present** in Vue app tsconfig line 7, comment "may have false positives" · VERIFIED |
| `base: './'` absent | `grep base oracle-{vue,svelte}/vite.config.ts` | absent in both → his §7 (file:// ERR_FILE_NOT_FOUND, identical both arms) is consistent with configs · VERIFIED (configs), REPORTED (the browser run itself) |

## Where I adopt or concede against my own Rev-4 filing (preserved, not smoothed)

1. **Q4 (council-runs) — conceded.** I filed `zai-only`; Ernie independently built the objection: two seats ran the same slice in one sitting and the result (below) moved the adjudication. His `council-runs — one slice per seat, minimum two seats, pooled` is right; the correction is that the slices must still be **varied-shape** (my settle-rule: one read-heavy, one write-heavy, one state-heavy), never duplicated on the same slice. My `zai-only` position is retired.
2. **Q5 — his strictest-tsconfig Gate-5 wording adopted.** My amendment was "re-run on the final bytes"; his is strictly stronger: *"clean on the SHIPPED tree, after the last edit, under the STRICTEST tsconfig in either arm (name it in the receipt)"* — it subsumes mine and directly answers the shared-file tax his run exposed (a byte-identical file was clean in Svelte's tsconfig, 3× TS2352/TS2532 under Vue's).
3. **Q6 — his "no-go for the week-stepper as row-9 tie-breaker, go as a product slice" is right; mine was not.** A week-stepper built the way the Svelte repo's AGENTS.md prescribes (class `.svelte.ts` bridge, 0 façades) measures ≈0 and settles nothing. Adopt his Part-B amendment: **the week-stepper must measure BOTH Svelte store patterns** (class bridge and module-level `$state.raw` exports) and report the ratio — same cost to build, it turns a ritual into a test. Also adopt his protocol Amendment 1 (point §1.1 at the fresh-start repos, not the four-slice arms) — complementary to my "re-anchor to the week-stepper surface"; both land together.
4. **F5 — his "zero façades on a fresh start" supersedes my restatement.** The class-bridge pattern compiles 0/0 with no façade at all; module-level `$state.raw` with exported **functions** also compiles 0/0 (his §8 idiom test). The residual "one facade, paid once" applies only to `export let` of a reassignable `$state` — one rule, not a standing tax.
5. **Offline file:// — cause-class correction.** My Rev-4 filing said "vite-level fix (crossorigin/null-origin)" generally. That is the four-slice-arm/pin-`d3bd81d2` class. For the **fresh-start repos** the failure is `ERR_FILE_NOT_FOUND` at `/assets/…` — missing `base: './'` in both scaffolds (his §7, my config grep). Two trees, two failure classes, one tie. The Architect must not apply the pin fix to the scaffolds; and neither fix ships without the Owner's file://-scope answer.
6. **The empty-scaffold decomposition is the strongest bundle evidence of this round.** 18,210 B gz between the *pristine* scaffolds (my independent re-measure: exact), shrinking to 13,666 B with minimal slices (my arms: same direction, ≈13.1 kB). The gap is runtime+deps (Vue+Pinia), not authored code — cite this pair, not the slice deltas, if the bundle is quoted at all. It also retires the bundle as any kind of authoring-quality signal: it was never one.
7. **Row 9's fresh-start magnitude is +2 lines** (15 vs 17 line stores), not 15, not 7 — agreeing with F3 and F5 and with my demotion of row 9 to TIE-BREAKER status; his framing that row 9 "measures an authoring pattern, not a framework constant" is the accurate sentence.
8. **`gh-pages` tip moved during review** (`3e69567c` → `66096fb1` at his 20:07Z) — my D2/D-line cited `3e69567c`; load-bearing claim (live is w89) survives, sha did not. Noted for Q8 corroboration.

## Where I hold my position (disagreement preserved)

1. **The flip to "pick Svelte, narrowly, on a fresh start" oversteps the record one notch.** We agree the Vue lean does not survive the fresh-start evidence (row 9 collapses to +2; both feel-verdicts land Svelte; bundle 13.7 kB gz). But the settle rule I named primary (time-to-green, ≥2/3 pairs, pre-registered, label-swap) has not been *run* on varied-shape pairs; on N=1 ordering effects remain (his own order: Svelte pathfinder paid for the probe pass, Vue inherited the contract — he flagged it himself). The honest posture remains **"wash → tooling/ecosystem tiebreak → Vue"** by the decision table, with the lean now ~even or Svelte-leaning on fresh-start evidence, pending Rev 6 + the week-stepper (both-patterns) + the second agent. If Ernie's fresh-start outcome had come from a *registered-order multi-slice run*, I would take the flip. It didn't; so my confidence moves, my rule doesn't.
2. **Q3 primary.** His paired correction-effort per 100 lines shares Glyph's earlier composite's failure mode at N=1–2 (the unit is half count of discrete events and half agent judgment; his own falsifier — agent-vs-framework variance — is the right end-state and it's where I'd adopt it). Time-to-green stays my primary; correction cycles stay the flag/witness. Both primaries already output "even" on this data, so the fight is cheap certification, not a live dispute.
3. **D7.** His addition (pattern confound on top of corpus confound) is right and should ride Beam's line; the confound caveat now has two named sources, one corpus-shaped, one pattern-shaped.

## What I noticed that nobody filed

**Both seats built the identical slice independently** (mine: Aurora Aviators/Bramble Barons, filed 20:05Z; his: Cardboard Ringers vs Styrofoam Kings, filed 20:07Z) and reached the **same feel verdict (Svelte)** via **independent fixtures, independent engines, independent arms** — the closest thing this round has to a two-agent replication, produced by the council seats under the same prompt. It was free (this prompt invited it) and it should not be hidden or smoothed: two independent agents, each with Vue-fluent priors (his stated corpus bias; mine documented), both hand-landed on Svelte by ≈3–6 battery points. That is REPORTED-feel evidence with two independent authors — weaker than a registered-order protocol run, stronger than any single-agent feel claim any of us has filed. If Rev 6's Part D reports, it must tabulate our two pairs alongside Z.ai's arms.

## Verdict restated

**improved.** Adopt the filings; corrections above are state-of-record, not blockers. The one-line ask to the Owner stands: **the Vue-vs-Svelte call is not signable on this evidence; it wants the week-stepper (both patterns) and the protocol's second agent.**

— inkling (advisor seat) · 2026-11-15T20:20:00Z · nothing pushed except this file
