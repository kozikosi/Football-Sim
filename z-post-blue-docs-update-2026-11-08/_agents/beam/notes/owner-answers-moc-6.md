# Beam — Owner's answers to MOC's six questions (21 Oct 2026) + resolution of Q3

**Status:** shared reference for every seat. The Owner's answers, verbatim, plus the one answer the Owner said he did not understand, resolved from the build.

**Build:** `NFL Draft Simulator merged.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` · 6,554 lines.

---

## The Owner's answers, verbatim

**Q1 — Where do the 32 team hexes come from?**
> (Owner's reply attached GPT's and Gemini's responses; the substance is:) The hexes are a **sourced data requirement**, not a copy-paste list. Keep brand data (documented identity colours) separate from display data (colours chosen to render legibly). Verify against team-level sources; do not silently replace an official white with an invented colour; solve the white-edge problem in the rendering layer with an explicit rule.

**Q2 — What makes a defender a star?**
> "If a defender has the highest player rating in a game, and is on the winning team (Unless he has a multiple turnover game) or has an incredible 90+ game."

**Q3 — Which screen is the intended handoff into the season?**
> "I don't understand."

**Q4 — Who gets the game ball in a tie?**
> "Tie goes to defense if defense or offense. Tie goes to the least highly rated player by wins if tied all on offense or tied all on defense."

**Q5 — Which flex table is the rule?**
> "Left and right don't matter. Let claude handle the table."

**Q6 — Is the 3-4 a real front or a label?**
> "The lowest rated linebacker comes off in 3-4 for the nickel."

---

## Q3 resolved from the build — there are TWO "Play a Season" panels, and one of them is dead

This is the answer to the question the Owner could not answer. It is a bug, not a design choice.

**The two panels:**

| # | Where | Markup | Reached? |
|---|-------|--------|----------|
| **A** | `goSeason()` — line 846-861 | `<h2>Play a Season</h2>` + a 3-step `<ol>` explainer + `<button id="startSeasonHeroBtn">Start Season</button>` | **NO — dead code** |
| **B** | `renderSeasonTabInner()` — line 6152-6162 | `<h3>Play a Season</h3>` + a 3-step `<ol>` explainer + `<button id="startSeasonBtn">Start Season</button>` | **YES — this is the live one** |

**Why A is dead:** `goSeason()` opens with

```js
function goSeason(){
 const host = document.getElementById('seasonHost'); if(!host) return;
```

`seasonHost` occurs **once** in the whole pin — that one line. Nothing creates it. In the donor it occurs 4 times. `seasonHost` was the donor's Season-first container id; the merged build uses `renderSeasonTabInner(container)` with the tab's own container, so the donor's container no longer exists. Therefore `goSeason()` returns on its first line, always.

**Its only self-reference confirms it:** line 857 — `document.getElementById('startSeasonHeroBtn').addEventListener('click', ()=>{ startSeason(); goSeason(); });` — is *inside* the body that can never be reached.

**So there are two answers to Q3, and the Owner should pick one:**

- **(a) If the panel the Owner remembers is panel A** — the big `<h2>` hero with the three-step explainer — then the product does not have it, and panel B is a smaller `<h3>` variant that replaced it. The fix is to make B look like A (or restore A's markup and point it at the live container). This is a *presentation* change, not a delete.
- **(b) If panel B is what the Owner saw** — then panel A is 16 lines of dead template and should be deleted.

**The tell that settles it without asking the Owner again:** the two panels differ in one visible way besides the heading level. Panel A's third step says *"the **Guide** link at the bottom of the page"*; panel B's says *"the **Guide** tab"*. The Owner's own guide-page work has been removing the bottom-of-page Guide link (the Owner's 22 Oct direction removed the Guide panel from the homepage and the guide page). So the panel that matches the product as it stands now is **B**, and **A is stale** — it still points at a link the Owner has since removed.

**Recommended default: delete panel A's dead template (16 lines) and promote panel B to the A treatment** — i.e. give the live panel the `<h2>` heading and the hero styling, and drop the stale `goSeason()` function. Cost of being wrong: **low** — a dead function and a duplicated template cost nothing to remove, and the live panel keeps working either way. Must answer now? **No** — the copy pass can proceed without it; it is a P1 cleanup, not a release blocker.

**How to check it yourself (one command):**
```sh
grep -n "seasonHost" "NFL Draft Simulator merged.html"
```
→ one line, inside `goSeason()`. That is the whole proof.

---

## How each answer lands on the work order

| Owner answer | Lands on | Note for the Architect |
|---|---|---|
| Q1 — hexes need sources, brand ≠ display | P0-29 (team colors), the palette check (P5) | `--team-primary`/`TEAM_COLORS` do not exist in the pin — build them, with `brand_colors` (each with a source URL) and `display_colors` (each with a derivation rule). Do not ship an unsourced palette. |
| Q2 — defender star rule | P0-18 / the stars block | A defender is a star if he has the highest player rating in the game AND is on the winning team, unless he has a multiple-turnover game, or he has an incredible 90+ game. Replaces the offensive-only thresholds. |
| Q3 — resolved above | the dead `goSeason()` template | Delete the dead panel A; promote panel B. |
| Q4 — tie goes to defense; then lowest wins rating | the game-ball block | Needs one implementation detail to be unambiguous: "least highly rated by wins" — least wins, or least OVR? The Owner's words say "least highly rated player by wins", which reads as *lowest wins*. Recommend: lowest wins among the tied candidates, then lowest OVR as the tie-break. |
| Q5 — left/right don't matter; Claude builds the table | P0-17 (flex tables) | Claude owns the table shape. R-2 stands: edge is one position. |
| Q6 — lowest-rated linebacker comes off in 3-4 for the nickel | P0-26 (base defense) | The Owner's rule names *the lowest-rated linebacker*, not the SAM/OLB2 by default. In a 3-4 the four LBs are OLB1, ILB1, ILB2, OLB2; the one that leaves for CB3/Nickel is the lowest-rated of those four. |

**Two details in Q4 and Q6 need one sentence from the Owner or from Claude, whichever is quicker:**
1. Q4 — "least highly rated by wins": lowest *wins*, or lowest *OVR*? Recommend lowest wins, then lowest OVR.
2. Q6 — is the lowest-rated linebacker chosen among all four LBs (so a 3-4 with a bad ILB2 can drop him instead of the SAM), or is it a fixed slot? The Owner's wording is "the lowest rated linebacker", which reads as *any of the four*.

**What I did NOT check:** whether the goSeason() hero was the screen the Owner remembers (that is the part only the Owner can confirm); whether `startSeason()` has side effects that panel B lacks; the rendered appearance of either panel. What I did check: every line number and string above, by grep against the pinned build, and the call graph of `goSeason` / `renderSeasonTabInner` / `renderSeasonTab`.

**Self-audit (R5):** this note is in my own lane (`_agents/beam/notes/`). No product edits. No other session's file touched. Build pin re-verified: `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`.
