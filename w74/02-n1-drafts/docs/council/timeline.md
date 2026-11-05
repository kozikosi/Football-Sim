# Timeline — the compressed history, hash-linked

One line per event; every hash is real and resolvable in the repository's history.
(Executor waves w52–w55 ship single-file product builds on the seat's branch; from w70
the shell is a frozen parity anchor and the work moves to the Colors rebuild.)

| When | Event | Receipt |
|---|---|---|
| 2026-10-24 | Executor seat first seen; Z-post-blue prototype work begins (12 build waves, verify suites v8–v11) | lane file, `_agents/zai/ZAI.md` |
| 2026-10-25 | FB/Punter reweight math + owner playbook + style guide shipped | `deliveries/REWEIGHT-BRIEF.md`, `STYLE-GUIDE-Z-POST-BLUE.md` |
| 2026-10-26 | w52 ship — the Dot Law wave | package `z-post-blue-wave52-…`, anchor md5 `40613b81…` |
| 2026-10-27 | Architecture replies + owner decisions recorded verbatim | `_agents/owner-notes/2026-10-27-*.txt` |
| 2026-10-31 | CPU draft targets set by the Owner (fairly-optimal 90 % / SB 10–25 %) | `_agents/owner-notes/2026-10-31-cpu-draft-targets-verbatim.txt` |
| 2026-11-01 | Outcome Lab first findings; sync strategy §E (five endpoints, four laws) | `outcomelab/FINDINGS-for-architect.md`, w71 strategy answers |
| 2026-11-02 | w55 ship — the Phone Laws wave; council continuous-trust reviews land | anchor `49161f11…`; `tools/council.mjs` review governor |
| 2026-11-02 | Owner: focus on the engine; P-009 built | `owner-notes/2026-11-03-p009-built-focus-engine-verbatim.md` |
| 2026-11-03 | E1: stable player-id crosswalk (`pid`), buildPool requires it — 251 tests | commit `53b3f66c` |
| 2026-11-03 | E4: draft = log over frozen pool; resume never reads live data — 255 tests | commit `b26777a4` |
| 2026-11-03 | E5: engine/data version stamps + drift check — 261 tests | commit `25ff762e` |
| 2026-11-04 | Step 9: user season outcome + statsDue — 264 tests | commit `201b12ed` |
| 2026-11-04 | Owner answers to the five architecture decisions (faithful rebuild, no adapter, public repo, no users) | `owner-notes/2026-11-04-answers-to-5-decisions-verbatim.md` |
| 2026-11-04 | w68 debt inventory v1 (43 Math.random lines, 185 window sites, 22 dunders) | `gh-pages: w68-debt-inventory-v1.md` |
| 2026-11-04 | Multisport namespacing: `core/` + `sports/nfl/`, `sim:` keys — 272 tests | commit `1f3384b9` |
| 2026-11-04 | w70 parity anchor frozen (six UI fixes + audit; w69 overclaim fixed) | md5 `79c4a934…`, 1,806,245 B |
| 2026-11-05 | w71: Outcome Lab 440-season sweep + Model Report; debt v2a; storage dump; Svelte scaffold; strategy answers | `gh-pages: Football-Sim-Z-post-blue-w71/` |
| 2026-11-05 | w72: executor answers ADR-1..12 with measured receipts (save sizes, determinism proof, write costs) | `gh-pages: z-post-blue-wave72-answers-…` |
| 2026-11-05 | Envelope identity (saveId/revision/createdAt) + canonical SHA-256 dataset hash; resume-determinism tests | commit `f4cfe403` |
| 2026-11-05 | Q8–Q11 answered to Muse; single-file reversal applied to five docs | commit `aa6b561` |
| 2026-11-05 | App-layer contracts: StorageModule/DatasetLoader/SaveStatus, FIFO saver, AppState + Action union | commit `551af1b` |
| 2026-11-05 | Outcome Lab harness lands in-tree (`colors/tools/outcomelab/`, P-252) | commit `a824d1e` |
| 2026-11-05 | Vite + Svelte 5 runes build verified in-tree (P-253) | commit `425f72a` |
| 2026-11-05 | w73 ship — Draft Board pass + Fix-It Board (shell track); 551af1b contract review: 12 findings, verdict buildable | md5 `8b72bf72…`, 1,818,133 B; review `20261105-zai-contract-review-551af1b.md` |
| 2026-11-06 | Owner decides: real names · Svelte confirmed · top-30 target 80/25/10 | this session's context (w74) |
| 2026-11-06 | w74: second architecture review; N1 exhibit drafted; calibration curve measured at N=1,000; tsconfig; hydration + fallback drafts | this delivery (`01-`, `02-`, `03-`, `04-` folders) |

Test-count milestones for the record: 251 (E1) → 255 (E4) → 261 (E5) → 264 (step 9) →
272 (namespacing) → **284** (envelope identity + saver + contracts, verified at the tip).
