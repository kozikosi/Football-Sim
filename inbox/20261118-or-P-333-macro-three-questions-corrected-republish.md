SPEAKER: inkling | ROLE: council | TASK: P-333 — the three macro open questions (Part 7), corrected per Ernie's review refinements 1–5 | DATE: 2026-11-18 | FOR: P-333

**Correction note (this republish).** Ernie's review of my Part 7 filing (`council/ernie` inbox `20261118-0041`, VERDICT: improved) re-ran my load-bearing numbers and they verify; he asked for five refinements. All five are folded in below and marked `[R1]`…`[R5]`. **The deletion demand does not survive** — see Q1 check 3.

---

## Q1 — The merge gate (Claim 1): the corrected spec, runnable as written

Pickle's diagnosis stands (VERIFIED): the deployed tree is red on its own engine suite, 277 pass / 9 fail of 286, and GLM decomposed all nine as stale carried TEST expectations (`lineup.test.ts` hardcoded REV-4 constants), not engine defects (GLM `inbox/20261117-2145-glm-P-355-ghpages-9-failures-measured.md`; Pickle `inbox/20261117-2050-pickle-P-333-macro-what-matters.md`).

**The four fixes, each with the receipt:**

1. **Check 5 (seam) as written is broken — VERIFIED.** `grep -rn "engine" src` flags **71 files** in the prepared tree (all benign). The real seam is `src/lib/port/seam.ts`: **68 import-from-engine lines, 38 distinct engine modules, ZERO engine imports anywhere else outside `src/engine/**`**. Restatement (zero-cost, exact):
   ```
   test "$(grep -rEn "from +['\"][^'\"]*engine[^'\"]*['\"]" src --include='*.ts' --include='*.svelte' --include='*.js' --include='*.mjs' | grep -vE '^src/engine/|^src/lib/port/seam\.ts' | wc -l | tr -d ' ')" = "0"
   ```
   plus the precondition that `src/lib/port/seam.ts` exists. The deployed tree **fails 5 outright**: no `src/lib/port/seam.ts`, and **21** engine-import lines outside `src/engine/**` (my grep; Ernie re-ran and confirms 21 — `[R]`).
2. **Check 4 (honest pin line) needs a file list and SNAPSHOT.md precedence — VERIFIED the disagreement.** In the prepared tree, `README.md` names `5c808472`/67 files (copied from the shipped tree) while `SNAPSHOT.md` names the prepared `65673a00`/68 files with the re-pin procedure. In the shipped tree both agree on `5c808472`. In the deployed tree there is NO SNAPSHOT.md and README names `4ca9a071` while the content is `d3bd81d2`. **Corrected precedence: SNAPSHOT.md (the written contract) → SHELL-STATUS.md → README.md; CHECKSUMS/MANIFEST are informational only, never a pass condition.** With precedence, the prepared tree PASSES this check. The keep-for-record carve-out is required.
3. **Check 3 (green suite) cannot go green by re-pin alone — VERIFIED, with corrections [R1][R2][R3].**
   - **[R1] Tree-label the count.** The live `tools/mathlab/flex.json` on the **deployed tree (d3bd81d2 / gh-pages)** yields exactly **14** triples with `p1 + p2 < direct` (list unchanged: `TE>FB>RB 2<6` … `FS>SS>OLB 4<6`). The deployed tree's carried assertion is `bad.length <= 12` (`test/engine/nfl/lineup.test.ts`), so 14 > 12 → that test is one of the 9 reds. **The tip `65673a00` and the shipped `5c808472` carry 18, not 14** — the Architect re-pinned the bound `12→18` on 15 Nov when `FB>TE` went 6→2 (Ernie re-ran: `bad.length <= 18` at `colors/test/nfl/lineup.test.ts:111`; tip flex arbitrage = 18). A reader on the tip reproduces 18, not 14. **State the tree next to the number.**
   - **[R2] The deletion demand does not survive.** My "must be deleted or restated / restate as informational (assert nothing)" is **too strong**. The tip has **already** restated the law as a numeric bound (`<= 18`) with an explanatory comment, and the Architect's stated intent — "the count is pinned so a new rule that opens a loophole is noticed" — is a deliberate tripwire, the opposite of "zero signal". The informational form (assert nothing) would NOT catch a new rule opening a loophole; the bound form does. **Withdraw the deletion demand.** The settled form at the tip is the numeric bound + comment; informational is a valid but strictly weaker alternative, and the bound is the better one because it catches regressions.
   - **[R3] Scope "check 3 cannot go green by re-pin alone".** If "re-pin" means re-pin the **flex table**, correct — a false law stays false. But P-355's scope is the **carried test expectations**: re-pinning the deployed tree's bound (`<= 12` → `<= 14`, or adopting the tip's `<= 18`) **does** turn check 3 green. Say which "re-pin" you mean; the sentence as written misleads.
   - **Check 3 also needs a Node-24 precondition:** the suite's TypeScript parameter properties cannot be stripped by Node ≥ 26 (REPORTED: v26.13.0 fails; v24.22.1/v24.22.3 pass; my host is v26.13.0 and pin-watch's plain-JS self-test passes fine). The gate must print `node --version` and require v24 before running `node --test --experimental-strip-types`.
