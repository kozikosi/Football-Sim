# PROMPT FOR CLAUDE — paste from here

You delivered the merge candidate on 20 Oct. Since then the council measured the repository, the Owner ruled on every open question, and several of the merge document's assumptions changed. This tells you what changed, what is decided, and what we need from you.

## 1. The build is not where you left it

| | sha256 | size |
|---|---|---|
| when you delivered | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` | 657,486 B |
| today | `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` | 656,746 B |

It moved under edits by other sessions: the Guide intro panel was removed, and a batch of `!important` declarations was stripped from the CSS. Two untracked scratch copies also exist — `merged.html` `e1ac8184…` (656,750 B) and `merged_v22.html` `4178a69b…` (656,727 B). **Pin to `NFL Draft Simulator merged.html`**: it is the only one tracked in git and the only one every council note names.

**Naming is unresolved and belongs to the Owner.** `AGENTS.md` forbids describing the V20 merge candidate as "V21". The Owner's later direction says "build now V21, next edition V22". Until he settles it (question O1), do not label anything V21 in a document that also calls this file the V20 merge candidate.

## 2. The repository is not the record you think

Measured with `gh api repos/kozikosi/Football-Sim/contents?ref=main`:

- `main` holds 29 root entries. Of the seven governance docs, **only `AGENTS.md` is there.** `STATUS.md`, `MERGE-MANIFEST.md`, `COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `SUBMISSIONS.md` and `INDEX.md` are absent.
- The candidate build, `SIM-PLATFORM/`, and all three E2E suites are **404 on all ten branches**.
- `STATUS.md` line 16 still reads "the merged result has no hash yet". It has had one for days.

Decided (the Owner delegated this to the council; you ratify): **one repo, folder per sim** — `sims/nfl-current`, `sims/nfl-alltime`, `sims/nba-current`, `sims/nba-alltime`. `core/`, `Sim/`, `sports/`, `datasets/` and `shared/` are non-authoritative. `core/` is empty again: the stub that appeared there claimed a provenance that never existed, failed `node --check`, and was deleted. **The shipping file does not move this round.** The pool goes in git, not release assets — immutability by commit hash, and it compresses to 5.4%. Pickle's circuit-breaker stands: no extraction while a protected constant would have to split.

## 3. #12 is a ruled build item, not a question

The Owner settled every ambiguity on 21 Oct:

> "Sorry I mean to say no flex cost for the punter as well. Same logic as the fullback. **28 rounds.**"

> "Running back and Half back can be used interchangeably amongst the agents but try to preserve how they're labelled on the site. **HBs can become FBs at no flex cost.**"

> "**How Claude and I handled the SAM issue is exactly how the FB and Punter situations should be handled. Other positions can flex into the role. Don't change any flex penalties. Just add the new rules for FB and P.**"

So: FB and P are draft-board slots, **both drafted, 28 rounds, 896 picks.** HB/FB/TE → FB at zero penalty. K/P → P at zero penalty. **No existing flex penalty changes.** Players stay coded `HB`; slots stay `RB1`/`RB2`.

Supply, measured from the build's own `PLAYERS`:

| Group | Count | Slots (32 teams) | Net |
|---|---|---|---|
| HB 89 + FB 8 | 97 | 96 backfield (RB1, RB2, FB) | **+1** |
| TE 53 | 53 | 64 (TE1, TE2) | **−11** |
| K 32 + P 32 | 64 | 64 (K, P) | **0** |

The group nets −10 **because of tight end, not because of the FB slot** — and the TE shortfall predates the ruling. Scarcity is handled the way `SAM` is: 5 records for 32 slots, working because MIKE and WILL are natural there at zero penalty, with the cost landing downstream on the line and secondary rather than on the slot itself.

## 4. The pool-swap trap resolved itself and left a smaller one

The tool that produces the variant pool drops 52 records today — 32 P, 12 LS, 8 FB — because `legalCodes`, parsed from the build's own `NATURAL_SLOT_MAP`, has no `FB` or `P`. **The drop is emergent, not a hardcoded list.** Adding `FB` and `P` to `NATURAL_SLOT_MAP` therefore makes the tool write 1,188 and drop only the 12 long snappers, by itself. Proven on copies: `written: 1188 · dropped: 12`, all LS.

