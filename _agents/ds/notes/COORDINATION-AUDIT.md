# COORDINATION-ARCHITECTURE AUDIT

**SPEAKER: DS | ROLE: council member | TASK: coordination audit for Pickle | DATE: 2026-10-22**
**Build referenced throughout:** `NFL Draft Simulator merged.html` sha256 `044d1759e01ac99b…` (656,746 B), working tree.
**Labels:** VERIFIED = measured by me with a command shown · REPORTED = another seat's claim, not re-measured · INFERRED = my judgement.

---

## 1. The actual map — what coordinates what

### The people layer

| Role | Who | How they are reached |
|---|---|---|
| Owner | one human | everything |
| Architect / sole implementer | Claude | **a prompt the Owner pastes** — there is no other channel |
| Council | 16 lanes under `_agents/`, 10 reachable OpenChamber sessions | `session.send`, one prompt at a time |
| Kilo seats | OR, LK, VL, Beam and others | **cannot be reached by any council session**; they report no `session.send` (REPORTED, consistent across five seats) |

### The document layer (VERIFIED — sizes on disk)

| File | Size | Role | State |
|---|---|---|---|
| `AGENTS.md` | 16.2 KB / 167 lines | the constitution | live |
| `COLLECTIVE-PROMPT.md` | 20.9 KB / 132 lines | standing prompt for Claude | live |
| `ONBOARDING.md` | 10.6 KB / 86 lines | first paste for a new seat | live |
| `STATUS.md` | 8.6 KB / 39 lines | build hash + roles | **stale** — l.16 says "no hash yet" |
| `SUBMISSIONS.md` | 132.6 KB / 1,535 lines / 16 sections | proposals | clean: 16 sections, 16 distinct S-numbers |
| `COUNCIL-BULLETIN.md` | 829.0 KB / 5,144 lines | conversation | 230 entries, **173 distinct → 57 duplicated M-numbers** |
| `CHRONICLE.md` | 177.0 KB / 223 lines | dated log | live |
| `master_task_list.md` | 33.5 KB / 117 lines | task ledger | live |
| `DECISIONS.md` | 12.4 KB / 175 lines | the ruling record | created 21 Oct; already carries a superseded entry and (until I fixed it an hour ago) a duplicate D-007/D-008 |
| `V22-Suggestions.md` | 155.7 KB / 2,264 lines | the change order | 186 items; P0/P1/P2 now collision-free; P10/P11 still collide |

### The task layer
GitHub Project 1 (`kozikosi/projects/1`) — issues #7–#18, six fields each. This is the **only** coordination surface with enforced structure, and the council does not use it for work distribution.

### The configuration layer (VERIFIED)
- `.claude/` — **absent**, although Claude is the Architect and sole implementer.
- `.kilo/kilo.jsonc` — 60 bytes, `{"$schema": …}` and nothing else.
- `.openchamber/` — 8 files, all screenshots. No config.
- `biome.json` — present and detailed; **the Biome binary is not installed anywhere** (not on `PATH`, not in `node_modules/.bin`, not global, not in `package.json` devDependencies).

**INFERRED:** the coordination that works is the coordination that is *written into a file a human relays*. Nothing else has enforcement.

---

## 2. Top problems, ranked by cost

### P1 — `main` is one revision behind the build every specification targets (HIGHEST)

| Where | sha256 | Size |
|---|---|---|
| `main` (fetched via `gh api …?ref=main`, base64-decoded and hashed) | `40233d6be00e987c…` | 657,486 B |
| working tree | `044d1759e01ac99b…` | 656,746 B |

Every V22 item is cut against `044d1759`; the repository serves `40233d6b`. A reader who trusts the repository — which `AGENTS.md` tells them to — builds against the wrong file. It is not hypothetical: the build has moved twice today under edits by other sessions.

### P2 — the record is larger than any model can read (VERIFIED)

Ten documents a compliant new session is told to read total **1,396.5 KB ≈ 357,000 tokens**. The bulletin alone is 829 KB, larger than every model's working context.

Consequence, measured: the council **re-decided "one named coordinator per batch" after M-306 had already settled it**, and I filed `SAM`'s 5-for-32 as a defect because I could not see the ruling that was already in the record.

### P3 — identifiers collide, so a citation cannot be trusted (VERIFIED)

- Bulletin: 230 entries, 173 distinct → **57 duplicate M-numbers**.
- Two different entries are both `M-100` (Glyph's and Beam's). One seeded a hash error that propagated to three seats and to me.
- `V22-Suggestions.md` carried 40 P1 headings for 28 items until today; **P10/P11 still carry 25 colliding labels** (REPORTED by BOC; I re-measured P0/P1/P2 clean).
- `DECISIONS.md` gained a duplicate D-007/D-008 within an hour of existing — **my own error**, fixed.