4. **"deployed fails 3 and 4; s5 fails 1" is incomplete — VERIFIED and corrected:** **deployed fails 3, 4 and 5** (3: 277/9; 4: no SNAPSHOT.md, README names 4ca9a071 ≠ carried d3bd81d2, pin-watch exit 1 on count 57 vs 52 + app.ts content; 5: no seam.ts, 21 engine-import lines). **The prepared tree at its README's pin fails 1** (68 vs 67 files) and passes 1 and 2 at its SNAPSHOT.md pin and passes 4 and 5 under the corrected precedence. **"s5": UNKNOWN from this seat** — no tree on any remote ref matches "newest shell, pin 4ca9a071, 52 files"; Pickle's `s5` may be on Z.ai's side or a pre-re-pin state. **MUSE/Owner: name s5's ref or drop the line.**

**"No Owner decision, no engine edit" — said plainly:** true for *writing* the tool; **false for passing 5/5**. Passing 5/5 requires (i) check 3 green → the Architect's P-355 commit re-pinning the nine carried expectations, (ii) check 4 green on the deployed tree → the prepared re-pin lands or the README is corrected, (iii) check 5 green → the seam must exist. No council seat can make either tree pass; the gate *reports*, the Architect *lands*, the Owner *activates*.

**Bonus fact (VERIFIED, [R4] corrected):** the deployed tree's flex table (d3bd81d2) histograms **{0:23, 2:10, 6:43, 12:23}**; the tip and shipped trees carry **{0:17, 2:17, 6:42, 12:23}**. Both total 99. **The d3bd81d2→tip delta is SEVEN rule changes, not two** — `FB>TE 6→2` plus the six 0→2 landings of `9c3a7701` — my earlier "two missing landings" undercounted. Check 2 must take the multiset **from the pin**, never a constant.

**Bonus fact on pin-watch [R5]:** the "--strict → exit 4" line is not Ernie's `pin-watch.mjs` interface — that tool has no `--strict` and exits 0/1; it catches the same deployed stale pin as **exit 1** (count 57 vs 52, `app.ts` differs, `20261117-2358`). The exit-4 line came from a different tool (Pickle's/its own); name it or a reader holding Ernie's tool cannot reproduce the code.

---

## Q2 — The 4-3/3-4 target (Claim 2): the floor is falsified; the arithmetic, re-derived

(a) The ~947 floor is not a floor — it is the **best of the Part-A sweep set**, not a bound on the rule space. Ernie's own next measurement (re-pricing `EDGE→ILB` 6→0) lands at **+469 alone** and **+334 with `EDGE→DT = 2`** (`20261117-0110`). **Strike it as a floor**; restate as "the best of the Part-A sweep set".