Two things travel with that:

1. `SIM-PLATFORM/tools/build-pool-variant.mjs` line 77 writes `pos = cands[0]` **without checking it is a legal build code.** A taxonomy entry pointing at a non-slot code makes the tool write records the pool cannot see, and report success. Demonstrated: the unguarded tool writes 1,200 with 12 illegal codes; the guarded tool writes 1,188 and names the 12. One-line guard at l.76: `cands.length && legalCodes.has(cands[0])`.
2. **1,188 is written, not assignable.** Until `ROSTER_SLOTS` carries FB and P, those 40 records are pool-visible and assignable to zero slots — the draft would read "896/896 complete" with 40 undraftable players. The slot change and the pool change must land together.

## 5. Two P0s, and the gate cannot see one of them

**390 px.** `#startSeasonBtn` sits at `top: 963`, `bottom: 1007`, in an 844 px viewport — 119 px below the fold, in preseason, at the foot of a 7,483 px page. Three seats measured it independently. The gate cannot see it: `tests/e2e-smoke.mjs` line 127 defines `inVp` as `r.left >= -1 && r.right <= vw + 1 && r.width > 0` — **horizontal only.** A button 119 px below the fold passes.

**Week 1 is closed.** Implemented and passing on the real machine: `G_week1Visible: true`, receipt detail `week1: { heading: "Week 1 of 17", week: 1, of: 17, visible: true, simWeekBtnVisible: true, innerTextMatch: "Week 1 of 17" }`, `week1Of17Seen: true`.

**Suite state.** `tests/openchamber-e2e-v2.spec.js` (669 lines) is the only one with the `fullyInside && centerUncovered` clause. `tests/openchamber-e2e.spec.js` (459 lines) produced the published evidence. `tests/e2e-smoke.mjs` (468 lines) is the fast screen and the only one carrying a `receipt_id`. Council decision: **v2 becomes canonical**, `receipt_id` grafted from the smoke test, smoke stays the fast screen, `openchamber-e2e.spec.js` retires as a runner. Receipts are a JSON object **plus a trailing summary line**, so a strict parser fails at line 192 and the richer fields live only in that tail.

## 6. What the council got wrong, so you do not inherit it

1. **DS reported `main` from a local checkout three times.** `git cat-file HEAD:file` answers about the current branch, not the repository. Only `gh api …?ref=main` answers "is it in the repository".
2. **DS called `ee9aaa44…` a wrong hash.** It is not. It is the genuine pre-locator-fix hash of `tests/openchamber-e2e.spec.js` (442 lines, 17,184 B); `6a781e71…` is the same file after BOC's Week 1 locator fix. Both are correct for their moment.
3. **DS filed SAM's 5-for-32 as a pool defect.** The Owner ruled it is the design. The measurement stands; the framing was wrong.

## 7. The document you are being handed

`V22-Suggestions.md`, 2,227 lines, 197 change items, P0/P1/P2. **Read it knowing four things, because it is not yet clean:**

- Its P1 block is **duplicated** — P1-20…P1-26 reappear as P1-34…P1-40 under different numbers.
- It says **832 picks six times and 896 never**, though the ruling is 28 rounds.
- It pins **`40233d6b` four times and `044d1759` seven times.**
- **194 of its 197 items carry no `HOW TO CHECK` line.**

The council is fixing all four in parallel. This prompt is the part that does not depend on that finishing.

## 8. Questions for you

**Q1. 3-4 base — rename or new slots?** The Owner gave both front sevens: 4-3 `DE1, DE2, DT1, DT2, MIKE, WILL, SAM`; 3-4 `DE1, DT1 (Nose Tackle), DE2, OLB1, ILB1, ILB2, OLB2`. Both are seven bodies, distributed differently — two defensive tackles in one, one in the other. Is the base (a) the same seven slots relabelled, so `teamRatings` is unchanged, or (b) a genuinely different slot set, so the defensive line unit loses a tackle and the linebacker unit gains one? (a) is far cheaper; (b) is what his list describes.

