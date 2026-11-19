# COUNCIL PROMPT — Z.ai / 67 Cakepanz: sitting of 2026-11-19 (FINAL, self-contained)

**SPEAKER: pickle | ROLE: Council Adviser | TASK: give Z.ai one self-contained sitting order that merges Ernie's v3.0 with the Owner's rulings | DATE: 2026-11-19 22:00 UTC**

This file supersedes my earlier draft `_agents/pickle/deliveries/prompts-2026-11-19/zai-cakepanz-closeout-rulings.md`
(blob `9009561f…`). The earlier draft is kept per §5 but its Part 0 disposition is overtaken by the
later Owner ruling below. **FOR OWNER RELAY — KG sends; no push to Z.ai's branch was attempted.**

Everything between the two `====` rules is the paste-ready prompt. It assumes Z.ai has read **none**
of my earlier filings and none of this session.

===============================================================================

COUNCIL PROMPT — to Z.ai / 67 Cakepanz: one long sitting, 2026-11-19.
SPEAKER: COUNCIL (relayed by the Owner) | ROLE: sitting order | DATE: 2026-11-19 | English only.

You are starting cold. Nothing you read before applies unless it is named in this message or in the
order it points you to. Read this whole message, then read the order in §1 in full, then work. Label
every claim VERIFIED (you ran it, output quoted) / REPORTED (someone named says it) / INFERRED /
UNKNOWN.

## 1 · Your controlling order — read it first, in full

Your task list for this sitting is **ERNIE's v3.0 sitting order**, not a new list from me. It is
290 lines and self-contained. It supersedes Inkling's v2.1 (`d02c0798f`) and is the ONLY task
document for this sitting. I am only its cover: I add the Owner's rulings in §2 and the
reconciliation rule in §3. Where my cover and v3.0 touch the same step, **v3.0's procedure and
fence govern this sitting.**

Fetch it by exact blob, so you know you have the right bytes:

```
git clone --no-checkout https://github.com/kozikosi/Football-Sim.git fs && cd fs
git fetch origin council/ernie council/pickle council/inkling council/orcaink
git rev-parse origin/council/ernie:deliveries/zai-next-sitting-prompt-2026-11-19.md
  # expect 34d9b02517009aa3ea91b40a0d5a89467220a234
git show origin/council/ernie:deliveries/zai-next-sitting-prompt-2026-11-19.md > /tmp/v3.md
git show origin/council/ernie:_agents/ernie/deliveries/vapor-mode-experiment-2026-11-19/RESULTS.txt > /tmp/vapor.txt
```

If either blob sha does not match, STOP and say so — do not work from a stale order. Read `/tmp/v3.md`
in full. Its §1–§10 are your work: c10 one-file repair on both hosts (§2), rewrite the three stale
doc lines in your own honest words (§3), shell-integrity measurement (§4), vapor receipts (§5),
queue hygiene (§6), extra work if you finish (§7), the fence (§8), and the zip + report shape (§9–§10).
`RESULTS.txt` is the vapor receipt v3.0 tells you to read in §5; it is included above so you do not
need to hunt for it.

## 2 · The Owner's rulings — verbatim, final, do not re-litigate

These are the Owner's words, preserved exactly. Two come from my record, the Part-0 ACCEPT quote
comes from Ernie's 21:45 relay (the later and more specific one). Keep the exact tokens.

- **Framework — Svelte 5 + Vite 8, DECIDED.** "ok i officially am deciding svelte 5 + vite 8. I
  authorize you pickle to do whatever necessary in our files to ensure everyone understands this"
  Keep the token **"vite 8"**. React stays out. R-13 closed; F1 moot. Do not touch `package.json`
  pins — the `^7.3.6 → ^8` reconciliation is the Architect's cutover task.
- **Part 0 — ACCEPTED.** My earlier note read "again i think we will pose the problem to him and let
  him fix it himself with his own intuition. you will be drafting a prompt to z.ai shortly to
  continue work". The Owner then said, to Ernie at 21:45: **"best of both is probably best. guide
  z.ai to fix the solution himself with his own intuition."** Net effect, and this is the current
  state: the patched working dist `76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964`
  (527,162 B) is the **release candidate**; the delivered artifact `670d4c08…` (527,177 B) is
  pre-Part-0 history; they are **not** byte-identical. You choose the honest wording of the three
  stale doc lines (v3.0 §3) — that is exactly what "fix the solution himself with his own intuition"
  means. Do not re-cut the zip.
- **C′1 — match w89.** "again i think we need to get as close to w89 as possible. the ring looks
  worse than the glowing button in w89". This is a visual/UX direction with w89 as the target;
  it is **not** a mechanism ruling. v3.0 §4.1 has you **measure** the ring this sitting, not fix it.
  If bringing it closer to w89 would need an engine-view export (`raw: { wins, priority }` on
  `BoardRowVM`) or a re-pin, that is a need from the Architect — name it in your report, do not
  touch `colors/src/**` or any pin.
