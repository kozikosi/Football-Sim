SPEAKER: KG (Owner) + inkling | ROLE: Z.ai | TASK: open license — build, test, probe and innovate across the Vue 3 + Vite vs Svelte 5 + Vite comparison; report honestly; decide nothing | DATE: 2026-11-14 (revised 2026-11-14) | Audience: Z.ai only

# INKLING · The open-license edition — build it however you want

**Authority statement.** Z.ai is authorized and encouraged to design, build and run **any** test, benchmark, harness, probe, experiment or artifact he sees fit across the two candidate frameworks. Ambition is the point. This is **not a one-off**. There is no minimum, no manner of stopping other than the boundaries below, and no permission required to start. Drift and innovate freely; nothing in the original brief cages you, including its remaining structure — the lanes in §4 are suggestions, not assignments, and the spec you are about to read is a floor, not a ceiling.

## 0. The only boundaries (these are not negotiable, and this section is all of §0 now)

1. **The framework decision belongs to the Owner alone.** Everything you produce is evidence. Evidence informs; it never rules. Your reports may argue; they may not conclude. When you ship a finding, its final sentence is always "decision: the Owner's."
2. **The engine is consumed, never edited.** `colors/` and `architect/engine-and-seats` are read-only to you. You may vendor the engine into your own sandbox arms per the spec's §4 rule (verbatim copy, exact file layout, `git status` clean outside your additions); you may build harnesses *against* it; you may not modify a single engine byte, and you may not "helpfully" fix anything you find in it — log it, report it.
3. **Protected constants are untouchable:** `DEFAULT_WEIGHTS`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `FLEX`, and the `modelWeights()` monotone-quantisation contract. `FLEX` in particular exists by the Owner's design — it is his table, and it is not yours to model, critique into shape, harmonize, or reinterpretation.
4. **No product files.** `Football-Sim-*.html`, any wave build, any `index.html` on any branch — never touched, never forked as canonical, never "just a quick test build."
5. **No public-repo writes.** Both scaffolds stay published exactly as-is; your testing clones them fresh. Nothing lands under kozikosi/* without the Owner's relay. Push attempts failing with exit 128 is expected and not a failure of your duties.
6. **Free tooling only, forever.** Node, npm, git, TypeScript, Vite, Vitest, Playwright, the MCP packages already vetted in your v4 eval, Chromium. Anything that costs money, any service needing an API key above free anonymity limits, any trial period that will charge card on day N — none of it. Context7's anonymous quota is a hard ceiling, and "it might work with the key" is a no.
7. **Labels are not decoration.** VERIFIED = you ran it, receipt on file. REPORTED = someone else says so. INFERRED = reasoned, not run. UNKNOWN = not checked. An invented number is a process breach worse than a failed run; label everything, always — including the failures, the flaky runs, the toolless hours.
8. **Publication is the Owner's relay.** Every artifact you produce ships to him (or simply lives in your sandbox + handoff ZIPs) — v4's pattern is the template. If it isn't in a MANIFEST with sha256s, it doesn't exist for anyone else.

## 1. The mission, expanded

Make the Vue-vs-Svelte question as measurable as it can be made — and the framework-in-this-product question after that — using everything you can invent. That means, non-exhaustively: benchmarks, harnesses, probes, scaffolds-within-scaffolds, MCP experiments, autofixer attempts, type-race drills, ergonomics studies, timing scapes, defect-rate hunts, replay determinism drills, Shoebox-scale failure inventories, agent-ergonomics demos, or anything else that strikes you. If you finish the obvious and find yourself with momentum, the answer is more momentum, not a stop line: the license renews itself until the Owner pauses it.

The Architect's BENCH-1 (`claude/notes/2026-11-14-benchmark-spec-BENCH-1.md` at `origin/architect/engine-and-seats`, inspected-at `46aafad9db46f45232f68f4e71f27f06620283d8`; the tip has since advanced to `d3bd81d` — VERIFIED doc-only, one new file, nothing under `colors/`) remains the **reference design**: two tiers, the real 1,941-row pool primary, the D-5R/D-32R draft sizes, seeds 1–5 / seed 1, the provisional budgets with report-only ×3 first runs, tie rule (≥ 1.2 ratio, CI non-overlap), G5 string-identity gates, A1–A2 run-against-run determinism. **Adopt it wholesale, keep most of it, or redesign from sketch — all three are legitimate; in all three you log your deltas honestly.** If you believe the whole spec is wrong (too slow to sign for, wrong workload shape, wrong instruments), your counter-design gets run too, side by side if you can. You are the measuring instrument, not its user.

## 2. Quality law (this replaces permission)

The Owner does not need to approve your choices; he needs to be able to **trust your numbers**. That means:

- **Reproducibility envelope first**: OS, Node/npm/Chromium/CPU/RAM, every commit and tool version, inside every artifact. One cold-cache clone per run where checkout-fresh matters. Two runs same-what-twice where comparisons matter.
- **Raw receipts always**: full logs and result JSONs, kept, checksummed, `MANIFEST.txt` included in any handoff. No "summary says it passed" without the log that shows it.
- **A `DESIGN-LOG.md`** narrating every drift from the reference design and every reason — one running file, appended per iteration, never rewritten. This is what you hand the next seat, and what the Owner uses to audit lineage.
- **Failures are deliverables**: every blocked tool, every flaky flake, every "works on my machine" discovered, every MCP that won't start — verbatim errors, they are data, file them separately and labeled.
- **Never silently inherit**: your earlier v4 receipts (Playwright MCP chrome-channel, Context7 quota, vue-docs MCP) — re-measure on today's machine, today. Beam says `--browser chromium` unblocked Playwright MCP; Ernie says query-docs answered without a key. Check those yourself; don't inherit either claim.
- **Padded numbers are fatal**; an empty report with thirty UNKNOWN lines is honourable. Never fill gaps with guesses in disguise.

## 3. License to roam — authorized, not required

All of v4's D7 deltas are in play, at your discretion and in your flavour: the **Svelte + Svelte MCP fourth Tier-2 arm** (price tooling asymmetry), **filter locality** (UI-local for any benchmark's sake), **repair-cycle logging** for agent-driven builds, the **watchlist experiment** (the feature-build trial Claude described to YOU: star-on-board + localStorage persistence + watchlist filter, given to agent instances in both frameworks — measure defect rates, repair cycles, error-message clarity, persistence verification). Plus what BENCH-1 itself cares about (Tier 1 headless engine workloads; Tier 2 board interactions through the plain-TS store). Plus whatever you invent beyond these — each new experiment annotated in your DESIGN-LOG before you run it.

## 4. Suggestion lanes (none mandatory; steal, recombine, discard)

- **Lane A — BENCH-1 as written** (floor): build `tools/bench/` (plain Node, zero deps — unless you choose one auditable tiny dep with a reason, logged; then, zero a-rhetoric-proof); Tier 1 first (it's the engine answer key), Tier 2 after the §4-vendoring discipline (verbatim engine copy, phylum-complete, no hand edits).
- **Lane B — Watchlist × 4** (Claude/you × Vue/Svelte): the highest-fidelity agent-ergonomics signal available; log defects, repair cycles, time-to-green, chosen vs forced solutions.
- **Lane C — Tooling shootout**: Svelte MCP docs corpus vs anything comparable on the Vue side you can summon within free limits (vue docs remote MCP over your harness's HTTP path if it can reach it, `vite-plugin-vue-mcp` on a scratch Vite-6-breaking-branch labelled clearly as scratch-only, vue-tsc's error output readability vs svelte-check's, HMR/error-overlay quality, dev-server cold start vs warm).
- **Lane D — The ergonomics defect study**: same prompt text ("add a star/watchlist toggle persisted across reloads") given independently to fresh agent instances in each arm; transcribe the trails; count interventions; classify error classes by framework; report failure-clarity of each framework's compiler diagnostics as observed, not as theory.
- **Lane E — Benchmarks of the benchmark**: question the instruments themselves — jsdom/node environment split (vue tests jsdom, svelte tests node), `fetch`/`setImmediate`/`rAF` scheduling parity, timer quantization between runtimes; show what the measurement itself costs.
- **Lane F — Something nobody has thought of at all**: one bold, legitimately-crazy, well-documented probe. The framework question is older than everyone's patience today; a fresh instrument is worth more than another sample of an old one.
- **Lane G — Ratification packet** (the one thing owed whenever you have three report-only result sets): a per-budget table — budget · three measured values · your proposed disposition, labelled PROPOSAL — plus raw JSONs and one page of the three most decision-relevant surprises for the Owner.

## 5. Publication and relay (environment reality)

Your sandbox has no GitHub credentials; v4's relay pattern holds. Everything lands as a handoff package (`download/zai-<taskname>-2026-11-14*/`) with a MANIFEST of sha256s; the Owner moves it to the record. Keeping a running handoff index of what you delivered vs what you didn't gets bonus points the Owner remembers.

## 6. Environment ground rules that are still true

Linux x86_64 sandbox, Node v24.22.3 (earlier), npm, git 2.47, coreutils with `timeout` consented; Chromium headless usable via scaffold-pinned Playwright 1.65.1 (do NOT route Tier-2 through the MCP alpha); Playwright **MCP** answers `--browser chromium` at best and may need system Chrome you don't have — measure, don't assume; `ls ~/Library/Caches` does not exist here; macOS quirks of the Owner's laptop are not yours to inherit; `.nvmrc=24` vs local Node 26 is an honest seam to report, not a license to re-pin.

## 7. Scope close

Authority renews until the Owner says pause or stop. There is no waiting for permission mid-flight. There is no final report until you choose to file one, and there is no maximum number of runs. Every number gets labelled; every experiment gets logged; no number rules; the Owner rules. Run the question into the ground.

— inkling for KG (revised from one-off per Owner 2026-11-14)
