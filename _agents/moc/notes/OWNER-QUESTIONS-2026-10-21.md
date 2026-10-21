# Questions that need the Owner's attention — 21 Oct 2026

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: Owner decision list | DATE: 2026-10-21T09:35:00Z**

Five decisions. Everything else the council is doing does not need you. The order is by what unblocks the most
work. Each carries a recommended default and the cost of being wrong, so you can answer with one word per
item.

---

## O1 — Do you ratify the merge candidate as the build of record, and adopt "commit the shared documents
every round"?

**In plain English:** do we formally adopt `40233d6b…` (657,486 B, at `merge/v20-donor` `ff8c05ae`) as the
artifact the council keeps measuring against, and do we make committing the shared council documents a
per-round rule?

**Why it matters / what it blocks.** Every receipt, promotion step and PR reference names a hash, and today
the shared record was **destroyed twice** by git operations on uncommitted documents (`stash` → `reset` →
`checkout`) — the 47 pre-loss messages survived only because they happened to be in `stash@{1}`, and they have
been re-filed byte-for-byte and verified (76/76 message bodies present, 0 pre-loss chronicle lines missing).
Both stashes are still untouched, so a recovery is possible today and impossible after a `git clean`.
Ratifying the hash also fixes the "which artifact" ambiguity that produced the "V21 vs V20" mix-ups: the
candidate is the **V20 merge candidate**, never "V21".

**Recommended default:** **yes to both.** Ratify `40233d6b…` as the build of record, and adopt the
commit-per-round rule.

**Cost of being wrong.** Ratifying a hash you later replace is cheap (one line in `STATUS.md`). Not
committing is not cheap: a third loss event would destroy the record of the other three too, and the
uncommitted shared state is exactly what the two losses removed. Today the shared documents are uncommitted
again, because seats keep appending.

**Answer now?** The commit rule can be adopted with no downside; the ratification can ride along with it.

---

## O2 — Repository topology, what gets committed, and the visibility of the published evidence

**In plain English:** one repo with a folder per simulation, or a separate repo per simulation? And may the
council commit the ~2.87 MB of material a fresh clone needs, and may the evidence release stay published on
the public repo?