- **Four stats tabs — w89 titles, ALL CAPS.** "w89 titles but all caps". The exact strings:
  `SEASON STATS` / `PLAYOFF STATS` / `YOUR PLAYERS` / `LEAGUE LEADERS`. These close GPT's copy gate.
  v3.0's fence forbids product edits this sitting, so record these four strings in your report and
  `START-OF-CHAT-ZAI.md` for the product track; do not edit the shipped bundle to apply them now.
- **Distribution — settled.** The two GitHub folders are the artifact paths until cutover; the w89
  HTML retires when 76 Pancakes / Colors ships; **no v2 re-zip**.
- **Vapor — falsified; framework not reopened.** Ernie's controlled experiment (the `RESULTS.txt`
  above) measured, on one identical surface: Svelte 13,154 B gz · Vue vdom 26,294 B gz · Vue
  vapor 31,498 B gz. Vapor is 19.8% *bigger* than vdom and 2.39× Svelte; the 5 KB falsifier
  registered 2026-11-15 is dead. Vapor engaged genuinely (`__vapor:!0`), but 99.3% of the bundle
  is runtime. Do not re-run it; do not cite it as open; do not use it as a framework argument in
  either direction. (My own earlier benchmark pointed the other way; it is REPORTED-from-PICKLE
  and superseded on the direction question by Ernie's controlled run. Both are kept on record;
  neither changes the closed framework decision.)

## 3 · Reconciliation rule (read once)

v3.0 is the controlling **task and fence** document for this sitting. §2 above is additional
**Owner-supplied direction**, not a second task list. If a ruling in §2 seems to ask for something
v3.0's fence forbids — specifically C′1 and the tab labels, which are product changes — you hold
v3.0's fence (§8: documents and one imported file only), record the ruling in your report for the
product track, and do **not** edit product. If any line of v3.0 contradicts a verbatim Owner ruling
in §2, STOP and quote both sides in your report's discrepancy block; do not silently pick one.

## 4 · Hard rules, restated so you cannot miss them

1. **You cannot push.** No `git push`, no credential helper, no token request. The **zip is the
   delivery** (v3.0 §9 names it `z-post-blue-docs-update-2026-11-19-v3-sitting.zip`).
2. **Take at least an hour of your own work before you reply.** If §2–§6 of v3.0 are done early,
   §7 has more work. Do not reply early.
3. **Fence:** no `src/`, `dist/`, `package.json`, engine, pin, protected constant, product HTML,
   governance file, queue row, or other seat's tree. This sitting edits documents and imports one
   file. If a step seems to need a product edit, stop and report.
4. **Do not re-run item-5, item-6, or the vapor experiment.** All three are done and receipted.
   Do not re-cut the c10 zip or regenerate its manifests — the repair is one 6,418 B file added
   to each of the two hosts at the path the manifest already names (`md5 0a2869538a706e7e6ea864664b7e5c9f`).
5. **Never write "byte-identical" about the two different dists.** `76de5658…` (working,
   Part-0-kept) and `670d4c08…` (delivered, pre-Part-0) differ; say what each is.
6. **English only. Label every claim. Every number from a command you ran and quoted.**

## 5 · What to hand back

Exactly what v3.0 §9 and §10 specify: one verified zip (`unzip -t` exits 0, `md5sum -c CHECKSUMS.txt`
all-OK, both outputs pasted) and the report `deliverables/zai-this-sitting-report-2026-11-19-v3.md`
in the §10 shape, with a mandatory "what you did NOT do and why" section, a discrepancy block, and
a "what the Owner owes" line per open item. The three §2 rulings you could not apply within the
fence (C′1 visual match, four tab labels) go in that report as product-track items, not as edits.

## 6 · If you read one paragraph only

The Owner has ruled: framework Svelte 5 + Vite 8 (final); **Part 0 ACCEPTED** — the patched working
dist `76de5658…` is the release candidate; the two GitHub folders are the artifact paths, **no
re-cut**; C′1 should match w89; the four tabs are `SEASON STATS / PLAYOFF STATS / YOUR PLAYERS /
LEAGUE LEADERS` in ALL CAPS. Ernie's v3.0 (§1) is your controlling order: repair the one missing
c10 file on both hosts, rewrite the three stale doc lines in your own honest words, measure — do
not fix — the shell, read the vapor receipts (falsified), do the hygiene items, then hand back one
verified zip after at least an hour of work. You cannot push. Do not touch product, pins, engine,
or the framework decision. Label every claim. English only.

===============================================================================

— DRAFT by Pickle for the Owner to review and relay (KG sends). Not sent. No branch other than
`council/pickle` pushed. Ernie's v3.0 and RESULTS.txt were read at `council/ernie` tip
`ecf35836ff6b32b28ebf4849e113e2301e98a2f5`; blob shas in §1 verified by `git ls-tree` this session.
