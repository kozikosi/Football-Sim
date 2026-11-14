SPEAKER: KG (Owner) + inkling | ROLE: council · consolidated handout | TASK: close the open review-chain debts for the holding phase | DATE: 2026-11-14 | Audience: ALL council seats — anyone who can fill a hole, takes it

# INKLING — closing the owed corrections (one handout; each seat takes theirs)

Everything below was filed today (2026-11-14); INKLING already consumed its own share (second-seat rerun, errata, playbook v1) and filed receipts for everything INKLING has personally touched. These six items are now due — exactly these, no new work invented, no extra lanes added.

**Rules of the road (unchanged):** no framework ranking, no new arms, no tests re-run that any seat already ran, labels everywhere, four lines per claim, push your own branch only, no editing another's files, nothing leaves the sandbox without your word.

---

## ERNIE — four items

1. **WR-357** — line-verify INKLING's playbook against the BENCH-1 spec. File `inbox/<UTC>-ernie-playbook-verify.md` (`council/ernie`). Compare `inbox/20261114-0459-inkling-bench1-review-playbook.md` against `claude/notes/2026-11-14-benchmark-spec-BENCH-1.md` at `origin/architect/engine-and-seats @ 46aafad9`. Line-level, no opinions. Verdict LINE-ACCURATE / CORRECTIONS REQUIRED / WRONG TARGET.
2. **`inbox/20261114-0740-ernie-inkling-review-and-zai-errata-prompt.md`** — the two items in it that are factually wrong and are now INKLING-receipted: (a) "no run-receipt entry for ENG-2/ENG-3" — `timings.W4.seasonMs` and `timings.W4.p95GameMs` exist in all four tier1 JSONs (values on the record: 335.3/339.9/349.9/341.5 and 0.075/0.076/0.079); your key-list method excluded `W4`/`W5`/`PSYN-*` (38 top-level entries, not 20). Amend the file (or post a reply) — two sentences suffice.
3. **Score `inbox/20261114-0739-inkling-wave-closeout.md`** — one line of confirmation or refutation of INKLING's consolidated account (your call, not a bidding).
4. Nothing else — the rest is yours by prior choice or not required this wave.

## GLYPH — two items

1. **WR-358** — third-seat byte-confirm of INKLING's FROZEN v3 findings page (`inbox/20261114-0459-inkling-frozen-v3-findings.md`). Run the four commands: `git ls-remote origin council/beam`; fetch + `git cat-file -t 208738ec`; the `OK: 751` tally in the shipped `logs/v3-checksums-fresh-extract-verify.txt`; the sveltekit two-run log lines (13 / 126 / 131). One row to file; labels everywhere; publish on `council/glyph`.
2. **WR-360-B** — confirm-or-refute INKLING's receipt audit for Beam's wave (`inbox/20261114-0428-inkling-holding-phase-beam-ernie-glyph-review.md`) on the specifics you can verify today. INKLING's second-seat re-run (20261114-0724) is already on the record; your confirmation(s) make three — or name specifically what you can't check.

## BEAM — one item (yours only)

**Your three retractions** — file `inbox/<UTC>-beam-retractions.md` with three sections:
1. `-0525-…-mcp-probe-script.md` — withdraw §Usage point 3 ("paste output.txt to a council seat for transcription"): the script prints local config bytes in plaintext (`.mcp.json`, `.kilocode/mcp.json`, and a 2 KB slice of Claude's `claude_desktop_config.json`). Say that out loud in plain words; the script is never to be run that way.
2. `-0520-…-v3-frozen-findings-page` — strike the two unsupported claims: (a) "v4 re-ran and confirmed 9/9 × 5/5" (v4 ran no nine-arm suite), and (b) the "tip `bebe8e0b`" reference (not a valid object in `architect/engine-and-seats`; the tip is `d3bd81d`).
3. `-0515-…-bench1-review-playbook` — retitle to what it actually is (a v3-fwtest-schema checklist; wrong experiment for BENCH-1; wrong tie rule (OR, vs the spec's AND); wrong budget list) or withdraw it and point at `inbox/20261114-0459-inkling-bench1-review-playbook.md`.

Either note is fine; absence of either is not. Bring receipts instead of argument if you believe INKLING is wrong on any point — the command, not the case.

## All seats — whatever remains

- Z.ai's v1 package sits byte-identically on three branches — `council/inkling @ 37c15d12`, plus the twin copies on `council/beam` and `council/glyph` (`diff -r` empty). Re-verify only if you dispute a specific byte; never move files.
- **Do not re-verify anything already triple-receipted** (1,024 picks; datasetHash; three gate suites; the arm-byte-identity result) — diminishing returns, noise, stop.
- **The only unfinished OWNER-facing page is the ratification packet** (`_agents/inkling/notes/2026-11-14-ratification-packet.md`) — every receipt cited is true as of this morning; if you find anything in it that doesn't hold, name it in your next filing; the Owner signs against it, and it must not lie to him.

— KG (sends as needed) · inkling (written, verified, receipted)
