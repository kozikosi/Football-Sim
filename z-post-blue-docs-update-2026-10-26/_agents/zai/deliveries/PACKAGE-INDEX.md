# PACKAGE INDEX — z-post-blue-full-handoff-2026-10-25.zip

**From:** Z.ai, High Councillor (seat S-2600–2699) · 2026-10-25
**What this is:** every document, tool, guide, and build from my lane of the council's Z-post-blue work, in one zip. Curated copies up top for humans; a verbatim lane archive at the bottom for completeness (so "every md file" is literally true, not curated).

## Start here

| If you want to… | Open |
|---|---|
| **Play the latest build** | `01-html/Football-Sim-Z-post-blue.html` (1,237,864 B, md5 `49ea6f05…`, wave 11 — Owner rounds 6+7 live) |
| **Onboard Claude in one file** | `02-for-claude/HANDOFF-FOR-CLAUDE.md` (REV 13 — read this first) |
| **Learn the design law** | `03-guides/STYLE-GUIDE-Z-POST-BLUE.md` |
| **Learn how to work with the Owner** | `03-guides/OWNER-PREFERENCES-PLAYBOOK.md` |
| **Understand the weights / FB-P math** | `03-guides/REWEIGHT-BRIEF.md` (single source of truth; §7b = FB/Punter wins math, Owner-approved 25 Oct) |
| **Push everything to GitHub** | `07-git/GIT-PUSH-INSTRUCTIONS.md` (git bundle is in the FULL zip only)` for the object pack) |
| **See the governance picture** | `04-governance/GOVERNANCE-AND-ARCHITECTURE-RECOMMENDATIONS.md` (REV 2, consolidated) |
| **See what this project taught me** | `05-wisdom/WISDOM-AND-LESSONS.md` |

## Full manifest

- **`01-html/`** — `Football-Sim-Z-post-blue.html` (LATEST), `Football-Sim-Z-post-blue-logosB.html` (package-B logos variant), `z-post-blue-netlify/index.html` + `README.txt` (Netlify-drop ready — same latest bytes).
- **`02-for-claude/`** — `HANDOFF-FOR-CLAUDE.md` (REV 13), `PROMPT-FOR-CLAUDE-v2.md`, `PROMPT-FOR-CLAUDE-v3.md`, `claude-prompt-council-tasks.md`, `TEST-REQUEST-Z-POST-BLUE.md`, `ONBOARDING-NOTE.md`.
- **`03-guides/`** — `STYLE-GUIDE-Z-POST-BLUE.md` ★new, `OWNER-PREFERENCES-PLAYBOOK.md` ★new, `REWEIGHT-BRIEF.md` (weights guide, REV 2 with §7b).
- **`04-governance/`** — `GOVERNANCE-AND-ARCHITECTURE-RECOMMENDATIONS.md` ★new (REV 2 consolidated, R-ZAI-1…9), `GOVERNANCE-RECOMMENDATIONS.md` (original R-ZAI-1…6), `HIGH-COUNCILLOR-CHARTER-PROPOSAL.md`, `DRIFT-AUDIT-2026-10-25.md`, `TASK-LEDGER-SEED.md`, `WORKSTREAM-TRIAGE.md`.
- **`05-wisdom/`** — `WISDOM-AND-LESSONS.md` ★new.
- **`06-tools/`** — the full build & verify toolchain: `zpostblue_build.py`, `zpb_v10.py` / `zpb_v11.py` (assemblers), `zpb_css_v9/v10/v11.css`, `zpb_js_v9/v9b/v10/v11.js` (engine sources — these are the "sections of code" Claude can copy-paste), logo fetchers (`zpb_logos.py`, `zpb_logos_b.py`, `zpb_fetch_logos_v8.py`), verify suites (`v8/v9/v10/v11_verify.js`), `drift-audit.sh` (+fixture), `teams_colors_logos.csv` (palette/logo registry), `publish.sh` (one-command publish kit).
- **`07-git/`** — `GIT-PUSH-INSTRUCTIONS.md` ★new, `git-bundle/Football-Sim-zai-local.bundle` (all local commits as a portable git pack — the real "push for me" mechanism).
- **`08-notes/`** — `AGENT-PIPELINE-PROMPT.md` (the relay-review pipeline), `BASELINE-VERIFICATION.md`, `CORRECTION-LINE3-SELECTOR.md` (the honest correction record).
- **`09-reports/`** — `Z-POST-BLUE-BUILD-REPORT.md` (the wave-by-wave build report, §1–19).
- **`10-palette/`** — `PALETTE-ADVISORY.md` (team-palette UI advisory).
- **`11-worklog/`** — `WORKLOG-SHARED.md` (the shared multi-agent work log, as of packaging time).
- **`12-lane-archive/`** — `_agents/zai/` verbatim (deliveries, notes, tools, snapshots incl. the frozen Z-pre-blue prototype + PreColors baseline, and the full `evidence/z-post-blue/` screenshot history v1→v11b). Nothing cherry-picked.

## One-paragraph state of the world

Latest build = wave 11 (v11b suites all pass, zero console errors), sha-verified in four synced copies; Owner rounds 6+7 (~90 items) implemented; FB/Punter wins math designed AND shipped; Weights guide promoted across all documents; handoff at REV 13; all work committed locally on `zai/lane` + mirrored to `main` (ahead 5 / behind 7 of origin — push from your machine per `07-git/`).

— Z.ai · This index also lives in the repo at `_agents/zai/deliveries/PACKAGE-INDEX.md`.
