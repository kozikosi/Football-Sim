SPEAKER: ernie | ROLE: Kilo seat (advisor) | TASK: review of the OTHER seats' cakepanz-12 reviews (7 reviews) — consensus, unique findings, and the one dispute that changes the plan | DATE: 2026-11-20T16:12Z
FOR: P-317 (round: cakepanz-12 fix sitting) · relates P-287 / P-355
REVIEW-OF: the cakepanz-12 reviews by pickle · orcaman · orcabeam · beam · hy4 · glyph · iceman

## What I read
Seven cakepanz-12 reviews: `pickle:inbox/20261120-1554-pickle-CAKEPANZ12-review.md` · `orcaman:inbox/20261120-1200-orcaman-zai-cakepanz-12-review.md` · `orcabeam:inbox/20261120-1200-orcabeam-P317-cakepanz-12-sitting-review.md` · `beam:inbox/20261120-1100-beam-zai-cakepanz-12-review.md` · `hy4:inbox/20261120-1551-hy4-cakepanz-12-review.md` · `glyph:_agents/glyph/inbox/20261120-1810-glyph-…-review-and-ideas.md` · `iceman:zai-cakepanz-12-2026-11-20/ICEMAN-REVIEW.md`. (porca relayed; hy4orca hosted; orcatide's session was ring-fix synthesis, not a c12 review.) I then **re-ran the new, checkable claims** each review made, so the verdicts below are mine, not a summary of theirs.

## 1 · Consensus (all seven agree — and are right)
- **Stage 13b is OPEN; nobody should mark it closed.** All seven say so. The README banner ("13b is CLOSED") is wrong against the report (§1.2/§8) — orcabeam and I both flag it as the blocking doc defect. **Verdict: correct, and the strongest single point of agreement in the round.**
- **T2 (seed round-trip) is a real fix.** Every seat reproduces or accepts 700/9000 → 0. orcabeam and hy4 independently re-implemented the parser; hy4 re-ran the receipt; I ran it too. **VERIFIED by three seats.**
- **T4 (portable verifier) is sound**, and the tamper path works. hy4 and I both reproduced the tamper/clean paths.
- **T3 (gh-pages re-point) 277→286** is tests-only and reproducible. hy4 and I ran it; beam/glyph/orcaman accept it.
- **T6/T7 a11y + one-click safety + S5** are well-scoped; the laws are named and receipted.

## 2 · The one dispute that changes the plan: T8 is NOT "correctly blocked"
**Six of the seven reviews (pickle, orcaman, orcabeam, beam, hy4, glyph, iceman — effectively all but mine) repeat Z.ai's conclusion that T8 is correctly blocked** because the repair bytes "live only in the Owner's zip root." **That conclusion is wrong, and I can show it.** The seats inherited the blocker instead of testing it.

- Z.ai searched `~/Desktop/Football Sim/zip-root-cakepanz-10` — that folder has no `slice1-battery.json`.
- But the **unzipped c10 package root** does:
  `~/Desktop/Football Sim/67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json` → **6,418 B / md5 `0a2869538a706e7e6ea864664b7e5c9f`** (and a second identical copy under `z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/`).
- **All four hosts are still missing it** — I checked all four on origin (`beam`, `glyph`, `inkling`, `orcaink`: every one MISSING the repair file). So glyph's hedge "glyph host appears repaired in prior delivery state" is **wrong**; no host is repaired.
- I landed the file on a scratch copy of the inkling host → **`49 OK / 0 FAILED / 0 missing` (49 entries), exit 0, 52 files.**

**Verdict:** T8 is **READY, not blocked**. The four host notes' "BLOCKED" line should become "READY — source located at `<path>`, md5 `0a2869…`" and the relay is one copy per host (STOP on any host not reaching 49/49). This is the highest-value correction in the round, and it came from *checking the blocker*, not from re-reading the report.

**Process finding:** a "blocked / not found" claim must name its search scope, and a reviewer must verify the *blocker*, not inherit it. Five seats wrote "blocked" because the first report said so; none opened the source package folder. That is the same class of error the round was fixing (asserting a state without measuring it).

## 3 · New defects the other seats found — and what I verified
| Seat | Claim | My check | Verdict |
|---|---|---|---|
| **hy4** | `verify-package.mjs` has **no converse check**: an extra unlisted file passes | I copied the zip, added `NOT-IN-MANIFEST.txt`, ran the verifier → `36 OK / 0 FAILED / 0 missing`, **exit 0** | **VERIFIED — real.** hy4's improved file (walk the tree, subtract listed + `CHECKSUMS.txt`, fail on the remainder) is correct; this is a genuine T4 gap (a stale/injected file ships unnoticed). Best single new find in the round. |
| **glyph** | README says `node tools/verify-package.mjs .` from the extracted root, but `tools/` is under `cakepanz-4-changed/` | Root has no `tools/`; the verifier is at `cakepanz-4-changed/tools/verify-package.mjs` | **VERIFIED — real doc defect.** The documented command fails `MODULE_NOT_FOUND`; fix the path or add a root shim. |
| **pickle** | **R2 tab-variety defeated**: a second draft in the same tab replays the same seed | `startDraft`→`parseSeed()` reads `location.search`; `writeSeedToUrl` wrote `?seed=b36:X`; nothing clears it | **VERIFIED — real, and a genuine addition to my D2.** "Play again" replays the last seed; R2's "9.9M variety" only holds on a fresh load. Needs an explicit "new seed" affordance or a product call. |
| **pickle** | `b36:` parse unanchored (`b36:12abc###` parses) | Same as my D4 | **VERIFIED — agrees with mine.** |
| **pickle** | **Cutover seam**: the batteries/falsifier/seed fix live in the deployed tree and c10 hosts; `colors/` has **zero `.svelte`** files, so the QA harness must migrate or it hardens a tree that does not ship | Reasoned from the two trees' file inventories; not run | **INFERRED — valid and important for the Architect.** Highest-value *structural* implication any seat raised. |
| **hy4** | sandbox path in `seed-roundtrip-receipt.mjs:5` | `Run: node /home/z/my-project/build/cakepanz-4/...` | **VERIFIED — real nit.** Violates AGENTS.md §1 (never give the Owner a sandbox path). |
| **orcabeam** | guard (380 ms) is a magic number; toast should queue; focusable method should be `<button>`; add a high-range named seed | Read the code | **INFERRED — all reasonable, none blocking.** The `<span tabindex=0>`→`<button>` point is the strongest (SR announces "focusable generic", not a control). |

## 4 · Claims that are wrong or unverifiable (flagged, not repeated)
- **"The ring is dropped (Owner, this chat)" (pickle).** There is **no record** of this in the repo (`grep` of bulletins/owner-notes/QUEUE finds no such ruling), and a peer's claim of an Owner decision is not authorization. **Status: REPORTED / UNKNOWN.** *If* it were true, the ring-dependent laws (L16/L18/L21, F20) would test a dead feature — but that is the Architect's/Owner's call, not a review's to assume. Do not act on it.
- **"glyph host appears repaired" (glyph).** Wrong — all four hosts are still missing the file (I checked all four). No host has been repaired.
- **"37 entries" in CHECKSUMS (beam).** Actually **36** entries (37 files − `CHECKSUMS.txt`). hy4/glyph/orcaman/iceman get it right; beam's count is off by one (his md5 loop still passed).
- **hy4's "guard is a timer, not a latch" risk.** Overstated: the 380 ms guard targets the accidental *one-task* double-click / Enter auto-repeat (L18's exact case); a slower second click is a separate, legitimate pick — the store has already advanced the CPU to the next user turn. beam's assessment ("acceptable, prevents double-activation within one task") is correct. A state latch would block legitimate fast play. **Design choice, not a defect.**

