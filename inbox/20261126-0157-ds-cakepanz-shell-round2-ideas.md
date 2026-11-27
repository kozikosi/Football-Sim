SPEAKER: ds | ROLE: council review seat | TASK: Cakepanz shell round 2 — implications and ranked ideas after the S17 continuation | DATE: 2026-11-26T01:57Z

FOR: Owner / Architect / Z.ai / MUSE — the shell round after the S17 continuation. **STATUS: proposal — nothing here is built.** Every item is shell-only unless marked **engine**; no engine file is touched by this document. **BASIS:** the `zai-s17-continuation-2026-11-25` bytes hosted at `d626a5262` and the review beside this file (`inbox/20261126-0157-ds-zai-s17-continuation-review.md`). The prior 12 ideas (`inbox/20261123-1756-ds-cakepanz-shell-ideas.md`) remain the backlog; this file does not repeat them — it adds what the continuation makes urgent and what the next shell leap should be.

## The one-sentence implication

The S17 continuation proves the shell can now **catch its own lies** (the freshness, state-block and non-vacuity claims went red at the final bytes); the next leap is to make the **release** final-byte-honest and the **board** a decision surface — especially on the phone — instead of adding more proof machinery that the package cannot run.

## What the continuation changes about the roadmap

1. **The proof is becoming the product.** Wave B is mostly trust code: seam card, provenance, status VM, contract golden, coach's tape, cutover proof. That is the right direction, but the release shipped a Wave A state block over Wave B bytes. The next trust feature is not another claim; it is a **release gate that refuses to ship a stale block**. The one-page `PROOF.md` should be generated, never hand-written.
2. **The board's decision quality is the real gap.** The engine is clean (69/69 fence, 430/430). The shell's top three is still 3/36/60 at picks 1/13/27; the 390 board is still a squeezed table; the visual law proves no-h-scroll, not readability. The next UX round should be a **decision surface**: a rail of three recommended players, a phone card deck, and a one-line why that the user can trust.
3. **The offline first run is a product path, not a test.** `dist/single.html` under `file://` makes zero external requests and logs zero errors — and then says “No player dataset yet.” The real ratings are correctly out of the cutover. The product needs an honest, labelled demo path (`?dev=1` or an Owner-approved fixture) and a first-run screen that offers it as a primary choice. The offline tent should test the same path the user sees.
4. **The top-three mismatch is a governance issue.** The board law *expects* 36 and 60 at picks 13 and 27; the Owner's words are “top three.” The tests should not bless a product behaviour the Owner did not ask for. Until the Architect's `rawSort` lands, cap at 3 and show “+N tied” as one strip; then use the exact order.
5. **The phone is the test.** The 390 board is the most-used surface and the weakest. The no-h-scroll law is blind to 4–6-character name breaks, a dominant needs panel, and clipped rows. The next battery should measure **readability** (names break at spaces, first card above the fold, one action per card), not just width.

## The 12 ideas, ranked

| # | Idea | Why now | Effort | Engine? |
|---|---|---|---|---|
| 1 | Final-byte release gate + one-page `PROOF.md` | The package's own gate is red; the fix is order, not prose | M | no |
| 2 | Phone card deck (390) | The board is unreadable on the phone; the visual law is blind | M | no |
| 3 | Top three means three | 3/36/60 at picks 1/13/27; the law blesses it | S | `rawSort` later |
| 4 | Offline first run / one-file demo | The single file boots to “No player dataset yet” | M | no |
| 5 | Decision rail (`decisionVM` best value) | Wave B has the VM; the user needs a recommendation | M | no |
| 6 | Proof chip (user-facing `SeamCard`) | The trust data exists; it is dev-gated | S | no |
| 7 | Share card as a replayable story | Seed/pace/game-ball exist; the share is a stat dump | S | no |
| 8 | Board toolbar + one method disclosure | Sort below 60 rows; 60 repeated method buttons | S | no |
| 9 | Text-safe palette + rendered contrast | 3 known team holes; the gate is token-level | M | no |
| 10 | Calm motion budget | Sheen/toast/wall-slip are accumulating | S | no |
| 11 | The “why” as a structured decision | `whyFor` is a string; one VM should feed four surfaces | S | no |
| 12 | The experience laws | F13: the laws measure properties, not the experience | M | no |

