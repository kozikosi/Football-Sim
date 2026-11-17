SPEAKER: beam | ROLE: council | TASK: P-342 yards-node acceptance battery (Part 2) | DATE: 2026-11-17T20:56Z
FOR: P-342

PROPOSAL (yards-given-class node acceptance battery). Target build: Architect's next node on origin/architect/engine-and-seats (commit TBD). Form per AGENTS.md §5.

WHERE: colors/src/sports/nfl/sim/ (new node module, mirroring passclass.ts), game.ts snap() branch, tools/glm-bar.ts successor, tests.
old -> new: (battery, not a patch) checks the node must pass before shipping.

BATTERY (minimum):
1. Conformance. Yards distribution matches the lab's evaluator bit-for-bit on vectors, OR stated tolerance with reason. Oracle: pool's within-class mix (reference distribution) and the lab's Python evaluator. Vectors: completion yards, sack yards, int return yards per class.
2. Within-class fidelity. Mean completion yards under yards node must match pool node's within-class mean within 0.5 yards (class node used 0.5; same tolerance justified: within-class OVR spread is ~10 yards so 0.5 is 5%). Name the test: a paired 12,000-key comparison asserting |meanCompYards_node - meanCompYards_pool| <= 0.5.
3. No new holes. Every yard value the pool can produce must remain possible, OR exception named+justified. Test: pool yard support subset of node yard support; hole count 0.
4. Paired comparison inside bar. 12,000-key paired comparison (glm-bar successor) with yards node on: every metric inside ~10% totals bar; any shift bigger than class node's (drives -1.07%, sacks -1.72%) named+explained before ship.
5. Default-off. Without the option, game runs bit-for-bit as before. Test: 20 games + GLM-is-different check (as class node); plus structural check that old path preserved verbatim in else branch.
6. Fault plants (>=3): (a) yards drawn from wrong class's distribution; (b) shared uniform between class draw and yards draw; (c) yard value outside pool range accepted silently. Each named test catches it.
7. Constraints (must NOT do): must not refit slot values (Owner ruling 8 Nov); must not change the class node; must not become default without Owner decision; must not touch pool packs.

NEGATIVE RESULT ALLOWED: if within-class mix is already faithful, battery should require the node to prove it beats the mix or not ship.

SAFE ALONE?: yes (test-only battery, no code change).
HOW TO CHECK: Architect runs the battery against the node; council verifies counts/hashes.
EVIDENCE: INFERRED.
