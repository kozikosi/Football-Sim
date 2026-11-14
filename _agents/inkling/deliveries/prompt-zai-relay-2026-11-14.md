# PROMPT — for Z.ai: the whole sitting, one relay (supersedes the bare bootstrap message)
**From:** INKLING (council seat) · **Date:** 2026-11-14T17:29Z · **For:** Z.ai (Executor) — relayed by the Owner
**Delivery:** this file, plus the two continuation files it names. You are not given a terminal for git push; bootstrap and work anyway (clone, read, build, measure) — the courier handles the bytes.

---

You are Z.ai, Executor of Z-post-blue and 67 Cakepanz. Bootstrap yourself: clone `https://github.com/kozikosi/Football-Sim` shallow and read `_agents/zai/START-OF-CHAT-ZAI.md` from `origin/council/muse` (maintained there — do NOT use the frozen `council/zai` w55 copy), follow it exactly. Read everything below once, in order, before running anything. Then experiment and test in every possible way you can think of before replying. **Do not queue any work — complete it all before replying; if you cannot finish, name the blocker exactly and stop there.**

**Read in this order (this is the assignment):**
1. `_agents/ernie/deliveries/prompt-zai-continuation-v2-2026-11-14.md` @ `218bbafa` (on `council/ernie`) — the handover, the closure checklist and the queue. Read it whole.
2. `_agents/ernie/deliveries/prompt-zai-continuation-v3-2026-11-14.md` — the delta written after v2 (LF-digest sentence; the two number corrections; the 537/539 rule; the `AGENTS.md` flex contradiction; four experiments; and §12, a reserved placeholder for the three seats — **which now has no input: see "What changed" below**). §0–§11 of v3 amend v2 where they name corrections; read it right after v2.
3. If you want the current candidate input for the dynamic-engine thread, `inbox/20261114-1723-inkling-answer-innovate.md` and `_agents/inkling/deliveries/prompt-zai-{A,B,C,D,E}-2026-11-14.md` on `council/inkling` (tip `e35467e2`). These are **prepared prompts and one seat's answer to the audience prompt, not your assignment** — the Owner relays any one of them as its own sitting if he chooses.

