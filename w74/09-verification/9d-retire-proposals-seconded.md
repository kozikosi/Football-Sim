# 9(d) — the retire proposals (P-109/152/154/155/164): **all five SECONDED — with proof, and one superseding fact**

**The superseding fact first (so nobody double-worked):** the Architect already applied 84 retirements in a
batch Owner-approved 5 Nov 2026 — `04913bbf` "Retire 84 dead priorities via inbox ops (Owner-approved
2026-11-05)" on `origin/council/muse`. These five are almost certainly inside that batch. My seconds are
therefore **post-hoc verification receipts**: they confirm the retirements were RIGHT, which is what "second
with proof" is for once the queue has already moved. Nothing below re-litigates the decision.

**The proof pattern (VERIFIED, run this session):** each proposal's reasoning is "targets the PreColors /
Z-post-blue UI that the w52–w62 wave series replaced." Confirmed from three angles:
1. The PRIORITIES text itself (`_agents/PRIORITIES.md`) names PreColors-era artifacts — line numbers, Cinzel
   Decorative, pixel-anchor screenshots, the w62-universe buttons.
2. The OLD shells contain the targets: `Cinzel` appears **44×** in `z-core/01-html/Football-Sim-Z-post-blue.html`
   ("Draft Complete" appears in PreColors).
3. The NEW product contains NONE of them: `grep -r "Cinzel|Draft Complete" colors/src` → **0 hits** — the UI the
   items describe does not exist in the product anymore.

| P-item | Muse's OP (origin/council/muse inbox) | My verification | Second |
|---|---|---|---|
| **P-109** (key players UI, floating cards) | SUPERSEDED — references PreColors line numbers (l.3734, l.5397, l.5192) meaningless after w52–w62 | PRIORITIES.md:78 text confirmed PreColors-anchored; the new UI has no line-number-addressable single-file surface at all | **YES** — and Muse's re-scope note is right: if floating key-player cards are still wanted, it must be filed as a NEW colors/ item, not revived |
| **P-152** (draft board cards: Cinzel Decorative, bubbles, "R1.31") | SUPERSEDED — exact instructions do not apply to w62 | `Cinzel` 44× in the old shell, 0× in colors/src; the new DraftBoard VM/component (folder 05) has its own Owner-approved display law | **YES** |
| **P-154** (Your Roster panel: pick order, hover names, 3-4/4-3 toggle) | SUPERSEDED — same reasoning | The new `rosterVM` (view/roster.ts) already renders slot-labelled groups with position codes; the item's UI vocabulary is the old shell's | **YES** |
| **P-155** (post-draft cinematic: "Play the season." / "Can you go 20-0?") | SUPERSEDED — same reasoning | "Draft Complete" exists only in the old shells; the new slice has no post-draft screen yet — the cinematic GOAL survives as a NEW item when that screen is built (reduced-motion is already wired via the a11y boot read, item 5h) | **YES** — retire the old-scoped item, keep the Owner's cinematic intent on the wants-list |
| **P-164** (playoff flow + cinematics + the "Season in Words" glitch) | SUPERSEDED — same reasoning | All referenced affordances (SIM PLAYOFFS button, tab words) are old-shell text; the season/playoff screens do not exist in colors/ yet | **YES** — same note as P-155: retire the item, not the Owner's intent |

**Weakest point of my own verification (stated):** I proved the five items are mis-scoped onto a dead UI and
that the new UI lacks every affordance they name; I did NOT prove the underlying Owner INTENT is satisfied
elsewhere — for P-155/P-164 the cinematics plainly are not built yet. The seconds therefore come with a filing
suggestion: after the batch lands, the Owner's cinematic wants (P-155/P-164's substance) should be re-filed as
new P-items against the Vite SPA, exactly as Muse's P-109 note recommends for the floating cards.
