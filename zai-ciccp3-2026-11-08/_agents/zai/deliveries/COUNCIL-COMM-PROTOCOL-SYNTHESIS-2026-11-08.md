# CICCP-3 — the council communication protocol, revision 3

**From "agents that write better" to "handoffs that cannot lose state"**
Synthesis of five council reports, grounded in this repository · 2026-11-08 · English only
Author: Z.ai · seat ZAI · High Councillor · written to my lane at the Owner's direct instruction

---

## 0 · Bootstrap receipt (what was actually read this session — VERIFIED)

- `council/zai` (shallow): `_agents/zai/START-OF-CHAT-ZAI.md` (w55 copy, REV 15 — the root `_agents/zai/START-OF-CHAT-ZAI.md` does not exist on the branch, and the fallback `main:z-core/_agents/zai/…` does not exist either; the newest wave package copy was used, per START §1 fallback rule 2), `_agents/zai/ZAI.md`, `_agents/zai/END-OF-CHAT-ZAI.md` (w55), `inbox/README.md`, `_agents/PRIORITIES.md`, root `AGENTS.md`, `CLAUDE.md`, `CLAUDE_DOMINANT_WORKFLOW.md` (header).
- `council/base` (shallow): `AGENTS.md` §1–§5 — the constitution.
- The Owner's five reports (GPT CICCP; DS CCP-2 critique; Qwen CICCP v2.0; Gemini MAC-P; Groq CCIP).

Every claim below marked **VERIFIED** was read in those files just now. The research findings the reports cite (MAST, Handoff Tax, Routed Graph Handoff, Cognition, AgentAsk, Decomposition Vulnerability, Beyond Message Passing, Karpathy, Anthropic, OpenAI, Fowler/Thoughtworks, Google) are **REPORTED** — four independent reports agree on them, I did not re-run the studies. Where a report contradicts the repository, the repository wins. Where Gemini's MAC-P describes a TypeScript engine ("76 Pancakes", `src/engine/`), that codebase is not this repository (REPORTED): its generalizable rules are translated, its file paths are not used.

---

## 1 · Executive verdict

1. **All five reports converge on one inversion: language style is decoration, handoff structure is load-bearing.** GPT's original CICCP put "Council Technical English" in Pillar 1. Each of the four critiques independently demotes it — DS to P4 of 7, Qwen to a human-facing track, Groq to "default style, not the system".
2. The cited evidence is consistent on *why*: multi-agent failures are dominated by **lost state at handoff** — execution order, preconditions, goal invariants — not by clumsy sentences (REPORTED: MAST 36.9% inter-agent misalignment across 1,642 traces; Routed Graph Handoff: 76% of failures are handoff ambiguity; Handoff Tax: structured state weakly dominates summaries, and full transcripts never sit on the cost–quality frontier — 3.0× cost at depth 3, K=18).
3. **The decisive finding for this council: most of what the reports recommend is already our constitution.** Evidence labels (`VERIFIED / REPORTED / INFERRED / UNKNOWN`) are an evidence-type contract. The seatbelt + one-worktree-per-seat + never-stash + only-the-Architect-builds is exactly "parallel intelligence, single-threaded writes". The `inbox/README.md` WORK block is a handoff schema. The three-review chain is edge validation. We do not need a new system; we need to **finish** this one.
4. Three gaps are real and cheap to close: (a) **no `goal_invariant` anywhere** — decomposition can silently drop the Owner's verbatim constraint; (b) **dependencies and preconditions live in prose** — every reviewer must reconstruct them; (c) **decisions have more than one authoritative home** — I found live drift today (§8): the constitution says two reviews confirm an item, the queue and inbox formats say three.
5. **Routing beats uniformity**: full structured schema for dependency-chain work; CTE prose for open exploration; full transcripts never as handoff (`V22-Suggestions.md … never read it whole` is already this law, VERIFIED).
6. Qwen's strict JSON-only seat-to-seat track is **rejected** (git + human-readable markdown *is* our transport; structured markdown fields give the same parseability). Its compaction rule and critic-loop are adopted. Groq's CCIP is the closest to adoptable and is absorbed, except where our house rules already go further. Gemini's discipline is kept as far as it matches this repo.
7. §10 lists the five changes this synthesis asks of the Architect — each bound to a file only he controls — and `PROMPT-FOR-CLAUDE-CICCP3-2026-11-08.md` (same delivery) is the polite request the Owner can relay verbatim.

---

## 2 · The five inputs, one line each

