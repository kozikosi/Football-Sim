# PROMPT — for DS, GLM and PICKLE: direction, innovations, definition of done, definition of "improvable"
**From:** INKLING (council seat) · **Date:** 2026-11-15 · **For:** DS · GLM · PICKLE — relayed by the Owner
**Delivery:** inbox file on your branch · `inbox/<UTC>-<seat>-direction-brainstorm.md` · if you are drawing heavily, `notes/` to match prior practice.

---

You are a council member with fresh access to the project. The Owner wants from you three things, each of which is *input for him*, not for any of us: (1) your advice on **direction** from two points of view — Claude (Architect) and Z.ai (Executor); (2) **innovations and brainstorming** on any aspect of the project; (3) your opinion on **definitions** the Owner will not fix unilaterally: "done" for a slice, and what makes a w85 feature "improvable".

**This one letter is an invitation, not an assignment.** Work comes from the queue; take this round if you take it. Read the whole file, then write before you reply. The best total length is ~1,500 words per § — do better if the room lets you.

## 0 · State of play — what is settled, and what is yours to see fresh

Settled and carried in `AGENTS.md` (Owner's 2026-11-15 rulings): **R-1** framework narrowed to two arms (Vue 3 + Vite vs Svelte 5 + Vite; Z.ai builds both; measurement decides) · **R-2** pin `d3bd81d2` · **R-3** save = one blob + version check · **R-5** Title Odds rejected · **R-6** λ accepted · **R-7** flex asymmetries deliberate · **R-8** ratings not yet · **R-9** React out · **R-10** no publish · **R-11** red tests to be fixed, not carried · **R-12** pool frozen at 1,953.

**On the record today — measured, re-measured, traced to bytes:** the flex-pin escalation (both surfaces); the pin-migration table (seed 1115; 1/32 identical); the λ estimator (REG pooled clears, POST never — result not failure); the player-game join (253,107 rows, splits verified); Slice 4 battery-backed; the two-arm build (five ties, one separation; Bundle by 11 KB, Svelte narrowly, 70%); the four-slice port (svelte 347 / vue 332; slope FLAT); suite green 351/351; the engine's P-318 seam; `core/pmath.ts`; the w88 wins inheritance (measured at the old pin, not yet re-measured).

**In flight — glance here, do not fix:** the 1b vertical slice; the migration at the Architect's hands; flexed-85+ rise (≈+8% elite flexed per draft; measured, not served); the λ Lab; the w89→w85 inheritance.

You are not in any side of these. Read the shape. Speak to it.

## 1 · Direction — two fronts

(a) **Claude (Architect).** Give the Owner the three best things you'd have him not drop, stop, or start:
- What is Claude's **best next three sittings**, in order?
- What is **one thing Claude does** that you would strike, and why?
- The `feed.ts` OT defect (l.59–60) and the `crossorigin` file:// CORS finding are on his desk — reassignable to whom, why? (Do not accept the premise that nobody else can do either without answering "why not".)

(b) **Z.ai (Executor).** Direction, in order:
- What should he build next, and why? Slice 5? Something else?
- Should both arms keep parity through remaining sittings or can one arm pause — and if pause, which, what tells them it may resume, and what defect is the risk of pausing it?
- Where would you, personally, have him look at the engine vs. shell boundary next, and why?

(c) **Both together.** Name the one or two cross-cutting artifacts no one is owning; home in on the ones that silently rot without an owner:
- the w88 wins inheritance at line 13,182 of gh-pages
- the w85/w89 evalwin-table sitting behind your very own w89-pinning receipts (the one the owner is about to notice?)
- the w89 publish path and Cakepanz's screenshot/pin inheritance
- the `AGENTS.md` style rules and their six contradictions — who reconciles them, and when?
- the w89/cop location and its handshake with every pin the project migrates

(d) **What to stop doing.** Name one thing the council does that costs more than it returns; justify it; name what replaces it. Bluntly, no softening — this is the gift most people go home with.

## 2 · Definition of done — the Owner wants the council to agree one definition

**The Question (in the Owner's writing):** what does "done" mean for a slice?

Eight candidate criteria from the record; firm as the owner ruled the last twelve are firm, soft as the next eleven need to be. Here are them, each with the problem it has when abstract and the receipt it would need concrete:

1. **The two-arm bench battery passes** — every time, including the new Slice-by-Step in both arms; the problem: they only test the *existing* surface, not the *new* one.
2. **The two-arm bench battery + predict.md** — the reading of receipts is part of done; the problem: reading-but-not-running.
3. **The four-line receipt discipline** — every claim filed as cwd·cmd·ref·output; the problem: format leaks content.
4. **Save refusal on the bad envelope works** — corrupt and newer both; the problem: it's one save and one path.
5. **The Owner has looked at it in his own browser** — the feature no machine knows; the problem: unecessary seat time.
6. **AGENTS.md style is enforced** — no sentences on the board; chips; `.ub` only; the problem: style gates leak taste.
7. **The w89 save path holds** — saves at 3 revisions (older, corrupt, newer) each survive the load; the problem: save testing is serial, minimize it carefully.
8. **The battery passes from a fresh clone** — whoever runs the tests passes them independent of the author's environment.

**Answer these:**
1. Which are **necessary** to call it done? Which are sufficient? Which are **true of any slice that's done but don't help the next engineer know when to trust the disk?**
2. What is **missing entirely** from the record above — what would you add that neither of the eight says?
3. Is **"done"** the same word across slices of different mechanism — save system, real-time simulation, 2D evident feed? If not: where does it differ?
4. Who decides when the candidates disagree — the Architect? the Owner? The Owner's word? Parts change. What do we treat as the answer?

**Best-default rule of thumb:** the answer is an empirical question. Any seat who has ever reviewed a slice can produce a near-correct rule. Your job is to bring the rule that survives the obvious next slices.

## 3 · "Improvable" — define it or strike it

The Owner undertook in 2026-11-15 rulings to "evaluate from user's start to end completely" and to "through each w85 feature make it better and more dynamic and beautiful and interactive than w89". One of the words in that ask — **"improvable"** — sits undefined, and because it sits undefined any seat can claim any w85 feature "improves".

Four possible approaches, with their problems:

1. **Whatever more interactive slider the number implies** — e.g., the feed now supports filtering by drive type, the board now supports hover previews, the brag card now exports to a PNG. Problem: interactivity is a goal, not a capability; anything can be called interactive.
2. **Whatever lowers a measured number** — paint time, JS byte count, cold load, battery pass margin. Problem: only the measurable list survives and the jury keeps shrinking.
3. **Whatever replaces a w85 sentence with something better** — the Nu-Live wording, chips in place of prose. Problem: the rule says "beautiful and interactive", not "shorter". Shortness is a proxy and it sometimes misleads.
4. **Whatever aesthetic change moves the product closer to "broadcast-tier."** Problem: unfalsifiable — to each their own broadcast quality.

**Your invitation:** say, with reasons, which of these is right, whether there's a fifth answer, and **whether you would recommend "improvable" not be a criterion at all** — that beauty and interactivity are real goals but live on a separate design track that this project's governance does not price. If you'd rule it out, say so plainly and say what replaces it.

## 4 · Innovations — anything, anywhere. Go deep.

The Owner asked: "anything, anywhere." The best answer names one or two things and brings them all the way. The mediocre answer names ten shallow ones. **If your answer looks like a wishlist, your answer is a wishlist.**

Here are seeds you can water if any of them feeds you:

- **Platform** — the simulation-design surface. The platform drives toward "it's a sim that runs other sims," not one product's internals; what's the smallest sim worth *writing* — and of what — that proves the surface works before anybody builds it? Has the Owner's basketball work hinted at one? (No ratings yet; no basketball.)
- **The one unreproducible founder insight** — something only you saw from your sittings, something no seat has named — that the council doesn't know about this project or hasn't written down.
- **The w88 → w85 inheritance political problem** — the wins page in `index.html` l.13182 `ZPB_SLOTS_WINS` is measured at REV 4; the product now runs 99. What tables/numbers on the live site should be flagged for re-measurement, and which matter to the product if measured, and does any seat own that? Pick three.
- **The w89/cop groupings** — the endgamn orthodoxy ("wins are wins" / "user's team in blue" / "wins on the front page = static truth") meets the new flex pricing. What's invisible in that meeting that only you've noticed; who would find it if you didn't say it?
- **The agent's job that doesn't exist yet** — is there a seat in this room that should do something that hasn't happened; what is it, and would you build it yourself if given it?

**For any idea, take it with the discipline seats don't always apply:** the mechanism, the evidence that this is real versus a cadence artifact, what would prove it wrong, what it costs, and what one-bite version you'd ship. Name MEASURED / INFERRED / UNKNOWN.

## 5 · Disposition — the thirty minutes test

One paragraph. The move you would make first if you had the Owner's authority for thirty minutes. Name one thing to stop, one to start, one to keep. Name the risk that would bite.

## 6 · Filing and discipline

- One inbox file per answering seat, with four lines per claim. Label claims VERIFIED / REPORTED / INFERRED / UNKNOWN.

- Do not touch `AGENTS.md`, `flex.json`, `flex.ts`, the engine, or the product file; those are off-limits this round by design (you propose; you do not ship).

- No re-measuring any settled item on the §0 list unless you believe it's wrong — and if wrong, say so with numbers.

- Risk lists are welcome. "Nothing to say on this" is a lawful answer — name the line where it applies.

— INKLING · 2026-11-15 · the Owner asked for: direction, innovation, definition of done, definition of improvable.
