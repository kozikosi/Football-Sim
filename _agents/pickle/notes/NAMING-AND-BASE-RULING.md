# NAMING-AND-BASE-RULING.md — the Owner's 22 Oct ruling, applied to my lane

SPEAKER: Pickle | ROLE: Council reviewer (S-800–899) | TASK: apply the Owner's 22 Oct broadcast ruling | DATE: 2026-10-22

**This is a local record so the ruling is searchable from my lane.** I edited no other seat's file and no product file.

## 1 · Naming — the current build is V22

Owner: *"No I want the new build that Claude is working on to be called v22. I don't care what the previous build was called."*

- The working file is `NFL Draft Simulator merged.html` (`044d1759…`, 656,746 B). **It is V22.** Not V21, not V20.
- **Applied:** `AGENTS.md` §14 "Product files" still read "**Current candidate (V21)**" — fixed to "**The working file — V22 is built from this**", plus an explicit line *"Do not name the current build V20 or V21."* (§2's table had already been corrected by another seat; §14 was the duplicate that lagged.)
- **Applied in my own lane:** `owner-brief-batch-compiled.md` used "V21" twice for the current build; a dated amendment now reads those as V22. `owner-q3-ovr-pipeline.md` already said "never V21" and needed no change.
- **No document I own introduces V20/V21 as a name for the current build.**

## 2 · The 3-4 Nickel rule — base-dependent substitution

Owner: *"This is not true. 'CB3/Nickel comes on, LB3/SAM comes off' in a 3-4. One defensive tackle is replaced by an extra middle linebacker in 3-4."*

Correct substitution, **by base**:

| Base | CB3/Nickel on → who comes off | Linebackers |
|---|---|---|
| **4-3** | **SAM (LB3)** | stays 3 off-ball LBs |
| **3-4** | **nose tackle (DT1)** | **all four LBs stay on the field** |

And the base difference underneath: **the 3-4 replaces one defensive tackle with a second inside linebacker.**
- The converted slot is **DT2 → ILB2** (worth **MIKE**).
- The SAM role is worn by **OLB2** (worth **WILL**).
- The mapping this council wrote earlier — **SAM→ILB2, DT2→OLB2 — has those swapped. It is WRONG and superseded.**

**Rule I will follow:** never write "LB3/SAM comes off" without naming the base. In a 3-4 there is no SAM to come off.

**Applied:** I checked my entire lane — `grep -rniE "LB3|SAM comes off|DT2.?→.?OLB2|SAM.?→.?ILB2|nose tackle" _agents/pickle/` → **no matches.** I never wrote the rule or the swapped mapping, so nothing in my lane needed correcting. My two relevant notes (`FB-P-SPEC-VERIFY.md`, `V22-ARITHMETIC-TRUTH.md`) describe only flex penalties and slot arithmetic, not the Nickel substitution.

## 3 · Biome

`npx --no-install biome --version` → **2.6.2** (independently confirmed this run: `./node_modules/.bin/biome --version` → 2.6.2). House rules in `biome.json`. Use `npx biome check <path>`.

## 4 · Work from the outer root only

**Confirmed by direct check this run:**
- `pwd` → `/Users/kosi/Desktop/Football Sim` (the outer root). My session has been in the outer root throughout.
- A **second git repo** exists at `/Users/kosi/Desktop/Football Sim/Football Sim`, on branch **`council-intake`** (verified: `git branch --show-current` → `council-intake`). Per the ruling it is one day stale with different copies of every document.

**I read nothing from the nested repo** — every measurement in my notes (`REPO-TRUTH.md`, `V22-ARITHMETIC-TRUTH.md`, `NUMBERS-AUDIT-GLM-B2.md`, `FB-P-SPEC-VERIFY.md`) was taken from the outer root or, where the batch required it, from the **remote** via `gh api`. No correction is needed to any deliverable on this point.

## Tags
- **VERIFIED:** outer root is `pwd`; nested repo exists on `council-intake`; Biome 2.6.2; `AGENTS.md` §14 corrected; my lane has zero references to the 3-4 Nickel rule or the swapped mapping; the two "V21" lines in `owner-brief-batch-compiled.md` amended.
- **NOT CHECKED:** I did not enumerate every difference between the outer root and the nested repo — only that the nested repo exists, its branch, and that I did not read from it.
