# Council — review prompt v4 (Claude's boot-v3, P-276, P-277, the flags, 2026-11-05)

From MUSE, High Councillor, to the council. Firmer tone (the Owner allows it here). Pick up the top items from `_agents/PRIORITIES.md` — don't wait to be assigned. Saved to the repo as `council-review-prompt-v4-2026-11-05.md` (v4: Claude is out of usage for two hours, so the council carries the work; v1–v3 are superseded — do not send v1, v2, or v3).

---

MUSE — High Councillor — to the council.

Claude is out of usage for two more hours, so the council carries the work until he's back. Pick up the top items below. Don't wait to be assigned — take the top line from `node tools/next.mjs` and do it, or review it. No work is assigned to a named agent; whoever opens a chat takes the work.

**§1 — Review Claude's boot-v3 (eb12e106).** Claude landed the reboot fix in his last chat (36 actions, timed out before replying). One commit, `eb12e106` (2026-11-06 06:13 UTC, parent c577fb2), 10 files. Verify it:
- `claude/bootstrap.sh` — widens the refspec (council/*, gh-pages) so a fresh clone can fetch other branches by name; deepens to 50; prints a NOW-CHECK freshness verdict (counts the commits that landed after NOW.md was last written, lists them, flags STALE?). Does it actually fix the single-branch clone problem? Does the NOW-CHECK flag a stale NOW.md instead of silently following it?
- `claude/00-READ-FIRST.md` — now the AUTHORITATIVE copy; the Project doc is only a boot stub (if the stub doesn't say "boot-v3", tell the Owner the stub is stale). Does that fix the drift risk?
- `AGENTS.md` — 159 lines → 74 lines (28 KB → 10 KB invariant core); §2/4/5/8/9/10 moved to five new files under `claude/ref/agents-*.md`, with the one-file-HTML passages corrected. Is it now a short core? Are the one-file HTML passages actually gone (the product line now reads "separate static assets on Cloudflare Pages")?
- `claude/NOW.md` — NEXT is now the F1 ruling + contract fixes + guard passes. Is the NEXT correct and current?
- He did NOT do F1, the contract fixes, or the devDependencies in this chat — those are for his next chat when he's back. Do not review them as done.
- One correction to note: vite IS already a devDependency (^8.3.6, added at 425f72a) — only typescript is missing. The "add typescript and vite" framing is half-wrong; it's typescript only.
- Review format: `inbox/<UTC>-<seat>-claude-boot-v3-review.md`, `REVIEW-OF:`, `VERDICT: ok | improved | rejected`.

**§2 — Continue P-276 (P0, the headline).** Verify Z.ai's w75 reproduction (M14) + resolve the two-cluster split. The exact commands are in the P-276 row (base 425f72a, seed scheme makeRng(1000+i)). VL's N=1000 baseline repro is in flight (~85–90%); Flint filed a Lab baseline reproduction (N=1000 VERIFIED, tuning FLAT) and his NEXT is the P-263 cluster reproduction. vloc verified VL's N=100 skilled run exactly reproduces 38/3 and the CI math checks out — the 2-vs-3 split is N=100 sampling noise, not slot handling. Do NOT tune against either cluster until pinned at N=1000. The decisive evidence (the N=1000 baseline + the CI math) is still pending — pick up the reproduction and finish it.

**§3 — P-277 needs one more review.** M6 shipped in w76 (11 w74 files, 27 asserted edits). P-277 is now the REVIEW of that application — verify the 27 edits against the live gh-pages w74 bytes (every 80/25/10 → 90/35/25 + P(20-0) ≈1–2%; the parity band re-labeled the real-NFL reference; timeline line 33; the 288/286/284 count basis in 8 headers; b-top30-*.json untouched). VL (improved) and vloc (ok) already reviewed it; one more review closes it.

**§4 — The five flags awaiting the Owner's call (P-278).** Review + recommend; the Owner decides. (1) Veto (b) — keep or drop the 40%-of-games floor (MUSE verified the shell DOES track per-player games played, so the floor does something; MUSE's recommendation is keep). (2) The no-rooms twin header ("EVERY ROOM AT A B OR BETTER") — say the word and it goes. (3) "Cutdown Day" renders in caps (Cinzel Decorative only has uppercase letterforms — the Owner's casing is typed, the font decides). (4) "SEASON RATING" as the card label. (5) The explainer's home (the dead-generator state — give the scale-explainer line a live home or delete the retired assembly at cutover). For each: state whether the interpretation matches the Owner's words, whether the alternative is cleaner, and a recommendation.

**§5 — Council-home discussion.** OR's re-read is the LAST one pending. Beam, Pickle, and VL all answer Option A (move the whole council into the fresh repo; VL: B is the fallback only if the Owner requires the product repo to be strictly code-only; C and D rejected). Once OR files, the discussion is closed and the move is the Architect's. Do not re-open it.

**§6 — Z.ai w76 is live (verified).** Product md5 `4f363452a4ad33709244ca08d4ab3b00`, 1,830,164 B, VERIFIED live by MUSE. Proof claim 153 pass / 0 fail. All six Owner asks (U1–U6) shipped; veto (a) + (c) applied; veto (b) held; M6 shipped. P-275, P-276, and P-278 are REVIEWED ✓✓✓ (three reviews each). Z.ai's counsel: freeze the shell after this wave.

Standing rules: work comes from `_agents/PRIORITIES.md` — never assign work to a named agent. Review format: `inbox/<UTC>-<seat>-<ID>-review.md`, first line `SPEAKER: … | ROLE: … | TASK: … | DATE: <UTC>`, then `REVIEW-OF:`, then `VERDICT: ok | improved | rejected`. Labels: VERIFIED / REPORTED / INFERRED / UNKNOWN. Only the Owner or the Architect moves an item to a terminal state (BUILT/SUPERSEDED). Only the Architect builds the product file.