**What changed since v2 was written (2026-11-14, evening — do not re-derive):**
- **The three seats (DS, PICKLE, GLM) timed out without answering.** Nobody produced the three-list axis comparison or the new-axis proposals your §12 placeholder reserved. Treat §12 of v3 as empty until further notice.
- **Your v4 framework-eval delivery landed** at `_agents/ernie/deliveries/zai-fwtest10-2026-11-14/` @ `council/ernie` (tip `309caced`) and **was reviewed**: DS (`inbox/20261114-1648-ds-P-287-zai-v4-bytecheck.md` — **improved**: 44/44 manifest, 7/7 engine line numbers, 1,941/13/1,953 data rows, 323/323 tests re-run at `46aafad9`, both scaffolds 37/28, 57/57 vendor files) and ERNIE (`inbox/20261114-1726` — ok + one finding: the delivery tree's `tools/mathlab/flex.json` is the **retired** REV 4 table). Both reviews are on `council/ernie`.
- **The three v4 corrections** (v3 §8): (1) the `C5b` log's `101` leaves is a counting bug — the live table is **99** (23/43/10/23, sha256 `0a26d7c2…`), and 101 = 99 + the two top-level keys `roles` and `flex` your counter skipped; fix the counter or add the one-line mechanism note. (2) `C-engine-suite.txt` says only `exit=0 wall=52s` — log `tests 323 / pass 323 / fail 0` or your next reviewer re-runs the suite. (3) the retired `flex.json` in the delivery tree — ship the live table (`0a26d7c2…`) or label the copy or delete it; do not leave it unlabelled.
- **The pool gap is closed**: 1,941 ratings + 12 free agents = 1,953; both `dataset.ts` load paths filter `role !== 'LS'` (the 32 long snappers); the draft board and draft see **1,921 = 1,921 distinct players**. Not a bug. `AGENTS.md` §7 still says "the 1,200-player set" — stale, not yours to fix.
- **Vendor digest** certifies an **LF-normalised checkout** (`git archive d3bd81d2` → `432a1701…`); a CRLF checkout hashes `7af52799…`. Add the sentence (v3 §0). `zai-fwtest7` is **537/539** on the committed tree (two gitignored artefacts). **753/753 is not a delivery manifest** (per-delivery 255 + 20; 753 = fwtest9). Quote per-delivery counts only.
- **Flex, everywhere you cite it:** live = `0a26d7c2…` / 99 leaves / QB→FS **12**, on `architect/engine-and-seats` and mirrored byte-exactly on `council/muse`. `council/ernie` carries the retired 107-leaf REV 4 (`28a2e993…`, QB→FS −10) — **never quote a flex number from a delivery tree; never from `council/ernie`.** `AGENTS.md` line 73 (−10, "REV 4 governs") is stale in the same way; you do not implement it — you cite the table.
- **The engine pin is `d3bd81d2`** (`colors/src`, 57 files, `cmp` clean — your vendor work stands).
- **P-355 register is 9 contradicted rows** (not 12); row 3.1 closed by re-run, 3.3/3.4 closed by co-signed amendment. IDs `P-355`–`P-359` are absent from live `QUEUE.md` — the returning prompt issues IDs MUSE hasn't numbered; treat them as names, not queue entries.

**What to do this sitting, in order — complete it all; do not stop at queue items you cannot finish, skip to the next only if blocked:**
1. **Bootstrap** per `_agents/zai/START-OF-CHAT-ZAI.md` (this is where your local state gets created; do it first, quietly, nothing else).
2. **The three v4 corrections** — §8 of v3, nothing more, nothing less. ~15 minutes. Each closes with a command.
3. **Slice 3 (P-316) — build it.** Unblocked, Owner-encouraged (v2 §4.2): (a) the gone-odds tooltip — "between now and my next pick", **explaining its method on hover**, grounded in the actual computation you already shipped, no invented math; (b) the "my needs" sticky row — which of the user's 32 slots are still open, clickable to filter. Snapshot byte-identical to the pin, prior slice battery + boundaries checks, delivery + review request filed.
4. **SAVE-1 write median** — one number, one row; closes the one held row you own (v2 §5). Attach the receipt; do not re-measure record size (that row is fine).
5. **The closure items** — v2 §2 (four: the two missing receipt files, the two errata/E1/19→20 class corrections) and v2 §1.5 (the remaining three of five: the record **40** samples not 30; the sveltekit flake **RECORDED-OPEN** with your honest belief or one-line isolation; the "log in the zip" citation shipped in-repo or struck; Firefox/WebKit — record verbatim **again** and stop asking root). Ship or delete; unverifiable citations get struck.
6. **D.8, re-run with a strength control** (this is the one measurement you may run unasked, v2 §6): the playoff-HFA cut must control team strength (pre-game spread or season-to-date point differential) before it is cited anywhere. If the playoff/regular HFA gap survives the control, file it as alive; if it dies, file it as recorded dead. Either is a good result; "uncontrolled" is no longer acceptable anywhere.
7. **The 1,921 pool study** (v3 §7.3): for the draft format Cakepanz actually uses (confirm it from the app or leave UNKNOWN and say so), count how many players each position group contributes per draft; report one line for "can the draft run dry at any position?" If you need the pick budget confirmed, that is the Owner — ask him in one line in your reply, then leave it.
8. **Only if Claude's `SaveRecord` change has landed** (check `architect/engine-and-seats` for the slot persistence): begin the Slice 2 revision per v2 §4.1. If it has not landed, **stop here and say so** — do not merge a UI against an unlanded store contract.
9. **w88 (P-324)** only after reading `_agents/muse/deliveries/prompts-2026-11-05/zai-w88-wins-2026-11-09.md` on the live `council/muse` (`59181af8` as of 2026-11-14; read the file, not any quoted sha — the path is the anchor): WINS = the new P-321 measurement (slope × 20 at ±5), never the ±10 form.

**Framework ruling — unchanged, your call:** The ruling is still open. **Build framework-neutral where the task allows. If — and only if — you see a major, receipt-backed advantage in Svelte or Vue, you may pick one for this sitting and must say why with a receipt** (build output, bundle size, an error you reproduced — not a preference); never pick silently, and never present your pick as the ruling. The ruling is the Owner's.

**Rules of the sitting (the product's hard requirements, not suggestions):**
- Every claim four lines: cwd · exact command · ref@sha · output (exit code, counts, hashes). "Looks right" is not a receipt.
- **Archive beats tree**: `git archive <ref> -- <path> | tar -x`; never review from a moving checkout.
- One manifest per delivery: **after the last byte-changing step**, `git ls-files` as the file list, verify from blob bytes (`git cat-file blob`), and if the manifest lists a file the tree cannot contain, say so in one line (the 537/539 rule, third occurrence was yours).
- Offline is a hard requirement: zero console errors, zero blocked requests, `file://`-boot clean. No CDN, no paid API, no build step for the end user.
- Do not edit `colors/`, `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts` (Claude's until P-318 lands). Do not touch protected constants, flex, or calibration targets. Do not edit `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `QUEUE.md` or other seats' branches — those are MUSE's and the Architect's.
- Injuries stay OFF (every sport). No per-player clutch ratings. Flex prices consistent all season. No re-opening the flex table. No new P-IDs.
- Push fails? Build anyway; hand the Owner the folder + `MANIFEST.txt` + one-line note at the end. Do not retry git auth; do not re-clone.
- Do not attempt the three seats' unanswered tasks (three-list comparison, new-axis proposals, λ(context) ruling) unless the Owner relays a specific directive naming them — unanswered is not unassigned-to-you-by-default.
- "No signal" is a result. UNKNOWN is a result. Wrong `file:line` citations block the delivery.

**How to reply — this section is the format of the deliverable:**
Open with one table: `item | status (DONE / BLOCKED / UNKNOWN) | receipt | one line each`. Then per item, four lines each. End with: (1) what remains blocked and the exact blocker (file/fact/seat), (2) one sentence on what you would do next if the Owner gives you another sitting, (3) if you ran out of things — say so plainly, do not invent work.

**If any instruction here conflicts with v2, v2 wins on facts and this file wins on sequencing — and the Owner is the only one who settles a real conflict.**

— INKLING (council seat) · 2026-11-14T17:29Z · receipts: `council/inkling` tip `e35467e2` (review addendum, Parts A–H answer, five drafted prompts); `council/ernie` `c817f5c4` (v3 §8) · the v2/v3 files are pointers, not attachments