| Report | Core move | Verdict in this synthesis |
|---|---|---|
| **GPT · CICCP** (Nov 7) | Seven pillars, CTE first; 4-layer context; task packet; AGENTS.md-as-map (~100 lines); mechanical enforcement; examples over rule lists | Skeleton kept; language demoted to a style layer |
| **DS · CCP-2** (Nov 7, in Chinese) | Structure-first reorder; six-layer stack; `goal_invariant` / `depends_on` / `write_scope`; edge validation at every handoff; failure-class metrics | **Backbone adopted** — the reorder is correct and the evidence base is the strongest of the five |
| **Qwen · CICCP v2.0** (Nov 8) | Dual-track (JSON machine / STE human); context compaction before handoff; Team-of-Rivals propose→critique→revise→approve; post-mortem → harness update | Compaction + critic loop adopted; JSON-only rejected; "no video" correction adopted |
| **Gemini · MAC-P** | Domain-grounded ENTE (≤25/20 words, active voice, zero ambiguous pronouns, name exact modules); mandatory Mermaid for architecture; feedforward/feedback gates | Discipline adopted; file paths not ours (REPORTED — different codebase) |
| **Groq · CCIP** (Nov 7) | Pragmatic seven pillars; 80% STE with preserve-terms clause; fewer agents + progressive context; soft sensors, not gates; risks table | Absorbed; our house rules already exceed it in enforcement |

**Where they disagree, and how it settles:**

| Disagreement | GPT | Others | Settled |
|---|---|---|---|
| Priority of language | Pillar 1 | P4 / style layer (DS, Qwen, Groq) | Structure first — DS's reorder stands |
| Seat-to-seat format | One template everywhere | Qwen: JSON-only; DS/Groq: route by task | **Routing** (§3-D2) |
| Explainer videos | Enthusiastic | Qwen: deterministic step-through diagrams instead | No video; diagrams/HTML (product law: no paid APIs) |
| Sub-agents | Pro specialization | Groq (citing Anthropic): fewer agents, ~15× token tax for multi-agent | Keep the no-assignment queue; no new always-on specialists |

---

## 3 · The three debates, settled

### D1 — Is the problem language or structure? **Structure.**
The failures this council actually had (VERIFIED, base `AGENTS.md` §4: 339 modified files in one shared tree, a commit that clobbered `AGENTS.md`, force-push over two seat branches, two different files under one build name) were **all** structural: lost invariants, stale copies, split authority. Not one was caused by a sentence being too long. The research base says the same at scale (REPORTED, §11). Language remains worth one guidance sentence (L5), nothing more.

### D2 — One handoff format, or routing? **Routing.**
REPORTED: schema-aware handoffs beat schema-unaware ones at every compression ratio, but rigid typed graphs *lose* 7–18 pp on iterative/conditional tasks, and a ~155-token router that picks the format earns +12.7/+8.7 pp. Council translation:

| Work shape | Handoff format | Where it lives today |
|---|---|---|
| Patch / dependency chain / P0 directive | Full WORK schema v2 (§5) | `inbox/README.md` WORK block |
| Open investigation, architecture, hypotheses | CTE prose + mandatory evidence label + artifact | lane `deliveries/`, bulletin entries |
| Cross-session state | Decision ledger, one authority per class, supersession | Architect to designate (§8) |
| Owner decision request | Two-line summary + pointer + artifact | chat + UPDATE-README |
| Anything at all | **Full transcript: never** | already law: "never read it whole" |

### D3 — More agents or fewer? **Parallel minds, one builder — which is already our constitution.**
REPORTED (Cognition, production-validated): parallel *writes* make conflicting implicit decisions that no amount of better prose can reconcile; only permissions and ordering fix them. Our machinery already implements this: shared tree read-only, worktree per seat, add-by-path, never stash, seatbelt refusing protected files, only the Architect builds, High Councillors barred from `AGENTS.md` / `CLAUDE.md` / `PRIORITIES.md` / `tools/` (all VERIFIED, base `AGENTS.md` §1, §4). What is missing is only the *declaration*: a work item never states its intended blast radius. That is the `WRITE_SCOPE` field.

---

## 4 · The six layers, mapped onto the council we actually have

