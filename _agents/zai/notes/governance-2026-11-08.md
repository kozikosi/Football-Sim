# Governance artifacts — Z.ai session 2026-11-08 (Claude-unavailable window)

New entries continuing my lane's ledgers (H-001…H-007, D-001…D-007, R-001…R-004 live in the Owner-held `z-post-blue-docs-update-2026-11-08` package; this file continues the numbering). NOTE the cross-lane ID collision discovered this session: vloc's discrepancy register has its own D-001…D-007 with DIFFERENT meanings (e.g. their D-007 = OR's product edit; my D-007 = the forensic correction). See D-008 below and brainstorm answer Q25.

---

## H-008 (hypothesis, pre-registered before results were read)

- **Hypothesis:** the product's 56 `Math.random()` sites are cleanly partitionable by subsystem, and a single boot-time `Math.random` override (mulberry32, seeded only when explicitly requested) covers 100% of sites with byte-identical behavior when unseeded — i.e. Stage-1 RNG is SAFE-ALONE.
- **Decision rule declared in advance:** if any site cannot be classified by enclosing function, or if the override contract cannot be stated without touching a protected constant, H-008 is REJECTED and Stage 1 stays blocked; if all sites classify and the contract is constant-free, H-008 is SUPPORTED (still a proposal — only the Architect builds).
- **Test:** `node _agents/zai/tools/rng-audit.mjs --selftest` then full run. 
- **Result (post-run):** SUPPORTED — 56/56 occurrences classified (0 unclassified), 7/7 self-test PASS, contract uses no protected constant. Receipt: `tools/rng-audit-2026-11-08.md`.
- **Pre-registration note:** hypothesis and decision rule written before the first full-audit run this session (self-test iterations came after the hypothesis text was drafted into the session notes; the sandbox has no git, so the timestamp here is the honest equivalent: 2026-11-08, before the audit's first successful full run).

## D-008 (discrepancy — cross-lane register ID collision)

- **Discrepancy:** two D-007s exist with different meanings — ZAI lane D-007 (forensic correction: 28-Oct fitlm target was design.json × 0.00254) vs VLOC lane D-007 (OR's direct DEFAULT_WEIGHTS product edit on council/or a83d80b6, MERGE-MANIFEST re-pinned to 395f26411333a41f). Any tool or seat aggregating registers by bare ID will conflate an Owner-facing governance violation with a forensic finding.
- **Suspected cause:** lane-local registers without a namespace (AGENTS §8 gives each seat its own lane but no ID discipline for cross-lane logs).
- **Status:** Open — propose prefixed IDs (`ZAI-D-007`, `VLOC-D-007`) and an index header per register; retroactive rename NOT requested (renaming shipped IDs breaks citations); prefix at the aggregation layer only.
- **Evidence:** VERIFIED read of `_agents/vloc/deliveries/discrepancy-register.md` on `council/vloc` (their D-007 row quoted in brainstorm Q25); my D-007 is REPORTED from the Owner-held 2026-11-08 package.

## D-009 (discrepancy — flex pricing context dependence, new measurement)

- **Discrepancy:** the deterministic lookup and the full-roster counterfactual disagree materially for some pairs: TE1→WR1 measures 0.000 wins lost (lookup, all-else-80 base) vs 0.63 wins (full-roster median, w79 REPORTED) — while this session's cast-sampled measurement lands between (0.408 wins in a WR-rich cast, 0.000 otherwise). The flat −10 cap cannot be validated against "the" measured cost because the measured cost depends on roster context.
- **Suspected cause:** displacement — a flex demotes an incumbent, an effect invisible to the all-else-80 lookup and decisive in full rosters.
- **Status:** Open — propose the two-number convention (fixed-cast price for the FLEX table, full-roster price for advice; delta named "displacement term"); completion blocked on seeded RNG (D-004).
- **Evidence:** VERIFIED — `node _agents/zai/tools/flex-ext.mjs` Part 2/3 receipts (QB→FS 0.975 wins @90; CB→FS 0.284 @90 ≠ free; TE→WR1 0.408 in WR-rich cast); REPORTED — w79 T6 medians.

## R-005 (ruling PROPOSAL — not a ruling; Owner/Architect to decide)

- **Proposal to the Owner (three parts, each reversible, none touching protected values):**
  1. Adopt the raw-curve witness as a standing per-build gate (cost: seconds, zero product bytes; protects every displayed number — see brainstorm Q3/Q46).
  2. Authorize RNG Stage 1: the no-op-unseeded `Math.random` → mulberry32 override at the top of the inline script (`?zseed=` / `localStorage["zpb:seed"]`); exact patch form and seeding contract in `_agents/zai/tools/rng-audit.mjs` output. Unblocks T1-E5, T2, T6-full without any user-visible change.
  3. Delegate the flex-table revision to the slot-pair formula P(a→b, ovr) = clamp(round2(θ·ovrEq(a→b, ovr)), 0, 30), Owner picks θ from the printed sensitivity grid (θ=0.5/0.75/1.0 × OVR 85/90). First candidate corrections from measurement: QB→FS stepped −10/−20/−30 by OVR band (−10 under-prices stars by >2×: 22.8 OVR-eq @90); CB→FS from 0 to 2; SAM-family prices revisit after displacement term lands.
- **Justification:** converts this session's measurements into standing infrastructure; each part fails safe (witness is read-only; Stage 1 is byte-identical unseeded; θ changes are future FLEX-table edits that would each come back through the §5 chain with their own receipts and re-pin).
- **Labels:** witness cost VERIFIED (measured ~2 s per full table build); Stage-1 safety INFERRED from the audit + no-op design, to be VERIFIED by the Architect's build battery; θ numbers VERIFIED on Pre-Colors 40233d6be00e987c.

---

Cross-references: H-008 → rng-audit receipts; D-009 → flex-ext receipts; R-005 cites H-008 + D-009 + brainstorm Q14–Q16/Q38. Filed 2026-11-08, Z.ai lane (sandbox session; no git — delivered via zip).
