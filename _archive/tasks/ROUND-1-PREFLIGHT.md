# tasks/ROUND-1-PREFLIGHT.md — paste this into each colleague session (pre-flight review)

> Maintenance note (not part of the prompt): written by the GLM session at the user's request. Paste **everything below the line** into each advisor session — DS, Nemo Super, Nemo Ultra — and to GPT (chat-only: it will request whichever pastes it needs, keep them minimal). This is a pre-flight pass only: the Round-1 catalog does not reopen unless something here discovers a real problem.

---

# PRE-FLIGHT: the Round-1 package goes to the implementer next — review it once, now

**Applies to build `77bb9ed5…`.** The full Round-1 package is assembled and staged for dispatch. Before the user sends it, you get one pass to flag anything wrong, missing, or improvable. If you have nothing, answer exactly that — that is a valid and useful answer.

## What is in the package (read before answering)

1. `COLLECTIVE-PROMPT.md` (v1.9) — the implementer's standing prompt: honest origin framing, your five-session roster with the picker mapping, succession (Claude → GPT → Gemini), the 90%-usage task-brief rule, the layered working model (Claude owns philosophy/math/architecture and rulings; sessions implement and test parts), and a **shaping gate**: the implementer's first reply must answer six environment questions before Round 1 dispatch.
2. `SUBMISSIONS.md` — the queue is CLOSED for Round 1: S-101, S-102, S-103, S-201, S-202, S-203, S-300, S-301, S-400, S-401, S-501, S-502. New developments since your entries were filed: **OpenClaw withdrawn** (user decision; S-600–699 kept reserved); **S-203 filed by GLM** — the real-2025 standings dataset (NFL.com + Wikipedia, cross-checked on W-L-T-PF-PA for all 32 teams, integrity-passed: 544 games, ΣW=ΣL=271, ΣPF=ΣPA=12,519), delivered under GPT's exact S-502 contract, so the logged S-502↔S-602 naming conflict dissolved. DS's S-102 trim was verified rule-3-compliant.
3. `tests/CONTRACT.md` (v1) — the shared interface contract: everything in `tests/`, `__dirname`-relative paths; the SIM-CORE marker extraction definition with **exit-code 3** semantics; the dataset contract; per-script exit-code league; the **entry-wins** conflict rule (a filed entry's spec beats the contract for that script — surface conflicts, don't patch silently); run order; the C7 open item (entry-point signature verification rides the verifier's five-line report).
4. `tasks/ROUND-1-USER.md` — the **user's own work order** (U-01…U-22, not agent submissions): defaults, Player Browser layout, footer, draft-ranks auto-select, the 100-season mobile glitch, copy rewrites, OT rules + walk-off placement, def-TD score bug, turnover naming, League Leaders scroll, H2H record mentions in rematches, first-sentence draft comparison, needs-only tab removal, **U-21 persistence (verified absent in the current build — 0 localStorage/sessionStorage/IndexedDB)**, U-22 advanced-stats direction, and the heavyweight items: U-12 CPU-draft realism (Reichard #2, Braden Smith #3, Greenard R1.09 repro; round-1 ≥90 OVR outside a QB run; within ~8 OVR of the top remaining; best-in-group rule) and **U-13 weights audit with the user's explicit conditional approval** (does the kicker really out-value RB1/WR2 — evidence or defend). Section E frames the master-document request to the implementer.
5. `tasks/CRITIQUES-DIGEST.md` — stale-vs-live map of the old colleague critiques (most target pre-reorg builds; verified live: persistence, one-game coherence, CPU-draft mechanism, awards text-vs-code, weights audit).
6. Dispatch plan: Step 1 = standing prompt pasted text-only (shaping exchange first, no attachments); Step 4 = Round-1 materials attached per Claude's own intake preference, body = cover text + build-hash line + ruling request; master-doc request rides with the package.

## Your four review lanes (answer all four, briefly)

**Q1 — Package correctness.** Read the files you can. Is anything factually wrong — especially the liveness claims in `tasks/ROUND-1-USER.md` §D ("already fixed per a text check: sudden-death wording, went-the-distance grammar, singular-team phrasing, the three flex-out-values lines, Guide intro, footer MORE, second-meeting look-ahead"; verified live: "turnover ahead" phrasing family ×2, the Guide tier block, "Replaying the draft", "For next time, the model puts", the Team-rankings note, needs-only ×1)? Cite file + the wrong line/quote.

**Q2 — Your own entries, in view of the whole.** With the U-series and the contract now visible: do you want to amend, narrow, or add anything to your own filed entries (e.g., S-102's pw4 output vs U-12's distribution measurement; S-401's lint scope vs U-17's League-Leaders overflow; S-502's validation vs U-13)? Amendments are normal submissions in your own section (new/updated entry, current-build hash); do not edit other sessions' entries.

**Q3 — `tests/CONTRACT.md`.** Any gap or conflict with your own script spec (exit codes, extraction semantics, run order, manifest/baseline ownership)? Remember the entry-wins rule: if the contract conflicts *with your filed entry*, say which should win and why — the implementer arbitrates.

**Q4 — Round design.** Cap arithmetic (seven harness entries vs 5–6 accepted changes per build → a two-candidate split is likely); verifier selection (every advisor authored Round-1 harness pieces, so verification may need a scratch session — any objection or better idea); the shaping-first dispatch order; the master-doc framing in §E; anything you predict will break before or after dispatch.

## Response rules (keep the relay cheap)

- Answer **once**, in bullets, target ≤ 40 lines. No restating the package. No praise. No re-litigating settled decisions (the Round-1 catalog, OpenClaw's withdrawal, implementer succession). No questions except genuinely blocking ones — and only one per session.
- Prose assessments (Q1/Q3/Q4 observations) are relay-free-form and don't count against anything. **Actual amendments must be filed as entries** in your own section per the normal protocol, with the build hash.
- Evidence discipline applies to numeric claims, as always: command + sample size, or marked prose.
- Finish with a one-line status: `READY — nothing blocks dispatch` or `BLOCK — <reason>`.

## GPT note (chat-only)

You have no file access: request the minimal paste set you need (suggest: `tests/CONTRACT.md` + `tasks/ROUND-1-USER.md`; skim the queue rows from the paste above). Answer under the same one-pass, ≤40-line rule.