| Layer | Already exists here (VERIFIED) | Gap | Requested change |
|---|---|---|---|
| **L1 Write boundary** | shared tree read-only; worktree per seat; never stash / never force-push; add-by-path; seatbelt refuses protected files; only-the-Architect-builds; High Councillor edit limits | `write_scope` is enforced by hooks but never *declared* in the work item | add `WRITE_SCOPE` to WORK + tasks JSON |
| **L2 Handoff schema** | `inbox/README.md` WORK block (SPEAKER / FOR / WHERE / old→new / WHY / SAFE ALONE / HOW TO CHECK / EVIDENCE); `tasks/<id>.json` (evidence[], verification, owner_decision); wave intake ledgers; HANDOFF-TO-CLAUDE packages | no `goal_invariant`; dependencies in prose; `REPRODUCTION` and `UNCERTAINTY` unenforced | six new fields (§5) |
| **L3 Edge validation** | three-review chain ✓✓✓; "reviewing means trying to break the claim"; test orders by uninvolved seats; "measure, don't guess" | reviews interrogate the artifact, not the invariant chain; nothing compares copies of the same rule | five questions (§6) |
| **L4 Semantic contract** | labels defined once; naming law binds names to hashes; `CONSENSUS_BLOCK_FORMAT.md` | decisions live in several homes; drift survives (§8) | one authority per decision class + supersession rule |
| **L5 Language** | English only; SPEAKER header; plain-recap style law; the whole repo is already terse | no written style guidance | one CTE sentence (§10.3) |
| **L6 Human formats** | the product **is** an interactive HTML artifact; evidence screenshots; UPDATE-READMEs; explanations live in the Guide | investigation explorers (calibration etc.) not yet defined | allowed as lane-only, read-only artifacts; never product state |

Principle (from DS, endorsed): **a lower layer may not be faked by a higher one.** Fluent CTE prose cannot substitute for a missing `GOAL_INVARIANT`; a reviewer who finds the field missing asks for it rather than inferring intent.

---

## 5 · WORK schema v2 (the only new template)

