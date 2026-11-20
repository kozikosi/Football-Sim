# INTAKE — the Owner's chat message, 2026-11-20 (every ask, mapped)

The Owner's message (verbatim asks → what I did → where the receipt lives):

1. **"Bootstrap yourself: clone https://github.com/kozikosi/Football-Sim shallow and read
   _agents/zai/START-OF-CHAT-ZAI.md from origin/council/muse (do NOT use the old council/zai copy,
   frozen at w55), follow it exactly."**
   → DONE. `git clone --depth 1` + `git fetch --depth 1 origin council/muse council/pickle …`;
   the START file was read from `origin/council/muse` (d8eca10), NOT from council/zai (the frozen
   copy was never opened). Followed: the receipt law, the no-push rule (chat-only seat), the §6 zip
   format, the §7 first-reply form.

2. **"Read this and please experiment and test in every possible way you can think of before
   replying."**
   → DONE. Every claim in this sitting is backed by a command + stdout: the engine carried suite
   (430/430), the node battery (33/33), the contrast guardrail, the slice battery (29/0/10/3), the
   shell battery (48/0), the board battery (11/0), the NEW P-317 slot battery (27/0), the NEW seeded
   visual battery (13/0), the a11y probe (T4 section PASS), FOUR falsifier suites (every law shown to
   die — including the NEW falsify-slot F-S1 and the packaging tool's own refusal path), the two
   gates (PASS/CLEAN ×2 at CP_PIN=408410477), and byte-identity receipts for the re-pin
   (`diff -rq` → exit 0 against the pin's worktree). Falsifier failures found DURING the sitting were
   fixed by re-anchoring (N26, F17, F20, FC) — never by weakening a law.

3. **"Do not queue any work. Complete it all before replying."**
   → DONE. T1–T8 all completed this sitting (none deferred); the sitting order's §9 blocked items are
   the only outstanding pieces and they are NOT mine to do (the c10 landing, the doc fixes, the
   ratings→gap work — each named in the report §4/§7).

4. **The sitting order's §0–§9** (Pickle, 0b60aaf) — worked in the given priority: T1 first
   (required, unblocked), then T2–T6 (build + tools), T7 (the review file), T8 (the ring request).
   The `council.mjs next` top lines (data-licensing ASKs, Colors P0 data reviews) are outside the
   cakepanz UI lane and were left for the seats whose lane they are — said plainly, per the order's
   "take the top line" rule: my lane's P-317 outranked them for THIS seat.

5. **"The store half is already in the tree (pickSlot introduced at 560b8364f, present at the tip);
   your Team Select half is all that remains."**
   → VERIFIED then DONE: `git show origin/architect/engine-and-seats:colors/src/sports/nfl/app/store.ts
   | grep -n pickSlot` → 10 hits at the tip; the Team Select half built and receipted (T1).

**Interpreted, not copied (flagged per §5.1):**
- The T1 order says "Omit pickSlot when it equals userTeam + 1" — implemented as a conditional spread
  in the dispatch (the store would omit it anyway; the shell omits it first, so the record and the
  autosave stay clean).
- The T3 display code: ONE canonical form, the resolved seed's base-36 (`A3F2` in the URL displays as
  `a3f2`; an integer URL seed displays as its base-36 code, the seed itself stays the integer — the
  W8 law pins both).
- The T5 "exactly 3 ringed rows" law: implemented as "exactly 3, MORE only on an order tie" (the
  Owner's C′1 ruling, which seed a3f2 exercises — ring=4 with the tie verified from the VM values:
  2.2/2.2 with the next row 2.1).
- The re-pin: the sitting order's T1 check requires the pickSlot store to run end-to-end, which the
  previous shipped pin (5c808472) predates — the five-path re-pin to 408410477 is the sanctioned
  mechanism (SNAPSHOT.md's own procedure) and is receipted as such; the docs of record were re-pinned
  with it (SNAPSHOT.md rewritten; dated banners on README/MERGE-README/MERGE-GUIDE; VERIFY.txt §24).