**Q2. If (b), what happens to `ROSTER_SLOTS` and the pool?** Today `SAM` is a legal code and `OLB1`/`ILB1`/`ILB2`/`OLB2` are not. Renaming slot codes changes `legalCodes` in the pool tool, which changes the drop set — the same mechanism that produced the 52. Does the 3-4 need its own slot codes, or do the maths labels stay `MIKE`/`WILL`/`SAM` with only the display relabelled per base?

**Q3. "CB3/Nickel comes on, LB3/SAM comes off" in a 3-4.** There is no SAM in the 3-4 front. Which body leaves the field — `OLB2` or `ILB2`? The Guide cannot teach a rule that points at a slot half the league does not have.

**Q4. "Edge" — is it `LEDG`/`REDG`?** The Owner says edges take no penalty at OLB/WILL/SAM, and separately that OLB/WILL/SAM take −2 at Edge. That asymmetry may be intended, but it must be written as a matrix rather than inferred. Confirm `Edge` means both `LEDG` and `REDG`, and say whether edge→ILB is zero or −2.

**Q5. Does the new flex matrix break the weight invariant?** `modelWeights()` is documented as the inverse of `slotWinsPerOvr()`. Making DT reachable from MIKE, plus five linebacker routes and two safety routes, changes each slot's marginal value. Does the matrix change require re-deriving the weights — and is that inside the protected-constant rule, or a consequence of the Owner's ruling?

**Q6. Does 28 rounds exhaust the pool?** 1,188 draftable for 896 picks is 1.33 per pick, against today's 1.38 (1,148 / 832). `cpuPick` has a replacement floor of 76. Does the floor still bind before round 28, and does any position group run dry before the last pick?

**Q7. How is a punter valued?** `slotWins()` and `replacementLevels()` were built for 26 slots. A punter contributes no offensive or defensive unit rating. Does P enter `slotWins` at all, or is it a zero-value slot the CPU takes last — and if it is zero-value, does the CPU ever take one before the final round?

**Q8. `RATING_SPECS` for FB and P.** Does a fullback inherit the RB spec or get a blocking-only spec? For the punter, is there a leg or hang-time attribute in the data, or does the build use `str`/`agi` as proxies?

**Q9. Pool-swap guard — apply it?** MOC's one-line guard at `build-pool-variant.mjs` l.76 costs nothing when the codes are legal and prevents a silent 12-player loss when they are not. Recommendation: apply it. Say if you disagree.

**Q10. "Value here" — how far does "not visual" go?** The board column, the sort option, the Guide bullet, the section title and the Priority header's title text all say it today. Does the **sort option** stay, headless but still sorting, or leave the UI entirely? And is `r.v` still computed for every row, or only for the sort?

**Q11. The 4th-down description.** The Owner wants "goes for it on 4th & short when in opponent's territory" and says *verify the math*. Read the AI's 4th-down logic and say whether that sentence is true — and if not, what is.

**Q12. `+x points a game` removal.** The Owner wants every such phrase gone from previews and reviews **except** the overall game line ("+3.3 points"). Is `factorParagraph()` the single generator? If yes it is one function; if not, list the generators.

**Q13. Stars of the Game threshold.** The Owner: offensive players need at least 60 yards. A quarterback with 250 passing yards passes trivially; one with 180 yards and 2 touchdowns fails. Is the 60-yard rule for RB/WR/TE only, with a separate QB rule, or does it apply to everyone?

**Q14. When the document contradicts this prompt, which wins?** State your precedence order so we can write it into the document's header.

## 9. Do not

- Do not change a protected constant beyond the Owner's explicit flex ruling.
- Do not describe a V20 build as V21.
- Do not move a number without a seeded comparison — the build has 58 unseeded `Math.random()` sites.
- Do not treat a PASS as product acceptance.

<!-- END OF PROMPT -->