Extends the existing WORK block; nothing existing is removed. New fields marked ★. Required for **P0** items; optional elsewhere (Architect's call, per the prompt).

```
SPEAKER: <seat> | TASK: <task> | DATE: <UTC>
FOR: <P-id>
GOAL_INVARIANT: ★  the Owner's verbatim line(s) this work serves (quote, cite intake ledger §)
WRITE_SCOPE:    ★  READ_ONLY | LANE_ONLY | ARCHITECT_REQUIRED
DEPENDS_ON:     ★  <P-id / task id / file#anchor / decision — one per line; "none" is a value>
PRECONDITION:   ★  what must be true before this is applied (command that proves it)
WHERE: <anchor string, not just a line>
old -> new: <exact text or fenced snippet, ≤150 lines; longer: path + commit in lane>
WHY: …
SAFE_ALONE: yes/no
HOW_TO_CHECK: <command + expected output>
REPRODUCTION:   ★  full command incl. seed/build/file version, so a reviewer can re-run
UNCERTAINTY:    ★  limits, unknowns, what was NOT run ("not run: …")
EVIDENCE: VERIFIED | REPORTED | INFERRED | UNKNOWN
```

The schema deliberately stays markdown: git is the transport, files are the protocol, and every field remains readable by a human in a terminal — which is what killed the JSON-only alternative.

---

## 6 · The reviewer's five questions (edge validation, appended to REVIEW)

1. **Invariant:** quote the `GOAL_INVARIANT` and check it against the intake ledger — does the work still serve the Owner's verbatim item?
2. **Dependencies:** were `DEPENDS_ON` / `PRECONDITION` *run*, not assumed?
3. **Terms:** do names and labels match the single authority (naming law, evidence-label definitions)?
4. **Evidence:** if `EVIDENCE: VERIFIED`, is the receipt actually in the text? Otherwise is the label honest?
5. **Reproduction:** can I re-run this from `REPRODUCTION` alone? If not — ask, do not infer.

These run **per handoff**, before three reviews conclude — the existing "state the weakest point" stays. Purpose: intercept state loss at the edge, where the research says it propagates (REPORTED: AgentAsk — minimal clarification, <10% cost, up to +4.69% accuracy).

---

## 7 · Verification and metrics (light — the ledger is the metric)

- The house labels **already are** the evidence-type contract DS asks for. Keep them; add nothing.
- Add (optional, to `tasks/<id>.json` + `tools/check-tasks.mjs`): `goal_invariant`, `depends_on[]`, `failure_class` (`data-gap | signal-corruption | referential-drift | capability-gap`), `caught_at_hop` (1 = review caught it, 2 = test order, 3 = Owner/production). `caught_at_hop` directly measures the council's interception power; `failure_class` aligns metrics with the dominant failure modes instead of token counts.
- Cost anchor moves from "per verified finding" to **per verified handoff** — which is what `HOW_TO_CHECK` + receipts already approximate.

---

## 8 · Live drift found while grounding (VERIFIED today, with sources)

1. **The review count disagrees with itself.** `council/base` `AGENTS.md` §1: *"after two confirmations it is REVIEWED and goes to the Architect"*. `_agents/PRIORITIES.md` and `inbox/README.md`: **three** reviews by three different seats = `REVIEWED ✓✓✓`. Two constitutions, one invariant, two numbers — a reviewer following either is "correct". This is precisely the referential-drift failure class the synthesis targets: the rule's authority is split, and no edge check compares copies. One line in `AGENTS.md` fixes it.
2. **Two histories, one truth question.** Base `AGENTS.md` §2 (VERIFIED): seat branches descend from root `474eb52`, `origin/main` from `268fd56`, they "do not merge cleanly", and truth for some documents (e.g. `CLAUDE-START-HERE.md`, logo folders) lives only on `main`. Until the Architect's reconciliation merge, "where does truth live" must be answered per file — which is the L4 gap in one sentence.

Neither finding is a criticism; both are evidence that split authority drifts silently, which is what this protocol exists to prevent.

---

## 9 · Not adopted, and why (each overridable by the Owner in one line)

- **JSON-only seat-to-seat protocol** (Qwen Track A) — our transport is git + human-readable files; structured markdown gives the same parseability without a second format to maintain.
- **MCP / A2A runtime protocols** — a repo-sharing council needs neither; protocol overhead without benefit (Groq and DS agree).
- **Explainer videos** (Karpathy's 4th rung as GPT read it) — deterministic step-through diagrams / self-contained HTML instead; no paid narration (product law).
- **Hard ASD-STE dictionary or word caps** — 80% style guidance only; precision outranks compliance; all five reports converge here.
- **Always-on subagent swarms** — the no-assignment queue already wins; the multi-agent token tax (REPORTED ~15×) buys nothing here.
- **Rigid typed dependency graphs everywhere** — route by task shape (D2); rigid graphs lose on iterate/conditional work.

---

## 10 · The five moves, in order (what the Owner relays to the Architect)

1. **`inbox/README.md` — WORK schema v2** (§5): six new fields; required for P0.
2. **`inbox/README.md` — REVIEW gains the five questions** (§6).
3. **`AGENTS.md` — one routing paragraph** (≤4 lines, from D2's table) **+ the review-count fix** (§8.1: one number, stated once). One CTE style sentence rides along: prose ≈80% ASD-STE style; technical terms, identifiers, numbers and uncertainty always preserved; precision outranks style.
4. **`tasks/*.json` + `tools/check-tasks.mjs`** — optional fields: `goal_invariant`, `depends_on[]`, `failure_class`, `caught_at_hop`.
5. **`CLAUDE.md` + `claude/00-READ-FIRST.md` — compaction law**: the handover doc is a compacted decision log (hypotheses · evidence · open questions), never a transcript.

Constraints honored throughout: `AGENTS.md` stays ≈100 lines (detail goes to a sibling doc it links); protected constants untouched; add-by-path; seatbelt respected; English only; nothing new is assigned to any seat.

---

## 11 · Research base (REPORTED — as cited by the four critique reports)

Karpathy (2 Oct 2026 post: four understanding formats; "80% of the way to ASD-STE100") · MAST / Cemri (NeurIPS 2025: 1,642 traces, 14 failure modes, 36.9% inter-agent misalignment) · Handoff Tax (structured state weakly dominates; full transcript 3.0×; K* ≈ 12–13) · Routed Graph Handoff (EMNLP 2026: 76% handoff-ambiguity failures; schema-aware > schema-unaware; rigid graphs −7–18 pp on iterate/conditional; ~155-token router ≈ +12.7/+8.7 pp) · Cognition (Apr 2026: parallel intelligence, single-threaded writes) · Decomposition Vulnerability (2026: goal invariants decay down decomposition chains) · AgentAsk (ACL 2026: four edge-error classes; minimal clarification <10% cost → up to +4.69% accuracy) · Beyond Message Passing (Mar 2026: protocols under-serve clarification/alignment/validation) · Anthropic context engineering (context rot; just-in-time retrieval; compaction ≠ memory ≠ tool-clearing) · OpenAI Harness Engineering (Feb 2026: AGENTS.md as map; mechanical enforcement; error messages that teach) · Fowler / Böckeler (Apr 2026: feedforward guides vs feedback sensors; computational over judgmental checks) · Google ADK (Dec 2025: scoped sub-agent context) · MCP vs A2A comparisons (2026).

None re-verified in this session; they enter the council's record as REPORTED and are relied on because four independent reports agree on them.

---

## 12 · Delivery receipt

- This file: `_agents/zai/deliveries/COUNCIL-COMM-PROTOCOL-SYNTHESIS-2026-11-08.md`
- Companion prompt: `_agents/zai/deliveries/PROMPT-FOR-CLAUDE-CICCP3-2026-11-08.md`
- Zip (the push — this sandbox cannot push): `zai-ciccp3-2026-11-08.zip`, hashes in `CHECKSUMS.txt` and in the chat's END-OF-CHAT receipt
- Lane updates: `_agents/zai/ZAI.md` rewritten; `_agents/zai/END-OF-CHAT-ZAI.md` rewritten · no product bytes touched · no build this session (the directive was synthesis)

— Z.ai · read → verify → synthesize → verify → zip → link.
