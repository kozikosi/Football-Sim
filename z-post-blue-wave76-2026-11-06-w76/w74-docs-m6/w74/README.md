# w74 — the full build package (Z.ai executor seat, 6 Nov 2026 UTC+8)

**Lane:** Z.ai · **Wave:** w74 · **Base:** branch `architect/engine-and-seats` at `425f72a` (plus origin/main and origin/gh-pages for the verification items). **Delivery:** files and zips only — nothing lands without Kosi's review and push; every folder carries its own README with what needs ruling.

**Test counts:** 288 = the full vitest suite (core + nfl + app) · 286 = 288 minus the 2 storage-env-dependent tests skipped in the sandbox run · 284 = 286 minus the 2 golden-seasons tests that were still warming (288−2−2).

**The session in one paragraph:** the second architecture review (01) found the architecture sound with the hydration rule buildable against four named gaps; the N1 exhibit (02) and the Lab package (03) delivered the conversion-curve measurement — **the decisive finding: the three drafter policies separate decisively, but the proposed CPU-draft lever is FLAT and cannot reach the Owner's 90/35/25 (+ P(20-0) ≈ 1–2 %); no parameter is proposed, two follow-ups are pre-registered for ruling.** The code drafts (04–07) closed every "not written yet" in Claude's 551af1b reply — tsconfig + type-check (contracts clean, engine debt named), F1/F3/F5–F10, FeedEvent, hydration, DatasetLoader rework, the Draft Board slice END-TO-END (**builds at 23.9 KB gzip; 2/2 Playwright**), feed UI, brag/seed-card/seed-share/read-only sharing, a11y boot, the service worker (**airplane-mode offline test 3/3 — the Vary:Origin bug found, fixed, documented**), and the seven acceptance criteria as running specs (**9/9**). The proposals (08) and verifications (09) closed the cross-checks — including two review findings: Muse's cited patch commit is EMPTY, and the retire OPs were already Owner-applied (my seconds are proof-receipts).

## The folders

| Folder | Item(s) | Verified headline |
|---|---|---|
| `01-w74-review/` | 1 | 12 claims verified, F13–F17 filed, three contradictions named; nothing blocks the slice |
| `02-n1-drafts/` | 2 | six-file exhibit + telemetry + the calibration chart (DS's idea) |
| `03-lab-calibration/` | 3a–3h | 440-season repro VERIFIED; baseline N=1000; **flat tuning curve**; goldens + 1,088-game interleaving gate; streaming patch; public slider page |
| `04-contracts-fixes/` | 4a–4g | 286/286 tests; contracts 0 tsc errors; 301 pre-existing errors named per file |
| `05-viewmodels-screens/` | 5a–5h | slice builds (61.7 KB / 23.9 KB gzip); 2/2 Playwright; G-VM pattern flags for the freeze |
| `06-offline-sw/` | 6a–6c | build-derived SW manifest; **offline airplane test PASSES**; version floor drafted |
| `07-tooling-ci/` | 7a–7g | bundle 25.4 KB ≤ 150 KB; runes PASS; contract:check PASS; evidence pack; 9/9 acceptance; bug-report replay reproduces its digest |
| `08-proposals-docs/` | 8a–8g | P-254, freeze mechanics, P-251 diffs, P-257 wording, P-258 patch, DATASET.md, Fix-It spec, old-shell deletion analysis |
| `09-verification/` | 9a–9d | Vite PASS; licensing BOTH CONFIRMED (with caveats); Muse patch unreviewable-as-cited (empty commit); 5/5 retirements seconded with proof |

## The rulings wanted, consolidated (each folder's README details its own)

1. **F1** — appstate.ts is the only AppState (store.ts renamed DraftStore*) — gates the pattern freeze.
2. **Top-30 picker semantics** — random-within-30 (today's 48.5%) vs best-value-with-top-30-cap — decides whether 90/35/25 (+ P(20-0) ≈ 1–2 %) is a policy reading or an engine-tuning problem.
3. **F11/DatasetLoader** — empty-state + import path (drafted) vs fictional-with-warning.
4. **F14/F15/F16** — htd/atd required; week kind never stores a finished season; the two-directional scores-fit definition (drafted as code).
5. **F6** — SaveStatus carries `key` (my pick) vs global-on-purpose.
6. **worldSeed? + deviceId? envelope fields** — both additive now so v1.1 never unfreezes (items 5f, 8a).
7. **src/platform/ as the home of storage + a11y glue** — the purity tests chose it for me; bless or redirect.
8. **devPool.ts** — synthetic dev pool for the slice until the real ratings exist.
9. **SW strategy** — stale-while-revalidate navigations (the network-first variant failed the offline test; documented).
