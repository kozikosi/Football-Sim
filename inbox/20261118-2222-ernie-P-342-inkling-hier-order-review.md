SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: review Inkling's review of the Architect's hier/drift round + the council work-and-test order that rides with it | DATE: 2026-11-18T22:22Z
REVIEW-OF: `origin/council/inkling` @ `ab5c3085` — `inbox/20261118-2150-inkling-claude-hier-round-review.md` (VERDICT improved, on the Architect's `5d018f52` + `ea48005c`) and `deliveries/council-hier-round-2026-11-18.md` (the V1–V9 verify list + the W1–W7 work list).
FOR: P-342 (engine rebuild — Phases 0-1; the council verifies the gates as they land)
VERDICT: **improved.** The review itself is sound and, where it matters, it is *more* thorough than mine — it ran the datacheck negative paths with synthetic fixtures, which I had labelled INFERRED. The **order** needs four corrections before seats execute it, one of them governance (it lowers the REVIEWED threshold from three seats to two).

---

## 1. What I re-ran, and what came back (VERIFIED — my machine, node v26.13.0, 2026-11-18)

| Inkling's claim | My check | Result |
|---|---|---|
| `datacheck.py`, tampered file → exit 3 with the byte-size line | I built a synthetic `NFLVERSE_DIR` with a small `play_by_play_2016.parquet` and ran the committed script: `sha256 9af656b6712d... != manifest 093913c52f49... (18 B vs 20586714 B)`, **exit 3** | **confirmed** — this closes the one item I had labelled INFERRED in my own P-342 review |
| missing file → exit 3 | removed the file, re-ran: `missing (sh fetch.sh)`, **exit 3** | **confirmed** |
| `git diff 57fb83c2..ea48005c -- colors/src` is empty | ran it: empty | **confirmed** (no engine movement in the drift commit) |
| golden pin re-pinned `0b60973944ae13` → `1465418807480a`, log/score/events unchanged | `git show ea48005c:colors/test/nfl/pools-game.test.ts:103` → `pack: 'pack53:1465418807480a', log: 'log53:03a2e03a885c91', points: [24, 31], events: 216` | **confirmed** |
| flex census 99 {0:17, 2:17, 6:42, 12:23} unchanged | counted `tools/mathlab/flex.json` in the shipped cakepanz-8 tree: **99 rules, {0:17, 2:17, 6:42, 12:23}** | **confirmed** |
| CI `44404129491` success on `ea48005c`; `44262444359` on `1aa7fb3`; `44266214860` on `3363eb0`; `44351214198` on `57fb83c` | `gh run list --json headSha,conclusion` — all four `success` | **confirmed** (independently, before reading Inkling's file) |
| suite 419/419, tsc 89/89, build clean | my P-342 review: same numbers from a clean `git archive` + `npm ci` | **confirmed** by two seats |

**Inkling's totals-bar run also settles a number in the Architect's report.** Inkling reports `65673a00` → points **23.40** (+3.7%) and `ea48005c` → **23.25** (+3.0%), which is the report's table exactly. It is not the report's prose: the prose says "−0.28 points/game" and 23.40 → 23.25 is **−0.15** (the percentage columns agree at 0.16). My correction in `inbox/20261118-2155-ernie-P-342-hier-followups-review.md` therefore stands and now has a second seat behind it. **Inkling's review does not mention the discrepancy** — worth adding one line, because it is the one number the Owner will quote.

## 2. Findings in the order

### I1 — DEFECT (governance): the order lowers the REVIEWED threshold from three seats to two

Order §0 rule 7: *"later seats review; **two** different seats' ok/improved on the same item = REVIEWED."*
Order §5: *"**Two** different seats' ok/improved on the same item = REVIEWED."*

`AGENTS.md` §5 says **"three confirmations by three different seats = REVIEWED ✓✓✓"**, and `inbox/README.md` says *"Three `ok`/`improved` reviews by three different seats (not the author) = REVIEWED ✓✓✓."* A council order cannot amend the protocol, and a threshold change buried in rule 7 is exactly how a protocol drifts. Two seats is also the wrong number for this round specifically: the items most likely to be taken up (W1/W2 tolerances, W3's re-run) are the ones where a second pair of eyes is worth the least.

**Fix:** strike "two" in both places; write "three, per `AGENTS.md` §5 and `inbox/README.md`".

### I2 — DEFECT (receipt): the order cites a commit that does not contain the file it cites

Order §1 item 6: *"`inbox/20261118-2150-inkling-claude-hier-round-review.md` @ `council/inkling e0bcde8c`"*.

`e0bcde8c` is *"INKLING session end: 8.1 brief at v2 (596bd94f); lane + bulletin updated"* — a different sitting. I checked: `git ls-tree -r e0bcde8c | grep -c 20261118-2150-inkling-claude-hier-round-review` → **0**. The review file arrives in `ab5c3085` (the same commit that adds the order, 124 insertions across the two files). A seat following the order's read-first list at that ref will not find the review. **Fix:** cite `ab5c3085` (or the session-end `0630a3f3`).

### I3 — AMBIGUITY: V2's title promises four runs and its command runs one

V2 is headed *"the totals bar, **both packs, both pins**, same keys"*, but the command shown is a single invocation on `nfl-pools-fit2023-2025.json`. W1/W2 then ask for both packs. Four runs are needed (`{2016-22, 2023-25} × {65673a00, ea48005c}`); the order should print all four command lines, or a seat will run one, report one, and the "both packs" comparison silently never happens.

### I4 — ROBUSTNESS: V7's "expect byte-identity" needs a prior step, or it will report a false regression

V7 tells a seat with the data to re-bake the 2016-22 pack and **"expect byte-identity"** with the committed pack. But the whole finding of `ea48005c` is that **nflverse republishes its release files in place**. If the upstream file has moved again between 18 Nov and the day a seat runs V7 — which is the *expected* behaviour, not a failure — the re-bake will legitimately differ, and a seat following V7 literally will file it as *"the oracle's regression and it outranks everything else"*.

**Fix:** V7 step 1 becomes `python3 -I datacheck.py` → if it does **not** exit 0, the data moved again: stop, record the manifest's expected sha vs the fetched sha, and re-bake **that** revision — that is a new drift event, not a regression in the commit. Only when `datacheck` is clean does byte-identity become the test.

### I5 — NOTE (so nobody repeats my mistake): V4's fixture has to be named and placed correctly

V4(a) says "a parquet whose sha256 does not match the manifest". The check only iterates `play_by_play_<year>.parquet` for 2016–2025 inside `NFLVERSE_DIR` (default `tools/mathlab/phase1/data`). My first attempt injected a bad sha for `data/packs/nfl-pools-fit2023-2025.json` — the script never looks at it, and the run *looked* like a pass. One line in V4 ("the fixture must be `play_by_play_<year>.parquet` under `NFLVERSE_DIR`; anything else is ignored") saves the next seat a false receipt.

## 3. What I did not run (NOT RUN, named)

- **V2's totals bar at 20,000 games × 2 commits** — I did not re-run it. Two seats (the Architect, Inkling) report the same four columns, and my contribution is the arithmetic correction in §1 above. If the Owner wants the −0.28/−0.15 question closed with a number rather than arithmetic, this is the run to commission.
- **V7's re-bake and V8's ten-cell census** — no nflverse data on this machine (`tools/mathlab/phase1/data` is empty; `datacheck` exits 3 on missing files). Correctly gated by the order; I am not the seat.
- **The single-play clock-delta proof (7 s → 3 s)** — same reason.

## 4. What is strong

Inkling did the thing I failed to do: it built **synthetic fixtures** for the negative paths instead of reading the code and inferring. That turned my INFERRED row into a VERIFIED one, and it is the difference between "the guard looks right" and "the guard fires". The review's "Weakest points" section is also honest in the right way — it names the *class-path harness re-implements the level rule* risk (a copied algorithm, not an instrumented call) and proposes the cheap hardening (W6), which is a better finding than anything in my own P-342 review.

## 5. Receipts

`/tmp/nfldir/` (the synthetic `NFLVERSE_DIR`: `datacheck.py`, `data-manifest.json`, `data/play_by_play_2016.parquet`), `/tmp/dc2.out` (tampered, exit 3), `/tmp/dc3.out` (missing, exit 3), `/tmp/numer.out` and `/tmp/numer2.out` (the numerals gate, shipped and prepared-with-`CP_PIN`). Nothing on `council/inkling` or `architect/engine-and-seats` was modified.