**Why it matters / what it blocks.** `main` currently carries **only `AGENTS.md`** of the four council
documents; the live documents exist in **three** states — the root working tree (live), the mirror working
tree (a copy) and git history (stale) — and **a push from the mirror ships none of the live documents**. A
fresh clone cannot reproduce the candidate, the pool or any E2E run: the pool (937,366 B), the work queue
(1,181,912 B), the pool builder (6,030 B), the validator (15,556 B) and the three E2E suites (73,935 B) are
all untracked. On size: zlib-9 takes the pool to **50,231 B (5.4 %)**, so fifty pool revisions is ~2.5 MB of
history — the 65.9 MB trace and the 19.7 MB screenshot bundle are what belongs in release assets, not git.
Separately, the repo is **public**, so the published evidence release is publicly downloadable (it contains
the app's own screenshots and a Playwright trace — no credentials, no personal data).

**Recommended default.** (a) **One repo, one folder per simulation**, shared engine extracted only when
reuse is demonstrated — matching your own provisional preference and the instruction not to let a multi-sport
redesign delay V21; we will bring you three concrete sketches with tradeoffs and the cost of choosing wrong.
(b) **Yes to committing the ~2.87 MB manifest** — it is build input, not run output, and JSON diffs line by
line. (c) **Keep the evidence release published**; the alternative is two commands to delete it, and the
protocol asks for the evidence to be attached and linked from the PR.

**Cost of being wrong.** Topology is the most expensive call in the project — the wrong choice is rework, not
a patch. The commit decision costs ~2.5 MB of history over time. Publishing costs the visibility of the
evidence; unpublishing is `gh release delete` plus one comment deletion.

**Answer now?** (b) and (c) are cheap and unblock the council. (a) can follow the same week.

---

## O3 — What is "V21 done", and do the 390 px and slider findings belong in it?

**In plain English:** do you freeze a definition of done for V21, and do the three open UI findings go into
it?

**Why it matters / what it blocks.** Three findings are live:
- **A P0 in the candidate:** at 390×844 the preseason primary action `#startSeasonBtn` sits at `top: 963` in
  an 844 px viewport — **119 px below the fold** — measured identically by three seats. The shared gate
  cannot see it, because its viewport test is horizontal only (`tests/e2e-smoke.mjs` l.127), so a green gate
  currently means "no horizontal overflow", not "the primary action is visible".
- **The 390 px clauses are partly unimplemented:** the protocol asks for visibility, clipping/covering and
  scroller-scrollability checks; the gate measures overflow, clipping, covering, scrollers — but never
  whether the primary action is on screen.
- **The Team Rankings sliders are display-only:** they change no draft valuation and no game, because the
  draft's `slotWins` comes from the model tables, not the sliders. A user who moves them will not see the
  draft change, and the product does not say so.

**Recommended default.** Freeze V21's done as: the P0 fixed, the three missing 390 px clauses implemented
(with the gate's `inVp` gaining a vertical term), the sliders either wired to the draft or labelled
"display only", plus the existing KI P0s — and **no new features until all-time NFL**. Default on the P0:
fix it now, because it is the first click of the season flow in your own playtest.

**Cost of being wrong.** Freezing too early freezes the wrong thing; freezing too late means V21 keeps
growing instead of becoming good. The P0 fix is a small layout change; skipping it means meeting it in play
and having to scroll to start a season.

**Answer now?** The P0 and the freeze are worth deciding now; the slider wording can wait for Claude.

---

## O4 — The FB/P rules and the pool composition (one coupled decision)

**In plain English:** confirm the exact rule set for fullbacks and punters, and what the next intake must
contain.

**Why it matters / what it blocks.** Your ruling — FB and P are draft-board slots, 28 rounds (896 picks),
HB↔FB interchangeable at no flex cost, a kicker may punt at no flex cost, no existing flex penalty changes —
is now **proven affordable**: a strict min-cost matching over the build's own `flexRule` gives **896/896 at
total penalty 54**, the same as today's 832/832 case, and **54 is provably optimal** (11 TE slots covered by
a receiver at 4, plus 5 SAM slots covered by a lineman at 2 — a floor the solutions attain). The 64 extra
slot-instances cost nothing, and the per-pick penalty average improves. So the choice is not feasibility; it
is two sub-questions. (i) **Should a punter also be allowed to kick?** One-way (a kicker may punt) leaves the
K slot with **32 kickers for 32 teams and no cover in either direction** — a kicker injury costs the emergency
penalty (8). The symmetric reading of "same logic as the fullback" makes the kicking pair mutually coverable;
the optimum is identical either way, and the difference shows up only in the injury case. (ii) **What must the
intake contain?** The pool has three specific holes, and the fix is the pool — your own precedent with SAM:
**TE 53 for 64 TE slots** (a receiver covers at −4), **SAM 5 for 32** (a lineman at −2), **K 32 for 32 with no
slack** (C is 31 for 32 but free). A 1,500–2,000 headcount fixes none of them; the composition does. The
backfield, for the record, is **not** short (HB 89 + FB 8 = 97 for 96).

**Recommended default.** (i) **Yes — make a punter able to kick at no cost**, matching "same logic as the
fullback" and removing the only uncoverable slot. (ii) Make **TE, SAM, K and P required positions in the
next intake** with a buffer rather than parity (TE ≥ 64, SAM ≥ 32, K ≥ 40 say).

**Cost of being wrong.** (i) is one rule and changes no measurement; the worst case is that a punter is a
plausible punter. (ii) makes the intake composition-aware, so the candidate count stops guaranteeing a
draftable pool — the count will look smaller, which is the point.

**Answer now?** (i) yes, it is a single word and Claude is waiting. (ii) can ride with the next intake.

---

## O5 — Three small adoptions, and one paste

**In plain English:** three sign-offs and one shared-document edit.

**Why it matters / what it blocks.**
- **The rating pipeline (Pickle's A3):** one OVR as the public summary, integers public and decimals
  internal, and **every field must have a consumer in the engine** — a rule that exists because a pool
  carried `careerAverage`, which nothing reads. Adopt, amend or reject.
- **The Week-1 label and record rows:** the Week 1 of 17 observation is now implemented and **passing on the
  real machine** by visible text (`G_week1Visible: true`, heading "Week 1 of 17", week 1 of 17, sim-week
  button visible) — the earlier skip reason was wrong. Adopt the label so the record stops saying "not
  implemented".
- **The KI-016 quarantine:** the two invented-ratings files are now stubs with the originals preserved
  byte-for-byte; the quarantine is done.
- **One paste:** four archived seats (Liquid, Glyph, Omni, Cohere) are permanently archived. I removed the
  empty `_agents/glyph/` lane. Three shared-document edits are left for you to paste: the empty glyph anchor
  in `AGENT-SECTIONS.md` (l.152–161), "Glyph" in the `COUNCIL-DIGEST.md` filer list (l.18), and — your call —
  Omni's question block at the top of `QUESTIONS-FOR-THE-ARCHITECT.md`. I kept Glyph's **M-79** (it is cited
  by `docs/multi-sport/STATUS.md` and is one of the 47 recovered messages) and their board messages (the
  council's own record).

**Recommended default.** Adopt all three; paste the two cosmetic edits and keep Omni's block unless you
consider it answered.

**Cost of being wrong.** Three sign-offs are cheap to reverse. Deleting M-79 would leave a dangling citation
in `docs/multi-sport/STATUS.md` and remove the provenance of a recovery the council is proud of.

**Answer now?** No — these can be answered in one line whenever convenient.

---

## Not decisions — things I will do without an answer

- Attach the corrected evidence index (`result.v2.proposed.json`, schema-valid, does not modify the original)
  to the evidence release and link it from PR #3.
- Keep the mirror in sync after each round, and keep the shared documents committed.
- Re-verify anything a seat reports, the way today went: two independent matchings agreed, and the only thing
  that mattered was that someone re-derived it.

**Evidence for every claim above:** `_agents/moc/notes/W2-run-reconciliation.md`,
`W3-protocol-to-script-matrix.md`, `TRAP-AND-ARCHIVE-CLEANUP.md`, `POOL-SWAP-FIX.md`,
`gate-viewport-patch-proposal.md`, `_agents/moc/tools/fill-matching.py` and
`_agents/moc/evidence/fill-matching-mverify.txt`; `_agents/longcat/evidence/` (six real drafts and the P0
re-measure); the board `COUNCIL-BULLETIN.md` M-302 through M-33x; the release
`e2e-evidence-2026-10-20T225702Z`.
