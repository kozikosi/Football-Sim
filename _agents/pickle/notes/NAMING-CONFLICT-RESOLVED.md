# NAMING CONFLICT — RESOLVED (amendment to NAMING-AND-BASE-RULING.md)

SPEAKER: Pickle | ROLE: Council reviewer (S-800–899) | DATE: 2026-10-22

**The conflict I flagged:** the Owner's 22 Oct broadcast said *"rename what you think is the best version of the full html now to `Football-Sim-V21.html`… after you complete the build it will be called `Football-Sim-V22.html`"*, while the Owner's earlier ruling said the current build is V22 and must not be called V21.

**Resolution — the two are not in conflict; they are two different artifacts:**

| Name | Artifact | Meaning |
|---|---|---|
| `Football-Sim-V21.html` | the rename-today snapshot | baseline/staging copy of the working file as it stands now |
| `Football-Sim-V22.html` | Claude's finished deliverable | the build completed against the V22 work order |

V21 here is a **snapshot label for one file's baseline**, not a name for "the build under development." The earlier ruling ("the new build Claude is working on is v22; don't call the current build V20/V21") governs **conversation about the in-development build**; the rename directive governs **which file is which on disk**. Both hold at once once the files are distinguished.

## Measured state after the rename (VERIFIED, 2026-10-22)

```
$ shasum -a 256 "Football-Sim-V21.html" "NFL Draft Simulator merged.html"
044d1759e01ac99b2226...  Football-Sim-V21.html
044d1759e01ac99b2226...  NFL Draft Simulator merged.html
$ wc -c < Football-Sim-V21.html
656746
```
- `Football-Sim-V21.html` **exists**, is **byte-identical** to `NFL Draft Simulator merged.html` (`044d1759…`, 656,746 B). It did **not** exist when I measured earlier this run — the rename has since been executed by whoever owns the product file (Claude or the Owner; the file is Claude-only, I did not touch it).
- `Football-Sim-V22.html` **does not exist yet** — correct; it is the finished deliverable, not yet built.

## Rule I will follow
- Refer to the in-development build as **V22** (never V21/V20 as a name for it).
- Refer to the file `Football-Sim-V21.html` as **the baseline snapshot** — a filename, not a version of the work.
- Never rename, copy or delete either product file (Claude-only).

## Remaining directive facts I re-measured this run (VERIFIED, build `044d1759…`, 656,746 B)
- **"Value here" is still visible**: 5 occurrences (`grep -c`), incl. 3 user-visible Guide strings (l.4991, 4992, 5056) + board header (l.426) + row render (l.1766). Directive 4 is **not yet applied**.
- **Star thresholds not implemented**: `starsParagraph` (l.3027), `starsFaceoffHTML` (l.5397), `fragSeasonStars` (l.5595) exist; no 60-yd / 300-yd / 3:1 numeric gate found. Directive 5 is **not yet applied**.
- **3-4 DT→LB swap not present**: base-defense package exists (`'base defense'` keys, l.2221–2223) but no DT-for-LB toggle found. Directive 8 is **not yet applied**.
- **P/FB weight entries**: my `grep "\"[PF]\":[0-9]+"` returned nothing in the model-weights table — the P=1 / FB=1 claim is **UNKNOWN from my probe** (weight table may key slots differently). Leave for the seat that owns the weights slice.

## Tags
- **VERIFIED:** V21 rename executed and byte-identical; V22 deliverable absent; "Value here" 5 occurrences live; no 60/300/3:1 star gate; no 3-4 DT→LB toggle.
- **UNKNOWN:** P/FB weight values (my regex found no literal; not the same as "absent").
- **NOT CHECKED:** I did not edit the product file, any protected constant, or another lane.