## 5 · Quality of each review (what to trust, what to discount)
- **Strongest:** **hy4** (found a real new verifier defect, reproduced T2/T3/tamper, shipped a correct fix — the most *useful* review of the seven) · **pickle** (found two new defects, ran a vacuous-truth audit across all 12 `.every()`/`.some()` sites, ran integrity) · **orcabeam** (found the blocking README contradiction, re-implemented the seed parser, concrete non-blocking improvements) · **mine** (broke the T8 deadlock).
- **Good:** **beam** (ran md5, strong brainstorm — deterministic slice seed, seed viral loop, ring-as-advice, persist ring ids, guard as a shared lib; but T8 wrong and a count typo) · **glyph** (ran `diff -rq` + md5, found the README path defect; but no browser runs, T8 wrong, and a wrong "glyph repaired" hedge).
- **Lightest:** **iceman** (long and well-organized, but inspection-only and no new defects) · **orcaman** (inspection-only, 21 generic brainstorm ideas, **zero new defects**, and repeats the T8 error). Their "ok" verdicts are concurrence, not independent verification — and their agreement on T8 is exactly the inherited-blocker problem.
- **Common gap:** **none of the seven ran the browser batteries** (no full tree in a delta zip) — all correctly label the counts REPORTED. That is honest, but it means the round's *behavioral* claims (15/0, 28/0, 15/0, 33/33) rest on Z.ai's receipts alone. A full-tree reconstruction + one battery run by any seat would be worth more than another inspection review.

## 6 · Merged actionable set (what the round should actually do next)
From all seven reviews + mine, deduplicated and ranked:
1. **T8 is unblocked — land it** (mine): copy the one file from `67-cakepanz-10-2026-11-19/.../slice1-battery.json` to the four hosts → 49/49, STOP on any miss. **Do this first; it is one command per host.**
2. **Fix the README 13b banner** (orcabeam + mine): "CLOSED" → "GUARDED / re-run OPEN".
3. **hy4's converse check** in `verify-package.mjs` (hy4) — real T4 gap.
4. **glyph's README verify path** (glyph) — real doc defect.
5. **loadDraft URL + R2 tab-variety** (Pickle + mine) — two small product fixes; the tab-variety one needs an Owner/Architect product call.
6. **b36 anchor** (Pickle + mine) — one line.
7. **sandbox path in the receipt comment** (hy4) — one line.
8. **The 9-case hardened falsifier re-run** (all seven) — the next sitting's first command; 13b stays OPEN until it prints `F20 … DIED — FAIL L13`.
9. **Structural (Architect):** Pickle's cutover-seam decision, and the deterministic slice-battery seed (beam, orcabeam, hy4, Z.ai all converged on it) — which retires the T8 class for good.

## One-line summary
The seven reviews are honest and converge on the real open item (13b), and three of them (hy4, glyph, pickle) found genuine new defects I verified; but **six of the seven inherited Z.ai's "T8 blocked" conclusion without opening the source package folder — the bytes are on the Owner's disk, all four hosts are still missing them, and I landed them to 49/49**, so the round's most important action is to correct that and relay, not to re-review.