# Ideas that agree with the Owner's questionnaire answers (2026-11-10)

**Purpose:** the Owner asked for a list of good work and ideas from the council that *seamlessly agree* with everything he said in the questionnaire (verbatim Q&A at `_agents/muse/deliveries/questionnaire-flex-derivation-QA-2026-11-10.md`). This is the input to the convergence conversation (Claude + Z.ai + Owner). Items that conflict are listed at the end as filtered out, so nobody re-proposes them.

**The Owner's direction in one line:** a fun tax that stings but never breaks reality; the 99 rules are his picture of reality but the formula does NOT have to match them; beautiful and portable wins; OVR may be the only true data input (no per-player str/speed, no intangibles); user sees simple integers, no labels; no named exceptions; no floor; C>OT via the value ladder; adjustable blend between the two ingredients; mostly forbidden + some formula-priced moves, with fluidity and dual positions; basketball deferred; the merge is undefined; Claude + Z.ai + Owner converge by talking; "done" is a feeling that can be adjusted.

## The formula's shape

1. **Z.ai's ZAI-D1 ability layer** — the formula looks at what the new job demands and what the source position can do; the price is set by the biggest gap plus a discounted bit for the rest. No exceptions, no D term, 0 fiat rows. **Agrees:** no named exceptions (Q9); positional requirements, not attributes (Q2/Q14); portable (Q3/Q5). **⚠ TWO CAVEATS — NOTE WHEN PRESENTING TO EVERYONE (Owner, 2026-11-10):** (a) it currently carries the cross-side floor — the floor is OUT per Q10, but Inkling measured it is inert in this family, so dropping it changes nothing; (b) the three score changes include the C PBLK pair — the pair mechanism is OUT per Q12, but the guard now handles C>OT, so the pair may not be needed.
2. **Claude's guard / value ladder** — a flex can't pay less than the break-even value difference, from slot weights alone (no fitted constants, no per-player data). **Agrees:** Q11(a) (the ladder explains C>OT); minimal data (Q2); portable — moves automatically when weights change (Q3). **⚠ CAVEAT (Owner, 2026-11-10): the Owner will NOT provide set weights for other sports like he did for football — do NOT assume set weights exist in the formula.** The guard as formulated reads slot weights; for other sports those weights do not exist and will not be provided. The value layer must work without Owner-provided weights for other sports — the weights would need to be derived (from the engine, from OVR, from positional concepts) or the value layer needs a different form. This is a constraint on the guard's portability, not a rejection of the guard for football.
3. **Claude's merged shape** — compute the exact penalty underneath, show a simple integer on top; a soft-max exponent `k` as the adjustable blend. **Agrees:** crazy math hidden + simple integers shown (Q4); adjustable blend, most malleable (Q7). **Caveat:** his tier *labels* (Free/Slight/Real/Heavy) are out per Q4 — show just the number.
4. **Inkling's merge structure — max(ability, guard)** — the price is whichever ingredient costs more. **Agrees:** one endpoint of the adjustable blend (Q7); the guard collapses C>OT (Q11a). **Caveat:** the 3 anti-D pins are out per Q9 — the structure agrees, the pins don't.
5. **Gravity — a player who draws double teams makes teammates better; it might be part of the formula itself (Owner, 2026-11-10, follow-up Q3: NOW).** Offensive gravity (a WR1 / best player / midfielder drawing double teams) and defensive gravity (a rim protector deterring shots, a Revis-island corner). **Agrees:** the value of a position includes the attention it draws (Q8); gravity is a convergence topic now, not a post-derivation feature. **Open:** how gravity is measured and whether it enters the flex price, the guard, or the engine's team value. Filed as P-335 (active now).

## How the two ingredients mix

5. **The adjustable blend (the Owner's idea, already measured by the council).** The council measured all three ways to combine ability and value: take the worse one (Inkling, max, 96/99), add them (Claude, sum, 80/99 under his layer), multiply them (Super, multiplicative, 50 exact). So the tunable ratio the Owner asked for has evidence behind it — it is not a guess. The blend parameter is the thing to tune; the endpoints are already measured.

## What to delete

6. **The cross-side floor — delete it.** Inkling measured it is load-bearing nowhere in the merge family (every cross-side row already prices ≥ 6 from ability); the Owner calls it an ugly appendage (Q10). Delete.
7. **SCOPE — delete it.** A lookup table that silently broke the DL5 job (Inkling's finding; confirmed by VL and Z.ai). **Agrees:** elegant formula, no tracking extra tables (Q12).

## Portability (minimize new-engine work)

8. **Z.ai's job-first procedure (§4.1, NEED-support).** Author the jobs first; the duties are whatever the jobs demand. **Agrees:** derive new values from positional concepts (Q2); minimize new-engine work (Q5).
9. **Glyph's G-PORT sport-pack architecture.** Swap the sport pack (positions, duties, NEED/HAVE, weights) and the same formula runs. **Agrees:** beautiful and portable (Q3/Q5). **Caveat:** his football pack is uncalibrated (60/99) — a framework, not an answer yet.
10. **Glyph's directional-equivalence policy map.** An explicit map for which moves are allowed one-way (and which are forbidden), as general rules — not per-row exceptions. **Agrees:** fluidity + prohibition (Q15).
11. **Roles emerge from the formula — do NOT codify NEED-first authoring as a system rule (Owner, 2026-11-10).** The Owner would have hoped the DL5-as-blitzer had naturally emerged from the formula; he didn't like having to specify it. He does not want this type of rule codified in the system — but he is always happy to clarify things when needed. **The principle:** a new job's character should fall out of the formula (from positional concepts + the data), not from a rule that says "author new jobs as NEED profiles first." His clarifications are guidance for the builders, not system rules. (This revises the earlier listing of IDEA-3 as an agreeing idea — IDEA-3 as a codified rule is out.)

## How to test it

12. **Leave-one-role-out testing (Inkling, Claude).** Test the formula on positions it hasn't seen, to check it generalizes. **Agrees:** portable (Q3); "done is a feeling that can be adjusted" (Q20) — LOO gives a check that the feeling will hold up in a new sport.
13. **Position testing — test positions NOT in the game (Owner, 2026-11-10, endorsed "especially").** There are still plenty of football positions not in the game. Concrete test: big nickels (SS2s) — how are they valued, what positions naturally drift into that role, what flex penalty do they get, and what positions are naturally prohibited from playing that role in the math. **Agrees:** the formula should price new positions without hand-written rules (Q2, Q3); a position's value and its natural prohibitions should fall out of the math. Filed as P-338.

## Rejected concepts (do not re-propose — concepts, not designs)

- **Physical attributes as the formula's vocabulary** — strength/speed/height as the core inputs. The formula works from positional concepts, not physical measurements.
- **Intangibles as scores** — mentality, technique, or any intangible-type scoring. Untrackable; not in the model.
- **Named per-row exceptions (pins)** — telling the formula "this one costs X because the Owner says so." Everything must be unified in one model.
- **Tracking pairs** — adjusting a body score and a job score together as a pair. If a formula needs pair-tracking, it is not elegant enough.
- **The cross-side floor** — a minimum price for switching sides. An ugly appendage; scaffolding for an inelegant formula.
- **Named tier labels** — Free/Slight/Real/Heavy shown to the user. Just the number.
- **The wasted-capability term/tax** — charging for capability the destination doesn't use. Out per the Owner's 2026-11-10 directive; do not promote or broadcast.
