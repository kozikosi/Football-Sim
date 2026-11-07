# GOVERNANCE & ARCHITECTURE RECOMMENDATIONS — consolidated

**From:** Z.ai, High Councillor (seat S-2600–2699) · 2026-10-25 · REV 2 (consolidated)
**To:** the Owner · **CC:** the Architect (Claude) and the council via bulletin pointer.
**Reads with:** the original `GOVERNANCE-RECOMMENDATIONS.md` (R-ZAI-1…6, unchanged and still open) and `WISDOM-AND-LESSONS.md`. This file restates the six original recommendations in one page, adds three new ones born from the 25 Oct delivery incident (R-ZAI-7…9), and records the architecture as actually practiced — so the next seat inherits the machine, not the archaeology.

---

## Part A — Governance recommendations (all are proposals; nothing adopted)

### Carried forward, still open (details in `GOVERNANCE-RECOMMENDATIONS.md`)

| ID | One-line summary | Status |
|----|------------------|--------|
| R-ZAI-1 | Relay-review pipeline: review 2 oldest under-reviewed → claim 1 → 3 independent reviews ⇒ VERIFIED, before dispatch to the Architect | Open |
| R-ZAI-2 | One-command council drift audit (`drift-audit.sh`, read-only, exit 1 on findings) as the pre-commit gate | Open |
| R-ZAI-3 | One baseline pin table (file · sha256 · bytes · role · named-by · date) to kill "which build is the base" | Open |
| R-ZAI-4 | Single work ledger with claim/review/verified state (`TASK-LEDGER-SEED.md` ready; never two registries) | Open |
| R-ZAI-5 | Commit shared documents every wave (seconds MOC's Q-MOC-1; add drift-audit as the gate) | Open |
| R-ZAI-6 | Date-pin every availability line once; let dormancy rule 8 do the rest | Open |

### New, from the 25 Oct delivery incident

**R-ZAI-7 — The delivery gate: no wave report without a reachable artifact.**
- *Failure it answers:* the Owner was told work was done while the only copies lived inside a sandbox (`desktop/wt/zai/...`, `download/...`) that does not exist on his machine; a full round was spent discovering this. The same wave, a 20-minute hang on one git command blocked everything else.
- *Proposal:* a wave is not "shipped" until one of: (a) a chat download link to the artifact, or (b) a verified commit pushed to GitHub, exists. Wave reports state which one, with the hash. If the network is unavailable, the wave ends with a local commit + a zip + exact terminal commands (never a silent hang).
- *Cost:* one line per wave report.

**R-ZAI-8 — Owner-rounds intake ledger: every numbered item lives or is explicitly deferred.**
- *Failure it answers:* Round 3 items 14–23 were lost in transit and resurfaced two rounds later as trust damage. Owner messages arrive as dense numbered lists; memory is not a transport layer.
- *Proposal:* each Owner round becomes a dated section in the lane's handoff (as rounds 6+7 now are) **plus** per-item status lines in the wave report (`shipped` / `deferred: reason` / `question: pending`). The do-not-regress ledger in `STYLE-GUIDE-Z-POST-BLUE.md` absorbs every ruling so it can never silently regress.
- *Cost:* ~10 lines per wave; already practiced in waves 10–11.

**R-ZAI-9 — Sandbox hygiene: timeout every network command; package before you push.**
- *Failure it answers:* git push hung ~20 minutes on a credentials prompt (non-interactive shell waits on stdin forever).
- *Proposal:* lane standing rule — any network git/HTTP command runs under a short timeout (≤ 60 s), max two attempts, then: commit locally, assemble the zip, write terminal instructions for the Owner, and say what happened. Also: never present sandbox paths as Owner paths; the only valid delivery endpoints are the chat download folder and GitHub.
- *Cost:* zero; it is a default, not a tool.

## Part B — Architecture as actually practiced (for whoever builds next)

**B1 · Product:** one self-contained HTML file (`Football-Sim-Z-post-blue.html`, ~1.24 MB, md5 `49ea6f05…` at wave 11). Draft → season → playoffs → Super Bowl → replay → awards → 100-season sim, all client-side, no server, no build step required to run.

**B2 · Source layout:** the single file is *generated*. Real sources are the parts in `_agents/zai/tools/`: `zpb_css_v11.css` (styles), `zpb_js_v11.js` (engine + UI logic), `zpb_v11.py` (assembler + assert-guards, e.g. forbidden-token-counts-to-zero), plus `teams_colors_logos.csv` (the palette/logo registry). Editing the parts and re-assembling is the correct workflow; hand-editing the generated file is reserved for one-off surgical fixes followed by back-porting.

**B3 · Lane model:** work happens on branch `zai/lane` (worktree at the sandbox lane folder), committed per wave, then mirrored to `main` with an explicit "zai: lane mirror — wave N" commit. Nobody edits another lane's files; cross-lane requests go through the handoff + bulletin. Version names are owned namespaces (V-line = Claude, Z-line = me) enforced by the build script's assert-guards (lesson L8).

**B4 · Verification:** per-wave suites `v8_verify.js`, `v9_verify.js`, `v10_verify.js`, `v11_verify.js` / `v11b_verify.js` (headless DOM checks: copy compliance, integer-only rendering, shimmer presence, no white text, no undefined strings) + screenshot evidence per wave in `_agents/zai/evidence/z-post-blue/`. Rule: every Owner-found bug adds a check to the suite in the same wave (L2). The suites are the regression memory of the project.

**B5 · Math truth:** the value scale lives only in `REWEIGHT-BRIEF.md` (QB = 1000 anchor; FB §7b: lead-blocker run-blocking share + WV_OFF_SLOTS fix; P §7b: hidden-yards `PUNT_PTS = 1.6`). `slotWinsTable()` is honest for all 28 slots in both fronts — no display-only special cases. Display layer renders integers only.

**B6 · Record health:** `drift-audit.sh` (9 structural checks + injected-defect fixture) run before shared-doc commit waves; handoff (`HANDOFF-FOR-CLAUDE.md`) is the single onboarding entry ("read this first", currently REV 13); the bulletin carries inter-seat messages; deliverables sync x4 with md5 verification.

**B7 · Where I would take the architecture next (Owner's call, not mine):** (1) promote the parts-workflow into a tiny documented build recipe at repo root so Claude can rebuild byte-identical files; (2) adopt R-ZAI-3's pin table as `BASELINES.md`; (3) keep the product single-file until the Owner himself wants more — no framework migration is worth breaking Netlify-drop delivery.

## Sequencing if all are adopted

R-ZAI-9 (free, do now) → R-ZAI-7 + R-ZAI-8 (same wave as the next delivery) → R-ZAI-6 (one Owner message) → R-ZAI-3 (pin table; unblocks the slate) → R-ZAI-1 + R-ZAI-4 (pipeline + ledger together) → R-ZAI-2 → R-ZAI-5.

## What I deliberately did not do

Did not touch shared council documents beyond my own blocks; did not renumber M-ids; did not attempt the network push (it hangs on credentials in this sandbox — local commits only; `GIT-PUSH-INSTRUCTIONS.md` hands the push to the Owner). Nothing here is adopted until the Owner says so.

— Z.ai, seat S-2600–2699 · receipts: `GOVERNANCE-RECOMMENDATIONS.md` · `DRIFT-AUDIT-2026-10-25.md` · `TASK-LEDGER-SEED.md` · `WISDOM-AND-LESSONS.md`
