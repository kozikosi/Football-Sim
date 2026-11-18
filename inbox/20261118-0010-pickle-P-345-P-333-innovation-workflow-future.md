SPEAKER: pickle | ROLE: council | TASK: Part 9 — innovate on the workflow and the project's future | DATE: 2026-11-18T00:10Z
FOR: P-345, P-333

# Six proposals: four for the workflow, two for the platform, plus the 99-is-a-guide acceptance test

Each proposal: **problem → idea → how to check whether it worked → who can adopt it.** Grounded in what I re-ran
this round, not in slogans. Nothing here is a build.

---

## A · Workflow

### A1 — The round's own numbers decayed while the prompt was being written (PROBLEM: silent stale inputs)
**Problem (VERIFIED this session).** Part 8's stated λ band [0.3902, 0.4032) was measured against flex.json
sha `0a26d7c2…`; the live file at tip `65673a00` is `76c02c65…`, and the band is **empty** on the current table.
The prompt could not have known: the table moved after the number was filed. This is the D-3 defect one level up —
not "a receipt names a number the tool doesn't print", but "a prompt names a number whose *input* changed".
**Idea (council can adopt itself):** a one-line convention — every filed number derived from a repo file carries
the ref **and** the file sha in the same sentence (`[0.3902,0.4032) @ flex.json sha 0a26d7c2…, 14 Nov`), and every
re-run that finds a moved sha files a *correction* naming both. Already my lane's standing recipe; make it a
round rule. **Check:** at the next round close, grep every inbox filing for an 8-hex sha next to a measured value;
compliance rate is the metric, target 100 % for numbers that gate a decision. **Who:** council, in `inbox/README.md`
(MUSE owns it — propose, don't edit).

### A2 — Mega-rounds outrun the chat budget; unpushed work dies (PROBLEM: token timeout ≈ lost work)
**Problem (REPORTED from the round prompt; VERIFIED in my own start-of-chat).** Seats time out on ~30-minute
prompts; a timed-out chat loses unpushed work. My first act this session was a WIP commit for governance drift
that blocked `sync-base.sh` — the procedure saved it, but only because the gate exists.
**Idea:** split the ten-part round into one *part file* per item, each with its own FOR id and its own
"commit + push after this file" checkpoint; keep one index file with the completion bar. The existing
`one file per seat per item` rule already fits — the change is to the **prompt shape**, not the protocol. Pair it
with a session-end hook that runs `node tools/preserve.mjs check --fetch` and refuses a clean exit while the
seat's branch has local-only commits. **Check:** time-to-first-push and count of local-only commits at round close,
compared with this round (mine: first push ~6 min in, 2 rescued commits). **Who:** MUSE (prompt shape) and any seat
(hook proposal); no Owner decision needed for the push discipline.

### A3 — The prompt and the tool disagree about what "reviewed" means (PROBLEM: two review protocols)
**Problem (VERIFIED).** `tools/council.mjs` v8 `_agents/COUNCIL.md` §2b defines **continuous-trust** reviews:
2-seat floor, last review <10 % new, soft cap 8. This round's prompt still says "three confirmations by three
different seats = REVIEWED ✓✓✓" and Part 1 asks for "two independent verifications per comparison draft". Both
can be right only if the round says which governs.
**Idea:** one line in each prompt: "review state is whatever `node /tmp/council.mjs board` prints; the ✓✓✓ notation
is historical." **Check:** `node <tool> board` and the prompt's stated bar produce the same REVIEWED set for three
sampled items. **Who:** MUSE (prompt owner); council can adopt the reading immediately.

### A4 — A tripwire that can't catch the live case is not a tripwire (PROBLEM: tools proposed but unbuilt; falsifiers optional)
**Problem (VERIFIED).** The pin-watch case is live (deployed engine byte-identical to `d3bd81d2` while README/
CHECKSUMS name `4ca9a071`), and the tool is still unbuilt. Part 6 asks for falsifiers that **can fail on the tool**
— good design, but it should be general. **Idea:** every council tool ships with a `*-falsifier` that moves an anchor
and must exit 1 with the file and anchor named; a tool without one is INFERRED, never VERIFIED. **Check:** run each
falsifier on a clean `git archive` extract (Ernie's Part 6 rule): exit 1 and a named anchor, or the tool is not
accepted. **Who:** council; no Owner decision.

## B · The project's future (football first, basketball design-only, platform concept)

### B1 — The platform concept implies the engine is a priced-needs kernel, not a football simulator with a shell
**What it is (INFERRED from the Owner's own words + what I verified this round).** The Owner defines the basic
requirements (a need profile); the engine prices which roles can flex in. That is a *kernel* with three portable
parts — outcome softmax, duty gaps, one operator over lower bounds — and sport-specific **authored input tables**,
not sport-specific code. The six tier-2 rows the V2 formula cannot derive at all (§1 of my Part 8 filing) are the
concrete evidence: they are zero-ability/zero-guard rows, i.e. the operator has no vocabulary for them, not a
tuning failure.
**Why it matters:** if those six rows need hand-written exceptions in football, the "portable formula" does not
port, and basketball will be a second fork. If they can be priced by a need-profile entry, the same kernel runs
both sports. **Proof it's worth doing:** write a basketball need profile as data, run the *same* operator, and show
it prices a dual-role case (Hunter/Jokic) within the Owner's tier band with **zero new engine code**. That is a
morning's read-only prototype, not a build. **Who:** Architect owns the kernel design; council supplies the
measurement.

### B2 — Folds/replay are the platform's product payoff, not a nice-to-have (P-353)
**What it is.** Any play N inspectable; any counterfactual branch shares randomness wherever `(game,event,tag)`
matches; one log renders box score, recap, gravity and snap counts. **Why it matters:** it is the one surface that
generalises to any simulation with attributes — "what if I changed this decision" is the platform's demo, and it
falls out of the event-sourced design already approved. My 15 Nov filing found the smallest version worth building
first is **one dial with a live preview** — the same idea, one screen: turn a control, watch the board re-rank.
**Proof:** one seed, two branches with a common prefix, byte-identical replay up to the fork and a differing
suffix; if the prefix diverges, the keyed RNG claim is false. **Who:** Owner locks the feature; Architect builds.

### B3 · The 99-is-a-guide acceptance test (the measurement side of the Architect's formula work)
The Owner ruled the 99 rules a **guide** and the goal one beautiful portable formula. So "reproduce 99/99" is
explicitly the wrong bar. What a formula must show, in numbers, for the council to call it better than the
hand-priced table — five checks, one script, table sha in the header:

1. **Unsatisfiable-row count goes down.** Current V2 on the tip table: **7 structurally underivable** (six
   zero-ability tier-2 rows + C>OG guard-overshoot) and **2 mutually incompatible** (WR>NICKEL needs λ≥0.3902,
   FB>TE needs λ<0.2195) — measured this session (Part 8 §1). A better formula reduces that count; this is a
   fold-free count and the primary gate.
2. **Held-out pricing error ≤ the hand table's own.** Leave-one-role-out refit, Claude's protocol, same fold
   split; report mean OVR error and exact-tier count with N.
3. **Portability with no new hand rows.** Add one new sport role (SS2 or DL5) as a *data* row; the operator prices
   it inside the Owner's band without a new rule.
4. **No-arbitrage, restated.** The current law has 14 counterexamples (Part 7) — it must be deleted or restated
   before this can be a gate; do not grade against a law known to be false.
5. **One inspectable constant.** The Owner can move it and see the tier vector change in a preview; if a shift
   inside the admissible band leaves the vector identical (VERIFIED: digest `3d8c54` at 0.3902/0.3967/0.4032),
   the dial is invisible and fails this check.

**How to check:** one read-only script prints all five with the input table sha and the counts it grades; no
document may name a number the script does not print. **Who:** council writes the test (proposal here); Architect
builds the formula.

---

## Claim labels
**VERIFIED** — A1's sha change and empty band (re-run, Part 8 §1/§5); A3's two protocols (read both files this
session); A4's live stale pin (Ernie's manual check, my re-read of the refs); B3's counts (re-run).
**REPORTED** — A2's seat timeouts (the round prompt says so); B1's Owner need-profile model (verbatim note, read).
**INFERRED** — all five design judgements in B, and A2's proposed fix; none is measured as a workflow outcome yet.
**UNKNOWN** — whether the six zero-ability rows are intentionally hand-priced guide exceptions.

**BLOCKED** — none for filing; B1's prototype needs the Architect's kernel input format.
**OPEN (Owner)** — P-353 as a feature; the 4-3/3-4 target; the value label; all as named in the round.
**NEXT** — (1) add the sha-in-sentence convention to `inbox/README.md` via MUSE; (2) put B3's five checks in front
of the Architect before the yards node; (3) prototype B1's basketball need profile as data.
