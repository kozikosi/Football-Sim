# Owner decisions, 13 Nov 2026: the multisport batch (rulings 1-16 and the A-g addendum)

Recorded by the Architect the same turn the work order was read. Order: `council/inkling:_agents/inkling/prompts-2026-11-13/claude-work-order-2026-11-13.md` (read at its tip on 13 Nov 2026; INKLING is relaying for the Owner while MUSE is out).

## 0. Honest provenance (read this first)

The work order asks for the Owner's answers "verbatim". **I do not have the Owner's original chat messages**; they are not in the repo. What I have is (a) words INKLING (or Beam) put in quotation marks and attributed to the Owner, and (b) INKLING's paraphrase. So this file has two classes, and never blends them:

- **QUOTED (relayed):** the Owner's words as they appear in quotation marks in a relay file. REPORTED until the Owner pastes the original, because I did not see the original. Where two relays of one message differ by a character, both are given.
- **RELAYED (paraphrase):** INKLING's summary. Context, not source. Not to be cited as the Owner's words.

**VERBATIM-PENDING:** Owner, if you paste your 16 answers (and today's additions) into the chat, I replace section 2 with your exact text and re-push. Until then nothing below is stronger than REPORTED, and the only things I have acted on are the ones the work order itself marks as final rulings or that my own lane already owned (D0, the red tests).

## 1. Quoted words (relayed), each with its source

| # | Words (as relayed, in quotation marks) | Relay (ref) |
|---|---|---|
| Q1 | "everything is built to be as framework neutral as possible. everything is in plain typescript… Svelte + Vite, SvelteKit, React + Vite, next.js, vue + vite, vue + nuxt, solid + vite, and solidstart are all on the table. the council should perform tests for each. z.ai's test will be the definitive data and the council should evaluate his results. other seats can conduct their own tests if they feel like it." | work order section 0 (ellipsis is INKLING's) |
| Q2 | "lit can be tested" | work order D1 addendum (b) |
| Q3 | "no to the others" (on Beam's candidate list: Astro, Qwik, Remix, Angular, Lit, HTMX, Alpine.js; Lit later added by the Owner, see Q2) | work order author's disclosure |
| Q4 | "Yes but i think this could be expanded even" (on CI) | work order D2 |
| Q5 | "when claude is ready" (w89 cutover) | work order D5 |
| Q6 | "everyone should byte check everything a lot more" | `_agents/inkling/prompts-2026-11-13/rule-byte-check-everything.md` |
| Q7 | "All of these can fluctuate but ovr, and flex prices should be static to the user. the underlying math can be more flexibible. form for players should generally drift +- 5 during the course of the season." (Beam's copy reads "more flexible" and "All of these can fluctuate but ovr, and flex prices should be static to the user." The only difference is the spelling "flexibible" vs "flexible"; the original decides.) | work order D1 (g); `council/beam:inbox/20261113-1930-beam-12-static-to-fluctuating-items.md` |
| Q8 | "all players can randomly pop up in the game report on the opposite side of the ball if they have a -6 or less penalty in a position at the other side of the ball and it is in the clutch or overtime. ideally there is also a visual indicator to the user that the coach made a decision to play someone on both sides for one play. for example, i can see a top wide receiver coming in to defend a hail mary at the end of the game and getting an interception." (Beam's copy has "All players" capitalised and "on the other side of the ball" where the work order has "at the other side of the ball". Two relays of one message disagree by a word; the original decides.) | work order D4; `council/beam:inbox/20261113-1928-beam-cross-side-stars-design.md` |
| Q9 | "yes but maybe just '2-WAY'" (the badge) | Beam's design note, attributed to the Owner; not in the work order's quotation marks |
| Q10 | The clutch window: "final 5 minutes of the 4th Quater + overtime" (11 Nov, the Owner's own spelling) | `council/muse:_agents/owner-notes/2026-11-11-penalties-big-and-clutch-verbatim.txt` (a recorded verbatim, the strongest source in this table) |

Q10 matters: the work order's item 13 says "final 5 min of 4Q / OT only". That matches the Owner's 11 Nov definition of clutch, so I read "clutch or overtime" in Q8 as exactly that window. INFERRED, and consistent with the only first-hand source I have.

## 2. The 16 rulings, as relayed (paraphrase; status per row)

| # | Ruling (INKLING's wording, shortened) | Status |
|---|---|---|
| 1 | Colors is the engine; renamed **76 Pancakes** at v1 ship. Cakepanz (67) is the refactor of the w89 UI shell. The Architect merges when he decides (literal merge ideally; rewrite permitted if it makes sense). | RELAYED. Answers the Track Brief: engine = Colors (my recommendation), UI = Cakepanz's lineage, timing mine. |
| 2 | No weight pinning. The old weights table is antiquated; the two red tests stop being gates. How is the Architect's call. | RELAYED. **Done** (see section 4). |
| 3 | CI may expand to full ambition. Free in perpetuity: no paid services, ever; GitHub Pages stays default; Cloudflare free tiers OK. | RELAYED. Binds D2. |
| 4 | Council evaluates Z.ai's definitive data across **nine arms**: Svelte+Vite, SvelteKit, React+Vite, Next.js, Vue+Vite, Vue+Nuxt, Solid+Vite, SolidStart, Lit. No React removal until ruled out. Framework-neutral plain TS until a pick is necessary. INKLING builds `arm-solid` and `arm-lit`; Z.ai the other seven. | RELAYED. **Supersedes my assessment D16** (which recommended removing React). React stays. |
| 5 | No framework verdict before the test completes. | RELAYED. |
| 6-7 | React: covered by 4. | RELAYED. |
| 8 | w89 saves: no special preservation. The best, most sustainable save design for 76 Pancakes (Architect + Z.ai). | RELAYED. Becomes a standing persistence requirement (D5). |
| 9 | Other seats' recommendations (display-options digest etc.). | RELAYED. Not an Architect item. |
| 10 | No strict realism guideline: approximate; no numerical gates or sweeps today; let the engine show its distributions. | RELAYED. Consistent with my earlier ruling record (10% bar = guideline). |
| 11 | Defensive pass-focus: the opponent's pass economy shrinks, especially big plays; run, short pass and RPO leak; W-L is simulation-emergent; no win dial is ever strengthened or hard-coded. | RELAYED. Design constraint on the focus feature (plan v2 slot 3). |
| 12 | His earlier question ("i don't understand", on the rebuild guardrails) is restated in plain terms in section 5 below. | RELAYED. Section 5 is mine. |
| 13 | **Cross-side stars (final):** any player may enter on the opposite side of the ball if his opposite-side price is <= 6, in the clutch or overtime only; CPU gets the same call; the user sees a terse "2-WAY" badge. | RELAYED + Q8, Q9, Q10. Design only; see `claude/notes/2026-11-13-cross-side-stars-design.md`. |
| 14 | The "simulation-design platform" is deferred. Football and basketball first. | RELAYED. |
| 15 | Basketball after football ships. | RELAYED. Consistent with the 13 Nov ruling 4 (football only until football ships). |
| 16 | w89 cutover when the Architect is ready. | RELAYED + Q5. |

## 3. A-g addendum (relayed)

(a) The byte-check rule is council-wide and standing (Q6). Adopted in my own work: every VERIFIED here carries four lines (directory, exact command, ref/sha, output). (b) Nine arms, not eight (Q2). (c) The Next.js arm may carry its OpenNext-on-Cloudflare same-code variant as a measured config difference; not a separate arm; no paid tiers. (d) Astro, Qwik and htmx are rejected as final. (e) Free in perpetuity binds GitHub Actions, Cloudflare free tiers and Pages. (f) "Everyone byte-checks everything a lot more" is a broadcast rule the council enforces; my D2 plan carries it. **(g) The displayed-versus-underlying law (Q7):**

> **Displayed numbers are the user's contract; underlying math is free to move.**
> - **Static to the user, always, under the user's eyeline:** Wins, Priority, OVR, flex price (the 0/2/6/12 tiers), and the form arrow's displayed state within a period.
> - **Free to fluctuate inside the engine:** everything that feeds results (slot values, drive and play parameters, home field, gravity, focus effects, group synergy), as far as the receipts allow.
> - **The one visible fluctuation:** form, drifting about +-5 over a season (Q7), shown as an arrow.
> - **Mechanism (adopted, section 6 of NOW.md):** one frozen context snapshot per period; every screen reads only the snapshot.

This is the single pattern the dynamic engine hinges on.

## 4. What I decided in my own lane (Architect; recorded, not asked)

1. **Red tests (ruling 2).** Quarantine-with-reason or report-not-fail: I chose **report-not-fail**, because a number that stays visible on every run is better than a test parked out of sight. Commit `5a3bb75`:
   - `lineup.test.ts`: the 2400 pin is now a printed `REPORT (not a gate)` line (today 2700). The structure still gates (three flexes, all priced 6; the TE3 and inside-spot stand-ins; DT plays FB free). Cause found: the third stand-in moved from `DIME<-TE` (50 x 6) to `SAM<-TE` (100 x 6), the same price band in a different slot; that is the whole 300.
   - `versions.test.ts`: the engine stamp is REPORTED with a MOVED/UNMOVED flag; the **data stamp stays asserted** (it passed, so the ratings file is unchanged since its last pin).
   - VERIFIED: `cd colors && npm test` at the commit, whole repo present: 320 pass / 0 fail; `npm run tsc:check`: 91 errors pinned 91.
2. **D0.** `LoadedDataset`/`DatasetLoader` generic over the row; NFL tuple moved to `sports/nfl/app/dataset.ts`. Dead `build/build.mjs` and `esbuild`, `esbuild-svelte` removed; `package.json` description rewritten. `vite build` fails with the same "Failed to resolve /src/main.ts" before and after (there is no app entry yet; that belongs to the shell merge).

## 5. Rebuild guardrails (D3), in plain terms (Architect's standing rules unless you adjust them)

You asked what these mean. Short version: the new play-by-play engine must never be allowed to look better than it is.

1. **The flex table moves over untouched.** The 99 rules and the price formula are copied unchanged into the new engine. Basketball would plug in its own table; the mechanism is shared, the numbers are not.
2. **The old engine is the answer key.** Whatever we change, the old drive engine is what we compare against. We never quietly edit the answer key to make a new result pass.
3. **Side by side, same seeds.** Before any engine change ships, I report old numbers next to new numbers from the same random seeds, so you can see exactly what moved.
4. **Measure first, replace second.** The tools that count who touches the ball and what each play is worth (the ledger and census) are built before the old model is replaced. Otherwise we cannot tell whether the new math carries real football weight or only looks plausible.

Status: stated by me, not yet adjusted or objected to by you. If you object, I record the adjusted form here as a ruling.

## 6. Contradictions I found in the order (not silent)

1. **MERGE-MANIFEST.md:** section 2c(3) says "re-pin MERGE-MANIFEST.md lines in this same wave"; section 4 says the Architect never edits it. The bound wins (it is the Owner's). My Value Manifest decision (adapt, derived mirror, nothing to re-pin) does not need the edit. See `claude/NOW.md`.
2. **Ruling 4 vs my D16.** My assessment recommended removing React; the Owner's ruling keeps it until the test rules it out. Ruling wins; assessment D16 is marked superseded in NOW.md.
3. **"VERIFIED" in the work order.** Its section 0 facts are INKLING's. I re-ran the weakest one (two red tests and counts) on my machine: 318/320 at `2743103` with exactly the two failures INKLING names. See NOW.md for the four lines.
