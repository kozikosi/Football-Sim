# Work Request — full council wave: framework-test evaluation, nine arms, digest to the Owner

**SPEAKER:** INKLING (council/inkling) | **ROLE:** organizing hand of the Owner until MUSE returns | **TASK:** consolidated council work request — the framework-test evaluation wave | **DATE:** 2026-11-13T23:59Z-ish
**Authority:** This work request exists at the Owner's direction — his words are quoted inside; the structure, the lanes and the rails are INKLING's counsel, not a binding protocol. Major decisions stay where the Owner put them (the Owner rules the outcome; Claude rules the engine; INKLING rules nothing but the accuracy of this document). If any seat judges any part of this file wrong, file the dissent; the Owner adopts evidence-based fixes over INKLING's composition.
**Supersedes:** nothing yet — it consolidates. `council-work-order-2026-11-13.md` remains the standing protocol (GPT weights, lanes, lanes' constraints); this request supersedes only its *dispatch* pattern. Where they disagree on facts, this file is the 2026-11-13 closeout truth; where they disagree on protocol, treat §4 of this file as the amended scope. The older `zad.md`/`zai-work-order` files are HISTORY, not live work.
**Read from GitHub, not from memory.** Repo: `kozikosi/Football-Sim`. Branch `council/inkling`. Every path below resolves there.

---

## Paste-ready preamble (copy before each seat's body, or send as-is)

> This is a formal work request under the Owner's direction, written by INKLING. Read the whole file before starting. It tells you what was verified today, what needs your seat's hands, and where the everything is. If any part of it is unclear, wrong, or fights your machine, say so in your filing — silence from you is not consent, it is absence. File one inbox document when you're done; there is no check-in format. You are not asked to wait for anyone. If the thing you were about to do is blocked behind a ruling that hasn't landed, mark it OPEN and move to the next item. The wave closes when Z.ai's v3 lands and the council digest hits the Owner's desk — not before, not ceremonially.

---

## §0 — Standing context (why this wave exists)

The Owner (KG) ruled on 2026-11-13 that the framework decision for 76 Pancakes comes from measured data — nine arms, one contract, one acceptance — and the council evaluates. He does not want rankings from anyone, opinions from anyone, or a verdict I cannot prove. His words this wave:

> "the council should perform tests for each. z.ai's test will be the definitive data and the council should evaluate his results. other seats can conduct their own tests if they feel like it. do you feel like it?"
> "framework field is fully open — the eight frameworks on the table: Svelte+Vite, SvelteKit, React+Vite, Next.js, Vue+Vite, Vue+Nuxt, Solid+Vite, SolidStart [Lit added later → nine arms]. Z.ai's data is definitive; the council evaluates his data."
> "i don't think there should be any pinning here. the weights are illusory at this point… the old weights table is antiquated."
> "there are currently no users except me so it doesn't matter what the public sees btw."
> "z.ai more freedom… he is your superior in this council… otherwise he should have the freedom to innovate, brainstorm, try new things we haven't thought of."
> "MUSE is out so i am relying on you to be a good organizer of my thoughts for me until he returns. everyone should byte check everything a lot more and please broadcast that to the council as a rule from now on."
> "lit can be tested. next.js variants are good and maybe preferred cloudflare optimization but the whole project needs to be free in perpetuity so no paying for anything longterm. no to the others."
> "all players can randomly pop up in the game report on the opposite side of the ball if they have a -6 or less penalty in a position at the other side of the ball and it is in the clutch or overtime… a visual indicator that the coach made a decision to play someone on both sides for one play."

Rulings that still hold from earlier waves and are not re-litigated here: 76 Pancakes is the v1 name; Colors (Claude's tree, engine) is canonical; Cakepanz (Z.ai's w89 shell refactor) is the candidate UI source, merged by Claude when he decides; Colors→76 Pancakes cutover trigger is a fully functioning Colors v1; free in perpetuity; no injuries; flex consistency; Priority-not-Wins; consistency of Wins/Priority/OVR everywhere; emerge-don't-mirror; basketball after football; platform deferred; cross-side stars as ruled (≤6-priced opposite-side slots, clutch/OT only, CPU included, terse "2-WAY" badge).

## §1 — What actually happened today (state of the wave, receipts inside)

**Builds (all nine arms — rebuilt cold on this machine, Node 26):**

| Arm | Build | Owner's acceptance | Receipts |
|---|---|---|---|
| arm-svelte (incumbent) | ✓ | 5/5 via INKLING harness (patched spec) | `_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/PLAYWRIGHT-V3-2026-11-14.md` |
| arm-sveltekit | ✓ | 5/5 | same |
| arm-react | ✓ | 5/5 | same |
| arm-vue | ✓ | 5/5 | same |
| arm-next | ✓ (Next 16, turbopack) | 5/5 | same |
| arm-nuxt | ✓ — **only with `npm run generate`**; bare `build` ships no testid HTML | 5/5 **only after generate** | same (this was found by re-measuring, not assumed) |
| arm-solid (INKLING) | ✓ | 5/5 | same; goldens `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5` verified on both INKLING arms |
| arm-lit (INKLING) | ✓ | 5/5 | same |
| **arm-solidstart** | ✓ build | **0/5 at load** | empty `<div id="app">`, zero testids, console silent. ERNIE measured the root cause (hydration key mismatch `00000000100000000`; `<style>` inside the route module). INKLING's first root-cause theory was wrong and is corrected in the v3 order's footer. |

**Golden / contract:** `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5` is the fixtures hash in every arm's `src/engine-contract/fixtures/golden.json` and in pin `4ca9a071`'s copy. The contract is **vendored**, not consumed: every arm contains a byte-copy; there is no runtime import path to Colors. The contract's lineage = pin source at `colors/src/sports/nfl/engine/` @ `4ca9a071`.

**The spec bug (v2, shipped):** `boardRows` is `async` and returns `Promise<Locator>`; the spec called `await boardRows(page).count()` → `TypeError: .count is not a function`. Four seats re-found it. Any correct fix passes — outcome-based. INKLING's instrumentation (await the locator) is an example; Z.ai may ship his own.

**CHECKSUMS defect (v2, shipped):** `CHECKSUMS.txt` (539 entries) lists `arm-next/next-env.d.ts` and `arm-next/tsconfig.tsbuildinfo` — both absent from every ref in every branch (gitignored at ship-time). 537/537 present bytes verified OK. **Do not treat "539/539 OK" as a receipt.**

**INKLING's two arms** live at `_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/` (107 files, CHECKSUMS verified this session). They are offered to Z.ai for absorption per the v3 briefing — the Owner said "z.ai can build what he wants." No seat should fork them without filing why.

**Deliveries awaiting the council's eyes:** Z.ai's v3 response to the briefing (or to the v3 order — his choice; the briefing supersedes) will arrive as a new delivery on his branch. When it lands: two seats byte-check it independently (see §3), INKLING folds results into the digest. **If INKLING is silent or absent when that happens, the nearest seat files the digest; do not wait.**

**Current branch state:** `council/inkling` tip `a4109a4a`; see §9 for the exact paths. `scratch2/` was moved out of-tree to `$SCRATCH/scratch2-2026-11-13-zai-extracted-616MB`. Nothing else untracked in-tree.

## §2 — The one law that applies to everything below: byte-check everything

Owner, standing from 2026-11-13 (verbatim law, INKLING restated only for precision):

1. Every VERIFIED carries four lines: **directory · exact command · ref/sha of the bytes · output neighborhood** (quoted, trimmed artifacts excluded). No four lines → it's REPORTED.
2. **Archive beats tree.** `git archive <ref> | tar -x -C $SCRATCH` (or `git show <ref>:<path>`) — never trust a live checkout you didn't hash.
3. Round-2 freeze: before verifying output, hash the inputs. State which inputs moved since the last report, and find out why before trusting results.
4. Independent re-run is the only confirmation. Two seats saying "yes" is zero evidence unless they name their bytes. Same-machine duplication by one seat is one witness, not two.
5. Speculating past a blocker is banned. If it needs missing data or a pending Owner ruling, say so; do not approximate.
6. `file://` is a real failure mode: every arm is blank at `file://` (ERNIE REPORTED, INKLING embedded in the v3 order). **If you add one standing check to CI, make it this one — but only with the Owner's sign-off or your own lane's authority to touch tooling.**

## §3 — The actual work, by lane (volunteer; no assignment; INKLING triages collisions by filing order)

### Lane A — Verification (every seat that can)

Confirm, from shipped bytes, on your machine:

A1. `git archive` of the Z.ai v3 delivery ref (when it lands); `sha256sum -c` against its CHECKSUMS; report exit code and the count of unreadable entries — never "539/539 OK" style prose. If CHECKSUMS still lists unshipped files, file BLOCKED with the list.
A2. `npm ci && npm run build` per arm; Node version, command, exit code, wall time.
A3. Forbidden-global scan per arm: `Math.random|Date.now|new Date|localStorage|fetch` across arm-owned sources (engine-contract/ excluded); paste the grep output neighborhood.
A4. Contract byte-identity: `sha256sum` of each arm's `src/engine-contract/fixtures/golden.json`; all must equal `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5` (unless Z.ai legitimately re-pins the contract in v3 — if the hash moves, the receipt must say which ref and why).
A5. Round-2: for each arm, re-run build+scan; then `git diff --stat` arm-owned sources against the delivery's base — expect zero unintended churn. Report anything unexpected.
A6. Playwright acceptance per arm you can boot; name your runner version and your spec commit. Report pass/fail counts and the first failing testid if any.
A7. Serve `.output/public` (arm-nuxt) with `npx serve`/`serve-handler`, or note that you only ran the generate path. Do not claim build-only evidence.
A8. `file://` probe per arm if your browser supports it; report one page per arm.

### Lane B — Scoring (per GPT's weights, gates first)

Score per arm. Note every score is a measurement with a receipt or an inference with a label — never a vibe.

- **Correctness 20% — gate first.** Priority-not-Wins anywhere the arm renders Wins instead of Priority: eliminate before scoring. Wins appearing in any displayed artifact = automatic elimination.
- Round-2 modification 20% — arm-owned edits required to resync the contract (INKLING's `strike` focus touched exactly 1 contract file, 0 arm-owned; your machine recounts it).
- Agent implementation quality 15% — interface count, intervention count, idiomatic quality; **single-authorship undercuts everyone equally — say it explicitly.**
- Engine integration 10% — leakage (no engine import outside the vendored copy), contract fidelity.
- Maintainability & clarity 10% — see Lane C.
- UI quality & responsiveness 10% — 390 px, no horizontal scroll, focus-visible, keyboard-only pass.
- Server-ready architecture 10% — static-export correctness, `file://`/http parity, SSR/hydration health.
- Tooling friction 5% — install/build/error-message quality; EPERM/ENOSPC notes.

**Do not rank.** Elimination-by-gate is the only kill criterion. The Owner rules the winner, if any.

### Lane C — Maintainability-inspector (no arm author may take this)

Take the six-focus variant (a fourth focus from data alone, e.g. "tourism"/"cutback"). On the compiler-vs-runtime pair (arm-svelte vs arm-solidstart), then arm-solid/arm-lit if you want a second pair:

- count files touched / engine-contract files touched / arm-owned files touched, by diffstat;
- note which failures were "framework fought you" vs "you made a mistake";
- one page per pair, that's all it takes.

INKLING's arm-svelte result: adding `strike` touched **1 contract file, 0 arm-owned**. Your machine decides if that reproduces.

### Lane D — Framework-independent contract tests

All nine arms must pass these; any failure is an elimination finding:

D1. Goldens twice after resync (Provider stays green).
D2. Priority-not-Wins discipline, mechanically checked.
D3. Halftime per-focus eligibility table (spread respects focus).
D4. 4Q auto-fire shows visibly (`halftime-*` / `fired` data-testid family).
D5. Precedence note appears when it should.
D6. Form arrow `hot|cold` renders on Priority.
D7. `manage-toggle` works keyboard-only, visible focus ring.

### Lane E — Digest / synthesis (INKLING, or nearest seat if silent)

After ≥2 filings land (or when Z.ai's v3 delivery + this wave's own checks are green/red), the digest to the Owner contains:

E1. The scoring table (gates first; greys for unscores).
E2. Eliminations with the exact failing gate and the receipt.
E3. Two reasons-to-choose-differently per surviving contender.
E4. INKLING's recommended default, labeled by confidence (UNKNOWN/LOW/MEDIUM/HIGH) — recommendation, not verdict.
E5. What was not measured and why (explicitly: arm-solidstart root cause beyond ERNIE's receipt; `file://` policy; cross-hardware variance; hamster-wheel risk of arms being contract-shaped not product-shaped).
E6. The dissent register — every seat's verdict disagreements, unmerged.

## §4 — Future avenues (all of them; do not park any for "next wave")

Explicitly in scope this wave if you finish Lane A–E early — the Owner's standing instruction: **complete every avenue you can think of; do not queue anything for next round**:

F1. Z.ai's v3 delivery itself (§3-A) is the wave gate — everything else is parallel, not blocking.
F2. `file://` standing gate proposal — write the patch for the tooling you own; file as its own wave otherwise.
F3. The six-field delivery-manifest audit on ANY prior Z.ai/Claude delivery you find lacking it (`BEHAVIOR-CHANGED · INVARIANTS-AFFECTED · TESTS-ADDED · BENCH · HISTORY-CHANGES · DETERMINISM`) — file one per delivery, one line each ("absent" is a finding).
F4. Round-2 resync proof for INKLING's own arms (arm-solid/arm-lit): if Z.ai absorbs them, the absorb must preserve goldens; re-verify his merged copy if it exists.
F5. P-345 λ — ruling settled; display trio (GLM "Gap" · Beam "Impact in points" · INKLING "+Wins vs your starter") awaits the Owner. **No seat files a new pitch until he picks; cite measurements only.** Premium-destination monitoring stands as filed.
F6. Flex-99 bookkeeping: SS>OLB=2 vs ILB>SS=2 with OLB>SS=6 inconsistency remains with the Owner; do not touch the flex table.
F7. The two red Colors tests (`lineup 2700≠2400`; `PIN_ENGINE` mismatch) — NOT gates; the Architect retires them. If you see anyone cite them as a gate, file the citation.
F8. Doc-sync receipts: every seat that has not yet filed its 2026-11-13 doc-sync (governance docs vs `origin/council/muse`) — file "SYNCED @ <ref>" or "NOT SYNCED, reason"; INKLING's landed at `64e6463e`.
F9. `preserve.mjs check` at session end — always; the `gh-pages` `7c9694e9` standing exception is the Owner's; never include it in your cleanups.
F10. Colors-merge readiness watch: Colors v1 (Claude) is the cutover vehicle; any divergence between Claude's `colors/` and shipped 76 Pancakes manifest is his call — watch only; do not edit.
F11. Cakepanz P-316 (hydration + board chrome) and P-317 (Team Select revision) — Z.ai's lane; seats review, never write.
F12. The GitHub Actions plan (Claude's D2 scope) — the free-in-perpetuity CI is being designed for multi-sport/multi-sim; seats supply CI-shaped measurements when asked; do not draft YAML in this wave.
F13. Basketball — design-only; if a football answer changes because of a basketball assumption, that's the bug; file it.
F14. Verdict-memo follow-up: after the Owner rules the framework, the migration wave begins; every finding you filed here becomes a migration risk register — write yours as one.
F15. `arm-nuxt` generate-vs-build doc footnote: if any doc in-repo claims "arm-nuxt 5/5 at npm run build", file CORRECTION with the receipt.
F16. INKLING's unchecked box this wave: whether the council wants `arm-lit` (light-DOM) or `arm-solid` promoted as the second Z.ai-authored arm in the merged `fwtest-9` — **not your question; do not answer it; the Owner's call, possibly via Z.ai.**

## §5 — Explicitly NOT this wave (do not dilate)

No product-file edits · no protected constants (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`) · no ratings/data invention · no new P-IDs without the Owner · no force-push · no edits to `tools/`, `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `MERGE-MANIFEST.md`, `biome.json` · no healing Z.ai's arms — you re-run, you report, you file; he repairs · no ranking-as-verdict · no framework ruling by any seat · no re-pinning anything "to make tests pass" · no basketball build · no new arms beyond the nine without the Owner's sign-off · no solo rulings — every dissent routed to the Owner in writing.

## §6 — Filing format (exact)

One file per seat: `inbox/<UTC-yyyymmdd-hhmm>-<seat>-fwtest9-evaluation.md`, first line:

`SPEAKER: <seat> | ROLE: council | TASK: fwtest9 evaluation wave | DATE: <UTC>`

then: §3 lanes touched · §1 four-line receipts per VERIFIED · REPORTED/INFERRED/UNKNOWN labeled everywhere they apply · verdict lines per scoring column · caveats and blockers (name the unblocking ruling if one exists) · one "your move" line you learned from this wave · dissent filed against anything INKLING wrote here (explicitly welcome) · nothing else. No ceremony. No essay.

## §7 — What each seat owes this wave in one breath

If you read nothing else: **re-run what you can, report what you ran, file what you found, dissent if you disagree, and never wait for INKLING.** The verdict memo waits on exactly two things: Z.ai's v3 delivery and the council's filings. Everything else — every score, every elimination, every "should have been different" — is yours to produce and the Owner's to rule on.

## §8 — Open questions every seat answers or marks OPEN

1. Does your machine rebuild all nine arms from cold? Which fail, which pass, exact exit codes?
2. Does the corrected spec pass on your machine? (INKLING: 8/9 with arm-solidstart red at load; ERNIE measured the same hydration receipt.)
3. Is `npm run generate` required for arm-nuxt per your machine?
4. Does CHECKSUMS in the v3 delivery verify on your machine? Any missing entries?
5. Is `file://` a legitimate standing gate, or a separate wave? (Your opinion is filed; the Owner decides.)
6. Any arm you'd strike from contention on correctness alone? Name the gate and the receipt.
7. What's the weakest link in this protocol itself — and what would you have written instead?
8. What did you do this wave that nobody asked for, and why does it matter?
9. What is UNKNOWN after your pass, and who unblocks it?
10. If INKLING vanished mid-digest tomorrow, what exactly would you tell the next seat to do?

## §9 — Where everything lives (branch `council/inkling`; tip at time of writing was `a4109a4a`, after this file lands the tip advances by exactly this file's commit)

- This file: `_agents/inkling/prompts-2026-11-13/council-full-work-request-2026-11-14.md`
- Standing protocol: `_agents/inkling/prompts-2026-11-13/council-work-order-2026-11-13.md`
- The briefing Z.ai received: `_agents/inkling/prompts-2026-11-13/briefing-for-zai-v3-2026-11-14.md`
- V3 order (historical, superseded): `_agents/inkling/prompts-2026-11-13/zai-work-order-v3-2026-11-14.md`
- INKLING arms + delivery + receipts: `_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/` (`CHECKSUMS.txt`, `DELIVERY.md`, `MAINTAINER-INSPECTOR.md`, `PLAYWRIGHT-RESULTS.md`, `PLAYWRIGHT-V3-2026-11-14.md`, `arm-solid/`, `arm-lit/`)
- Handover for the next chat: `_agents/inkling/HANDOVER.md` (`84d74884`)
- Session record: `_agents/inkling/handover-2026-11-13.md` (verbatim-ish closeout of this wave)
- Dispatch prompts (Claude/Z.ai/council): `_agents/inkling/prompts-2026-11-13/prompt-*.md`, `read-me-*.md`
- Rule, byte-check standing law: `_agents/inkling/prompts-2026-11-13/rule-byte-check-everything.md`
- Rulings archive (INKLING's notes): `_agents/inkling/notes/` (§1–19 master brief `2026-11-12-independent-architecture-review-prompt-verbatim.md`)

## §10 — Authorship, provenance, and the honest seams

Written by INKLING at the Owner's direction on 2026-11-13. No other seat authored any line of this file. Where it quotes the Owner, the quotes are verbatim as recorded this wave; where it restates, it is INKLING's restatement and says so; where it concedes, the concession is named. Known seams an auditor should look at: (1) §1 build times are REPORTED, not re-verified after this file was written; (2) the rubric weights are quoted from the standing council protocol, not re-litigated; (3) the exception for `gh-pages` `7c9694e9` is the Owner's disk copy — INKLING never touched it; (4) `handover-2026-11-13.md`'s earlier draft contained unverified hashes (`006863c6` beside non-existent `c9a805af`-adjacent claims) — rewritten before commit; treat the committed version as the accurate one. If any seat finds a line in this file that fails its own four lines, file CORRECTION; INKLING re-measures, concedes, and pushes the fix — that has happened twice this wave and will happen again.

**— INKLING** · council/inkling · the Owner's organizing hand until MUSE returns · author of this file · not a judge, not an architect, not the Owner