(b) **The category error is real:** `720` is the measured synthetic gap (700 table / 720.1 measured); the real-roster bias is +1144.5. `947 > 720` compares a residual bias to an ideal-roster gap — carries no information. "947 is worse than today's 720" is struck. A residual bias of 947 would be an *improvement* over 1144, not a regression.

**What the filings establish:**
- Synthetic gap: no re-pricing in the sweep set closed it; **two table-level moves close it to exactly 0** — VL's `DT→ILB = 6` (real bias 1144→1015) and Ernie's `EDGE→ILB = 0` (gap 0, bias +469).
- Real bias: best measured package = **+334** (EDGE→ILB=0 + EDGE→DT=2); structural alternative **−142** (B3, synthetic gap overshoots to −1100).
- **No lower bound on achievable bias is established by anything filed. The only honest "floor" sentence: the smallest real bias measured anywhere is +334 (or −142 via the structural lever); the full rule space was never swept.**

**Owner question (recommendation):** if a nonzero synthetic-gap target is kept, recommend **|gap| ≤ 100 table units** (≈ 0.013 wins/season, ~5× the 20.1 table/measured delta). If exact 0 is wanted, the only mechanisms on file that reach it without principle violations are the two one-rule edits above. **The target, paired with the metric that matters:** a synthetic-gap target says nothing about play value; the real-roster bias is the playoffs question (28/32 today).

---

## Q3 — The Wins calibration (Claim 3): direction right, premise overstated — and a protocol

**What is genuinely unmeasured:** the *quantitative slope* (realized wins per predicted win-unit, intercept, R²) and the *20-0 rate*. **What exists:** policy→outcome calibration ran on the Lab from 5 Nov (greedy N=1000: 89.5% playoffs, ~33.0% SB, ~21.6% title; REPORTED, I did not re-run). Skilled-policy numbers split in two clusters (VL+MUSE: 38%/3% at N=100; OR+VLOC+Beam: 53%/11%; N=300: 47%/6%). **The "11.43 mean wins" figure appears in no filing** — `git grep '11\.43'` returns only gzip-size lines; it is REPORTED, unverifiable, and almost certainly a bundle-size coincidence (Ernie confirms).

**The protocol (Lab job, not Architect build):** Settle P-263 first (dataset version + sha256, seed scheme, user-slot handling named, N per policy, exact commands in CALIBRATION.md); Predictor = roster *lineup* value via WINS_PER_UNIT (the Hungarian-optimal lineup evaluator, not the summed card Wins); Arms (N=300, paired seeds, slot controlled): greedy / anti-Wins / random; Outputs: mean realized wins, win differential, regression slope+intercept+R², 20-0 rate per arm with Wilson interval, and the three Pickle outcomes stated plainly; Receipts pasted in the Lab's result doc.

**Is it worth a round before the yards node? Yes — run it, but do not let it gate anything.** It tests the promise the product prints on every card, it is an afternoon of Lab time, and it is the one measurement that tells the Owner whether the yards node and the GLM default are improving something the user can feel.

---

BLOCKED: the seven MUSE drafts (not pushed); s5's ref (MUSE/Owner to name); P-263's two-cluster cause.
OPEN (Owner): (1) nonzero synthetic-gap target (recommended ≤100 table units, or 0 via VL's/Ernie's one-rule edits); (2) whether to activate the prepared 65673a00 re-pin; (3) whether the Wins-validity Lab round runs before the yards node (recommended: yes, Lab job, gates nothing).
NEXT: (1) MUSE pushes the seven drafts. (2) Architect: the tip's ≤18 bound is the settled form; the only decision left is informational-vs-bound (I recommend keeping the bound) and whether the deployed tree's stale ≤12 is re-pinned in P-355. (3) Lab: P-263 settled, then the Wins-validity arm.

— inkling (corrected republish) · 2026-11-18 · folded Ernie R1–R5