### P4 — there is no "what is true now" file

State lives in `STATUS.md` (stale), `DECISIONS.md` (new, partial), the bulletin (unreadable), and the GitHub Project (structured but unused for state). Nothing answers, in one screen: which build, which rules, what is open.

### P5 — dispatch is assignment-shaped, and the harness drops work silently (VERIFIED)

Of ten briefs I dispatched this round, **two died to rate limits** (Pickle, MiMo) and were recorded as dispatched. Nine seats sat idle while two briefs evaporated. The Owner's new rule — *suggest work; let idle seats pick it up* — addresses this directly.

### P6 — "is it in the repository" was answered three times from a checkout

`git cat-file HEAD:file` answers about the current branch. The council (me, three times) reported local state as repository state. The cost was three wrong claims about `main`, and a candidate build believed absent when it was present — and now the reverse: believed current when it is one revision old.

---

## 3. Changes worth implementing — five, not fifteen

| # | Change | Effort | Expected benefit |
|---|---|---|---|
| 1 | **`STATE.md` at root, ≤60 lines**, regenerated at the end of every round: build sha256 + size + path · what is ruled · what is open · last verified run and its command. Sessions read this instead of the bulletin. | one page, one script | new-session read falls from **~357k tokens to ~2k**; the stale-`STATUS.md` class of error disappears |
| 2 | **One identifier scheme, never reused**: `R<round>-<seat>-<n>`; retired, never renumbered; one command audits uniqueness. | one paragraph in `AGENTS.md` + one shell check | 57 duplicate M-numbers → **0 checkable**; a citation becomes a lookup instead of an interpretation |
| 3 | **Publish a work pool, never assign.** A coordinator may post items; a seat claims by posting a line. Direct addresses only for work *about that seat's own output*. | already the Owner's rule (D-009); needs one bulletin section | recovers the 2-in-10 briefs that die silently; idle seats see the pool |
| 4 | **`verify.sh`** — one command that re-hashes the build, checks every pin in `STATE.md` and `V22-Suggestions.md`, and prints pass/fail per pin. | small | kills the "main is one revision behind" failure and the whole "which hash are we talking about" class |
| 5 | **Push `main` to the build under specification, or stop calling `main` the record.** | Owner action | P1 above, closed |

Two supporting items, cheap: install Biome (`npm i -D @biomejs/biome`) so `biome.json` is not decorative, and add `.claude/` so the implementer has a config surface like the other two harnesses.

---

## 4. Rejected ideas

- **Splitting the single HTML file.** Prohibited, and the merge is mid-flight.
- **Deleting or rebuilding the bulletin.** The Owner's #15 rule forbids losing relied-upon comments. Partition it (Ultra's design is ready); do not delete it.
- **A permanent role per agent.** Availability varies by the hour; a role that cannot be filled is worse than a pool.
- **More governance documents.** The failure is volume, not absence. Five documents at 1.4 MB already exceed what any reader can hold.
- **A council "coordinator" seat with authority.** Two coordinators have now been appointed in three days and both produced duplicate numbering. The project that has worked is the one the Owner maintains.

---

## 5. What I could not verify

- **Whether Claude has Figma, Biome or Mermaid.** No `.claude/` config exists on this machine; the Owner says he set it up. I can only report that the council cannot run Biome (no binary) and cannot reach Figma.
- **Whether any session can dispatch a Kilo seat.** Five Kilo seats report they cannot receive; I did not test their harness.
- **What the 70 commits added to `origin/main` tonight were reviewed by.** They post-date my last measurement of the repository.
- **Whether `SIM-PLATFORM/` and the E2E suites are still absent from every branch.** My earlier 404 finding predates the push; it must be re-measured before it is cited again.
- **The real number of live sessions.** 10 reachable, 16 lanes on disk, 4 permanently archived.
- **Whether the Owner's relay of a prompt to Claude is the only path.** `COLLECTIVE-PROMPT.md` implies it; nothing on disk contradicts it; I have no way to test it.

---

## One paragraph for the Owner

The council does not have a coordination problem, it has a **volume problem and a truth problem**. Volume: 1.4 MB of record that no reader can hold, so settled questions get re-decided and measured facts get re-measured. Truth: the repository now serves a build one revision behind the one every specification targets, and there is no file that says so. Both are fixable with a one-page `STATE.md`, a `verify.sh`, and one push — and none of them requires a new rule about how agents behave.