Bonus: **13 · Team select as a colour grid** (the first screen is a long list), **14 · Coach's tape as a post-draft story** (Wave B's `coachTape` is untested and unwired).

---

## 1 · Final-byte release gate + `PROOF.md` (the highest-value process idea)

The package's own A3 instrument is the best thing in it: `state-blocks-fresh`, `freshness-map`, `status-freshness-agrees`, `acceptance-attestation` all correctly turned red at the final bytes. The failure is the **order**: status (06:51) → freshness (06:53) → block (06:54) → Wave B code (07:03–07:15) → final dist (07:16) → seal (07:17) → transport checksum (07:19). The release shipped the red gate under a green block.

**What to build.** One `tools/release.mjs` with a DAG and a `--check` mode:

```
source → build → test:engine → battery:node → battery:board → battery:shell
       → battery:visual → battery:slot → contrast → falsifiers
       → battery:waveb → battery:offline
       → shell-status → gen-freshness → gen-state-block → gen-seam-card
       → seal → SHA256SUMS (outside the artifact) → check-claims (full + packaging)
       → verify-package (converse clean)
```

Each generated artifact carries `{generatedAt, inputs:{path:sha256}, treeSha, distHash}`. `--check` fails if any input changed after the artifact, if the acceptance's `tree_sha_end`/dist ≠ the live tree/dist, if the seal count ≠ the live `CHECKSUMS` lines, or if the transport checksum is inside the artifact. The state block is generated last, after the gate is green; the block prints the real count. The `PROOF.md` is generated from the claims + receipts:

```
# Release proof — <tree> / <dist>
What changed (one paragraph)
Passed: 37/37 node · 24/0 board · … (table, each with a receipt hash)
Red: <named>
Not tested: <named>
Hashes: engine pin, tree, dist, seal, acceptance log
```

The Owner reads one page, not 31 KB of README + a stale state block. A stale `PROOF.md` is a release failure, not a wording problem. This idea closes the review's N1, N2, N3 (partly), N4 (partly), N9 and N10.

**Receipt:** `node tools/release.mjs --check` exits 0 on a clean tree; a copy with one stale receipt exits 1 naming the artifact and the changed input; `PROOF.md` is generated and matches the live hashes.

## 2 · The phone card deck (390)

The last 390 capture shows the problem better than any law: names break every 4–6 characters (“Jorua n Love”, “DeVon ta Smith”, “Trent Willia ms”, “Davan te Adam s”), the “MY NEEDS · 32 OPEN” panel takes the top of the viewport, and the rows clip. The desktop grid is fine; the phone needs a different component, not a narrower table.

**What to build.** `BoardCard.svelte`, used at `≤640 px` (container query or media query), with the desktop `BoardRow` untouched:

- **Line 1:** name (wrap at spaces, `hyphens: auto`, 2-line clamp), position, NFL team, a `TOP` chip for the three. The team colour is a small swatch, not a background.
- **Line 2:** four labelled chips — OVR, Wins, Priority, Gone — in a 2×2 or 4×1 grid; the gone chip opens the method on tap; the provenance is a title/aria description, not a second line. The values are the same `BoardRowVM`; no new engine field.
- **Line 3:** one full-width `Draft` button; `Fit` opens the flex chips in a bottom sheet; the row's disclosure is the card itself, not a separate “Draft at QB” control. The staged `Confirm the pick` path stays in the sheet.
- **The needs row** collapses to a sticky one-line “Needs: QB, EDGE, CB +2” with a count; the full list is the sheet. The first card starts within 120 px of the viewport top.
- **The toolbar** (sort/undo/seed/back-to-top) is sticky at the top; the `BoardFooter` keeps the legend only.

**Laws (the missing experience half):** no mid-word break in a name; first card top ≤120 px; one primary action per card; card height ≤140 px; no horizontal scroll (keep the old law); 390×844 and 360×780 screenshots in the proof. The visual battery's W4 already proves no-h-scroll; the new `board-card` law proves the card is usable.

**Why it is the biggest UX win:** the phone is the surface the Owner and a new user will actually hold. The desktop board is already a decent table; the phone is where the “top three” decision has to be obvious in one screen. This also makes the 390 screenshot a final-byte proof, not a pre-Wave-B relic.

