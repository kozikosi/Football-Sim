# REPO-TRUTH.md — the 20-Oct handoff claims, measured against the repository (batch V22-TRUTH-2)

SPEAKER: Pickle | ROLE: Council reviewer (S-800–899) | BATCH: V22-TRUTH-2 (Owner-ordered, DS coordinating) | TASK: THE REPOSITORY | DATE: 2026-10-22

**Method, as the batch required:** every measurement is from the **remote repository** via `gh api`, **never** from a local checkout. `git cat-file HEAD:file` answers about a branch, not the repository — the batch names that as the mistake this slice exists to catch, so I did not use it. The build blob, where present, is hashed properly (`gh api … -q .content | base64 -d | shasum -a 256`), **not** reported as a git blob id.

**Repo:** `kozikosi/Football-Sim`. **Branch count measured: 12** (`gh api repos/kozikosi/Football-Sim/branches --jq '.[].name'`), not the ten the handoff assumed.

---

## Verdict table

| # | Claim (20-Oct handoff) | What I measured | Command | Verdict |
|---|---|---|---|---|
| **1a** | `main` holds **29 root entries** | **58 root entries** | `gh api ".../contents?ref=main" --jq 'length'` → 58 | **NOW FALSE** |
| **1b** | Of seven governance docs, only `AGENTS.md` is on `main` | **All seven present**: `AGENTS.md`, `STATUS.md`, `COLLECTIVE-PROMPT.md`, `ONBOARDING.md`, `MASTER_GUIDE.md`, `master_task_list.md`, `GOVERNANCE-ROUNDTABLE.md` | `gh api ".../contents?ref=main" --jq '.[].name'` + grep each | **NOW FALSE** |
| **2a** | The candidate build is **404 on all branches** | **Present on `main`** (root index 29) and on `merge/v20-donor` (26), `gpt/openchamber-e2e-suite` (27), `gpt/council-reliability-scorecard` (29) | `gh api ".../contents?ref=<b>" --jq '[.[].name] | index("NFL Draft Simulator merged.html")'` | **NOW FALSE** |
| **2b** | `SIM-PLATFORM/` is **404 on all branches** | **Absent on all 12 branches** (checked every branch; 0 entries) — it lives only in a local tree | loop over `gh api .../branches` | **STILL TRUE (as to the remote)** |
| **2c** | All three E2E suites are **404 on all branches** | **Only `tests/madden-sim.spec.js` exists on any remote branch.** `openchamber-e2e.spec.js` and `openchamber-e2e-v2.spec.js` are on **no** remote branch (checked `main`, `gpt/openchamber-e2e-suite`, `gpt/council-reliability-scorecard` via the recursive tree API) | `gh api ".../git/trees/<b>?recursive=1" --jq '.tree[].path | select(test("openchamber-e2e|e2e-smoke|madden-sim"))'` | **PARTLY STILL TRUE** — `madden-sim` is present; the other two are absent remotely |
| **3** | `STATUS.md` line 16 reads "the merged result has no hash yet" | **STILL TRUE** — line 16 reads verbatim: *"**Merge in flight (reported)**: … the merged result has no hash yet. When it lands, this file's reference line moves to the merged hash…"* | `gh api ".../contents/STATUS.md?ref=main" -q .content | base64 -d | sed -n '14,18p'` | **STILL TRUE** |

---

## The finding that matters most — and the trap the batch warned about

**A build named `NFL Draft Simulator merged.html` IS on `main`, but it is NOT the build in our working tree.** Different bytes, different size:

```
$ gh api "repos/kozikosi/Football-Sim/contents/NFL%20Draft%20Simulator%20merged.html?ref=main" -q .content | base64 -d | shasum -a 256
40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd   (657,486 B)

working tree, same filename:
044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48   (656,746 B)
```

**This is exactly the failure the batch says has happened three times.** Someone reading "the build is on `main`" and then hashing the blob id, or reading the working tree and calling it "the repository", gets a **different build** either way. Stated precisely so neither error recurs:

- **Remote `main` carries the OLD merged build** — `40233d6b…`, 657,486 B.
- **Our working tree carries the NEW one** — `044d1759…`, 656,746 B (the hash every current note pins).
- **They are not the same file**, though they share a name. A claim about "the build" that does not say *which* of these two it means is unresolved.

**Corollary for `AGENTS.md`:** its new §2 "Build truth" table correctly pins the working-tree file (`044d1759…`, 656,746 B, measured 2026-10-22) — but it says nothing about `main` holding `40233d6b…`. If the deliverable artifact is produced from the working tree, that is fine; it should simply not be read as "the repo and the tree agree." **They do not.**

## One more measured correction to the handoff's own frame

- The handoff says "**all ten branches**"; the repository has **12** (`council/minimax-lane`, `council/owner-direction-2026-10-21`, `council-intake`, `feature/remove-guide-panel`, `gpt/all-time-player-source-intake-20261020`, `gpt/council-reliability-scorecard`, `gpt/council-tooling-player-validator`, `gpt/multisport-strategy-proposal`, `gpt/openchamber-e2e-suite`, `gpt/v21-preflight-review`, `main`, `merge/v20-donor`). Two branches appeared since 20 Oct, so any "on all ten branches" count is **STALE by construction**.

## Tags
- **VERIFIED (remote, `gh api`):** 58 root entries on `main`; all seven governance docs on `main`; build present on four branches at 4 distinct root indices; `SIM-PLATFORM` absent on all 12; only `madden-sim.spec.js` present among the E2E suites on any branch; `STATUS.md` line 16 verbatim; `main`'s build = `40233d6b…` / 657,486 B by proper base64-decode + sha256; 12 branches.
- **STALE:** "all ten branches" (now 12).
- **NOT CHECKED:** I did not diff *which* commits differ between the two builds, only their bytes and sizes; I did not check whether `Football-Sim-V22.html` (the named deliverable) exists anywhere; I did not inspect non-root paths for `SIM-PLATFORM` beyond the batched branches (I checked the root listing on every branch, which is where it would sit). No product file, protected constant, or other lane edited; nothing written outside `_agents/pickle/`.
