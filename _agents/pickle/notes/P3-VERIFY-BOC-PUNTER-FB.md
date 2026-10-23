# P3 VERIFICATION — BOC's punter/FB audit, checked line by line (and my own near-miss)

SPEAKER: Pickle | ROLE: Council reviewer (S-800–899) | TASK: independently verify BOC's P3 return (`_agents/boc/notes/punter-fb-audit.md`) | DATE: 2026-10-22

**Build measured:** `NFL Draft Simulator merged.html`, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B. Read-only. No product edit, protected constant, or other lane touched.

**Verdict: BOC's P3 is CORRECT on every cited line.** I checked it because it concerns protected constants and a wrong claim here would send Claude into a forbidden edit.

## Line-by-line check (all VERIFIED against the build)

| BOC claim | My measurement | Verdict |
|---|---|---|
| `DEFAULT_WEIGHTS` (l.452) has `"P": 1` | l.452 ends `… "K": 5, "P": 1, "FB": 1};` | **CONFIRMED** |
| `DEFAULT_WEIGHTS` (l.452) has `"FB": 1` | same line | **CONFIRMED** |
| `_POSITION_TIER` (l.983) has `P:5` and `FB:5` | l.983: `…TE:4,HB:4, K:5,P:5,FB:5}` | **CONFIRMED** |
| `RATING_SPECS` (l.1938–1945) omits FB | key list = `olRun, olPass, rb, qb, rec, passRush, frontRun, coverage, kicker`; **0** FB matches | **CONFIRMED** |
| `rb: {RB1:2.0, RB2:0.5}` | l.1941 verbatim | **CONFIRMED** |
| `FLEX`/`NATURAL_SLOT_MAP`: FB absent, cannot flex | FB is not in `NATURAL_SLOT_MAP` (verified earlier, M-414 slice) | **CONFIRMED** |
| GROUP_DEFS (l.455): P and FB are `"cat":"Specialists"` | `"key":"P",…"cat":"Specialists"` and `"key":"FB",…"cat":"Specialists"` | **CONFIRMED** |

## My own near-miss — recorded because it is the failure mode this council keeps repeating

Before writing this verification I **briefly believed BOC was wrong** that `DEFAULT_WEIGHTS` contained `"P": 1` / `"FB": 1`, because my probe was:
```
$ grep -noE "\"(P|FB)\"[ ]*:[ ]*[0-9]+" "NFL Draft Simulator merged.html"
(no output)
```
The pattern required **no space** before the colon, but the file writes **`"P": 1`** with a space. So my grep returned nothing and I almost posted a false correction against a correct return.

**Two lessons, both facts about this file:**
1. **l.452 is one enormous minified line** — `grep` output for it scrolls off a truncated capture, so a wrapped view of l.452 *appeared* to end at `"CB3": 80` when the line continues through `…"K": 5, "P": 1, "FB": 1};`. **Never** conclude a key is absent from l.452 from a truncated `awk`/`sed` print: use `fold`, `grep -c`, or a tolerant regex. The correct probe is:
   ```
   $ awk 'NR==452' "NFL Draft Simulator merged.html" | grep -oE "\"[A-Z0-9]+\":" | tr -d '"' | tr '\n' ' '
   QB: RB1: … K: P: FB:
   ```
2. **Verification must not be a looser test than the claim it checks.** My regex was stricter than the file's actual formatting, and the strictness looked like a finding. It was not.

I am recording this rather than quietly discarding it — a false "BOC is wrong" bulletin is exactly the kind of duplicate-and-contradict churn the council's own rules exist to prevent.

## The ONE thing I add to BOC's return: the approval gate they under-stated

**BOC writes the FB change as a plain "Proposed change (for Claude)":**
```
olRun: {OT1:1.0, OT2:1.0, OG1:1.2, OG2:1.2, C:1.2, TE1:0.6, FB:2.0},
```
**`RATING_SPECS` is a PROTECTED CONSTANT** (`AGENTS.md` §3 invariant 9, §11 prohibited actions: *"Change `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC` coefficients, `PLAN_K`, `RATING_SPECS` without explicit Owner approval."*). So:
- The change is **correct in shape** (FB absent from `olRun`; the Owner wants a heavier-than-RB run-block spec).
- It is **not shippable as an un-flagged patch**: it requires the Owner's explicit approval, and BOC's note should say so in its own line. BOC has listed it in `owner-directives-v22.md` §3 as "Protected constant change (`MC` coefficients) — Owner approval granted via this directive" — but the actual edit lands in **`RATING_SPECS`**, not `MC`. **Both are protected**; the note names the wrong constant for the edit it proposes.
- **Recommendation:** Claude should treat the FB spec as an **Owner-approval item** and cite `RATING_SPECS` (not `MC`) as the constant touched. The *numeric value* (FB = 2.0 vs 2.5 vs 3.0) is also the Architect's/Owner's call — BOC offers both and says so honestly.

## Tags
- **VERIFIED:** all seven of BOC's cited lines/claims; the full `DEFAULT_WEIGHTS` key list including `K/P/FB`; `RATING_SPECS` key list with FB/P absent; GROUP_DEFS `Specialists` placement.
- **CORRECTED (BOC):** the proposed FB spec touches **`RATING_SPECS`**, and that constant needs explicit Owner approval; `owner-directives-v22.md` §3 names `MC` for this edit instead.
- **MY OWN ERROR, RETRACTED BEFORE POSTING:** an over-strict regex briefly made me believe P/FB were absent from `DEFAULT_WEIGHTS`. They are present. Recorded above with the correct probe.
- **NOT CHECKED:** I did not choose the FB weight value (Architect/Owner's call); I did not test a patch; I did not touch the product file.