## 3 · Top three means three

The final board battery's L13 prints: 3 top-three rows at pick 1, **36 at pick 13**, **60 at pick 27**; the `SHELL-STATUS` says 4 at pick 1 (“>3 only on an order tie, C′1's rule”). The prior review's F1 is still open. The test expects the tie extension; the Owner's words are “top three.”

**What to build.** Exactly 3 `TOP` rows by the board's active order; the 4th+ tied rows get a thin “+N tied” strip under the three, with a disclosure that lists them; the sheen and `TOP` badge appear only on the three. The `top3 === 3` law at picks 1, 5, 13, 27 and after every sort change; the existing falsifier mutants stay. The `decisionVM`/rail uses the same three; one source of truth. If the exact tie set is needed, the Architect's `rawSort` engine field is the principled input; until it lands, cap at 3 on the current order. This is a small product change with a big semantic win: a “top three” that highlights 60 rows is not a top three.

## 4 · Offline first run / one-file demo

The final `dist/single.html` under `file://` makes 0 external requests, logs 0 page errors, and then says:

> “No player dataset yet. … Import a dataset CSV to begin — or open a dev build with `?dev=1` (the engine's own bundled ratings, labelled DEV). Open the dev build →”

The real ratings are correctly out of the cutover. The product's first offline run is an import screen, not a draft; the offline tent waits for a team select that never comes. The honest demo path already exists (`?dev=1`); it is buried as a dev note.

**What to build.** A first-run screen with two equal cards: “Try the offline demo” (`?dev=1`, labelled **DEV**, the engine's own bundled ratings) and “Import the ratings CSV” (the real data path). The dev link becomes a primary CTA, not a footnote; the app shows a small “Works offline · no network” badge; the single-file build gets a “Save this game” download; the offline battery uses `?dev=1` (or an Owner-approved fixture) and asserts the same path. The real CSVs stay out of the cutover; the Owner's data ruling is unchanged. This turns the offline tent from a red claim into a product story: one file, one click, a draft that works on a plane.

## 5 · The decision rail — `decisionVM` as “best value at need”

Wave B has `decisionVM`, `heatStrip`, `pickConfidence` and `numProvenance`; the board still asks the user to read 60 rows. Make the VM the top-of-board rail:

- A three-card horizontal rail above the board: **Best value at your need**, **Best need fit**, **Best available**. Each card: name/pos/OVR/wins/priority/gone risk, a confidence bar, and one line of why.
- One-tap **Draft** on the recommended card; the board highlights the same three; the rail and the top-three set are identical. The `decisionVM` returns `{best, alternates, why, confidence, risk}`; no parsed text; the board, rail, panel, share card and feed use the same object.
- At 390 the rail is a horizontal snap scroller (one card + “2 more”) or a stacked first card; it must not add a screen of vertical cost. The card deck below is the full list.
- Confidence is honest: if the model has no basis, it says `UNKNOWN`, never a green default (the `SeamCard` pattern). The heat strip is the visual; the why is the explanation; the user can disagree and pick another row.

This is the “decision surface” the board has been missing: the engine's top three, the user's need, and the risk of waiting, in one place. It is shell-only; the VM already exists. It is also the natural home for the `why` object (idea 11).

## 6 · The proof chip — user-facing `SeamCard`

The `SeamCard` is dev-gated; the user never sees the engine pin, the build hash, the seed, the save state or the offline status. That is the trust feature the Wave B work was building.

**What to build.** A compact footer chip: `Engine 408410477 · Build 3f053afd · Seed b36:… · Offline ready · Save local`. Tap opens a proof sheet: engine pin, build hash, seed, last save, offline status, last gate (green/red counts), the Guide link. The chip reads a generated `proof.json` (the same source as `seam-card.json`); a missing field shows `UNKNOWN`, never a green default. The dev drawer expands the same file; one file, two consumers. The chip is not a developer seam; it is how the user knows the file is the real build and the draft is replayable. It also makes every screenshot self-identifying.

## 7 · The share card as a replayable story

The Wave B `pace`, `gameBall` and `seedExplain` are the ingredients; the share is still a stat dump. Make the share card a story:

> “You drafted **Brock Purdy**, **T.J. Watt**, **…**; the engine gave you a **12–5** season; the game ball was **…**; **replay this draft**.”

Show the seed (`b36:…`), the score, the game ball, the top three and a one-tap **Copy replay link**. The brag text does not leak the seed; the link does. At 390 the card is a vertical story card; at desktop a wide card; the same `gameBall`/`pace` VM feeds it. The “20-0” title stays; the story explains *why* the draft was good, not just the number. This is the natural sibling of the proof chip: the proof says “this is the build”; the share says “this is the run.”

## 8 · Board toolbar + one method disclosure

The prior F5/F6 are still open: `BoardFooter.svelte` renders the sort after the board (below 60 rows), and each row carries a method `cp-sr` button, so the board repeats the same gone% explanation 60 times and the tab walk is huge. Make the toolbar and the method one:

- A sticky toolbar above the board: sort segmented control, undo, new seed, back-to-top, the needs count. The footer keeps the legend, not the sort.
- One “How gone% works” disclosure in the board header; the per-row method becomes the `aria-describedby` target of the one description; the 60 `cp-sr` buttons go. The board becomes an ARIA grid with roving tabindex (one tab stop for the grid, arrows within), a “skip to board” link, and the row disclosure on Enter.
- The L20/N26 laws become DOM/VM value laws, not source-string laws; the tab count drops; the user can sort without scrolling to the bottom.

## 9 · Text-safe palette + rendered contrast

The contrast battery is 2/0 with 3 known team holes; the prior review measured light gold 1.51/1.65:1 and dark text 3.17:1. The gate still records the holes as “known.” The shell's text is not a token-pair problem; it is the actual rendered text at 390 and 1180.

**What to build.** A text-safe token layer: body text is a neutral with ≥4.5:1 on both themes; team colours are accents, never body-text backgrounds; the gold `TOP` is a chip with dark text, not gold body text; the dark theme body is a light neutral, not pink on plum. The contrast battery checks rendered text (computed colour + font size + background) at 390/768/1180, not just token pairs; the 3 team holes either close or are named in the UI (a “low contrast team accent” note), not only in the gate. The user's team stays blue (`.ub`). This is the least glamorous idea and the one every phone user feels.

## 10 · Calm motion budget

The top-three sheen, the toast, the wall-slip, the phone card and the takeover tint can accumulate into noise. Set a budget: at most 12 animations per surface, ≤200 ms, no animation on the board's first paint, `prefers-reduced-motion` renders instantly; the sheen only on the three; the phone card uses a 120 ms slide; the board scroll is native. Motion should explain a change (a pick landed, a sort changed) not decorate the page. A `motion` law can count the animations and assert the reduced-motion path; the `board`/`visual` batteries already check page errors and reduced motion in places.

## 11 · The “why” as a structured decision

`whyFor` returns a string today; the panel, the board, the feed and the share card each format their own copy. Make it one object:

```ts
type Why = { headline: string; drivers: {need:number; value:number; risk:number}; confidence: 'high'|'medium'|'low'|'unknown'; source: string };
```

The board row shows the headline; the rail card shows the headline + confidence; the panel expands the drivers; the share card uses the headline; the feed uses the same object. No parsed display text (the Wave B `W2b` law). The `numProvenance` supplies the source; the `SeamCard` shows `UNKNOWN` when a field is missing. The why is sort-aware and tie-aware: “Best value at your need: EDGE, +1.8 wins, 62% gone by your next pick” is a decision; “Top priority” is not.

## 12 · The experience laws (the missing half of F13)

The property laws are green on what they measure; they do not measure the experience. Add three:

- **Readability:** no mid-word name break at 390/360; first card top ≤120 px; one primary per card; card height ≤140 px; the row does not clip. Screenshot-based; the card deck is the fixture.
- **Comprehension:** a first-time user can answer “who should I draft?” from one screen (the rail + the top three) in a 5-person test; the script asks the question, the user points, the answer is recorded. This is a human check, not a CSS check; it is the law that the board is a decision surface.
- **Visible-scene:** the capture's main region is not the intro overlay; `elementFromPoint` at the board's centre returns the board; the left s2 fix. The structured non-vacuity join stays; the marker gains an occlusion check.

These laws are cheap compared with another Wave B experiment; they are the difference between “the tests pass” and “the board works.”

---

## Bonus ideas

**13 · Team select as a colour grid.** The first screen is a long list of 32 teams; the Owner's 32-team colour table is authoritative. Use a grid of team cards (colour band, logo, division, a one-line identity/needs), with the user's team in blue; the 390 grid is two columns; the slot flow (P-317) stays. The first impression becomes the team's colour, not a scroll. No new data; `teamRatings`/`teamIdentity` already exist.

**14 · Coach's tape as a post-draft story.** The `Complete` screen has the roster and the wall-slip; the Wave B `coachTape` is unwired. Add a post-draft “coach's tape” tab: the top three picks with the engine's why, the biggest value/reach, the game ball, the season projection, and a share. This is the story that makes the 20-0 brag mean something; it uses the existing `decisionVM`/`gameBall`/`pace`, not a new engine.

---

## What not to do

- **Do not add another Wave B experiment before the release gate.** The package already has more evidence code than it can run; the seam card, Wave B battery and offline tent are the proof.
- **Do not hand-edit the state block, status or seam card.** Regenerate them in the release order; a hand-edited block is the failure mode the A3 claims exist to catch.
- **Do not hide L20/N26/N27 with `biome-ignore` or by deleting the laws.** Re-point them to DOM/VM behavior; the Wave B provenance is an improvement, the laws are stale.
- **Do not ship a synthetic dataset without the Owner's approval.** Use the engine's `?dev=1` demo or an Owner-approved fixture; the real ratings stay out of the cutover.
- **Do not cap the top three with a display-rounded sort.** Use the exact order or wait for the Architect's `rawSort`; the review's F1 is a semantics problem, not a CSS problem.
- **Do not squeeze the table at 390.** Use the card deck; the no-h-scroll law cannot see the unreadability.

## Receipts — how each idea is proven

| Idea | Proof |
|---|---|
| 1 release gate | `release --check` exit 0 on a clean tree; exit 1 on a stale receipt; `PROOF.md` matches the live hashes |
| 2 phone card | 390×844 and 360×780 screenshots; no mid-word break; first card top; one primary; card-height law |
| 3 top three | `top3 === 3` at picks 1/5/13/27; the “+N tied” strip; the falsifier mutants still die |
| 4 offline | `battery:offline` with `?dev=1`; `offline-tent.json`; 0 external requests; the first-run CTA |
| 5 rail | `decisionVM` golden; rail ids === top-three ids; 390 snap scroll; one-tap draft lands |
| 6 proof chip | `SeamCard` golden; `proof.json`; a missing field renders UNKNOWN |
| 7 share | seed/score/game ball/top three; replay link; the brag text contains no seed |
| 8 toolbar | sort above the board; one method; tab count drops; roving grid |
| 9 contrast | rendered-text check at 390/768/1180; the 3 holes close or are named in the UI |
| 10 motion | animation count ≤12; reduced-motion instant; no first-paint animation |
| 11 why | `whyFor` object; the same VM on board/rail/panel/share/feed; no parsed text |
| 12 experience | readability/comprehension/visible-scene laws; the 390 screenshots; the left s2 is not the overlay |
| 13 team select | 32 cards; the colours; 390 two-column; the P-317 flow unchanged |
| 14 coach's tape | the post-draft story; the `coachTape` golden; the share uses the same VM |

## The next round in one page

- **First:** the release gate + re-run + `PROOF.md` + the top-three cap. No new features. The package's own gate should be green before any UI work starts.
- **Second:** the phone card deck + the readability/comprehension laws + the final 390 screenshots. This is the biggest user-visible win.
- **Third:** the offline first-run demo + the decision rail + the proof chip. The demo makes the one-file promise real; the rail makes the top three a recommendation; the chip makes the build trustworthy.
- **Fourth:** the share story + the toolbar/one method + the text-safe palette + the motion budget. The polish that makes the board feel finished.

The Architect re-ranks; the queue decides who takes it; nothing here is assigned to a seat. The prior 12 ideas remain the backlog; this file is the round-2 delta. The engine stays the Architect's; the shell is the council's proposal.
