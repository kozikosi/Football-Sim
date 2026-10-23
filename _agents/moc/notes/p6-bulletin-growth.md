# P6 · The bulletin regrew 60 % in two hours — a trim is the wrong tool

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: P6 · verify the "bulletin trimmed" claim, and measure what the trim does not fix | DATE: 2026-10-22T11:20:00Z**

**The claim.** Lightning's M-20261022-n: *"trim the bulletin into `_archive/`"* — reported **VERIFIED**.

**The claim is true.** `_archive/COUNCIL-BULLETIN-20261022.md` exists: **712,736 bytes**, 175 entries, written **21 Oct 17:25:20**. The old content is safely archived, nothing was renumbered, and no history was deleted.

**And the live file is bigger than it was before the trim.**

| when | the live bulletin |
|---|---|
| at the trim (21 Oct 17:25) | 712,736 bytes (the archive's size) |
| now (21 Oct 19:23) | **1,139,254 bytes** |
| the idle brief's own figure | 866 KB |

**426,518 bytes added in 1 hour 58 minutes — +60 %, and past the 866 KB the brief still quotes.**

## 1 · What is driving it (measured)

- **not one verbose seat**: the longest single line in the live bulletin is 4,047 bytes; the 426 KB is **many** medium entries.
- roughly **226 entries** were added in the window (401 live − 175 archived) ⇒ **≈1.9 KB per entry**.
- **the append discipline itself is sound**: `grep -c '^<<<<<<<\|^>>>>>>>'` → **0**. Ten seats appending to one shared file have produced **zero merge conflicts**. The council's own rule works; that is worth knowing before changing it.

**So the growth is the price of ten seats posting full receipts in the shared file — and a trim moves the bytes without changing the rate.**

## 2 · Why "trim again tonight" is not a fix

The trim happened at 17:25. By 19:23 the file was back past its pre-trim size. **The next trim is due at the same clock time, at the same rate, and the file will be over a megabyte again before the weekend.** A trim is a one-time act; the growth is a rate. **The rate is the problem.**

## 3 · The proposal — three rules, all the Owner's to rule on

**Rule 1 — rotate, don't trim.** Move entries older than a fixed window (say, 24 hours) into `_archive/COUNCIL-BULLETIN-YYYYMMDD.md` and keep the live file to the last day. The archive is already the established pattern; make it a **cycle**, not an event.

**Rule 2 — the bulletin's entry is a pointer; the receipt lives in the lane.** Every seat already writes its full receipt in `_agents/<seat>/notes/`. The bulletin's entry should be **≤ ~600 bytes**: the claim, one line of result, the path to the note, the commit hash. **That alone would cut the growth by roughly two thirds** at the measured 1.9 KB per entry.

**Rule 3 — the detail is what belongs in the archive, and it already does.** The long entries (the 4 KB ones) are the ones that make the file unreadable; they are also the ones that have a note file behind them.

**The exact command, when the Owner rules** (read-only, it prints the plan and writes nothing):

```
# 1. split the live bulletin at the entry headers, keeping the preamble
awk '/^\*\*[A-Z][A-Za-z0-9-]* · /{n++} n>='"KEEP"'{print}' COUNCIL-BULLETIN.md
```

where `KEEP` is the number of entries to keep live. **I have not run a rotation** — the bulletin is a shared document and the Owner owns it.

## 4 · What I did not check

- **I did not open the archive's contents** to confirm the split point preserved every entry — I counted its entries (175) and its bytes, and that the live file starts where the archive ends is implied by the file sizes, but I did not diff the two files line by line.
- **I did not measure the growth of `_archive/`** or propose a retention policy for it — at this rate it too needs a rule.
- **I did not edit the bulletin, the archive, or any shared document.** The rule above is a proposal.
- **I did not check whether the entries added since the trim are of a different kind** (my own are receipts-with-full-detail, which is exactly what Rule 2 would shorten) — so the 1.9 KB average partly reflects seats like me. **The honest statement: the rate is a property of the council's habit, not of one seat's verbosity.**

**One line for the bulletin:** *Took a verification slot on the "bulletin trimmed" claim — the trim is real and the archive is safe, but the live file grew 426 KB (60 %) in two hours and is past 1.1 MB; propose rotate-on-a-window + receipts-in-the-lane (≤600 bytes in the bulletin, the note behind it), because a trim moves the bytes without changing the rate.*
