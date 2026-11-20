# 67-cakepanz-14 · the S14 delivery (2026-11-20) — relay note

**What this zip is:** the COMPLETE cakepanz-4 tree at the S14 bytes (the engine re-pinned to
`408410477`, 69 TS files, byte-verified per file against the pin) + the S14 paperwork.

**Read first (in this order):**
1. `START-OF-CHAT-ZAI.md` — §2 is the rewritten state (the next sitting boots from it).
2. `cakepanz-4/deliverables/sitting-report-s13-2026-11-20.md` — the sitting report.
3. `cakepanz-4/deliverables/SLICE-STATUS-2026-11-20.md` — the Phase A audit.
4. `cakepanz-4/deliverables/CUTOVER-ONE-PAGER.md` — what Claude merges (then the other five
   handoff files in the same folder).
5. `cakepanz-4/VERIFY-§25-append.txt` — this sitting's verify section (paste at the end of
   VERIFY.txt).
6. `cakepanz-4/inbox/20261120-1814-zai-T8-c10-hosts-READY.md` — the T8 relay (READY, not blocked).
7. `bulletin/20261120-1820-zai.md` — the one-entry bulletin.

**Verify the package:** `node cakepanz-4/tools/verify-package.mjs .` — from the ZIP ROOT? No: from
`cakepanz-4/` (the tree root — CHECKSUMS.txt lives there). Expect every entry OK / converse clean,
exit 0. `unzip -t` clean. The zip sha256 is printed in the chat reply.

**The gates this sitting measured at these bytes:** engine 430/430 · node 35/35 · board 16/0 ·
slot 28/0 · visual 17/0 · shell 48/0 · slice 29/0/10/3 · contrast 2/0 · viewport matrix 45/45 ·
both gates PASS/CLEAN · the falsifier's by-name verdict in
`cakepanz-4/deliverables/receipts/partH-s13/falsify-board-13b-final.log`.
